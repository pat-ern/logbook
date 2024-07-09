// Obtenemos referencias a los elementos relevantes del DOM
const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.querySelector('.sidebar');

let sidebarVisible = false; // Estado inicial del menú lateral

// Escuchamos el evento click en el botón
toggleButton.addEventListener('click', function() {
    sidebarVisible = !sidebarVisible; // Cambiamos el estado del menú lateral
    
    if (sidebarVisible) {
        sidebar.classList.add('show'); // Mostramos el menú lateral
    } else {
        sidebar.classList.remove('show'); // Ocultamos el menú lateral
    }
});