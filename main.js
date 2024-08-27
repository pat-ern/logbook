// fetch a url and console log the response



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

const GITHUB_BASE = 'https://raw.githubusercontent.com/pat-ern/';
const BLOG_PATH = 'md-for-fetch/main/';
// -----------------------------------------------------------------

function fetchBlogContent(item) {
    const base = GITHUB_BASE + BLOG_PATH;
    fetch(base + item)
    .then(response => response.text())
    .then(mdContent => {

        const card = document.createElement('div');
        card.classList.add('post-card');

        const content = mdContent.split('\n\n');

        const title = content[0];
        addTitle(title, card);

        const length = content.length;
        const paragraphs = content.slice(1, length - 1);
        paragraphs.forEach(paragraph => {
            addParagraph(paragraph, card);
        })

        const date = content[length - 1];
        addPostDate(date, card);

        TEMPLATE.appendChild(card);
    })
    .catch(error => console.error('Error al obtener el archivo:', error));
}

function fetchIndex() {
    const base = GITHUB_BASE + BLOG_PATH + 'index';
    fetch(base)
    .then(response => response.text())
    .then(mdContent => {
        let index = mdContent.split('\n');
        index = index.filter(item => item !== '');
        // sort desc
        index.sort((a, b) => b.localeCompare(a));
        index.forEach(item => {
            fetchBlogContent(item);
        })
    })
    .catch(error => console.error('Error al obtener el archivo:', error));
}

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
    // {
    //     name: 'photography',
    //     icon: 'bx bx-landscape',
    //     callback: () => {
    //         defaultRenders('photography');
    //     }
    // },
    // {
    //     name: 'clips',
    //     icon: 'bx bx-video-recording',
    //     callback: () => {
    //         defaultRenders('clips');
    //     }
    // },
    // {
    //     name: 'sketchbook',
    //     icon: 'bx bx-pen',
    //     callback: () => {
    //         defaultRenders('sketchbook');
    //     }
    // },
    {
        name: 'music',
        icon: 'bx bx-music',
        callback: () => {
            renderMusic();
        }
    },
    // {
    //     name: 'comments',
    //     icon: 'bx bx-bible',	
    //     callback: () => {
    //         defaultRenders('comments');
    //     }
    // },
    // {
    //     name: 'contact',
    //     icon: 'bx bx-message-dots',
    //     callback: () => {
    //         defaultRenders('contact');
    //     }
    // }
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
    fetchIndex();
}

/**
 * Adds a title element to the column element.
 *
 * @param {string} title - The text content of the title element.
 * @return {void}
 */
function addTitle(title, card) {
    const header = document.createElement('h3');
    header.classList.add('card-title');
    header.textContent = title;
    card.appendChild(header);
}

/**
 * Adds a paragraph element to the column element with the given text content.
 *
 * @param {string} text - The text content of the paragraph element.
 * @return {void}
 */
function addParagraph(text, card) {
    const paragraph = document.createElement('p');
    paragraph.classList.add('card-paragraph');
    paragraph.textContent = text;
    card.appendChild(paragraph);
}

/**
 * Adds a paragraph element to the blog box with the current date.
 *
 * @return {void}
 */
function addPostDate(date, card) {
    const paragraph = document.createElement('p');
    paragraph.classList.add('card-footer');
    paragraph.textContent = date;
    card.appendChild(paragraph);
}

//-----------------------------------------------------------------
// MUSIC RENDERING FUNCTIONS

/**
 * Renders the music page.
 * @return {void} This function does not return anything.
 */
function renderMusic() {
    defaultRenders('music');

    // CARD
    const card = document.createElement('div');
    card.classList.add('post-card');
    
    // CARD TITLE
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = 'Sonata for Piano';
    card.appendChild(cardTitle);

    // CARD BODY
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    // AUDIO
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.autoplay = false;

    const source = document.createElement('source');
    source.src = 'assets/audio/childish-gambino-3005.mp3';
    source.type = 'audio/mpeg';
    audio.appendChild(source);

    cardBody.appendChild(audio);

    // download button
    const anchor = document.createElement('a');
    anchor.classList.add('open-element');
    anchor.href = 'assets/audio/childish-gambino-3005.mp3';
    anchor.download = 'childish-gambino-3005.mp3';

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('icon-button');
    const icon = document.createElement('i');
    icon.classList.add('bx', 'bx-window-open');
    downloadButton.appendChild(icon);
    anchor.appendChild(downloadButton);
    cardBody.appendChild(anchor);

    addPostDate('January 1, 2020', card);

    TEMPLATE.appendChild(card);

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