(() => {
	const ALLOWED_MODULES = new Set([
		"comunes/sidebar.html",
		"modules/inicio1.html",
		"modules/mostrador.html",
		"modules/inicio2.html",
		"modules/cinta.html",
		"modules/preguntas.html",
		"modules/contac.html",
		"modules/footer.html",
	]);

	const BLOCKED_TAGS = new Set(["SCRIPT", "IFRAME", "OBJECT", "EMBED"]);
	const URL_ATTRS = new Set(["href", "src", "xlink:href", "formaction"]);

	function sanitizeFragment(html) {
		const template = document.createElement("template");
		template.innerHTML = String(html || "");

		const nodes = template.content.querySelectorAll("*");
		nodes.forEach((node) => {
			if (BLOCKED_TAGS.has(node.tagName)) {
				node.remove();
				return;
			}

			for (const attr of Array.from(node.attributes)) {
				const name = attr.name.toLowerCase();
				const value = String(attr.value || "").trim();

				if (name.startsWith("on")) {
					node.removeAttribute(attr.name);
					continue;
				}

				if (URL_ATTRS.has(name) && /^javascript:/i.test(value)) {
					node.removeAttribute(attr.name);
				}
			}
		});

		return template.content.cloneNode(true);
	}

	async function loadModule(config) {
		if (!config || !ALLOWED_MODULES.has(config.url)) {
			throw new Error(`Ruta de módulo no permitida: ${config?.url || "desconocida"}`);
		}

		const container = document.getElementById(config.containerId);
		if (!container) {
			throw new Error(`Contenedor no encontrado: ${config.containerId}`);
		}

		const response = await fetch(config.url, { method: "GET", credentials: "same-origin" });
		if (!response.ok) {
			throw new Error(`Error HTTP ${response.status} al cargar ${config.url}`);
		}

		const html = await response.text();
		container.replaceChildren(sanitizeFragment(html));

		if (typeof config.onLoad === "function") {
			config.onLoad(container);
		}
	}

	function initHomeModules() {
		const modules = [
			{
				url: "comunes/sidebar.html",
				containerId: "sidebar-container",
				onLoad: () => {
					if (window.initSidebar) {
						window.initSidebar();
					}
				},
			},
			{
				url: "modules/inicio1.html",
				containerId: "inicio1-container",
				onLoad: (container) => {
					if (window.initScrollReveal) {
						window.initScrollReveal(container);
					}
				},
			},
			{
				url: "modules/mostrador.html",
				containerId: "mostrador-container",
				onLoad: (container) => {
					if (window.initScrollReveal) {
						window.initScrollReveal(container);
					}
				},
			},
			{
				url: "modules/inicio2.html",
				containerId: "inicio2-container",
				onLoad: (container) => {
					if (window.initScrollReveal) {
						window.initScrollReveal(container);
					}
				},
			},
			{
				url: "modules/cinta.html",
				containerId: "cinta-container",
			},
			{
				url: "modules/preguntas.html",
				containerId: "preguntas-container",
				onLoad: () => {
					if (window.initPreguntas) {
						window.initPreguntas();
					}
				},
			},
			{
				url: "modules/contac.html",
				containerId: "contac-container",
				onLoad: (container) => {
					if (window.initScrollReveal) {
						window.initScrollReveal(container);
					}
				},
			},
			{
				url: "modules/footer.html",
				containerId: "footer-container",
			},
		];

		modules.forEach((moduleConfig) => {
			loadModule(moduleConfig).catch((error) => {
				console.error(`Error cargando ${moduleConfig.url}:`, error);
			});
		});
	}

	document.addEventListener("DOMContentLoaded", initHomeModules);
})();
