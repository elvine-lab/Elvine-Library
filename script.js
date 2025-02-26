const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

function Book(title, author, year, page, url, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.page = page;
    this.url = url;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
    saveLibrary();
};

function addBookToLibrary(title, author, year, page, url, read) {
    const newBook = new Book(title, author, year, page, url, read);
    myLibrary.push(newBook);
    saveLibrary();
    displayBooks();
}

function displayBooks() {
    const bookCard = document.querySelector("#book-card");
    bookCard.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookRecord = document.createElement("div");
        bookRecord.classList.add("book");
        bookRecord.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.page}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
            <p><strong>Book:</strong> <a href="${book.url}" target="_blank">link</a></p>
            <div class="book-button">
                <button class="toggle-read" data-index="${index}">
                    ${book.read ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button class="remove-btn" data-index="${index}">DELETE</button>
            </div>
        `;
        bookCard.appendChild(bookRecord);
    });

    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll(".toggle-read").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;
            myLibrary[index].toggleReadStatus();
            displayBooks();
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;
            myLibrary.splice(index, 1);
            saveLibrary();
            displayBooks();
        });
    });
}


function saveLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

const addBookForm = document.getElementById("add-book-form");
const bookOverlay = document.getElementById("bookOverlay");
const addBookButton = document.getElementById("add-book");

addBookButton.addEventListener("click", () => {
    bookOverlay.style.display = "flex";
});

bookOverlay.addEventListener("click", (event) => {
    if (event.target === bookOverlay) {
        bookOverlay.style.display = "none";
    }
});

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const year = document.getElementById("published-year").value.trim();
    const page = document.getElementById("pages").value.trim();
    const bookUrl = document.getElementById("book-url").value.trim();
    const readStatus = document.querySelector("input[name='read-status']:checked");

    if (!title || !author || !year || !page || !bookUrl || !readStatus) {
        alert("Please fill out all fields");
        return;
    }

    addBookToLibrary(title, author, year, page, bookUrl, readStatus.value === "yes");
    addBookForm.reset();
    bookOverlay.style.display = "none";
});

displayBooks();
