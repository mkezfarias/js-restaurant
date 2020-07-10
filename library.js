const getFromLocalStorage = () => JSON.parse(localStorage.getItem("library"));
let library = getFromLocalStorage() || [];
console.log(library, "library");
const container = document.querySelector(".container");

function displayBooks() {
  let html = library
    .map(book => {
      return `
    <div class="card d-flex flex-row" id=${book.id} style="width: 10rem;">
         <div class="card-title">${book.title}</div>
         <div class="card-text">${book.author} </div>
         <div class="card-text">${book.pages} </div>
         <input type="checkbox" class="read" ${
           book.read ? "checked" : ""
         }></input>
         <button class="delete" id="${book.id}-del">Delete</button>
       
     </div>
     `;
    })
    .join(" ");

  container.innerHTML = html;
  container.appendChild(document.createElement("div"));
  const delbuts = document.querySelectorAll(".delete");
  delbuts.forEach(butt => butt.addEventListener("click", deleteBook));
  container.dispatchEvent(new CustomEvent("displayBook"));
}

displayBooks();

container.addEventListener("booksUpdated", displayBooks);

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

let title = document.querySelector(".input1");
let author = document.querySelector(".input2");
let pages = document.querySelector(".input3");
let read = document.querySelector(".input4");
const button = document.querySelector(".input5");

const delbuts = document.querySelectorAll(".delete");
delbuts.forEach(butt => butt.addEventListener("click", deleteBook));

function deleteBook(e) {
  let itemToDel;
  console.log(e.target);
  itemToDel = `${e.target.id}`.replace("-del", "");
  console.log(itemToDel);
  library = library.filter(item => item.id != itemToDel);
  localStorage.setItem("library", JSON.stringify(library));
  container.dispatchEvent(new CustomEvent("booksUpdated"));
}

const addBook = (tit, auth, pag, isr) => {
  const book = new Book(tit, auth, pag, isr);
  book.id = Math.random() * 10000;
  library.push(book);
  localStorage.setItem("library", JSON.stringify(library));
  container.dispatchEvent(new CustomEvent("booksUpdated"));
};

button.addEventListener("click", e => {
  e.preventDefault();
  addBook(title.value, author.value, pages.value, read.checked);
  console.log(title.value, author.value, pages.value, read.checked);
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
  container.dispatchEvent();
});
