const initSidebar = () => {
	const servicesToggle = document.getElementById("servicesToggle");
	const servicesBar = document.getElementById("servicesBar");
	const topSidebar = document.getElementById("topSidebar");

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

	servicesToggle.addEventListener("click", (event) => {
		event.preventDefault();
		const isOpen = servicesBar.classList.toggle("is-open");
		topSidebar.classList.toggle("is-open", isOpen);
		servicesToggle.setAttribute("aria-expanded", String(isOpen));
		servicesBar.setAttribute("aria-hidden", String(!isOpen));
	});

	document.addEventListener("click", (event) => {
		if (!servicesBar.classList.contains("is-open")) {
			return;
		}
		if (topSidebar.contains(event.target)) {
			return;
		}
		closeServicesBar();
	});
};

window.initSidebar = initSidebar;

document.addEventListener("DOMContentLoaded", initSidebar);