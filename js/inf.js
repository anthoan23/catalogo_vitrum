
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

const galleryByServiceItem = {
	"ventanas|caroni": [
		"/catalogo_vitrum/assets/select/caroni/82630d15-b5c3-4aec-9e1f-92232ba743fa.jpeg",
		"/catalogo_vitrum/assets/select/caroni/caroni-2.jpeg",
		"/catalogo_vitrum/assets/select/caroni/caroni-1.jpeg",
	],
	"ventanas|ecobel": [
		"/catalogo_vitrum/assets/select/ecobel/ecobel-1.jpg",
		"/catalogo_vitrum/assets/select/ecobel/ecobel3.jpg",
		"/catalogo_vitrum/assets/select/ecobel/ecobel2.jpg",
	],
	"ventanas|belglass": [
		"/catalogo_vitrum/assets/select/belglass/belglass.jpg",
		"/catalogo_vitrum/assets/select/belglass/des.jpg",
		"/catalogo_vitrum/assets/select/belglass/download.jpg",
	],
	"ventanas|panoramica": [
		"/catalogo_vitrum/assets/select/panoramica/panoramica1.jpg",
		"/catalogo_vitrum/assets/select/panoramica/panoramica2.jpg",
		"/catalogo_vitrum/assets/select/panoramica/Lateral-2-Canales-A2949-1000x1000.jpg",
	],
	"cierre-ambiente|corredizas": [
		"/catalogo_vitrum/assets/select/corredizas-a/dfa5bae3-d986-4313-b259-858672a67525.jpeg",
		"/catalogo_vitrum/assets/select/corredizas-a/2f3fbdf1-bd11-43c1-b6c3-e25f86a0e4b5.jpeg",
		"/catalogo_vitrum/assets/select/corredizas-a/e02d93a8-9f5a-4048-acce-725463576035.jpeg",
	],
	"cierre-ambiente|bancarias": [
		"/catalogo_vitrum/assets/select/bancarias/bancaria2.jpeg",
		"/catalogo_vitrum/assets/select/bancarias/bancaria1.jpeg",
		"/catalogo_vitrum/assets/select/bancarias/bancaria3.jpg",
	],
	"cierre-ambiente|acordion": [
		"/catalogo_vitrum/assets/select/acordion-a/acordion1.jpeg",
		"/catalogo_vitrum/assets/select/acordion-a/WhatsApp Image 2026-02-05 at 2.27.38 PM (1).jpeg",
		"/catalogo_vitrum/assets/select/acordion-a/WhatsApp Image 2026-02-05 at 2.27.38 PM.jpeg",
	],
	"barandas|escalera": [
		"/catalogo_vitrum/assets/select/escalera/escalera-1.jpeg",
		"/catalogo_vitrum/assets/select/escalera/79ba6980-8441-46d3-a813-e36e239b7570.jpeg",
		"/catalogo_vitrum/assets/select/escalera/e82a7234-18ff-40a8-a56d-a9237fba79d8.jpeg",
	],
	"barandas|terraza": [
		"/catalogo_vitrum/assets/select/terraza/terraza1.jpeg",
		"/catalogo_vitrum/assets/select/terraza/terraza-1.jpeg",
		"/catalogo_vitrum/assets/select/terraza/611fdc7b-fdea-45be-b42d-0d1df7ea6ba5.jpeg",
	],
	"puertas-bano|spider": [
		"/catalogo_vitrum/assets/select/spider/4b237c94-9368-46f7-900e-1fab0a9aeae9.jpeg",
		"/catalogo_vitrum/assets/select/spider/spider3.jpeg",
		"/catalogo_vitrum/assets/select/spider/spider.jpeg",
	],
	"puertas-bano|batiente": [
		"/catalogo_vitrum/assets/select/batiente/batiente.jpeg",
		"/catalogo_vitrum/assets/select/batiente/WhatsApp Image 2026-02-05 at 2.26.23 PM (1).jpeg",
		"/catalogo_vitrum/assets/select/batiente/WhatsApp Image 2026-02-05 at 2.26.24 PM.jpeg",
	],
	"puertas-bano|acordion": [
		"/catalogo_vitrum/assets/select/acordion-b/acordion1.jpeg",
		"/catalogo_vitrum/assets/select/acordion-b/acordion.jpeg",
		"/catalogo_vitrum/assets/select/acordion-b/acordion1.jpeg",
	],
	"comercios|vitrinas": [
		"/catalogo_vitrum/assets/select/vitrinas/34ea444a-c2a9-47e6-af2d-3b1db96e3cb6.jpeg",
		"/catalogo_vitrum/assets/select/vitrinas/4d7cea79-6e4f-4b42-95c9-e1281953a5ce.jpeg",
		"/catalogo_vitrum/assets/select/vitrinas/WhatsApp Image 2026-02-05 at 2.26.50 PM.jpeg",
	],
	"comercios|mostradores": [
		"/catalogo_vitrum/assets/select/mostradores/mostrador.jpeg",
		"/catalogo_vitrum/assets/select/mostradores/c6b50bb7-703c-45e7-a2f4-1214c3bef697.jpeg",
		"/catalogo_vitrum/assets/select/mostradores/WhatsApp Image 2026-02-05 at 2.20.08 PM.jpeg",
	],
	"mas|espejos": [
		"/catalogo_vitrum/assets/select/espejos/e9cee32c-9c6a-4d8a-805c-5baca69052cf.jpeg",
		"/catalogo_vitrum/assets/select/espejos/7d753116-b551-4de7-acd8-ef83f563db67.jpeg",
		"/catalogo_vitrum/assets/select/espejos/espejo.jpeg",
	],
	"mas|puertas de celosia": [
		"/catalogo_vitrum/assets/select/puertas-celosia/6b1441db-5c17-4085-9c45-e61ce6115fdc.jpeg",
		"/catalogo_vitrum/assets/select/puertas-celosia/54ef6d53-b223-41a5-bea9-a2eb933c75c3.jpeg",
		"/catalogo_vitrum/assets/select/puertas-celosia/79cbd6a4-30f6-4790-8f03-d0e101698713.jpeg",
	],
};

