document.addEventListener("DOMContentLoaded", () => {
	const servicesToggle = document.getElementById("servicesToggle");
	const servicesBar = document.getElementById("servicesBar");
	const topSidebar = document.getElementById("topSidebar");
	const boton = document.querySelector('.boton-menu');
	const navMenu = document.querySelector('.top-sidebar');

	if (!servicesToggle || !servicesBar || !topSidebar) {
		return;
	}

	boton.addEventListener('click', () => {
		boton.classList.toggle('active');
		navMenu.classList.toggle("is-open");


	});

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

	const video = document.getElementById("bgVideo");
	const videoHero = document.getElementById("videoHero");
	const videoPoster = document.getElementById("videoPoster");

	if (video && videoHero && videoPoster) {
		const startVideo = () => {
			videoHero.classList.add("is-ready");
			const playPromise = video.play();
			if (playPromise && typeof playPromise.catch === "function") {
				playPromise.catch(() => {});
			}
		};

		if (video.readyState >= 3) {
			startVideo();
		} else {
			video.addEventListener("canplaythrough", startVideo, { once: true });
		}

		video.addEventListener("error", () => {
			videoHero.classList.remove("is-ready");
		});
	}
});