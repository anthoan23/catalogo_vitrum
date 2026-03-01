import json
import os

from groq import Groq


SYSTEM_PROMPT = (
    "Eres un asesor comercial y tecnico de la empresa Vitrum. "
    "Vitrum se especializa en la fabricacion e instalacion de ventanas, puertas y cierres "
    "en vidrio, acero y aluminio. "
    "Tu funcion es ayudar a las personas con cualquier duda sobre productos, materiales, "
    "tipos de apertura, mantenimiento, usos recomendados, tiempos estimados y proceso general de instalacion. "
    "Responde siempre en espanol, de forma clara, cordial y profesional. "
    "Si falta informacion para recomendar una opcion, haz preguntas breves para orientar mejor al cliente."
)

MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"


def _response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        "body": json.dumps(body, ensure_ascii=False),
    }


def _build_messages(user_message, history):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    if isinstance(history, list):
        for item in history:
            if not isinstance(item, dict):
                continue
            role = item.get("role")
            content = item.get("content")
            if role in {"user", "assistant"} and isinstance(content, str) and content.strip():
                messages.append({"role": role, "content": content.strip()})

    messages.append({"role": "user", "content": user_message})
    return messages


def handler(event, context):
    method = (event.get("httpMethod") or "").upper()

    if method == "OPTIONS":
        return _response(200, {"ok": True})

    if method != "POST":
        return _response(405, {"error": "Metodo no permitido. Usa POST."})

    try:
        payload = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return _response(400, {"error": "JSON invalido."})

    user_message = (payload.get("message") or "").strip()
    history = payload.get("history")

    if not user_message:
        return _response(400, {"error": "El campo 'message' es obligatorio."})

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return _response(500, {"error": "Configurar llave: falta GROQ_API_KEY en Netlify."})
 
    try:
        client = Groq(api_key=api_key)
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=_build_messages(user_message, history),
        )
        assistant_response = completion.choices[0].message.content or ""
        return _response(200, {"reply": assistant_response})
    except Exception:
        return _response(500, {"error": "No se pudo procesar tu mensaje en este momento."})