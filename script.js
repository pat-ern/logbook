// Obtenemos referencias a los elementos relevantes del DOM
const toggleButton = document.getElementById('menu-toggle');
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

// seteo de titulo de la pagina
const menuItems = document.querySelectorAll('.menu-item');
const headerTitle = document.querySelector('.header-title');

menuItems.forEach(item => {
    console.log(item);	
    item.addEventListener('click', () => {
        menuItems.forEach(item => item.classList.remove('active'));
        // set header title with menu item title text
        headerTitle.textContent = item.textContent;
    });
})

headerTitle.textContent = menuItems[0].textContent;

// click on blog title
