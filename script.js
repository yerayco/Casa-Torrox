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
// --- SISTEMA DE TRADUCCIÓN ---
const translations = {
    es: {
        "btn-book": "Reservar Ahora",
        "hero-desc": "Exclusivo apartamento Solparaiso Torrox-Park, Jacuzzi, con vistas al mar, Wi-Fi y aire acondicionado",
        "btn-avail": "Consultar Disponibilidad",
        "title-alojamiento": "El alojamiento",
        "desc-alojamiento": "Exclusivo apartamento 'Solparaiso ' Jacuzzi, con vistas al mar, Wi-Fi y aire acondicionado Ubicado en Torrox-Costa, este apartamento de 51 m² acoge cómodamente hasta 4 huéspedes con 1 dormitorio, 1 salón y 1 baño. Dispondréis de una cocina privada totalmente equipada con cafetera, Wi-Fi de alta velocidad apto para videollamadas, televisión, vídeo bajo demanda, lavadora, ventilador, aire acondicionado y calefacción en toda la vivienda, además de un espacio de trabajo dedicado. El acceso interior es sin escalones y ofrece bonitas vistas al mar. Salid a vuestra terraza privada cubierta, que cuenta con jacuzzi privado. El jardín comunitario ofrece más espacio al aire libre, mientras que la piscina comunitaria y la infantil están abiertas de junio a septiembre. Disfrutad de la tranquilidad en este alojamiento luminoso y soleado, con entrada independiente tipo casita.",
        "title-servicios": "Servicios e instalaciones",
        "desc-servicios": "Cada propietario utiliza su propia zona del jardín comunitario, creando un espacio acogedor junto a la terraza cubierta donde está el jacuzzi. Podréis aparcar en la calle y el transporte público está cerca. La playa se encuentra a unos minutos en coche. Muy cerca hallaréis restaurantes, cafetería, clínica y un pequeño supermercado abierto los domingos a 50 metros. Ademas dispone de pista de tenis.La piscina comunitaria tiene su apertura el 1 de Junio hasta el 15 de septiembre. Horarios: 1 de Junio al 31 de Agosto: 11h a 21h ininterrumpidamente. 1 al 15 de Septiembre de 16h a 20h",
        "title-normas": "Normas de la casa",
        "desc-normas": "Entrada: De 15:00 a 20:00 Salida: Hasta las 11:00 No se permite fumar dentro del alojamiento. Está prohibido el uso de champús, jabones, esencias u otras sustancias en el jacuzzi, además de arrojar al inodoro papeles, compresas, toallitas húmedas u objetos similares. Se ruega respetar el descanso de los vecinos entre las 22:00 y las 8:00 h. No se permiten eventos en la propiedad. Mascotas no permitidas",
        "title-galeria": "Galería de la Propiedad"
    },
    en: {
        "btn-book": "Book Now",
        "hero-desc": "Exclusive Solparaiso Torrox-Park apartment, Jacuzzi, with sea views, Wi-Fi and air conditioning",
        "btn-avail": "Check Availability",
        "title-alojamiento": "The Accommodation",
        "desc-alojamiento": "Exclusive 'Solparaiso' apartment with Jacuzzi, sea views, Wi-Fi, and air conditioning. Located in Torrox-Costa, this 51 m² apartment comfortably accommodates up to 4 guests with 1 bedroom, 1 living room, and 1 bathroom. You will have a fully equipped private kitchen with a coffee maker, high-speed Wi-Fi suitable for video calls, TV, video on demand, washing machine, fan, air conditioning, and heating throughout the property, as well as a dedicated workspace. Step out onto your private covered terrace, which features a private jacuzzi. The communal garden offers more outdoor space, while the communal and children's pools are open from June to September. Enjoy the tranquility in this bright and sunny accommodation with an independent cottage-style entrance.",
        "title-servicios": "Services and Facilities",
        "desc-servicios": "Each owner uses their own area of the communal garden, creating a cozy space next to the covered terrace where the jacuzzi is located. You can park on the street and public transport is close by. The beach is a few minutes away by car. Nearby you will find restaurants, a café, a clinic, and a small supermarket open on Sundays 50 meters away. It also has a tennis court. The community pool is open from June 1st to September 15th. Hours: June 1st to August 31st: 11:00 to 21:00 uninterrupted. September 1st to 15th: 16:00 to 20:00.",
        "title-normas": "House Rules",
        "desc-normas": "Check-in: From 15:00 to 20:00. Check-out: Until 11:00. Smoking is not allowed inside the accommodation. The use of shampoos, soaps, essences, or other substances in the jacuzzi is prohibited, as well as throwing papers, sanitary pads, wet wipes, or similar objects into the toilet. Please respect the neighbors' rest hours between 22:00 and 8:00. Events are not allowed on the property. Pets are not allowed.",
        "title-galeria": "Property Gallery"
    },
    de: {
        "btn-book": "Jetzt Buchen",
        "hero-desc": "Exklusives Apartment Solparaiso Torrox-Park, Whirlpool, mit Meerblick, WLAN und Klimaanlage",
        "btn-avail": "Verfügbarkeit Prüfen",
        "title-alojamiento": "Die Unterkunft",
        "desc-alojamiento": "Exklusives Apartment 'Solparaiso' mit Whirlpool, Meerblick, WLAN und Klimaanlage. In Torrox-Costa gelegen, bietet diese 51 m² große Wohnung bequem Platz für bis zu 4 Gäste mit 1 Schlafzimmer, 1 Wohnzimmer und 1 Badezimmer. Sie verfügen über eine voll ausgestattete eigene Küche mit Kaffeemaschine, Highspeed-WLAN (für Videokonferenzen geeignet), Fernseher, Video-on-Demand, Waschmaschine, Ventilator, Klimaanlage und Heizung in der gesamten Unterkunft sowie einen eigenen Arbeitsplatz. Gehen Sie hinaus auf Ihre private überdachte Terrasse mit privatem Whirlpool. Der Gemeinschaftsgarten bietet zusätzlichen Platz im Freien, während der Gemeinschafts- und Kinderpool von Juni bis September geöffnet sind. Genießen Sie die Ruhe in dieser hellen und sonnigen Unterkunft mit separatem Eingang im Landhausstil.",
        "title-servicios": "Dienstleistungen & Ausstattung",
        "desc-servicios": "Jeder Eigentümer nutzt seinen eigenen Bereich des Gemeinschaftsgartens, wodurch ein gemütlicher Raum neben der überdachten Terrasse mit dem Whirlpool entsteht. Sie können an der Straße parken und öffentliche Verkehrsmittel sind in der Nähe. Der Strand ist nur wenige Autominuten entfernt. In unmittelbarer Nähe finden Sie Restaurants, ein Café, eine Klinik und einen kleinen Supermarkt, der sonntags in 50 Metern Entfernung geöffnet ist. Außerdem gibt es einen Tennisplatz. Der Gemeinschaftspool ist vom 1. Juni bis 15. September geöffnet. Öffnungszeiten: 1. Juni bis 31. August: durchgehend von 11:00 bis 21:00 Uhr. 1. bis 15. September: von 16:00 bis 20:00 Uhr.",
        "title-normas": "Hausordnung",
        "desc-normas": "Check-in: Von 15:00 bis 20:00 Uhr. Check-out: Bis 11:00 Uhr. Rauchen ist in der Unterkunft nicht gestattet. Die Verwendung von Shampoos, Seifen, Essenzen oder anderen Substanzen im Whirlpool ist verboten, ebenso wie das Werfen von Papier, Binden, Feuchttüchern oder ähnlichen Gegenständen in die Toilette. Bitte respektieren Sie die Ruhezeiten der Nachbarn zwischen 22:00 und 8:00 Uhr. Veranstaltungen auf dem Grundstück sind nicht erlaubt. Haustiere sind nicht erlaubt.",
        "title-galeria": "Galerie der Unterkunft"
    }
};

const langSelect = document.getElementById("lang-select");

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    localStorage.setItem("preferredLanguage", lang);
}

if(langSelect) {
    langSelect.addEventListener("change", (e) => changeLanguage(e.target.value));
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferredLanguage") || "es";
    if(langSelect) langSelect.value = savedLang;
    changeLanguage(savedLang);
});