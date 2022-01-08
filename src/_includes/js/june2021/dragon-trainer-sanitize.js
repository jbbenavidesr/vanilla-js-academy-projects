//
//  Variables
//

// Global variables
let articles, authors;

// endpoint URLs
const endpoint_articles = "https://vanillajsacademy.com/api/dragons.json";
const endpoint_authors = "https://vanillajsacademy.com/api/dragons-authors.json";

// Dom elements
const app = document.querySelector('[data-app="wrapper"]');
const home = document.querySelector('[data-app="home"]');
const archive = document.querySelector('[data-app="article-list"]');
const articleDetailContainer = document.querySelector('[data-section="articleDetail"]');
const authorList = document.querySelector('[data-section="authorList"]');

//
// Functions
//

// Helper functions
/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
 function sanitizeHTML (str) {
	return str.replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, function (c) {
		return `&#${c.charCodeAt(0)};`;
	});
}


// Templates
let templates = {
    article: function ({title, author, url, pubdate, article, dateObj}) {
        return `
        <article id="${url.replace('&35;', '')}">
            <header>
                <h3>${title}</h3>
                <p><b>By:</b> ${author}</p>
            </header>
            <p>${article}</p>
            <footer>
                <time datetime="${dateObj.toISOString()}">${pubdate}</time>
            </footer> 
        </article>
        `;
    },
    articlePreview: function ({title, author, url, pubdate, article, dateObj}) {
        return `
        <article>
            <h3><a href="${url}" data-action="openArticle">${title}</a></h3>
            <p><b>By:</b> ${author}</p>
            <time datetime="${dateObj.toISOString()}">${pubdate}</time>
        </article>
        `;
    },
    authorInfo: function ({author, bio}) {
        return `
        <article>
            <h3>${author}</h3>
            <p>${bio}</p>
        </article>
        `
    }
}




// Functions
/**
 * Sanitize the response. It expects the especific structure for this excercise' response.
 * @param {Array} data array of objects with response data. Every element is assumed to be a String
 * @return {Array} sanitized response
 */
let sanitizeData = function (data) {
    return data.map(function (item) {
        Object.keys(item).forEach(function (key){
            item[key] = sanitizeHTML(item[key]);
        })
        return item
    })
}

/**
 * Fetch data from API and store it sanitized in global variables.
 */
let fetchData = async function () {
    try {
        let responses = await Promise.all([
            fetch(endpoint_articles),
            fetch(endpoint_authors)
        ]);

        for (response of responses) {
            if (! response.ok) throw response.status;
        }

        let data = await Promise.all(responses.map(function(response) {
            return response.json();
        }));

        articles = sanitizeData(data[0].articles);
        authors = sanitizeData(data[1].authors);
        articles.forEach(function(article){
            article.pubdate = article.pubdate.replace('&#44;', ',');
            article['dateObj'] = new Date(article.pubdate);
            article.url = article.url.replace('&#35;', '#')
        })

        articles.sort(function (a, b){
            return a.dateObj - b.dateObj;
        });

    } catch (error) {
        app.innerHTML = "It seems that our dragon failed to find his way here, we have no articles to show at the moment.";
        console.warn(error);
    }
}

/**
 * Rendering functions for diferent sections.
 */
let render = {
    featuredList: function(domElement){
        let featured = articles.filter(function(article){
            return article.title.includes('Feature&#58;')
        });

        

        domElement.innerHTML = featured.map(function(article) {
            let articleCopy = {...article};
            articleCopy.title = articleCopy.title.replace('Feature&#58;', '')
            return templates.article(articleCopy);
        }).join('');

    },

    recentList: function (domElement) {
        domElement.innerHTML = articles.slice(0,5).map(function(article) {
            return `<li><a href="${article.url}" data-action="openArticle">${article.title}</a></article>`;
        }).join('');
    },

    articleList: function (domElement) {
        domElement.innerHTML = articles.map(function(article) {
            return `<li>${templates.articlePreview(article)}</li>`;
        }).join('')
    },
    
    home: function () {
        app.className = "home";
        let sections = home.querySelectorAll('[data-section]');
        for (section of sections) {
            render[section.getAttribute('data-section')](section);
        }
    },
    
    archive: function() {
        app.className = "archive";
        let sections = archive.querySelectorAll('[data-section]');
        for (section of sections) {
            render[section.getAttribute('data-section')](section);
        }
    },

    articleDetail: function(article) {
        app.className = "article-detail";
        let currentAuthor = authors.find(function (author){
            return author.author === article.author;
        });
        articleDetailContainer.innerHTML = templates.article(article) + templates.authorInfo(currentAuthor);
    },

    authors: function () {
        app.className = "authors";
        authorList.innerHTML = authors.map(function(author) {
            return `<li>${templates.authorInfo(author)}</li>`;
        }).join('');
    }
};

/** 
 * Object with click handlers for different links.
 */
let handlers = {
    nav: function(event) {
        let targetPage = event.target.getAttribute('href').replace('#', '');
        if (!render[targetPage]) return;
        render[targetPage]();
    },
    openArticle: function (event) {
        let targetURL = event.target.getAttribute('href');
        let targetArticle = articles.find(function(article){
            return article.url === targetURL;
        });
        render.articleDetail(targetArticle);
    }
}

let clickHandler = function (event) {
    let action = event.target.getAttribute('data-action');
    if (!action || !handlers[action]) return;

    handlers[action](event);
}

let init = async function () {
    await fetchData();
    render.home();
}

//
// Listeners and Initializers
//
init();

document.addEventListener('click', clickHandler);