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

const DEFAULT_ALLOWED_ORIGINS = [
	"http://localhost:8888",
	"http://localhost:3000",
	"http://127.0.0.1:5500",
	"http://localhost",
	"https://vitrum-gc.netlify.app",
];

const MAX_MESSAGE_CHARS = Number(process.env.CHAT_MAX_MESSAGE_CHARS || 800);
const MAX_HISTORY_MESSAGES = Number(process.env.CHAT_MAX_HISTORY_MESSAGES || 12);
const MAX_HISTORY_ITEM_CHARS = Number(process.env.CHAT_MAX_HISTORY_ITEM_CHARS || 800);
const RATE_LIMIT_WINDOW_MS = Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS || 60000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS || 20);

const rateLimitStore = new Map();

function getAllowedOrigins() {
	const envOrigins = String(process.env.ALLOWED_ORIGINS || "")
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);

	if (envOrigins.length > 0) {
		return new Set(envOrigins);
	}

	return new Set(DEFAULT_ALLOWED_ORIGINS);
}

function getHeader(event, headerName) {
	if (!event || !event.headers) {
		return "";
	}

	const headers = event.headers;
	const lowerName = String(headerName || "").toLowerCase();
	for (const key of Object.keys(headers)) {
		if (String(key).toLowerCase() === lowerName) {
			return String(headers[key] || "").trim();
		}
	}

	return "";
}

function getRequestOrigin(event) {
	return getHeader(event, "origin");
}

function isOriginAllowed(origin, allowedOrigins) {
	if (!origin) {
		return true;
	}

	return allowedOrigins.has(origin);
}

function buildCorsHeaders(origin) {
	if (!origin) {
		return {
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			Vary: "Origin",
		};
	}

	return {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		Vary: "Origin",
	};
}

function getClientIp(event) {
	const netlifyIp = getHeader(event, "x-nf-client-connection-ip");
	if (netlifyIp) {
		return netlifyIp;
	}

	const forwardedFor = getHeader(event, "x-forwarded-for");
	if (forwardedFor) {
		return forwardedFor.split(",")[0].trim();
	}

	const clientIp = getHeader(event, "client-ip");
	if (clientIp) {
		return clientIp;
	}

	return "unknown";
}

function isRateLimited(clientIp) {
	const now = Date.now();
	const current = rateLimitStore.get(clientIp);

	if (!current || now > current.resetAt) {
		rateLimitStore.set(clientIp, {
			count: 1,
			resetAt: now + RATE_LIMIT_WINDOW_MS,
		});
		return false;
	}

	if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
		return true;
	}

	current.count += 1;
	rateLimitStore.set(clientIp, current);
	return false;
}

function cleanupRateLimitStore() {
	const now = Date.now();
	for (const [ip, value] of rateLimitStore.entries()) {
		if (!value || now > value.resetAt) {
			rateLimitStore.delete(ip);
		}
	}
}

function response(statusCode, body, corsHeaders = {}) {
	return {
		statusCode,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			...corsHeaders,
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
	const allowedOrigins = getAllowedOrigins();
	const origin = getRequestOrigin(event);
	const corsHeaders = buildCorsHeaders(origin);

	if (!isOriginAllowed(origin, allowedOrigins)) {
		return response(403, { error: "Origen no permitido." }, corsHeaders);
	}

	cleanupRateLimitStore();

	if (method === "OPTIONS") {
		return response(200, { ok: true }, corsHeaders);
	}

	if (method !== "POST") {
		return response(405, { error: "Metodo no permitido. Usa POST." }, corsHeaders);
	}

	const clientIp = getClientIp(event);
	if (isRateLimited(clientIp)) {
		return response(
			429,
			{ error: "Has alcanzado el limite de solicitudes. Intenta nuevamente en unos segundos." },
			corsHeaders
		);
	}

	let payload;
	try {
		payload = JSON.parse((event && event.body) || "{}");
	} catch (error) {
		return response(400, { error: "JSON invalido." }, corsHeaders);
	}

	const userMessage = String((payload && payload.message) || "").trim();
	const incomingHistory = payload ? payload.history : undefined;
	const history = Array.isArray(incomingHistory) ? incomingHistory.slice(0, MAX_HISTORY_MESSAGES) : [];

	if (!userMessage) {
		return response(400, { error: "El campo 'message' es obligatorio." }, corsHeaders);
	}

	if (userMessage.length > MAX_MESSAGE_CHARS) {
		return response(
			400,
			{ error: `El mensaje supera el limite permitido de ${MAX_MESSAGE_CHARS} caracteres.` },
			corsHeaders
		);
	}

	for (const item of history) {
		if (!item || typeof item !== "object") {
			continue;
		}
		const content = String(item.content || "");
		if (content.length > MAX_HISTORY_ITEM_CHARS) {
			return response(
				400,
				{ error: `Un elemento del historial supera ${MAX_HISTORY_ITEM_CHARS} caracteres.` },
				corsHeaders
			);
		}
	}

	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		return response(500, { error: "Configurar llave: falta GROQ_API_KEY en Netlify." }, corsHeaders);
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

		return response(200, { reply: assistantResponse }, corsHeaders);
	} catch (error) {
		return response(500, { error: "No se pudo procesar tu mensaje en este momento." }, corsHeaders);
	}
};
