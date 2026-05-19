/**
 * SYSTEM CONTROLLER DOÑANA 316B (EDICIÓN ULTRA-SIMPLIFICADA)
 */

(function () {
    'use strict';

    // Captura inicial tras carga del DOM
    document.addEventListener('DOMContentLoaded', () => {
        inicializarEventosGaleria();
        inicializarRedireccionAirbnb();
    });

    // 1. MANEJADOR SEGURO DE REDIRECCIÓN A AIRBNB
    function inicializarRedireccionAirbnb() {
        // Selecciona todos los botones o enlaces de la página
        const elementosInteractivos = document.querySelectorAll('button, a');
        
        elementosInteractivos.forEach(elemento => {
            // Si el texto coincide exactamente con tu botón de la captura
            if (elemento.textContent.trim().toLowerCase() === 'consultar disponibilidad') {
                elemento.addEventListener('click', (event) => {
                    event.preventDefault(); // Detiene cualquier acción nativa secundaria
                    window.open('https://airbnb.com/h/solparaiso-torrox-park', '_blank');
                });
            }
        });
    }

    // 2. CAPTURADOR Y GESTOR DEL VISOR DE FOTOS (LIGHTBOX)
    function inicializarEventosGaleria() {
        const cards = document.querySelectorAll('.img-card');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lightbox');

        // Verificar la existencia de nodos críticos en el DOM antes de asignar eventos
        if (!lightbox || !lightboxImg) return;

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const imgNode = card.querySelector('img');
                if (imgNode) {
                    lightboxImg.src = imgNode.src;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        // Evento para cerrar haciendo click en la "X"
        if (closeBtn) {
            closeBtn.addEventListener('click', cerrarModalLightbox);
        }

        // Evento para cerrar haciendo click en el fondo oscuro difuminado
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                cerrarModalLightbox();
            }
        });
    }

    function cerrarModalLightbox() {
        const lb = document.getElementById('lightbox');
        if (lb) {
            lb.classList.add('hidden');
        }
    }
})();