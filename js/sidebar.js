const initSidebar = () => {
	const servicesToggle = document.getElementById("servicesToggle");
	const servicesBar = document.getElementById("servicesBar");
	const topSidebar = document.getElementById("topSidebar");
	const menuButton = document.querySelector(".boton-menu");

	if (!servicesToggle || !servicesBar || !topSidebar) {
		return;
	}

	if (topSidebar.dataset.sidebarInit === "true") {
		return;
	}
	topSidebar.dataset.sidebarInit = "true";

	const closeServicesBar = () => {
		if (!servicesBar.classList.contains("is-open")) {
			return;
		}
		servicesBar.classList.remove("is-open");
		topSidebar.classList.remove("is-open");
		servicesToggle.setAttribute("aria-expanded", "false");
		servicesBar.setAttribute("aria-hidden", "true");
	};

	const closeMenuButton = () => {
		if (!menuButton || !menuButton.classList.contains("active")) {
			return;
		}
		menuButton.classList.remove("active");
		topSidebar.classList.remove("menu-open");
	};

	servicesToggle.addEventListener("click", (event) => {
		event.preventDefault();
		const isOpen = servicesBar.classList.toggle("is-open");
		topSidebar.classList.toggle("is-open", isOpen);
		servicesToggle.setAttribute("aria-expanded", String(isOpen));
		servicesBar.setAttribute("aria-hidden", String(!isOpen));
	});

	if (menuButton) {
		menuButton.addEventListener("click", () => {
			const isActive = menuButton.classList.toggle("active");
			topSidebar.classList.toggle("menu-open", isActive);
			if (!isActive) {
				closeServicesBar();
			}
		});
	}

	document.addEventListener("click", (event) => {
		if (topSidebar.contains(event.target)) {
			return;
		}
		closeServicesBar();
		closeMenuButton();
	});
};

window.initSidebar = initSidebar;

document.addEventListener("DOMContentLoaded", initSidebar);