const detailByServiceItem = {
	"ventanas|caroni": {
		description:
			"El sistema Caroni combina perfilería robusta con líneas modernas para lograr una ventana elegante, funcional y de larga vida útil en hogares y comercios.",
		advantages: [
			"Excelente aislamiento frente a ruido exterior y cambios de temperatura.",
			"Perfilería resistente con buen desempeño en uso continuo.",
			"Diseño versátil que se adapta a fachadas modernas y clásicas.",
			"Mantenimiento rápido con limpieza simple de vidrio y perfiles.",
		],
	},
	"ventanas|ecobel": {
		description:
			"Ecobel ofrece un perfil liviano y contemporáneo, ideal para proyectos que buscan iluminación natural, estética limpia y una operación cómoda en el día a día.",
		advantages: [
			"Aprovecha mejor la entrada de luz en espacios interiores.",
			"Deslizamiento suave y apertura práctica en diferentes ambientes.",
			"Acabado moderno con apariencia minimalista.",
			"Buena durabilidad frente al uso residencial frecuente.",
		],
	},
	"ventanas|belglass": {
		description:
			"Belglass está pensado para proyectos que requieren una presentación elegante, cuidando la calidad visual del vidrio y la firmeza estructural del sistema.",
		advantages: [
			"Imagen premium para viviendas y espacios comerciales.",
			"Estructura estable que brinda sensación de seguridad.",
			"Buena compatibilidad con distintos tonos de perfilería.",
			"Fácil integración con estilos de diseño interior.",
		],
	},
	"ventanas|panoramica": {
		description:
			"La línea Panorámica prioriza las visuales abiertas y la amplitud del espacio, permitiendo una conexión más limpia entre interior y exterior.",
		advantages: [
			"Mayor campo visual y sensación de espacio amplio.",
			"Aporta iluminación natural durante más horas del día.",
			"Diseño ideal para áreas sociales y fachadas destacadas.",
			"Combinación equilibrada entre estética y funcionalidad.",
		],
	},
	"cierre-ambiente|corredizas": {
		description:
			"Las corredizas para cierre de ambiente permiten abrir grandes claros con deslizamiento suave y un acabado sobrio para espacios amplios.",
		advantages: [
			"Ahorro de espacio al no requerir giro de hojas.",
			"Deslizamiento fluido para aperturas amplias.",
			"Mantiene la entrada de luz con separacion elegante.",
			"Ideal para integrar o dividir areas segun necesidad.",
		],
	},
	"cierre-ambiente|bancarias": {
		description:
			"Los sistemas bancarios priorizan la seguridad y la resistencia, con paneles firmes pensados para zonas de alto flujo.",
		advantages: [
			"Mayor robustez para espacios con uso intensivo.",
			"Perfiles fuertes que soportan golpes y movimiento.",
			"Aporta control visual manteniendo transparencia.",
			"Fácil mantenimiento en zonas comerciales.",
		],
	},
	"cierre-ambiente|acordion": {
		description:
			"El sistema acordeon ofrece flexibilidad para abrir o cerrar espacios rapidamente, con un plegado compacto y funcional.",
		advantages: [
			"Plegado compacto para optimizar el espacio.",
			"Permite abrir o cerrar ambientes en segundos.",
			"Aprovecha mejor la luz natural.",
			"Ideal para espacios multiuso.",
		],
	},
	"barandas|escalera": {
		description:
			"Barandas de escalera con vidrio y herrajes firmes para brindar seguridad sin perder ligereza visual.",
		advantages: [
			"Mejora la seguridad en desniveles interiores.",
			"Diseño limpio que no bloquea la vista.",
			"Herrajes resistentes para uso diario.",
			"Aporta un look moderno y elegante.",
		],
	},
	"barandas|terraza": {
		description:
			"Barandas para terraza pensadas para exteriores, con vidrio templado y fijaciones que garantizan estabilidad y transparencia.",
		advantages: [
			"Proteccion segura en espacios abiertos.",
			"Resistencia a la intemperie y al uso exterior.",
			"Permite disfrutar la vista sin obstrucciones.",
			"Acabado sobrio que combina con fachadas.",
		],
	},
	"puertas-bano|spider": {
		description:
			"El sistema Spider utiliza herrajes puntuales para un resultado minimalista, con vidrio templado de alta calidad.",
		advantages: [
			"Look limpio con herrajes discretos.",
			"Apertura estable con fijaciones puntuales.",
			"Vidrio templado para mayor seguridad.",
			"Facil limpieza en zonas de ducha.",
		],
	},
	"puertas-bano|batiente": {
		description:
			"La puerta batiente ofrece apertura tradicional con cierre firme, ideal para duchas que requieren acceso directo.",
		advantages: [
			"Apertura amplia y comoda.",
			"Cierre firme para reducir salpicaduras.",
			"Herrajes resistentes a la humedad.",
			"Facil mantenimiento y limpieza diaria.",
		],
	},
	"puertas-bano|acordion": {
		description:
			"Puerta acordeon para banos compactos, con paneles plegables que optimizan el espacio sin perder funcionalidad.",
		advantages: [
			"Ideal para espacios reducidos.",
			"Plegado sencillo para una apertura rapida.",
			"Reduce salpicaduras en el area de ducha.",
			"Solucion practica y economica.",
		],
	},
	"comercios|vitrinas": {
		description:
			"Vitrinas en vidrio para exhibir productos con claridad, resaltando la mercancia y cuidando la seguridad.",
		advantages: [
			"Mayor visibilidad para los productos.",
			"Estructura estable para uso comercial.",
			"Imagen profesional en puntos de venta.",
			"Facil limpieza para mantener la presentacion.",
		],
	},
	"comercios|mostradores": {
		description:
			"Mostradores en vidrio con superficies resistentes pensadas para atencion al cliente y exhibicion ordenada.",
		advantages: [
			"Superficie firme para el uso diario.",
			"Mejora la atencion y la organizacion.",
			"Acabado moderno que realza la marca.",
			"Facil mantenimiento en areas de trabajo.",
		],
	},
	"mas|espejos": {
		description:
			"Espejos a medida con acabados limpios para ampliar visualmente los espacios y mejorar la iluminacion.",
		advantages: [
			"Amplia visualmente el ambiente.",
			"Aporta mayor luminosidad interior.",
			"Cortes y medidas segun el proyecto.",
			"Facil limpieza y mantenimiento.",
		],
	},
	"mas|puertas de celosia": {
		description:
			"Puertas de celosia con diseño decorativo para dar privacidad y ventilacion sin perder estilo.",
		advantages: [
			"Permite ventilacion controlada.",
			"Aporta privacidad con diseno atractivo.",
			"Ligera y funcional para interiores.",
			"Combina bien con estilos clasicos o modernos.",
		],
	},
};

