const initPreguntas = () => {
	const faqSection = document.querySelector(".faq");
	if (!faqSection) {
		return;
	}

	if (faqSection.dataset.faqInit === "true") {
		return;
	}
	faqSection.dataset.faqInit = "true";

	const items = faqSection.querySelectorAll(".faq-item");

	items.forEach((item) => {
		const button = item.querySelector(".faq-question");
		const answer = item.querySelector(".faq-answer");

		if (!button || !answer) {
			return;
		}

		button.addEventListener("click", () => {
			const isOpen = item.classList.toggle("is-open");
			button.setAttribute("aria-expanded", String(isOpen));
			answer.setAttribute("aria-hidden", String(!isOpen));

			if (isOpen) {
				answer.style.maxHeight = `${answer.scrollHeight}px`;
			} else {
				answer.style.maxHeight = "0px";
			}
		});
	});
};

window.initPreguntas = initPreguntas;

document.addEventListener("DOMContentLoaded", initPreguntas);
