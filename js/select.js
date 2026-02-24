const normalizeService = (value) => {
	if (!value) {
		return "";
	}
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim();
};

const serviceData = {
	ventanas: {
		title: "Ventanas",
		subtitle: "Soluciones en vidrio y aluminio para iluminar, proteger y mejorar cada espacio con estilo moderno y alta durabilidad.",
		image: "/catalogo_vitrum/assets/sidebar/ventana-inc.jpg",
		items: [
			{
				name: "Caroni",
				description: "Lineas modernas con alta resistencia y buen aislamiento.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
			},
			{
				name: "Ecobel",
				description: "Perfileria ligera ideal para espacios contemporaneos.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
			},
			{
				name: "Belglass",
				description: "Acabados elegantes para proyectos residenciales y comerciales.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
			},
			{
				name: "Panoramica",
				description: "Maxima visibilidad y entrada de luz natural.",
				materials: ["Aluminio"],
				colors: ["Blanco", "Gris", "Negro"],
			}
		]
	},
	"cierre-ambiente": {
		title: "Puertas cierre de ambiente",
		subtitle: "Sistemas versatiles para separar o integrar ambientes con elegancia, manteniendo luz, amplitud y control de temperatura.",
		image: "/catalogo_vitrum/assets/sidebar/cierre-inc.jpg",
		items: [
			{
				name: "Corredizas",
				description: "Apertura suave y ahorro de espacio para grandes claros.",
				materials: ["Acero inoxidable", "Aluminio"],
				colors: ["Gris", "Negro", "Blanco"],
			},
			{
				name: "Bancarias",
				description: "Paneles robustos con enfoque en seguridad y durabilidad.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
			},
			{
				name: "Acordion",
				description: "Solucion flexible para dividir o integrar ambientes.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
			}
		]
	},
	barandas: {
		title: "Baranda de vidrio",
		subtitle: "Seguridad y transparencia para escaleras y terrazas, con herrajes resistentes y acabados de alta calidad.",
		image: "/catalogo_vitrum/assets/sidebar/baranda-inc.jpg",
		items: [
			{
				name: "Escalera",
				description: "Barandas seguras con diseno limpio para interiores.",
				materials: ["Acero"],
				colors: ["Gris", "Negro"],
			},
			{
				name: "Terraza",
				description: "Proteccion exterior con vista despejada.",
				materials: ["Acero"],
				colors: ["Gris", "Negro"],
			}
		]
	},
	"puertas-bano": {
		title: "Puertas de baño",
		subtitle: "Duchas funcionales con herrajes modernos, vidrio templado y acabados premium pensados para el uso diario.",
		image: "/catalogo_vitrum/assets/sidebar/baño-inc.jpg",
		items: [
			{
				name: "Spider",
				description: "Herrajes puntuales para un look minimalista.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
			},
			{
				name: "Batiente",
				description: "Apertura tradicional con cierre firme y comodo.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
			},
			
			{
				name: "Acordion",
				description: "Paneles plegables para duchas compactas.",
				materials: ["Acero inoxidable"],
				colors: ["Gris", "Negro"],
			}
		]
	},
	comercios: {
		title: "Comercios",
		subtitle: "Elementos en vidrio para exhibicion y atencion al cliente, con soluciones pensadas para destacar tu marca.",
		image: "/catalogo_vitrum/assets/sidebar/comercio-inc.jpg",
		items: [
			{
				name: "Vitrinas",
				description: "Exhibicion clara para destacar tus productos.",
				materials: ["Acero"],
				colors: ["Gris", "Blanco", "Negro"],
			},
			{
				name: "Mostradores",
				description: "Superficies resistentes para atencion al cliente.",
				materials: ["Acero"],
				colors: ["Gris", "Blanco", "Negro"],
			}
		]
	},
	mas: {
		title: "Mas",
		subtitle: "Detalles en vidrio que elevan la decoracion y el diseno, creando ambientes mas luminosos y sofisticados.",
		image: "/catalogo_vitrum/assets/sidebar/mas-inc.jpg",
		items: [
			{
				name: "Espejos",
				description: "Disenos personalizados para hogar o comercio.",
				materials: ["LED Flexisbles"],
				colors: ["Amarillo", "Blanco", "Azul"],
			}
		]
	}
};

const serviceAliases = {
	ventana: "ventanas",
	ventanas: "ventanas",
	"cierre-ambiente": "cierre-ambiente",
	cierre: "cierre-ambiente",
	ambiente: "cierre-ambiente",
	baranda: "barandas",
	barandas: "barandas",
	"puertas-bano": "puertas-bano",
	bano: "puertas-bano",
	"puerta-bano": "puertas-bano",
	comercio: "comercios",
	comercios: "comercios",
	mas: "mas"
};

const buildCards = (serviceKey) => {
	const cardsContainer = document.getElementById("cards-container");
	const titleEl = document.getElementById("servicio-title");
	const breadcrumbCurrent = document.getElementById("breadcrumb-current");
	const subtitleEl = document.getElementById("servicio-subtitle");

	if (!cardsContainer || !titleEl) {
		return;
	}

	const data = serviceData[serviceKey];
	if (!data) {
		titleEl.textContent = "Servicio no encontrado";
		if (subtitleEl) {
			subtitleEl.textContent = "";
		}
		if (breadcrumbCurrent) {
			breadcrumbCurrent.textContent = "Servicio";
		}
		cardsContainer.innerHTML = "";
		return;
	}

	titleEl.textContent = data.title;
	if (subtitleEl) {
		subtitleEl.textContent = data.subtitle || "";
	}
	if (breadcrumbCurrent) {
		breadcrumbCurrent.textContent = data.title;
	}
	cardsContainer.innerHTML = data.items
		.map((item) => {
			const infoUrl = `/catalogo_vitrum/modules/inf.html?item=${encodeURIComponent(item.name)}`;
			const materials = Array.isArray(item.materials)
				? item.materials
				: [item.materials];
			const materialsMarkup = materials
				.filter(Boolean)
				.map((material) => `<span class="card-materials-item">${material}</span>`)
				.join("");
			const colors = Array.isArray(item.colors) ? item.colors : [];
			const colorsMarkup = colors
				.filter(Boolean)
				.map((color) => {
					const colorKey = String(color)
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.replace(/\s+/g, "-");
					return `<span class="card-color-dot color-${colorKey}" title="${color}"></span>`;
				})
				.join("");
			const colorsBadge = colorsMarkup
				? `
					<div class="card-color-badge">
						<span class="card-color-label">Color:</span>
						<div class="card-color-list">${colorsMarkup}</div>
					</div>
				`
				: "";
			return `
				<a class="service-card" href="${infoUrl}" aria-label="${data.title} - ${item.name}">
					${colorsBadge}
					<img class="card-image" src="${data.image}" alt="" aria-hidden="true">
					<div class="card-body">
						<h3 class="card-title">${item.name}</h3>
						<p class="card-desc">${item.description}</p>
						<div class="card-materials">
							<span class="card-materials-title">Materiales:</span>
							<div class="card-materials-list">${materialsMarkup}</div>
						</div>
						<span class="card-button">Ver mas</span>
					</div>
				</a>
			`;
		})
		.join("");
};

const params = new URLSearchParams(window.location.search);
const rawService = normalizeService(params.get("servicio"));
const resolvedService = serviceAliases[rawService] || "ventanas";

document.addEventListener("DOMContentLoaded", () => {
	buildCards(resolvedService);
});
