
const normalizeValue = (value) => {
	if (!value) {
		return "";
	}
	return String(value)
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim();
};

const resolveServiceKey = (rawService) => {
	const normalizedService = normalizeValue(rawService);
	if (!normalizedService || typeof serviceData !== "object") {
		return "";
	}
	if (typeof serviceAliases === "object" && serviceAliases[normalizedService]) {
		return serviceAliases[normalizedService];
	}
	if (serviceData[normalizedService]) {
		return normalizedService;
	}
	return "";
};

const findServiceByItem = (itemName, preferredServiceKey) => {
	if (!itemName || typeof serviceData !== "object") {
		return null;
	}
	const target = normalizeValue(itemName);
	if (preferredServiceKey && serviceData[preferredServiceKey]) {
		const match = serviceData[preferredServiceKey].items.find(
			(item) => normalizeValue(item.name) === target
		);
		if (match) {
			return {
				serviceKey: preferredServiceKey,
				service: serviceData[preferredServiceKey],
				item: match,
			};
		}
	}
	const entries = Object.entries(serviceData);
	for (const [serviceKey, service] of entries) {
		const match = service.items.find(
			(item) => normalizeValue(item.name) === target
		);
		if (match) {
			return {
				serviceKey,
				service,
				item: match,
			};
		}
	}
	return null;
};

const updateBreadcrumb = () => {
	const breadcrumbService = document.getElementById("breadcrumb-current");
	const breadcrumbItem = document.getElementById("breadcrumb-item");
	const infoTitle = document.getElementById("servicio-title");
	const infoSubtitle = document.getElementById("servicio-subtitle");
	if (!breadcrumbService || !breadcrumbItem) {
		return;
	}
	const params = new URLSearchParams(window.location.search);
	const rawItem = params.get("item");
	const rawService = params.get("servicio");
	const preferredServiceKey = resolveServiceKey(rawService);
	const resolved = findServiceByItem(rawItem, preferredServiceKey);

	if (!resolved) {
		breadcrumbService.textContent = "Servicio";
		breadcrumbService.setAttribute(
			"href",
			"/catalogo_vitrum/modules/select.html"
		);
		breadcrumbItem.textContent = rawItem || "Detalle";
		if (infoTitle) {
			infoTitle.textContent = rawItem || "Detalle";
		}
		if (infoSubtitle) {
			infoSubtitle.textContent = "";
		}
		return;
	}

	breadcrumbService.textContent = resolved.service.title;
	breadcrumbService.setAttribute(
		"href",
		`/catalogo_vitrum/modules/select.html?servicio=${encodeURIComponent(
			resolved.serviceKey
		)}`
	);
	breadcrumbItem.textContent = resolved.item.name;
	if (infoTitle) {
		infoTitle.textContent = resolved.item.name;
	}
	if (infoSubtitle) {
		infoSubtitle.textContent = resolved.item.description || "";
	}
};

document.addEventListener("DOMContentLoaded", updateBreadcrumb);
