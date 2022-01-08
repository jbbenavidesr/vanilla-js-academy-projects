// 
// Variables
//

// endpoint URLs
const endpoint_articles = "https://vanillajsacademy.com/api/dragons.json";
const endpoint_authors = "https://vanillajsacademy.com/api/dragons-authors.json";

// DOM Elements
const app = document.querySelector('[data-app]');

//
// Functions
//

// helpers
/**
 * Returns a date Value in ISO format
 */
function w3Date(value) {
    let dateObject = new Date(value);
    return dateObject.toISOString();
};

// Templates
/**
 * Template of an article element, if given, it includes the Bio of the author.
 */
function articleTemplate({title, author, article, url, pubdate}, authorBio) {
    return `
    <article>
        <h3><a href="${url}">${title}</a></h3>
        <time datetime="${w3Date(pubdate)}">${pubdate}</time>
        <section>
            <p>${article}</p>
        </section>
        <footer>
            <p><strong>Written by:</strong> ${author}</p>
            ${authorBio ? `<p>${authorBio}</p>` : ''}
        </footer>
    </article>
    `;
};

// Render functions
/**
 * Renders the list of articles and looks for the bio of the author in each article.
 */
function renderArticleList (articles, authors) {
    app.innerHTML = articles.map(function(article) {
        authorBio = authors.find(function(author) {
            return author.author === article.author
        })?.bio;
        return articleTemplate(article, authorBio);
    }).join('');
};

// Fetch
/**
 * Fetch articles ans author info from the dragon trainer monthly API
 */
function getArticles() {
    Promise.all([
        fetch(endpoint_articles),
        fetch(endpoint_authors)
    ]).then(function(responses) {
        for (response of responses) {
            if (!response.ok) throw response.status;
        }
        // If every response is ok, get JSON object
        return Promise.all(responses.map(function(response) {
            return response.json();
        }));
    }).then(function (data) {
        renderArticleList(data[0].articles, data[1].authors);
    }).catch(function (error) {
        app.innerHTML = "It seems that our dragon failed to find his way here, we have no articles to show at the moment.";
        console.warn(error);
    })
};

//
// Initializer
//
getArticles();