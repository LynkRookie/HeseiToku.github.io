document.addEventListener('DOMContentLoaded', function() {
    // Actualizar enlaces al calendario en el footer
    const calendarLinks = document.querySelectorAll('a[href="#"]');
    
    calendarLinks.forEach(link => {
        if (link.textContent.trim() === 'Calendario') {
            link.href = 'calendario.html';
        }
    });
});