document.addEventListener('DOMContentLoaded', function() {
    // Conectar las tarjetas de poster con las páginas de series
    const posterCards = document.querySelectorAll('.poster-card');
    
    posterCards.forEach(card => {
        // Convertir el título de la serie en un slug para la URL
        const titleElement = card.querySelector('.poster-title');
        if (titleElement) {
            const title = titleElement.textContent.trim();
            const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
            
            // Hacer que la tarjeta sea clickeable
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                window.location.href = `series-detalle.html?serie=${slug}`;
            });
        }
    });
    
    // Detectar la página actual para cargar datos específicos
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Si estamos en la página de detalle de serie
    if (currentPath.includes('series-detalle.html')) {
        const serie = urlParams.get('serie') || 'kamen-rider-geats';
        
        // Actualizar título y contenido basado en la serie
        document.title = `${serie.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Shadow Rangers`;
        
        // Aquí se cargarían los datos específicos de la serie desde una API o base de datos
        // Para este ejemplo, usamos datos estáticos
        
        // Actualizar la navegación activa
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Activar el enlace correspondiente a la categoría de la serie
            if (serie.includes('kamen-rider') && link.href.includes('kamen-rider.html')) {
                link.classList.add('active');
            } else if (serie.includes('super-sentai') && link.href.includes('super-sentai.html')) {
                link.classList.add('active');
            } else if (serie.includes('ultraman') && link.href.includes('ultraman.html')) {
                link.classList.add('active');
            } else if (serie.includes('metal-heroes') && link.href.includes('metal-heroes.html')) {
                link.classList.add('active');
            } else if (serie.includes('garo') && link.href.includes('garo.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Si estamos en la página de episodio
    if (currentPath.includes('episodio.html')) {
        const serie = urlParams.get('serie') || 'kamen-rider-geats';
        const episodio = urlParams.get('ep') || '1';
        
        // Actualizar el enlace de "Volver a la lista de episodios"
        const backButton = document.querySelector('.video-controls a');
        if (backButton) {
            backButton.href = `series-detalle.html?serie=${serie}`;
        }
        
        // Actualizar la navegación activa
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Activar el enlace correspondiente a la categoría de la serie
            if (serie.includes('kamen-rider') && link.href.includes('kamen-rider.html')) {
                link.classList.add('active');
            } else if (serie.includes('super-sentai') && link.href.includes('super-sentai.html')) {
                link.classList.add('active');
            } else if (serie.includes('ultraman') && link.href.includes('ultraman.html')) {
                link.classList.add('active');
            } else if (serie.includes('metal-heroes') && link.href.includes('metal-heroes.html')) {
                link.classList.add('active');
            } else if (serie.includes('garo') && link.href.includes('garo.html')) {
                link.classList.add('active');
            }
        });
    }
});