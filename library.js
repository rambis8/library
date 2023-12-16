const container = document.getElementById("container");
const newBookButton = document.getElementById("newBookButton");
const form = document.getElementById("addbookform");
const libraryTable = document.getElementById('tbody');

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let formdata = new FormData(this);
    let newBook = new Book(formdata.get("title"),
    formdata.get("author"), formdata.get("pages"), formdata.get("read"));
    addBookToLibrary(newBook);
    addBookToGui(newBook);
});

const myLibrary = [];

let hp1 = new Book("Harry Potter 1", "J.K. Rowling", 100, "no");
let hp2 = new Book("Harry Potter 2", "J.K. Rowling", 100, "no");
let hp3 = new Book("Harry Potter 3", "J.K. Rowling", 100, "no");
myLibrary.push(hp1, hp2, hp3);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToGui(book) {
    let tableRow = document.createElement('tr');
    Object.values(book).forEach(val => {
        let td = document.createElement('td');
        td.innerText = val;
        tableRow.appendChild(td);
    })
    libraryTable.appendChild(tableRow);
}
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showLibrary() {
    myLibrary.forEach(book => {
        addBookToGui(book);
    })
}

showLibrary();

