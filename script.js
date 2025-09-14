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
    },
    "blogpessoal": {
        title: "Blog Pessoal",
        description: "<b>Desafio:</b> Criar uma plataforma pessoal de escrita com layout responsivo e fácil de usar. <br><br><b>Solução:</b> Blog pessoal criado do zero, com posts em Markdown, sistema de comentários e design adaptável para qualquer dispositivo. <br><br><b>Impacto:</b> Plataforma de fácil manutenção e visualmente agradável, ideal para compartilhar conteúdo com agilidade.",
        images: [
            "https://placehold.co/600x400/1e293b/d1d5db?text=Blog+Pessoal"
        ],
        liveLink: "#"
    },
    "sistemagestao": {
        title: "Sistema de Gestão de Clientes",
        description: "<b>Desafio:</b> Oferecer uma forma mais eficiente de gerenciar clientes e rastrear vendas.<br><br><b>Solução:</b> Desenvolvemos um sistema web com dashboards interativos e relatórios de vendas. <br><br><b>Impacto:</b> Clientes podem tomar decisões baseadas em dados de forma mais ágil, melhorando a gestão do negócio.",
        images: [
            "https://placehold.co/600x400/1e293b/d1d5db?text=Sistema+Web"
        ],
        liveLink: "#"
    },
    "dashboardkpis": {
        title: "Dashboard de Acompanhamento de KPIs",
        description: "<b>Desafio:</b> Fornecer uma visão executiva clara sobre metas e funis de conversão para otimizar o tempo gasto com relatórios. <br><br><b>Solução:</b> Criação de um dashboard interativo com KPIs, funil e gráficos de metas versus resultados. <br><br><b>Impacto:</b> Redução do tempo gasto com relatórios em 35% e aumento da taxa de conversão em 22%, permitindo decisões mais rápidas.",
        images: [
            "ImagensDash/dash1.png",
            "ImagensDash/dash2.png",
            "ImagensDash/dash3.png",
            "ImagensDash/dash4.png"
        ],
        liveLink: "#"
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