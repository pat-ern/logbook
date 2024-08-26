const COLUMN_ELEMENT = document.querySelector('.template');
const MENU_ITEMS = document.querySelectorAll('.menu-item');
const TOOLBAR_TITLE = document.querySelector('.toolbar-title');
const TOGGLE_BUTTON = document.getElementById('menu-toggle');
const SIDEBAR = document.querySelector('.sidebar');

// -----------------------------------------------------------------
// APP RENDERING FUNCTIONS

/**
 * Updates the text content of a header title element based on a menu item click event.
 *
 * @param {HTMLElement} toolbarTitle - The toolbar title element to update.
 * @param {HTMLElement} menuItem - The menu item element that triggered the click event.
 * @return {void}
 */
function menuClickCallBack(menuItem) {
    window.localStorage.setItem('page', menuItem.textContent);
    renderPage(menuItem.textContent);
}

/**
 * Initializes event listeners for menu items
 *
 * @return {void}
 */
function initMenuListeners() {
    MENU_ITEMS.forEach(item => {
        item.addEventListener('click', menuClickCallBack.bind(null, item));
    })
}

/**
 * Initializes the event listener for the menu toggle button.
 * 
 * @return {void}
 */
function initMenuButtonListener() {
    let sidebarVisible = false; // Estado inicial del menú lateral
    TOGGLE_BUTTON.addEventListener('click', function() {
        sidebarVisible = !sidebarVisible; // Cambiamos el estado del menú lateral
        if (sidebarVisible) {
            SIDEBAR.classList.add('hidden'); // Mostramos el menú lateral
        } else {
            SIDEBAR.classList.remove('hidden'); // Ocultamos el menú lateral
        }
    });
}

// -----------------------------------------------------------------
// BLOG RENDERING FUNCTIONS

/**
 * Renders a blog post with a title and a paragraph describing the concept of namespace pollution and how modules prevent it.
 * @return {void} This function does not return anything.
 */
function renderBlog() {
    addBlogBox();
    addTitle('Modules');
    addParagraph('Modules have also solved the issue of “namespace pollution”. What is namespace pollution you ask? This is a situation where completely unrelated code share a global variable. Sharing of global variables by unrelated code is not desired. Modules prevent this by creating a private location/space for variables.');
    addPostDate();
}

function addBlogBox() {
    const blogBox = document.createElement('div');
    blogBox.classList.add('blog-box');
    COLUMN_ELEMENT.appendChild(blogBox);
}

/**
 * Adds a title element to the column element.
 *
 * @param {string} title - The text content of the title element.
 * @return {void}
 */
function addTitle(title) {
    const blogBox = document.querySelector('.blog-box');
    const header = document.createElement('h3');
    header.classList.add('column-title');
    header.textContent = title;
    blogBox.appendChild(header);
}

/**
 * Adds a paragraph element to the column element with the given text content.
 *
 * @param {string} text - The text content of the paragraph element.
 * @return {void}
 */
function addParagraph(text) {
    const blogBox = document.querySelector('.blog-box');
    const paragraph = document.createElement('p');
    paragraph.classList.add('column-paragraph');
    paragraph.textContent = text;
    blogBox.appendChild(paragraph);
}

function addPostDate() {
    const blogBox = document.querySelector('.blog-box');
    const date = new Date();
    const dateString = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const paragraph = document.createElement('p');
    paragraph.classList.add('column-paragraph');
    paragraph.classList.add('blog-date');
    paragraph.textContent = dateString;
    blogBox.appendChild(paragraph);
}

// -----------------------------------------------------------------

function cleanPage() {
    while (COLUMN_ELEMENT.firstChild) {
        COLUMN_ELEMENT.removeChild(COLUMN_ELEMENT.firstChild);
    }
}

function renderPage(page) {
    TOOLBAR_TITLE.textContent = page;
    cleanPage();
    if (page === 'Blog') {
        renderBlog();
    }
}

function renderLastPage() {
    const lastPage = window.localStorage.getItem('page');
    if (lastPage) {
        renderPage(lastPage);
    }
}

// 

initMenuListeners();
initMenuButtonListener();
renderLastPage();