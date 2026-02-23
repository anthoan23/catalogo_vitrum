(() => {
	let revealObserver = null;

	const createObserver = () => {
		if (revealObserver) {
			return revealObserver;
		}

		if (!("IntersectionObserver" in window)) {
			return null;
		}

		revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				});
			},
			{
				threshold: 0.12,
				rootMargin: "0px 0px -10% 0px",
			}
		);

		return revealObserver;
	};

	const initScrollReveal = (root = document) => {
		const elements = root.querySelectorAll(
			"[data-reveal], .hero-content, .mostrador-header, .mostrador-card"
		);

		if (!elements.length) {
			return;
		}

		const observer = createObserver();

		elements.forEach((element, index) => {
			if (element.dataset.revealInit === "true") {
				return;
			}

			element.dataset.revealInit = "true";
			element.classList.add("reveal-on-scroll");
			element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;

			if (!observer) {
				element.classList.add("is-visible");
				return;
			}

			observer.observe(element);
		});
	};

	window.initScrollReveal = initScrollReveal;

	document.addEventListener("DOMContentLoaded", () => {
		initScrollReveal();
	});
})();
