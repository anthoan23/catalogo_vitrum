(function () {
	function resolveFunctionEndpoint() {
		if (window.VITRUM_CHAT_ENDPOINT && typeof window.VITRUM_CHAT_ENDPOINT === "string") {
			return window.VITRUM_CHAT_ENDPOINT;
		}

		const hostname = (window.location && window.location.hostname) || "";
		const isNetlifyHost = hostname.includes("netlify.app") || hostname.includes("netlify.live");

		if (isNetlifyHost) {
			return "/.netlify/functions/procesar";
		}

		return "http://localhost:8888/.netlify/functions/procesar";
	}

	const FUNCTION_ENDPOINT = resolveFunctionEndpoint();
	const MAX_HISTORY_MESSAGES = 12;

	function createChatMarkup() {
		return `
<section class="vitrum-chat is-hidden" id="vitrumChat" aria-label="Asistente IA Vitrum">
	<header class="vitrum-chat__header">
		<h3 class="vitrum-chat__title">Asistente IA Vitrum</h3>
		<button class="vitrum-chat__close" id="vitrumChatClose" type="button" aria-label="Cerrar chat">×</button>
	</header>
	<div class="vitrum-chat__messages" id="vitrumChatMessages"></div>
	<form class="vitrum-chat__form" id="vitrumChatForm">
		<input class="vitrum-chat__input" id="vitrumChatInput" type="text" placeholder="Escribe tu mensaje..." autocomplete="off">
		<button class="vitrum-chat__send" type="submit">Enviar</button>
	</form>
</section>`;
	}

	async function sendMessageToAI(userMessage, history) {
		const response = await fetch(FUNCTION_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: userMessage,
				history: history,
			}),
		});

		const data = await response.json().catch(function () {
			return {};
		});

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("No se encontró la función del chat (404). Ejecuta Netlify en local con 'netlify dev' o despliega el sitio en Netlify.");
			}
			throw new Error(data.error || "No se pudo obtener respuesta del asistente.");
		}

		if (!data.reply || typeof data.reply !== "string") {
			throw new Error("La respuesta del asistente no es valida.");
		}

		return data.reply.trim();
	}

	function appendBubble(container, text, type) {
		const bubble = document.createElement("div");
		bubble.className = `vitrum-chat__bubble vitrum-chat__bubble--${type}`;
		bubble.textContent = text;
		container.appendChild(bubble);
		container.scrollTop = container.scrollHeight;
		return bubble;
	}

	function initVitrumChat() {
		if (document.getElementById("vitrumChat")) {
			return;
		}

		document.body.insertAdjacentHTML("beforeend", createChatMarkup());

		const chat = document.getElementById("vitrumChat");
		const closeButton = document.getElementById("vitrumChatClose");
		const form = document.getElementById("vitrumChatForm");
		const input = document.getElementById("vitrumChatInput");
		const messages = document.getElementById("vitrumChatMessages");
		const conversation = [];

		const openChat = function () {
			chat.classList.remove("is-hidden");
			if (!messages.childElementCount) {
				appendBubble(messages, "Hola, soy tu Asistente IA Vitrum. ¿Como te ayudo?", "bot");
			}
			input.focus();
		};

		const bindTrigger = function (trigger) {
			if (!trigger || trigger.dataset.chatBound === "true") {
				return;
			}

			trigger.dataset.chatBound = "true";
			trigger.addEventListener("click", function (event) {
				event.preventDefault();
				openChat();
			});
		};

		const bindAllTriggers = function (root) {
			const scope = root || document;
			const triggers = scope.querySelectorAll(".IA");
			triggers.forEach(bindTrigger);
		};

		const closeChat = function () {
			chat.classList.add("is-hidden");
		};

		closeButton.addEventListener("click", closeChat);

		form.addEventListener("submit", async function (event) {
			event.preventDefault();
			const userMessage = input.value.trim();
			if (!userMessage) {
				return;
			}

			appendBubble(messages, userMessage, "user");
			conversation.push({ role: "user", content: userMessage });
			if (conversation.length > MAX_HISTORY_MESSAGES) {
				conversation.splice(0, conversation.length - MAX_HISTORY_MESSAGES);
			}

			input.value = "";
			input.disabled = true;
			const sendButton = form.querySelector("button[type='submit']");
			if (sendButton) {
				sendButton.disabled = true;
			}

			const thinkingBubble = appendBubble(messages, "Escribiendo...", "bot");

			try {
				const assistantReply = await sendMessageToAI(userMessage, conversation);
				thinkingBubble.textContent = assistantReply || "No recibi respuesta en este momento.";
				conversation.push({ role: "assistant", content: thinkingBubble.textContent });
				if (conversation.length > MAX_HISTORY_MESSAGES) {
					conversation.splice(0, conversation.length - MAX_HISTORY_MESSAGES);
				}
			} catch (error) {
				thinkingBubble.textContent = (error && error.message) || "No pude responder ahora. Intenta nuevamente en unos segundos.";
			}

			messages.scrollTop = messages.scrollHeight;
			input.disabled = false;
			if (sendButton) {
				sendButton.disabled = false;
			}
			input.focus();
		});

		document.addEventListener("click", function (event) {
			const trigger = event.target.closest(".IA");
			if (!trigger) {
				return;
			}
			event.preventDefault();
			openChat();
		});

		bindAllTriggers(document);

		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				mutation.addedNodes.forEach(function (node) {
					if (!(node instanceof Element)) {
						return;
					}

					if (node.matches && node.matches(".IA")) {
						bindTrigger(node);
						return;
					}

					if (node.querySelectorAll) {
						bindAllTriggers(node);
					}
				});
			});
		});

		observer.observe(document.body, { childList: true, subtree: true });
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initVitrumChat);
		return;
	}

	initVitrumChat();
})();
