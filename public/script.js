// Login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.role === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'student.html';
    }
}

// Issue book
async function issueBook() {
    const userId = document.getElementById('userId').value;
    const bookId = document.getElementById('bookId').value;

    await fetch('/api/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, bookId })
    });

    alert("Book Issued");
}

// Return book
async function returnBook(issueId) {
    await fetch('/api/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId })
    });

    alert("Returned");
}

// Load all books
async function loadBooks() {
    const res = await fetch('/api/books');
    const books = await res.json();

    const list = document.getElementById('bookList');
    list.innerHTML = '';

    books.forEach(b => {
        list.innerHTML += `<li>${b.title} - ${b.author}</li>`;
    });
}

// Add book
async function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const quantity = document.getElementById('quantity').value;

    await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, quantity })
    });

    loadBooks();
}

// Search books
async function searchBook() {
    const query = document.getElementById('search').value;

    const res = await fetch(`/api/books/search?q=${query}`);
    const books = await res.json();

    const list = document.getElementById('bookList');
    list.innerHTML = '';

    books.forEach(b => {
        list.innerHTML += `<li>${b.title} - ${b.author}</li>`;
    });
}

// Load initially
loadBooks();