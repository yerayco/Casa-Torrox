(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Control de clicks en las imágenes de la galería
        const tarjetas = document.querySelectorAll('.img-card');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lightbox');

        if (lightbox && lightboxImg) {
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
    });
})();