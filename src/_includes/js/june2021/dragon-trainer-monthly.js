// Get DOM elements and set variables
const API_URL = "https://vanillajsacademy.com/api/dragons.json";
const app = document.querySelector('[data-app]');

// Methods
let renderArticles = function (data) {
    let title = data.publication;
    let articles = data.articles;
    app.innerHTML = `
    <h2>${title}</h2>
    <ul>
        ${articles.map(function(article) {
            return `
            <li>
                <h3 id="${article.url}">${article.title}</h3>
                <small>${article.author} | ${article.pubdate}</small>
                <p>${article.article}</p>
            </li>`;
        }).join('')}
    </ul>
    `;
};

let fetchArticles = async function () {
    try {
        let response = await fetch(API_URL);

        if (!response.ok) throw response.status;

        let data = await response.json();

        if (!data) throw 'No data';

        renderArticles(data);
    } catch (error) {
        app.innerHTML = "Ouch! something went wrong with the articles... Try again later!";
        console.warn(error);
    }
}

// Init app
fetchArticles();