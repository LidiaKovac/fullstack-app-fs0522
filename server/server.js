const express = require("express")
const cors = require("cors")

const fantasy = require("./fantasy.json")
const history = require("./history.json")
const horror = require("./horror.json")
const romance = require("./romance.json")
const scifi = require("./scifi.json")
const allBooks = [...fantasy, ...history, ...horror, ...romance, ...scifi]
// const allBooks = fantasy.concat(history.concat(horror.concat(romance.concat(scifi))))

class Library {
    constructor(books) {
        this.books = books
    }
    getAll(pageNumber) {
        pageNumber -= 1
        return this.books.slice((10 * pageNumber), (10 * pageNumber) + 10)
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
        for (const book of this.books) {
            if (book.category === cat) found.push(book)
        }
        return found
        //return this.books.filter(book => book.category === cat)
    }
}

let library = new Library(allBooks)

let app = express()
app.use(cors())

//http://localhost:3000/pagina/13

app.get("/pagina/:pageNumber", (req, res, next) => {
    //nota su req.params (non serve che la impariate, è una nozione prettamente backend, però serve per capire il codice)
    //in questa ruota e in quelle successiva vedrete che alcune parole sono precedute da ":"
    //queste parole si chiamano "parametri dinamici"
    //express.js ci assicura di poterli ritrovare nel parametro req, sotto req.params.nomeDelParametro
    //questo significa che dal client io posso inserire "https://localhost:3000/pagina/1"
    //il valore di req.params.pageNumber sarà 1. 
    try {
        res.send(library.getAll(req.params.pageNumber))
    } catch (error) {
        next(error)
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

app.listen(3000, ()=> console.log("started"))