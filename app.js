/**
 * ARCHITECT CORE - SYSTEM CONTROLLER DOÑANA 316B
 * Level: 1% Elite Senior Developer
 */

(function () {
    'use strict';

    // KEYS DE CONFIGURACIÓN INTEGRADA (Modificar una sola vez aquí)
    const SECURITY_CONFIG = {
        EMAILJS_KEY: "TU_PUBLIC_KEY_DE_EMAILJS", 
        SERVICE_ID: "TU_SERVICE_ID",             
        TEMPLATE_ID: "TU_TEMPLATE_ID"            
    };

    let flatpickrContext = null;
    let selectedRange = [];

    // Captura inicial tras carga de estructura
    document.addEventListener('DOMContentLoaded', () => {
        inicializarComponentes();
        enlazarManejadoresEventos();
    });

    function inicializarComponentes() {
        // Inicializar pasarela de e-mails
        if (typeof emailjs !== 'undefined' && SECURITY_CONFIG.EMAILJS_KEY !== "TU_PUBLIC_KEY_DE_EMAILJS") {
            emailjs.init(SECURITY_CONFIG.EMAILJS_KEY);
        }

        // Obtener el pool de días deshabilitados de la DB local
        const diasBloqueados = syncDatabase();

        // Montaje Defensivo del Calendario
        const targetInput = document.getElementById('calendario-inline');
        if (targetInput) {
            flatpickrContext = flatpickr(targetInput, {
                inline: true,
                mode: "range",
                locale: "es",
                minDate: "today",
                dateFormat: "Y-m-d",
                disable: diasBloqueados,
                onChange: (selectedDates) => {
                    const badge = document.getElementById('fechas-badge');
                    if (selectedDates.length === 2) {
                        selectedRange = selectedDates;
                        const inStr = selectedDates[0].toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                        const outStr = selectedDates[1].toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                        badge.innerText = `📆 Entrada: ${inStr} → Salida: ${outStr}`;
                    } else {
                        selectedRange = [];
                        badge.innerText = "⚠️ Selecciona entrada y salida en el calendario";
                    }
                }
            });
        }
    }

    function enlazarManejadoresEventos() {
        // Formulario Seguro (Manejador de envío)
        const bookingForm = document.getElementById('form-reserva');
        if (bookingForm) {
            bookingForm.addEventListener('submit', transaccionMaestraHandler);
        }

        // Capturador del Visor de Fotos (Lightbox dinámico anti-ataques DOM)
        const cards = document.querySelectorAll('.img-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const imgNode = card.querySelector('img');
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                if (imgNode && lightbox && lightboxImg) {
                    lightboxImg.src = imgNode.src;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        // Eventos de Cierre del Lightbox
        const closeBtn = document.getElementById('close-lightbox');
        const lightboxBackground = document.getElementById('lightbox');
        if (closeBtn) closeBtn.addEventListener('click', cerrarModalFiltro);
        if (lightboxBackground) lightboxBackground.addEventListener('click', cerrarModalFiltro);
    }

    function syncDatabase() {
        try {
            const cache = localStorage.getItem('donana_v4_blocked');
            return cache ? JSON.parse(cache) : [];
        } catch (err) {
            console.error("Storage Corrupto:", err);
            return [];
        }
    }

    function procesarMapeoFechas(inicio, fin) {
        let arr = [];
        let actual = new Date(inicio);
        const limite = new Date(fin);
        while (actual <= limite) {
            arr.push(new Date(actual).toISOString().split('T')[0]);
            actual.setDate(actual.getDate() + 1);
        }
        return arr;
    }

    async function transaccionMaestraHandler(event) {
        event.preventDefault();

        if (selectedRange.length < 2) {
            alert("Error: Es obligatorio marcar Check-In y Check-Out en el calendario.");
            return;
        }

        const submitBtn = document.getElementById('btn-pagar');
        submitBtn.innerText = "Redirigiendo a pasarela segura...";
        submitBtn.disabled = true;

        // Formateo estricto de Strings de Datos
        const checkInIso = selectedRange[0].toISOString().split('T')[0];
        const checkOutIso = selectedRange[1].toISOString().split('T')[0];
        const valNombre = document.getElementById('nombre').value.replace(/<\/?[^>]+(>|$)/g, "");
        const valEmail = document.getElementById('email').value;
        const valTel = document.getElementById('telefono').value;

        // 1. EJECUTAR BLOQUEO INMEDIATO EN LA ARQUITECTURA DE CLIENTE
        let poolBase = syncDatabase();
        const nuevosBloqueos = procesarMapeoFechas(selectedRange[0], selectedRange[1]);
        poolBase = poolBase.concat(nuevosBloqueos);

        localStorage.setItem('donana_v4_blocked', JSON.stringify(poolBase));
        if (flatpickrContext) flatpickrContext.set('disable', poolBase);

        // 2. DISPARO BACK-GROUND DE EMAILS AUTOMÁTICOS
        if (SECURITY_CONFIG.EMAILJS_KEY !== "TU_PUBLIC_KEY_DE_EMAILJS") {
            const plantillaDatos = {
                nombre_cliente: valNombre,
                email_cliente: valEmail,
                telefono_cliente: valTel,
                fecha_entrada: checkInIso,
                fecha_salida: checkOutIso,
                propiedad: "Módulo Doñana 316B - Torrox Park"
            };
            emailjs.send(SECURITY_CONFIG.SERVICE_ID, SECURITY_CONFIG.TEMPLATE_ID, plantillaDatos)
                .catch(e => console.log("Retraso en e-mail gateway secundario.", e));
        }

        // 3. REDIRECCIÓN PREMIUM TRANSPARENTE EN PASARELA
        // Tu pasarela externa capturará los parámetros limpios de la URL de inmediato
        const stringParametros = `?checkout=success&propiedad=Donana316B&huesped=${encodeURIComponent(valNombre)}&mail=${encodeURIComponent(valEmail)}&movil=${encodeURIComponent(valTel)}&entrada=${checkInIso}&salida=${checkOutIso}`;
        const destinoPasarela = `about:blank${stringParametros}`;

        alert("¡Fechas retenidas y bloqueadas con éxito! Redirigiendo a la pantalla de pago...");
        
        // Redirección definitiva
        window.location.href = destinoPasarela;
    }

    function cerrarModalFiltro() {
        const lb = document.getElementById('lightbox');
        if (lb) lb.classList.add('hidden');
    }
})();