document.addEventListener("DOMContentLoaded", () => {
	const servicesToggle = document.getElementById("servicesToggle");
	const servicesBar = document.getElementById("servicesBar");
	const topSidebar = document.getElementById("topSidebar");

	if (!servicesToggle || !servicesBar || !topSidebar) {
		return;
	}

	servicesToggle.addEventListener("click", (event) => {
		event.preventDefault();
		const isOpen = servicesBar.classList.toggle("is-open");
		topSidebar.classList.toggle("is-open", isOpen);
		servicesToggle.setAttribute("aria-expanded", String(isOpen));
		servicesBar.setAttribute("aria-hidden", String(!isOpen));
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