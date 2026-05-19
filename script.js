/**
 * ARCHITECT INTERACTIVE CONTROLLER - DOÑANA 316B
 * ULTRA-LIGHTWEIGHT NO DEPENDENCIES CODE
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initLightboxEngine();
    });

    /**
     * Gestión del Lightbox dinámico nativo para capturar paths con espacios
     */
    function initLightboxEngine() {
        const cards = document.querySelectorAll('.img-card');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lightbox');

        if (!lightbox || !lightboxImg) return;

        // Asignación de Listener optimizado a cada tarjeta
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const targetImg = card.querySelector('.img-zoom');
                if (targetImg && targetImg.getAttribute('src')) {
                    // Extrae el atributo nativo directo para parsear los espacios limpiamente en el DOM
                    lightboxImg.src = targetImg.getAttribute('src');
                    lightbox.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Detiene scroll de fondo
                }
            });
        });

        // Evento de Cierre por Click en control "X"
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightboxContainer);
        }

        // Cierre por Click fuera de la imagen (Background del Backdrop)
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightboxContainer();
            }
        });

        // Soporte de Accesibilidad: Cierre con Tecla Escape (ESC)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightboxContainer();
            }
        });
    }

    function closeLightboxContainer() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = ''; // Restaura el scroll nativo
        }
    }
})();