// Chat Widget Functionality
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// Toggle chat visibility
chatToggle.addEventListener('click', () => {
    chatBox.classList.add('active');
    chatToggle.style.display = 'none';
    chatInput.focus();
});

chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
    chatToggle.style.display = 'flex';
});

// Send message on button click
chatSend.addEventListener('click', sendMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Display user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
        hideTypingIndicator();
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messagePara = document.createElement('p');
    messagePara.textContent = text;
    
    messageDiv.appendChild(messagePara);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// AI Response Function (Knowledge Base)
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Services questions
    if (lowerMessage.includes('servicio') || lowerMessage.includes('servicios') || lowerMessage.includes('qué hacen')) {
        return 'Ofrecemos remodelación de cocinas, baños, espacios completos e instalación de vidrios. ¿Sobre cuál te gustaría saber más?';
    }
    
    if (lowerMessage.includes('cocina')) {
        return 'Nuestro servicio de remodelación de cocinas incluye diseño personalizado, instalación de muebles premium, encimeras de granito y electrodomésticos. Precios desde $15,000. ¿Te gustaría más información?';
    }
    
    if (lowerMessage.includes('baño')) {
        return 'Remodelamos baños completos con mamparas de vidrio templado, grifería de lujo, pisos porcelanato y acabados elegantes. Precios desde $10,000. ¿Necesitas un presupuesto?';
    }
    
    if (lowerMessage.includes('vidrio') || lowerMessage.includes('mampara')) {
        return 'Instalamos mamparas de baño en vidrio templado desde $2,800, ventanas y divisiones. Todos nuestros vidrios son de alta calidad y seguridad.';
    }

    // Pricing questions
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuánto')) {
        return 'Nuestros precios varían según el proyecto. Cocinas desde $15,000, baños desde $10,000, mamparas desde $2,800. ¿Te gustaría un presupuesto personalizado?';
    }
    
    if (lowerMessage.includes('presupuesto') || lowerMessage.includes('cotización')) {
        return 'Con gusto te envío un presupuesto personalizado. Por favor comparte tus datos en la sección de contacto o llámanos al +52 55 1234 5678.';
    }

    // Time and process questions
    if (lowerMessage.includes('tiempo') || lowerMessage.includes('duración') || lowerMessage.includes('cuánto tarda')) {
        return 'El tiempo varía según el proyecto: cocinas 2-4 semanas, baños 1-3 semanas, instalación de mamparas 1-3 días. Te damos un cronograma detallado al inicio.';
    }
    
    if (lowerMessage.includes('proceso') || lowerMessage.includes('cómo funciona')) {
        return 'Nuestro proceso: 1) Consulta inicial gratuita 2) Diseño y presupuesto 3) Aprobación 4) Compra de materiales 5) Instalación 6) Inspección final. ¡Muy simple!';
    }

    // Materials questions
    if (lowerMessage.includes('material') || lowerMessage.includes('materiales')) {
        return 'Trabajamos con materiales de primera calidad: granito, porcelanato, vidrio templado, madera, laminados premium y accesorios de marcas reconocidas.';
    }
    
    if (lowerMessage.includes('granito') || lowerMessage.includes('encimera')) {
        return 'Nuestras encimeras de granito son resistentes y elegantes, disponibles en múltiples colores. Precio desde $3,500. ¿Te interesa ver muestras?';
    }

    // Warranty and quality
    if (lowerMessage.includes('garantía')) {
        return 'Todos nuestros trabajos incluyen garantía de 1 año en instalación y según fabricante en materiales. Respaldamos la calidad de nuestro trabajo.';
    }

    // Contact information
    if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('email') || lowerMessage.includes('dirección')) {
        return 'Contáctanos: 📞 +52 55 1234 5678 | 📧 contacto@vitrum.com | 📍 Ciudad de México. También puedes llenar el formulario de contacto.';
    }
    
    if (lowerMessage.includes('horario') || lowerMessage.includes('atención')) {
        return 'Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 hrs y sábados de 9:00 a 14:00 hrs.';
    }

    // Location questions
    if (lowerMessage.includes('dónde') || lowerMessage.includes('ubicación') || lowerMessage.includes('zona')) {
        return 'Estamos ubicados en Ciudad de México y atendemos toda la zona metropolitana. ¿En qué área necesitas el servicio?';
    }

    // Payment questions
    if (lowerMessage.includes('pago') || lowerMessage.includes('forma de pago') || lowerMessage.includes('financiamiento')) {
        return 'Aceptamos efectivo, transferencia y tarjetas. Ofrecemos planes de financiamiento a meses sin intereses. ¡Pregunta por nuestras promociones!';
    }

    // Catalog questions
    if (lowerMessage.includes('catálogo') || lowerMessage.includes('productos')) {
        return 'Puedes ver nuestro catálogo completo en esta página. Tenemos muebles de cocina, encimeras, mamparas, grifería, pisos e iluminación. ¿Algo específico que busques?';
    }

    // General greetings
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
        return '¡Hola! Bienvenido a Vitrum. ¿En qué puedo ayudarte hoy? Puedo responder sobre nuestros servicios, precios, materiales y más.';
    }
    
    if (lowerMessage.includes('gracias')) {
        return '¡De nada! Es un placer ayudarte. Si tienes más preguntas, aquí estoy. 😊';
    }
    
    if (lowerMessage.includes('adiós') || lowerMessage.includes('bye')) {
        return '¡Hasta pronto! No dudes en contactarnos cuando necesites. ¡Que tengas un excelente día! 👋';
    }

    // Default response
    return 'Gracias por tu pregunta. Puedo ayudarte con información sobre nuestros servicios de remodelación (cocinas, baños), precios, materiales, tiempos de entrega y más. ¿Sobre qué te gustaría saber?';
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    });
}