const detailImageByServiceItem = {
	"ventanas|caroni": "/catalogo_vitrum/assets/select/caroni/caroni1.png",
	"ventanas|ecobel": "/catalogo_vitrum/assets/select/ecobel/ecobel.png",
	"ventanas|belglass": "/catalogo_vitrum/assets/select/belglass/beglass1.jpg",
	"ventanas|panoramica": "/catalogo_vitrum/assets/select/panoramica/panoramica2.jpg",
	"cierre-ambiente|corredizas": "/catalogo_vitrum/assets/select/corredizas-a/5af1c677-2807-4a93-8365-4e743fcecbee.jpeg",
	"cierre-ambiente|bancarias": "/catalogo_vitrum/assets/select/bancarias/bancaria3.jpeg",
	"cierre-ambiente|acordion": "/catalogo_vitrum/assets/select/acordion-a/acordion2.jpeg",
	"barandas|escalera": "/catalogo_vitrum/assets/select/escalera/escalera-2.jpeg",
	"barandas|terraza": "/catalogo_vitrum/assets/select/terraza/terraza-2.jpeg",
	"puertas-bano|spider": "/catalogo_vitrum/assets/select/spider/spider-1.jpeg",
	"puertas-bano|batiente": "/catalogo_vitrum/assets/select/batiente/batiente-1.jpeg",
	"puertas-bano|acordion": "/catalogo_vitrum/assets/select/acordion-b/acordion.jpeg",
	"comercios|vitrinas": "/catalogo_vitrum/assets/select/vitrinas/vitrina.jpeg",
	"comercios|mostradores": "/catalogo_vitrum/assets/select/mostradores/mostrador.jpeg",
	"mas|espejos": "/catalogo_vitrum/assets/select/espejos/espejo-1.jpeg",
	"mas|puertas de celosia": "/catalogo_vitrum/assets/select/puertas-celosia/puerta-1.jpeg",
};

