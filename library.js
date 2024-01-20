const container = document.getElementById("container");
const newBookButton = document.getElementById("newBookButton");
const form = document.getElementById("addbookform");
const libraryTable = document.getElementById("tbody");
let uniqueId = 1;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let formdata = new FormData(this);
  let newBook = new Book(
    formdata.get("title"),
    formdata.get("author"),
    formdata.get("pages"),
    formdata.get("read")
  );
  addBookToLibrary(newBook);
  addBookToGui(newBook);
  dialog.close();
});

let myLibrary = [];

let hp1 = new Book("Harry Potter 1", "J.K. Rowling", 100, false);
let hp2 = new Book("Harry Potter 2", "J.K. Rowling", 100, false);
let hp3 = new Book("Harry Potter 3", "J.K. Rowling", 100, false);
myLibrary.push(hp1, hp2, hp3);

function Book(title, author, pages, read) {
  this.id = uniqueId++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToGui(book) {
  let tableRow = document.createElement("tr");
  Object.entries(book).forEach((val) => {
    const [key, value] = val;
    let td = document.createElement("td");
    // if key == read insert icon
    if (key === "read") {
      return addStatusIcon(value, td, tableRow);
    } else {
      // add text value to table
      td.innerText = value;
      tableRow.appendChild(td);
    }
  });
  let td = document.createElement("td");
  td.appendChild(createDeleteButton());
  tableRow.appendChild(td);
  libraryTable.appendChild(tableRow);
}

function addStatusIcon(read, td, tableRow) {
  let statusIcon = document.createElement("span");
  statusIcon.classList.add("material-symbols-outlined");
  let readStatus = read === 'true';
  statusIcon.innerHTML = readStatus ? "done" : "close";
  td.appendChild(statusIcon);
  tableRow.appendChild(td);
  td.addEventListener("click", (e) => {
    changeReadStatus(e);
  });
  return;
}

function createDeleteButton() {
  let deleteButton = document.createElement("span");
  deleteButton.classList.add("material-symbols-outlined");
  deleteButton.innerHTML = "delete";
  deleteButton.addEventListener("click", (e) => {
    removeBookFromLibrary(e);
  });
  return deleteButton;
}

function removeBookFromLibrary(e) {
  let bookId = getBookId(e);
  let clickedRow = e.target.closest("tr");
  myLibrary = myLibrary.filter((element) => element.id !== bookId);
  clickedRow.remove();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showLibrary() {
  myLibrary.forEach((book) => {
    addBookToGui(book);
  });
}

function getBookId(e) {
  let clickedRow = e.target.closest("tr");
  let firstTd = clickedRow.querySelector("td:first-child");
  return parseInt(firstTd.textContent);
}

function changeReadStatus(e) {
  let bookId = getBookId(e);
  let selectedBook = myLibrary.find((element) => element.id === bookId);
  let readStatus = selectedBook.read === 'true' || selectedBook.read === true;
  selectedBook.read = !readStatus;
  e.target.innerHTML = selectedBook.read ? "done" : "close";
}

showLibrary();

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("newBookButton");
const closeButton = document.getElementById("closeButton");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
