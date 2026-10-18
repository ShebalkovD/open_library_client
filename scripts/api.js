import {REQUEST_CACHE} from "./cache.js";

const OPEN_LIBRARY_HOST = 'https://openlibrary.org'
const COVER_OPEN_LIBRARY_HOST = 'https://covers.openlibrary.org'

const SEARCH_API = 'search.json'

const headers = new Headers({
    "User-Agent": "openLibraryClient (johnDoe@example.com)"
});
const options = {
    method: 'GET',
    headers: headers,
};

export async function createRequest({queryKeyRoot, query}) {
    const searchParams = query ? new URLSearchParams(query).toString() : ''
    const url = `${OPEN_LIBRARY_HOST}/${SEARCH_API}?${searchParams}`

    let data = null

    const queryKey = [queryKeyRoot, JSON.stringify(query)].join(':')
    if (REQUEST_CACHE.has(queryKey)) {
        data = REQUEST_CACHE.get(queryKey)
        return data
    }

    try {
        const response = await fetch(url, options)
        data = await response.json()
        REQUEST_CACHE.set(queryKey, data)
    } catch (error) {
        alert(`Ошибка запроса: ${error}`)
    }

    return data
}

export function serializeBooks(books) {
    return books.map((book) => ({
        title: book.title,
        authors: book.author_name ?? [],
        cover_id: book.cover_i,
        year: book.first_publish_year,
        key: book.key,
    }))
}

export function getCoverUrl(cover_id) {
    return `${COVER_OPEN_LIBRARY_HOST}/b/id/${cover_id}-M.jpg`
}

export function getBookUrl(key) {
    return `${OPEN_LIBRARY_HOST}${key}`
}