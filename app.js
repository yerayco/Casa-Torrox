(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        inicializarNavegacionAirbnb();
        configurarLightboxGaleria();
    });

    // Asegura que todos los botones de disponibilidad manden a Airbnb
    function inicializarNavegacionAirbnb() {
        const clicksAirbnb = document.querySelectorAll('.btn-disponibilidad, .btn-nav');
        clicksAirbnb.forEach(enlace => {
            enlace.setAttribute('href', 'https://airbnb.com/h/solparaiso-torrox-park');
            enlace.setAttribute('target', '_blank');
            enlace.setAttribute('rel', 'noopener noreferrer');
        });
    }

    // Control dinámico de apertura de imágenes
    function configurarLightboxGaleria() {
        const tarjetas = document.querySelectorAll('.img-card');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lightbox');

        if (!lightbox || !lightboxImg) return;

        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                const imagen = tarjeta.querySelector('img');
                if (imagen && imagen.src) {
                    lightboxImg.src = imagen.src;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.add('hidden');
        });
    }
})();