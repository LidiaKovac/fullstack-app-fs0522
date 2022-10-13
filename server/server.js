const express = require("express")
const cors = require("cors")

const fantasy = require("./fantasy.json")
const history = require("./history.json")
const horror = require("./horror.json")
const romance = require("./romance.json")
const scifi = require("./scifi.json")
const allBooks = [...fantasy, ...history, ...horror, ...romance, ...scifi]

class Library {
    constructor(books) {
        this.books = books
    }
    getAll() {
        return this.books
    }
    findByAsin(asin) {
        for (const book of this.books) {
            if (book.asin === asin) {
                return book
            }
        }
        //return this.books.find(book => book.asin === asin)
    }
    findByCategory(cat) {
        let found = []
        for(const book of this.books) {
            if(book.category === cat) found.push(book)
        }
        return found
        //return this.books.filter(book => book.category === cat)
    }
}

let library = new Library(allBooks)

let app = express()
app.use(cors())

app.get("/", (req, res) => {
    try {
        res.send(library.getAll())
    } catch (error) {
        res.send(error)
    }
})

app.get("/:asin", (req, res) => {
    try {
        res.send(library.findByAsin(req.params.asin))
    } catch (error) {
        res.send(error)
    }
})

app.get("/:category", (req, res) => {
    try {
        res.send(library.findByCategory(req.params.category))
    } catch (error) {
        res.send(error)
    }
})

app.listen(3000)