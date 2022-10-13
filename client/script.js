window.onload = async() => {
    let res = await fetch("http://localhost:3000/")
    let books = await res.json()
    document.querySelector("body").innerHTML = `<ul> ${ books.map(book => `<li>${book.title}</li>`).join(" ")} </ul>` 


}