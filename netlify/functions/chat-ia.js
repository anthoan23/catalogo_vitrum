const Groq = require("groq-sdk");

const WHATSAPP_CONTACT = "https://wa.me/584145009225";

const PRODUCT_CATALOG = [
	{
		service: "Ventanas",
		items: [
			{
				name: "Caroni",
				description: "Lineas modernas con alta resistencia y buen aislamiento.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
				detailDescription:
					"El sistema Caroni combina perfileria robusta con lineas modernas para lograr una ventana elegante, funcional y de larga vida util en hogares y comercios.",
				advantages: [
					"Excelente aislamiento frente a ruido exterior.",
					"Perfileria resistente para uso continuo.",
					"Diseno versatil para fachadas modernas y clasicas.",
					"Mantenimiento rapido con limpieza simple.",
				],
			},
			{
				name: "Ecobel",
				description: "Perfileria ligera ideal para espacios contemporaneos.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
				detailDescription:
					"Ecobel ofrece un perfil liviano y contemporaneo, ideal para proyectos que buscan iluminacion natural, estetica limpia y operacion comoda.",
				advantages: [
					"Mayor entrada de luz natural.",
					"Deslizamiento suave y practico.",
					"Acabado moderno minimalista.",
					"Buena durabilidad en uso residencial.",
				],
			},
			{
				name: "Belglass",
				description: "Acabados elegantes para proyectos residenciales y comerciales.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
				detailDescription:
					"Belglass esta pensado para proyectos que requieren presentacion elegante, cuidando la calidad visual del vidrio y la firmeza estructural.",
				advantages: [
					"Imagen premium para viviendas y comercios.",
					"Estructura estable y segura.",
					"Compatibilidad con distintos tonos de perfileria.",
					"Facil integracion con disenos interiores.",
				],
			},
			{
				name: "Panoramica",
				description: "Maxima visibilidad y entrada de luz natural.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
				detailDescription:
					"La linea Panoramica prioriza visuales abiertas y amplitud del espacio, permitiendo una conexion mas limpia entre interior y exterior.",
				advantages: [
					"Mayor campo visual.",
					"Mas iluminacion natural.",
					"Ideal para areas sociales y fachadas.",
					"Balance entre estetica y funcionalidad.",
				],
			},
			{
				name: "Proyectante",
				description: "Apertura superior para ventilar con seguridad y sin perder privacidad.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
				detailDescription:
					"La ventana Proyectante abre hacia afuera desde la parte superior, logrando ventilacion constante con buen sellado y estetica limpia.",
				advantages: [
					"Ventila incluso con lluvia ligera.",
					"Mejora la seguridad al limitar apertura.",
					"Favorece privacidad y aire natural.",
					"Practica y durable en uso diario.",
				],
			},
		],
	},
	{
		service: "Puertas cierre de ambiente",
		items: [
			{
				name: "Corredizas con marco",
				description: "Apertura suave y ahorro de espacio para grandes claros.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
				detailDescription:
					"Las corredizas con marco permiten abrir grandes claros con deslizamiento suave y acabado sobrio para espacios amplios.",
				advantages: [
					"Ahorro de espacio.",
					"Deslizamiento fluido.",
					"Mantiene entrada de luz.",
					"Ideal para integrar o dividir areas.",
				],
			},
			{
				name: "Corredizas sin marco",
				description: "Paneles de vidrio con visual limpia y apertura deslizante para espacios modernos.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"Las corredizas sin marco ofrecen una estetica minimalista con mayor protagonismo del vidrio e integracion visual de ambientes.",
				advantages: [
					"Vista limpia y moderna.",
					"Mayor sensacion de amplitud.",
					"Deslizamiento comodo.",
					"Aporta iluminacion natural.",
				],
			},
			{
				name: "Bancarias",
				description: "Paneles robustos con enfoque en seguridad y durabilidad.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"Los sistemas bancarios priorizan seguridad y resistencia, con paneles firmes para zonas de alto flujo.",
				advantages: [
					"Alta robustez.",
					"Perfiles fuertes para uso intensivo.",
					"Control visual con transparencia.",
					"Facil mantenimiento comercial.",
				],
			},
			{
				name: "Acordeon",
				description: "Solucion flexible para dividir o integrar ambientes.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"El sistema acordeon ofrece flexibilidad para abrir o cerrar espacios rapidamente con plegado compacto y funcional.",
				advantages: [
					"Plegado compacto.",
					"Apertura y cierre rapidos.",
					"Aprovecha luz natural.",
					"Ideal para espacios multiuso.",
				],
			},
		],
	},
	{
		service: "Baranda de vidrio",
		items: [
			{
				name: "Escalera",
				description: "Barandas seguras con diseno limpio para interiores.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"Barandas de escalera con vidrio y herrajes firmes para brindar seguridad sin perder ligereza visual.",
				advantages: [
					"Mejora seguridad en desniveles.",
					"No bloquea la vista.",
					"Herrajes resistentes.",
					"Look moderno y elegante.",
				],
			},
			{
				name: "Terraza",
				description: "Proteccion exterior con vista despejada.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"Barandas para terraza con vidrio templado y fijaciones estables para seguridad y transparencia en exteriores.",
				advantages: [
					"Proteccion segura en exteriores.",
					"Resistencia a intemperie.",
					"Vista sin obstrucciones.",
					"Acabado sobrio.",
				],
			},
		],
	},
	{
		service: "Puertas de bano",
		items: [
			{
				name: "Spider",
				description: "Herrajes puntuales para un look minimalista.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"El sistema Spider utiliza herrajes puntuales para un resultado minimalista, con vidrio templado de alta calidad.",
				advantages: [
					"Look limpio con herrajes discretos.",
					"Apertura estable.",
					"Vidrio templado para seguridad.",
					"Facil limpieza en ducha.",
				],
			},
			{
				name: "Batiente",
				description: "Apertura tradicional con cierre firme y comodo.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"La puerta batiente ofrece apertura tradicional con cierre firme, ideal para duchas que requieren acceso directo.",
				advantages: [
					"Apertura amplia y comoda.",
					"Cierre firme.",
					"Herrajes resistentes a humedad.",
					"Facil mantenimiento.",
				],
			},
			{
				name: "Acordeon para bano",
				description: "Paneles plegables para duchas compactas.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
				detailDescription:
					"Puerta acordeon para banos compactos con paneles plegables que optimizan el espacio sin perder funcionalidad.",
				advantages: [
					"Ideal para espacios reducidos.",
					"Plegado sencillo.",
					"Reduce salpicaduras.",
					"Solucion practica y economica.",
				],
			},
		],
	},
	{
		service: "Comercios",
		items: [
			{
				name: "Vitrinas",
				description: "Exhibicion clara para destacar tus productos.",
				materials: ["Acero inoxidable"],
				colors: ["Gris"],
				detailDescription:
					"Vitrinas en vidrio para exhibir productos con claridad, resaltando mercancia y cuidando seguridad.",
				advantages: [
					"Mayor visibilidad de productos.",
					"Estructura estable.",
					"Imagen profesional.",
					"Facil limpieza.",
				],
			},
			{
				name: "Mostradores",
				description: "Superficies resistentes para atencion al cliente.",
				materials: ["Acero inoxidable", "Aluminio"],
				colors: ["Gris", "Blanco", "Negro"],
				detailDescription:
					"Mostradores en vidrio con superficies resistentes pensadas para atencion al cliente y exhibicion ordenada.",
				advantages: [
					"Superficie firme para uso diario.",
					"Mejora organizacion y atencion.",
					"Acabado moderno.",
					"Facil mantenimiento.",
				],
			},
		],
	},
	{
		service: "Mas",
		items: [
			{
				name: "Espejos",
				description: "Disenos personalizados para hogar o comercio.",
				materials: ["LED Flexisbles"],
				colors: ["Amarillo", "Blanco", "Azul"],
				detailDescription:
					"Espejos a medida con acabados limpios para ampliar visualmente los espacios y mejorar la iluminacion.",
				advantages: [
					"Amplia visualmente el ambiente.",
					"Aporta mayor luminosidad.",
					"Cortes y medidas personalizadas.",
					"Facil limpieza.",
				],
			},
			{
				name: "Puertas de celosia",
				description: "Puertas decorativas que combinan privacidad y estilo con disenos de celosia.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Negro"],
				detailDescription:
					"Puertas de celosia con diseno decorativo para dar privacidad y ventilacion sin perder estilo.",
				advantages: [
					"Ventilacion controlada.",
					"Privacidad con diseno atractivo.",
					"Ligera y funcional para interiores.",
					"Combina con estilos clasicos o modernos.",
				],
			},
		],
	},
];

