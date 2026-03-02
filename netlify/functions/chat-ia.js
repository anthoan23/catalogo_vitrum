const Groq = require("groq-sdk");

const SYSTEM_PROMPT =
	"Eres un asesor comercial y tecnico de la empresa Vitrum. " +
	"Vitrum se especializa en la fabricacion e instalacion de ventanas, puertas y cierres " +
	"en vidrio, acero y aluminio. " +
	"Tu funcion es ayudar a las personas con cualquier duda sobre productos, materiales, " +
	"tipos de apertura, mantenimiento, usos recomendados, tiempos estimados y proceso general de instalacion. " +
	"Responde siempre en espanol, de forma clara, cordial y profesional. " +
	"Si falta informacion para recomendar una opcion, haz preguntas breves para orientar mejor al cliente.";

const MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct";

function response(statusCode, body) {
	return {
		statusCode,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
		},
		body: JSON.stringify(body),
	};
}

function buildMessages(userMessage, history) {
	const messages = [{ role: "system", content: SYSTEM_PROMPT }];

	if (Array.isArray(history)) {
		history.forEach((item) => {
			if (!item || typeof item !== "object") {
				return;
			}

			const role = item.role;
			const content = item.content;
			if ((role === "user" || role === "assistant") && typeof content === "string" && content.trim()) {
				messages.push({ role, content: content.trim() });
			}
		});
	}

	messages.push({ role: "user", content: userMessage });
	return messages;
}

exports.handler = async function handler(event) {
	const method = String(event && event.httpMethod ? event.httpMethod : "").toUpperCase();

	if (method === "OPTIONS") {
		return response(200, { ok: true });
	}

	if (method !== "POST") {
		return response(405, { error: "Metodo no permitido. Usa POST." });
	}

	let payload;
	try {
		payload = JSON.parse((event && event.body) || "{}");
	} catch (error) {
		return response(400, { error: "JSON invalido." });
	}

	const userMessage = String((payload && payload.message) || "").trim();
	const history = payload ? payload.history : undefined;

	if (!userMessage) {
		return response(400, { error: "El campo 'message' es obligatorio." });
	}

	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		return response(500, { error: "Configurar llave: falta GROQ_API_KEY en Netlify." });
	}

	try {
		const client = new Groq({ apiKey });
		const completion = await client.chat.completions.create({
			model: MODEL_NAME,
			messages: buildMessages(userMessage, history),
		});

		const assistantResponse =
			(completion &&
				completion.choices &&
				completion.choices[0] &&
				completion.choices[0].message &&
				completion.choices[0].message.content) ||
			"";

		return response(200, { reply: assistantResponse });
	} catch (error) {
		return response(500, { error: "No se pudo procesar tu mensaje en este momento." });
	}
};