const getGalleryImages = (resolved) => {
	const fallback = resolved?.item?.image
		? [resolved.item.image]
		: [
			"/catalogo_vitrum/assets/logo1.png",
		];

	if (!resolved?.serviceKey || !resolved?.item?.name) {
		return fallback;
	}

	const lookupKey = `${resolved.serviceKey}|${normalizeValue(resolved.item.name)}`;
	const images = galleryByServiceItem[lookupKey];

	if (!Array.isArray(images) || images.length === 0) {
		return fallback;
	}

	const prepared = images.slice(0, 3).filter(Boolean);
	if (prepared.length === 0) {
		return fallback;
	}
	return prepared;
};

const setActiveThumb = (activeIndex) => {
	const buttons = document.querySelectorAll(".inf-thumb-btn");
	buttons.forEach((button, index) => {
		const isActive = index === activeIndex;
		button.classList.toggle("is-active", isActive);
		button.setAttribute("aria-pressed", isActive ? "true" : "false");
	});
};

const bindThumbnailSwap = (mainImage, thumbImages) => {
	const buttons = document.querySelectorAll(".inf-thumb-btn");
	if (!buttons.length || !mainImage || thumbImages.length === 0) {
		return;
	}

	buttons.forEach((button, index) => {
		button.onclick = () => {
			const nextImage = thumbImages[index].src;
			const nextAlt = thumbImages[index].alt;
			mainImage.src = nextImage;
			mainImage.alt = nextAlt.replace("Miniatura", "Imagen principal");
			setActiveThumb(index);
		};
	});
};

