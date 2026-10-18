import {createRequest, serializeBooks} from "/scripts/api.js";
import {Components} from "/scripts/components.js";

const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

const app = new Components()
let searchDisabled = false

function startSearch() {
    if (searchDisabled) return

    const search = searchInput.value;
    const query = {q: search, limit: 100}

    searchDisabled = true
    setTimeout(() => {
        searchDisabled = false
    }, 1000)

    app.setLoading('Загрузка...')

    createRequest({queryKeyRoot: 'bookList', query})
        .then((data) => {
            const books = data.docs ? serializeBooks(data.docs) : [];
            app.renderBookList(books);
        })
        .catch((error) => {
            const message = `Ошибка при получении книг: ${error}`
            console.error(message);
            app.setLoading(message)
        });
}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') startSearch()
})
searchButton.addEventListener('click', startSearch);