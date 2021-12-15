const addBookButton = document.querySelector('.add-book');
const submitButton = document.querySelector('.submit');
const closeModalButton = document.querySelector('.close-modal');
const alert = document.querySelector('.alert');
const modal = document.querySelector('.modal');
const pages = document.querySelector('#pages');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const finished = document.querySelector('#options');
const body = document.querySelector('body');
const table = document.querySelector('table');

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  if(this.read === 'Yes') {
    return this.read = 'No';
  } else if (this.read === 'No'){
    return this.read = 'Yes';
  }
}

let myLibrary = [];

addBookButton.addEventListener('click', () => modal.style.display = 'block');

closeModalButton.addEventListener('click', () => modal.style.display = 'none');


submitButton.addEventListener('click', e => {
  modal.style.display = 'none';
  if(!title.value || !author.value || !pages.value) {
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  } else {
    let book = new Book(author.value, title.value, pages.value, options.value);
    myLibrary.push(book);
    const row = document.createElement('tr');
    //append to table
    
    myLibrary.forEach(book => {
      row.innerHTML = `
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
      <td><button class="change-status" data-index=${myLibrary.indexOf(book)}>Change Status</button></td>
      <span class="delete-button">&times;</span>
      `;
      table.appendChild(row);
    });
  }
  e.preventDefault();
});


body.addEventListener('click', e => {
  if(e.target.className === 'delete-button') {
    e.target.parentElement.remove();
  }
});

body.addEventListener('click', e => {
  if(e.target.className === 'change-status' && e.target.parentNode.parentNode.children[3].textContent === 'Yes') {
    myLibrary[e.target.dataset.index].toggleRead();
    e.target.parentNode.parentNode.children[3].textContent = 'No';
  } else if(e.target.className === 'change-status' && e.target.parentNode.parentNode.children[3].textContent === 'No') {
    myLibrary[e.target.dataset.index].toggleRead();
    e.target.parentNode.parentNode.children[3].textContent = 'Yes';
  }
});