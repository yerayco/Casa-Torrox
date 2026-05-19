/**
 * SYSTEM CONTROLLER DOÑANA 316B - REPARADO
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        inicializarRedireccionAirbnb();
        inicializarEventosGaleria();
    });

    // Redirección inteligente al detectar el botón
    function inicializarRedireccionAirbnb() {
        // Busca elementos que contengan la clase o el texto del botón
        const botones = document.querySelectorAll('.btn-disponibilidad, button, a');
        
        botones.forEach(boton => {
            const texto = boton.textContent.trim().toLowerCase();
            if (texto === 'consultar disponibilidad' || texto === 'reservar ahora') {
                // Modificamos el href directamente si es un enlace
                if (boton.tagName === 'A') {
                    boton.setAttribute('href', 'https://airbnb.com/h/solparaiso-torrox-park');
                    boton.setAttribute('target', '_blank');
                    boton.setAttribute('rel', 'noopener noreferrer');
                } else {
                    // Si es un <button>, añadimos evento click
                    boton.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.open('https://airbnb.com/h/solparaiso-torrox-park', '_blank');
                    });
                }
            }
        });
    }

    // Control del Lightbox para las fotos
    function inicializarEventosGaleria() {
        const cards = document.querySelectorAll('.img-card');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lightbox');

        if (!lightbox || !lightboxImg) return;

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const imgNode = card.querySelector('img');
                if (imgNode && imgNode.src) {
                    lightboxImg.src = imgNode.src;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
            }
        });
    }
})();