const FREQUENT_QUESTIONS = [
	{
		question: "Cuanto demora una instalacion promedio?",
		answer: "Depende del proyecto, pero la mayoria se completa entre 1 y 15 dias.",
	},
	{
		question: "Con que tasa de dolar trabajan?",
		answer:
			"Los presupuestos se ajustan segun la forma de pago: tasa BCV para pagos en bolivares y un precio diferenciado para pagos en divisas en efectivo.",
	},
	{
		question: "Hacen visitas para medir?",
		answer: "Si, se coordina una visita para tomar medidas y asesorar al cliente.",
	},
	{
		question: "Ofrecen garantia en los trabajos?",
		answer: "Si, todos los proyectos incluyen garantia y soporte post venta a excepcion del vidrio.",
	},
	{
		question: "Como puedo pedir un presupuesto?",
		answer:
			"Paso 1: escribir por WhatsApp para iniciar la solicitud. Paso 2: coordinar visita para tomar medidas exactas en el sitio. Paso 3: con esas medidas exactas se elabora y entrega el presupuesto final.",
	},
];

function buildKnowledgeContext() {
	const productLines = PRODUCT_CATALOG.map((group) => {
		const items = group.items
			.map(
				(item) =>
					`${item.name}: ${item.description} Materiales: ${item.materials.join(", ")}. Colores: ${
						Array.isArray(item.colors) && item.colors.length ? item.colors.join(", ") : "No especificados"
					}.`
			)
			.join(" ");
		return `- ${group.service}: ${items}`;
	}).join("\n");

	const productDetailLines = PRODUCT_CATALOG.map((group) => {
		const details = group.items
			.map((item) => {
				const advantages = Array.isArray(item.advantages)
					? item.advantages.map((adv) => `- ${adv}`).join(" ")
					: "- Sin ventajas especificadas.";
				return `${group.service} > ${item.name}: ${item.detailDescription || item.description} Ventajas: ${advantages}`;
			})
			.join(" ");
		return `- ${details}`;
	}).join("\n");

	const faqLines = FREQUENT_QUESTIONS.map(
		(item) => `- ${item.question} Respuesta: ${item.answer}`
	).join("\n");

	return `CATALOGO_RESUMIDO_VITRUM:\n${productLines}\n\nCATALOGO_DETALLADO_VITRUM (usar cuando pidan mas detalle):\n${productDetailLines}\n\nPREGUNTAS_FRECUENTES_VITRUM:\n${faqLines}`;
}

