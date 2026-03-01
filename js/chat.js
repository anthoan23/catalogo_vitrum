(function () {
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

	function getQuickResponse(message) {
		const text = message.toLowerCase();

		if (text.includes("precio") || text.includes("costo")) {
			return "Podemos ayudarte con un presupuesto rapido. Indica medidas aproximadas y tipo de servicio.";
		}

		if (text.includes("horario") || text.includes("atencion")) {
			return "Nuestro equipo te responde por WhatsApp e Instagram. Si quieres, te comparto el acceso directo.";
		}

		if (text.includes("instalacion") || text.includes("instalar")) {
			return "Si, realizamos instalacion completa y soporte para cada proyecto.";
		}

		return "Gracias por tu mensaje. Te orientamos en vidrio, aluminio y acero inoxidable para tu proyecto.";
	}

	function appendBubble(container, text, type) {
		const bubble = document.createElement("div");
		bubble.className = `vitrum-chat__bubble vitrum-chat__bubble--${type}`;
		bubble.textContent = text;
		container.appendChild(bubble);
		container.scrollTop = container.scrollHeight;
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

		form.addEventListener("submit", function (event) {
			event.preventDefault();
			const userMessage = input.value.trim();
			if (!userMessage) {
				return;
			}

			appendBubble(messages, userMessage, "user");
			input.value = "";

			setTimeout(function () {
				appendBubble(messages, getQuickResponse(userMessage), "bot");
			}, 350);
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
