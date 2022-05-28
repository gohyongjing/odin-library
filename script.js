let library = (() => {
    let _books = [];

    let _makeBook = (name, author, pages, hasRead) => {
        pages = Number(pages);
        return {name, author, pages, hasRead};
    };

    let addBook = (bookName, author, numPages, hasRead) => {
        _books.push(_makeBook(bookName, author, numPages, hasRead));
    }

    let getBooks = () => {
        return _books;
    }

    let removeBook = (book) => {
        _books.splice(_books.indexOf(book), 1);
    }

    return {addBook, getBooks, removeBook};
})();

let webpage = ((doc, lib) => {
    const _booksDiv = doc.querySelector(".books");
    const _newBookName = doc.querySelector('input[id="book-name"]');
    const _newBookAuthor = doc.querySelector('input[id="book-author"]');
    const _newBookPages = doc.querySelector('input[id="book-pages"]');
    const _newBookRead = doc.querySelector('input[id="book-been-read"]');
    const _addBookButton = doc.querySelector('input[type="button"]');

    let _displayBook = (book) => {
        let bookDiv = doc.createElement('div');
        bookDiv.classList.add("book");
        let titleDiv = doc.createElement('div');
        titleDiv.classList.add("title");
        titleDiv.innerText = `Title: ${book.name}`;
        let authorDiv = doc.createElement('div');
        authorDiv.classList.add("author");
        authorDiv.innerText = `Author: ${book.author}`;
        let numPagesDiv = doc.createElement('div');
        numPagesDiv.classList.add("numPages");
        numPagesDiv.innerText = `${book.pages} pages`;
        let hasReadDiv = doc.createElement('div');
        hasReadDiv.classList.add("hasRead");

        let hasReadText = doc.createElement('div');
        hasReadText.innerText = book.hasRead ? 'Has been read' : 'Has not been read';

        let readCheckbox = document.createElement("INPUT");
        readCheckbox.setAttribute("type", "checkbox");
        readCheckbox.checked = book.hasRead;
        readCheckbox.addEventListener("change", (e) => {
            book.hasRead = readCheckbox.checked;
            hasReadText.innerText = book.hasRead ? 'Has been read' : 'Has not been read';
        });
         
        hasReadDiv.appendChild(readCheckbox);
        hasReadDiv.appendChild(hasReadText);

        let removeButton = doc.createElement("button");
        removeButton.innerText = "X";
        removeButton.addEventListener("click", (e) => {
            lib.removeBook(book);
            bookDiv.remove();
        });

        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(numPagesDiv);
        bookDiv.appendChild(hasReadDiv);
        bookDiv.appendChild(removeButton);

        _booksDiv.appendChild(bookDiv);
    };

    let _removeAllBooks = () => {
        let elements = Array.from(_booksDiv.children);
        for(let element of elements){
            if (element.classList.contains("book")) {
                element.remove();
            }
        }
    }

    let updateDisplay = () => {
        _removeAllBooks();
        for(let book of lib.getBooks()) {
            _displayBook(book);
        }
    }

    _addBookButton.addEventListener("click", (e) => {
        const bookName = _newBookName.value;
        const bookAuthor = _newBookAuthor.value;
        const bookPages = _newBookPages.value;
        const bookRead = Boolean(_newBookRead.checked);
        lib.addBook(bookName, bookAuthor, bookPages, bookRead);
        updateDisplay();
        _newBookName.value = "";
        _newBookAuthor.value = "";
        _newBookPages.value = "";
        _newBookRead.checked = false;
    });


    return {updateDisplay};
})(document, library);


library.addBook("Hello World!", "yong Jing", 1, true);
webpage.updateDisplay();