const updateProductDetail = (resolved) => {
	const titleElement = document.getElementById("product-detail-title");
	const textElement = document.getElementById("product-detail-text");
	const advantagesList = document.getElementById("product-advantages");
	const detailImage = document.getElementById("product-detail-image");
	if (!titleElement || !textElement || !advantagesList) {
		return;
	}

	const itemName = resolved?.item?.name || "Producto";
	titleElement.textContent = `${itemName}: detalle del sistema`;

	const lookupKey = resolved?.serviceKey && resolved?.item?.name
		? `${resolved.serviceKey}|${normalizeValue(resolved.item.name)}`
		: "";
	const customDetail = lookupKey ? detailByServiceItem[lookupKey] : null;
	const detailImageSrc = lookupKey ? detailImageByServiceItem[lookupKey] : "";

	const materials = Array.isArray(resolved?.item?.materials)
		? resolved.item.materials.filter(Boolean)
		: [];
	const colors = Array.isArray(resolved?.item?.colors)
		? resolved.item.colors.filter(Boolean)
		: [];

	const baseDescription = customDetail?.description
		|| resolved?.item?.description
		|| "Sistema en vidrio diseñado para ofrecer funcionalidad, estética y resistencia en aplicaciones residenciales o comerciales.";

	const materialText = materials.length ? ` Está fabricado con ${materials.join(", ")}.` : "";
	const colorText = colors.length ? ` Disponible en tonos como ${colors.join(", ")}.` : "";
	textElement.textContent = `${baseDescription}${materialText}${colorText}`;

	const serviceKey = resolved?.serviceKey || "";
	const serviceBenefit = {
		ventanas: "Mejora la ventilación y el confort en interiores.",
		"cierre-ambiente": "Ayuda a separar ambientes manteniendo la entrada de luz.",
		barandas: "Aporta seguridad sin perder transparencia.",
		"puertas-bano": "Optimiza el espacio en baños con herrajes confiables.",
		comercios: "Realza la exhibición y la atención al cliente.",
		mas: "Complementa la decoración con un acabado elegante.",
	};

	const generatedAdvantages = [
		serviceBenefit[serviceKey] || "Aporta funcionalidad y estilo en el espacio.",
		materials.length
			? `Construido con ${materials.join(", ")} para mayor durabilidad.`
			: "Integra materiales duraderos para un rendimiento confiable.",
		colors.length
			? `Variedad de acabados en ${colors.join(", ")} para combinar con tu proyecto.`
			: "Disponible en acabados que combinan con distintos estilos.",
		resolved?.item?.description
			? `Diseñado para ${resolved.item.description.toLowerCase()}.`
			: "Facilita la limpieza y reduce el mantenimiento diario.",
	];

	const advantages = Array.isArray(customDetail?.advantages) && customDetail.advantages.length
		? customDetail.advantages
		: generatedAdvantages;

	advantagesList.innerHTML = advantages
		.map((advantage) => `<li>${advantage}</li>`)
		.join("");

	if (detailImage) {
		const fallbackImage = resolved?.item?.image || "/catalogo_vitrum/assets/logo1.png";
		detailImage.src = detailImageSrc || fallbackImage;
		detailImage.alt = `Imagen adicional de ${itemName}`;
	}
};

const updateGallery = (resolved) => {
	const mainImage = document.getElementById("gallery-main");
	const thumb1 = document.getElementById("gallery-thumb-1");
	const thumb2 = document.getElementById("gallery-thumb-2");
	const thumb3 = document.getElementById("gallery-thumb-3");

	if (!mainImage || !thumb1 || !thumb2 || !thumb3) {
		return;
	}

	const images = getGalleryImages(resolved);
	const itemName = resolved?.item?.name || "servicio";

	const thumbs = [thumb1, thumb2, thumb3];
	const thumbButtons = document.querySelectorAll(".inf-thumb-btn");

	thumbs.forEach((thumb, index) => {
		const imageSrc = images[index];
		const button = thumbButtons[index];
		if (!button) {
			return;
		}
		if (imageSrc) {
			thumb.src = imageSrc;
			thumb.alt = `Miniatura ${index + 1} de ${itemName}`;
			button.style.display = "";
		} else {
			button.style.display = "none";
		}
	});

	if (images.length > 0) {
		mainImage.src = images[0];
		mainImage.alt = `Imagen principal de ${itemName}`;
		bindThumbnailSwap(mainImage, thumbs.slice(0, images.length));
		setActiveThumb(0);
	}
	updateProductDetail(resolved);
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
		updateGallery(null);
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
	updateGallery(resolved);
};

document.addEventListener("DOMContentLoaded", updateBreadcrumb);
