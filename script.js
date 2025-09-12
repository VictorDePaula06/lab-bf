
// Form submission handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formMessage.classList.remove('hidden');
    contactForm.reset();
});

// Carrossel de Imagens e Modal
const projectModal = document.getElementById("projectModal");
const modalContent = document.getElementById("modal-content-container");
const closeModalBtn = document.querySelector(".close");

const projects = {
    "adocique": {
        title: "Adociquê - Site de Páscoa",
        description: "Este projeto é um site de e-commerce estático desenvolvido para a Adociquê, uma loja de doces focada em produtos de Páscoa. O site apresenta o menu de produtos, promoções e permite que os clientes montem seu pedido através de um carrinho de compras, finalizando a compra via WhatsApp.<br><br><b>Tecnologias:</b> HTML5, CSS3, JavaScript (Vanilla JS), Font Awesome, Google Analytics.",
        images: [
            "ImagensAdocique/ado1.jpeg",
            "ImagensAdocique/ado2.jpeg",
            "ImagensAdocique/ado3.jpeg",
            "ImagensAdocique/ado4.png"
        ],
        liveLink: "https://github.com/SeuUsuario/NomeDoRepositorio.git"
    }
};

let currentSlide = 0;

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    modalContent.innerHTML = `
        <h3 class="text-2xl font-bold text-white mb-2 text-center">${project.title}</h3>
        <p class="text-gray-400 text-sm mb-4 text-center">${project.description}</p>

        <div class="carousel-container">
            <div class="carousel-slides" style="transform: translateX(0);">
                ${project.images.map(imgSrc => `
                            <div class="carousel-slide">
                                <img src="${imgSrc}" alt="Imagem do projeto ${project.title}">
                            </div>
                        `).join('')}
            </div>
            <button class="carousel-prev">&#10094;</button>
            <button class="carousel-next">&#10095;</button>
        </div>

        <div class="text-center mt-4">
            <a href="${project.liveLink}" target="_blank" class="btn-primary inline-block text-sm py-2 px-4">Ver Projeto Online</a>
        </div>
        `;

    projectModal.style.display = "flex";
    setupCarousel();
}

function setupCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselSlides = document.querySelector('.carousel-slides');
    const totalSlides = slides.length;
    currentSlide = 0;

    const updateCarousel = () => {
        const offset = -currentSlide * 100;
        carouselSlides.style.transform = `translateX(${offset}%)`;
    };

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
        updateCarousel();
    });
}

closeModalBtn.addEventListener('click', () => {
    projectModal.style.display = "none";
});

window.onclick = function (event) {
    if (event.target == projectModal) {
        projectModal.style.display = "none";
    }
};