const SYSTEM_PROMPT =
	"Eres un asesor comercial y tecnico de la empresa Vitrum. " +
	"Vitrum se especializa en la fabricacion e instalacion de ventanas, puertas y cierres " +
	"en vidrio, acero y aluminio. " +
	"Responde siempre en espanol, de forma clara, cordial y profesional. " +
	"Usa esta base como herramienta: primero responde con catalogo resumido y, si el usuario pide detalles, usa catalogo detallado (descripcion amplia, ventajas, colores y materiales). " +
	"Tu prioridad es responder usando EXCLUSIVAMENTE la informacion del catalogo y preguntas frecuentes incluidas abajo. " +
	"Si el usuario pide presupuesto, explica siempre estos pasos: 1) contacto por WhatsApp, 2) coordinacion de visita para medir, 3) con medidas exactas se entrega presupuesto final. " +
	"Si el usuario pregunta algo fuera de esa informacion o no tienes certeza, indicalo claramente y pide que se comunique por WhatsApp: " +
	`${WHATSAPP_CONTACT}. ` +
	"Cuando falte contexto para recomendar, haz maximo 2 preguntas breves. " +
	"No inventes datos tecnicos, precios ni tiempos fuera de lo indicado.\n\n" +
	buildKnowledgeContext();

const MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct";

const DEFAULT_ALLOWED_ORIGINS = [
	"http://localhost:8888",
	"http://localhost:3000",
	"http://127.0.0.1:5500",
	"http://localhost",
	"https://vitrumgc.netlify.app",
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

	const netlifyRuntimeOrigins = [
		process.env.URL,
		process.env.DEPLOY_PRIME_URL,
		process.env.DEPLOY_URL,
	]
		.map((item) => String(item || "").trim())
		.filter(Boolean);

	if (envOrigins.length > 0) {
		return new Set([...envOrigins, ...netlifyRuntimeOrigins]);
	}

	return new Set([...DEFAULT_ALLOWED_ORIGINS, ...netlifyRuntimeOrigins]);
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
