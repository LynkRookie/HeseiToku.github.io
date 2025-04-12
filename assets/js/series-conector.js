// Código específico para la página de episodio
document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const serie = 'kamen-rider-gavv'; // Fijamos la serie correcta
    
    // Actualizar título de la página si no está ya establecido correctamente
    if (!document.title.includes('Gavv')) {
        const episodioNum = document.querySelector('.episode-number-badge').textContent.replace('Episodio ', '');
        document.title = `Kamen Rider Gavv - Episodio ${episodioNum} - HeseiToku`;
    }
    
    // NO modificamos los elementos que ya están correctamente definidos en el HTML
    // como el número de episodio en el badge o el título del episodio
    
    // Configurar botones de navegación
    const prevEpisodeButton = document.getElementById('prev-episode');
    const nextEpisodeButton = document.getElementById('next-episode');
    
    if (prevEpisodeButton && nextEpisodeButton) {
        // Los botones de navegación ya están configurados correctamente en el HTML
        // con enlaces directos a los archivos HTML específicos
        // No necesitamos modificarlos dinámicamente
    }
    
    // NO modificamos los enlaces de episodios relacionados
    // ya que están configurados manualmente en el HTML
    
    // Actualizar el año actual en el footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});