window.onload = async() => {
    let res = await fetch("http://localhost:3000/")
    let books = await res.json()
}