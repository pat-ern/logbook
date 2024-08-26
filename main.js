// -----------------------------------------------------------------
// GLOBAL VARIABLES
const MY_NAME = 'Patricio V.';

const THEME_KEY = 'theme';
const PAGE_KEY = 'page';

const DARK_THEME = 'dark';
const MOON_ICON = 'bx-moon';
const LIGHT_THEME = 'light';
const SUN_ICON = 'bx-sun';

const TEMPLATE = document.querySelector('.template');

// SIDEBAR AND MENU
const SIDEBAR = document.querySelector('.sidebar');
const MENU_LIST = document.querySelector('.menu-list');
const MENU_ITEMS = document.querySelectorAll('.menu-item');

// TOOLBAR
const MENU_BUTTON = document.getElementById('menu-toggle');
const TOOLBAR_TITLE = document.querySelector('.toolbar-title');
const THEME_BUTTON = document.getElementById('theme-toggle');
const THEME_ICON = THEME_BUTTON.querySelector('i');

// -----------------------------------------------------------------

/**
 * Menu items array.
 */
const MENU = [
    {
        name: 'blog',
        icon: 'bx bx-notepad',
        callback: () => {
            renderBlog();
        }
    },
    {
        name: 'photography',
        icon: 'bx bx-landscape',
        callback: () => {
            defaultRenders('photography');	
        }
    },
    {
        name: 'clips',
        icon: 'bx bx-video-recording',
        callback: () => {
            defaultRenders('clips');
        }
    },
    {
        name: 'sketchbook',
        icon: 'bx bx-pen',
        callback: () => {
            defaultRenders('sketchbook');
        }
    },
    {
        name: 'music',
        icon: 'bx bx-music',
        callback: () => {
            defaultRenders('music');
        }
    },
    {
        name: 'comments',
        icon: 'bx bx-bible',	
        callback: () => {
            defaultRenders('comments');
        }
    },
    {
        name: 'contact',
        icon: 'bx bx-message-dots',
        callback: () => {
            defaultRenders('contact');
        }
    }
]

// -----------------------------------------------------------------
// INITIALIZATION FUNCTIONS

function setAppTitle(title) {
    const APP_TITLE = document.getElementsByTagName('title')[0];
    let pageTitle;
    if (title) {
        pageTitle = `${title.charAt(0).toUpperCase() + title.slice(1)} | ${MY_NAME}`;
    } else {
        pageTitle = MY_NAME;
    }
    APP_TITLE.textContent = pageTitle;
}

/**
 * Initializes the menu by creating and appending list items to the menu list.
 * Each list item is associated with a callback function that is triggered on click.
 *
 * @return {void}
 */
function initMenu() {
    MENU.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');
        menuItem.setAttribute('draggable', 'false');
        menuItem.innerHTML = `<i class='${item.icon}'></i> ${item.name}`;
        MENU_LIST.appendChild(menuItem);
        menuItem.addEventListener('click', item.callback);
    })
}

/**
 * Initializes the event listener for the menu toggle button.
 * 
 * @return {void}
 */
function initMenuButtonListener() {
    let sidebarVisible = false; // Estado inicial del menú lateral
    MENU_BUTTON.addEventListener('click', function() {
        sidebarVisible = !sidebarVisible; // Cambiamos el estado del menú lateral
        if (sidebarVisible) {
            SIDEBAR.classList.add('hidden'); // Mostramos el menú lateral
        } else {
            SIDEBAR.classList.remove('hidden'); // Ocultamos el menú lateral
        }
    });
}

function updateIcon(theme) {
    if (theme === 'light') {
        THEME_ICON.classList.remove(MOON_ICON);
        THEME_ICON.classList.add(SUN_ICON);
    } else {
        THEME_ICON.classList.remove(SUN_ICON);
        THEME_ICON.classList.add(MOON_ICON);
    }
}

// -----------------------------------------------------------------
// THEME FUNCTIONS

function applyTheme(theme) {
    updateIcon(theme);
    window.localStorage.setItem(THEME_KEY, theme);
    const THEME_LINK = document.getElementById('theme-link');
    THEME_LINK.href = `assets/themes/${theme}-theme.css`;
}

function loadTheme() {
    const CURRENT_THEME = window.localStorage.getItem(THEME_KEY);
    if (CURRENT_THEME) {
        applyTheme(CURRENT_THEME);
    } else {
        applyTheme(DARK_THEME);
    }
}

function toggleTheme() {
    let theme = window.localStorage.getItem(THEME_KEY);
    theme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    applyTheme(theme);
}

/**
 * Initializes the event listener for the theme toggle button.
 * 
 * @return {void}
 */
function initThemeButtonListener() {
    THEME_BUTTON.addEventListener('click', toggleTheme);
}

// -----------------------------------------------------------------
// BLOG RENDERING FUNCTIONS

/**
 * Renders a blog post with a title and a paragraph describing the concept of namespace pollution and how modules prevent it.
 * @return {void} This function does not return anything.
 */
function renderBlog() {
    defaultRenders('blog');
    addBlogBox();
    addTitle('Modules');
    addParagraph('Modules have also solved the issue of “namespace pollution”. What is namespace pollution you ask? This is a situation where completely unrelated code share a global variable. Sharing of global variables by unrelated code is not desired. Modules prevent this by creating a private location/space for variables.');
    addPostDate();
}

/**
 * Creates a new div element with the class 'blog-box' and appends it to the TEMPLATE element.
 *
 * @return {void}
 */
function addBlogBox() {
    const blogBox = document.createElement('div');
    blogBox.classList.add('blog-box');
    TEMPLATE.appendChild(blogBox);
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

/**
 * Adds a paragraph element to the blog box with the current date.
 *
 * @return {void}
 */
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
// GENERIC PAGE RENDERING FUNCTIONS

/**
 * Removes all child nodes from the `TEMPLATE` element.
 *
 * @return {void}
 */
function cleanPage() {
    while (TEMPLATE.firstChild) {
        TEMPLATE.removeChild(TEMPLATE.firstChild);
    }
}

/**
 * Sets the default render state for the given page.
 *
 * @param {string} page - The name of the page to render.
 * @return {void}
 */
function defaultRenders(page) {
    setAppTitle(page);
    TOOLBAR_TITLE.textContent = page;
    cleanPage();
    window.localStorage.setItem(PAGE_KEY, page);
}

/**
 * Renders the last page based on the stored page name in local storage.
 *
 * @return {void}
 */
function renderLastPage() {
    const lastPage = window.localStorage.getItem(PAGE_KEY);
    if (lastPage) {
        MENU.forEach(item => {
            if (item.name === lastPage) {
                item.callback();
            }
        })
    } else {
        MENU[0].callback();
    }
}

// MAIN FUNCTION AND EXECUTION

initMenu();
initMenuButtonListener();
renderLastPage();
loadTheme();
initThemeButtonListener();