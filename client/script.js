window.onload = async () => {
    //generiamo i bottoni per le pagine 

    let res = await fetch("http://localhost:3000/pagina/1")
    console.log(res);
    //fetch => Promise(resolve(books), reject(errore))
    //no await => Promise<pending> 
    let books = await res.json()
    for (let i = 0; i < 69; i++) {
        let paginationContainer = document.querySelector("nav>ul")
        paginationContainer.innerHTML += `<li class="page-item page-link" onclick="goToPage(${i + 1}, event)">${i + 1}</li>`
    }
    renderBooks(books)
}

const goToPage = async (page) => {
    let res = await fetch("http://localhost:3000/pagina/" + page)
    let books = await res.json()
    renderBooks(books)
}

const renderBooks = (books) => {
    let container = document.querySelector(".container>.row")
    container.innerHTML = ""
    for (const book of books) {
        container.innerHTML += `<div class="col col-lg-3 col-md-4 col-sm-6 col-xs-12"> <div class="card" >
        <img src="${book.img}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.category}</p>
          <a href="#" class="btn btn-primary">${book.price}</a>
        </div>
      </div> </div>`
    }

}