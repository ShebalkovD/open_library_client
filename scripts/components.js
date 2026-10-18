import {getBookUrl, getCoverUrl} from "./api.js";

export class Components {
    constructor() {
        this.container = document.getElementById('bookContainer')
    }

    clearContainer() {
        this.container.innerHTML = ''
    }

    bookCard({title, authors, cover_id, year, key}) {
        const cardEl = document.createElement('div')
        const titleEl = document.createElement('h4')
        const yearEl = document.createElement('p')
        const authorEl = document.createElement('p')
        const coverEl = document.createElement('img')
        const linkEl = document.createElement('a')


        const bookURL = getBookUrl(key)
        const coverURL = cover_id ? getCoverUrl(cover_id) : '/assets/image-placeholder.svg'

        cardEl.classList.add('book-card')
        titleEl.innerText = title.toLowerCase()
        yearEl.innerText = `Год: ${year}`
        authorEl.innerText = `Автор: ${authors.join(', ')}`
        coverEl.src = coverURL
        linkEl.href = bookURL
        linkEl.target = '_blank'
        linkEl.innerText = 'Подробнее'

        cardEl.appendChild(coverEl)
        cardEl.appendChild(titleEl)
        cardEl.appendChild(yearEl)
        cardEl.appendChild(authorEl)
        cardEl.appendChild(linkEl)

        return cardEl
    }

    bookList(books) {
        const listEl = document.createElement('div')
        listEl.classList.add('book-list')
        books.forEach((book) => {
            const bookCard = this.bookCard(book)
            listEl.appendChild(bookCard)
        })

        return listEl
    }

    loadingLabel(label) {
        const labelEl = document.createElement('p')
        labelEl.style.textAlign = 'center'
        labelEl.style.marginTop = '1rem'
        labelEl.innerText = label

        return labelEl
    }

    renderBookList(books) {
        this.clearContainer()
        this.container.appendChild(this.bookList(books))
    }

    setLoading(label) {
        this.clearContainer()
        this.container.appendChild(this.loadingLabel(label))
    }
}