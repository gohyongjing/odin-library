let library = (() => {
    let _books = [];

    let _makeBook = (name) => {
        return {name};
    };

    let addBook = (bookName) => {
        _books.push(_makeBook(bookName));
    }

    let getBooks = () => {
        return _books;
    }

    return {addBook, getBooks};
})();

let webpage = ((doc) => {
    const _booksDiv = doc.querySelector(".books");
    const _newBookName = doc.querySelector('input[id="book-name"]');
    const _addBookButton = doc.querySelector('input[type="button"]');

    let _addBook = (book) => {
        let bookDiv = doc.createElement('div');
        bookDiv.classList.add("book");
        bookDiv.innerText = book.name;
        _booksDiv.appendChild(bookDiv);
    };

    let _removeAllBooks = () => {
        let elements = Array.from(_booksDiv.children);
        for(let element of elements){
            console.log(element);
            if (element.classList.contains("book")) {
                element.remove();
            }
        }
    }

    let updateDisplay = () => {
        _removeAllBooks();
        for (let book of library.getBooks()) {
            _addBook(book);
        }
    }

    _addBookButton.addEventListener("click", (e) => {
        const bookName = _newBookName.value;
        library.addBook(bookName);
        updateDisplay();
        _newBookName.value = "";
    });

    return {updateDisplay};
})(document);


library.addBook("hello");
webpage.updateDisplay();
