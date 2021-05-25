var typingTimer;
var timeInterval = 3000;
var input;

function onPageLoad () {
    input = document.querySelector('.book-search-input');
    input.addEventListener('keyup', restartTimer);
}

function restartTimer () {
    clearTimeout(typingTimer);
    if(input.value.length > 3){
        typingTimer = setTimeout(updateBooksOutput, timeInterval);
    }
}

async function updateBooksOutput(){
    //alert('Update');
    clearResults();
    let library = await searchBooks(input.value);
    let filteredLibrary = filterBooksData(library.items);
    showResult(filteredLibrary);
}

async function searchBooks (request) {
    let response = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${request}`);
    if(response.ok){
        let json = await response.json();
        return json;
    }
    else {
        console.log('HTTP request failed')
    }

    // .then((response) => {
    //     return response.json();
    // })
    // .then((data) => {
    //     console.log(data);
    // });
}

function filterBooksData (library) {
    let filteredBooks = [];
    for(ch in library){
        let book = library[ch];
        let filteredBook = {};
        filteredBook.title = book['volumeInfo']['title'];
        filteredBook.authors = book['volumeInfo']['authors'];
        filteredBook.description = book['volumeInfo']['description'];
        filteredBooks.push(filteredBook);
    }
    return filteredBooks;
}

function showResult (filteredBooks) {
    let tag = document.querySelector('.book-search-result');
    for(ch in filteredBooks){
        let book = filteredBooks[ch];
        let bookDiv = createElement(book);
        tag.appendChild(bookDiv);
    }
}

function createElement (book) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('one-book-search-result');
    for(ch in book){
       let contentDiv = document.createElement('div');
       let content = document.createTextNode(`${ch}: ${(book[ch] !== undefined) ? book[ch] : ''}`);
       contentDiv.appendChild(content);
       newDiv.appendChild(contentDiv);
    }
    return newDiv;
}

function clearResults () {
    let divBooksResults = document.querySelector('.book-search-result');
    divBooksResults.innerHTML = '';
}

window.onload = onPageLoad;