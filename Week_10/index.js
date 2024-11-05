// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this._available = true; // Encapsulated availability
  }
  
  get availability() {
    return this._available;
  }

  set availability(status) {
    this._available = status;
  }
}

// Member Class
class Member {
  constructor(name, memberId) {
    this.name = name;
    this.memberId = memberId;
    this._borrowedBooks = []; // Encapsulated borrowed books list
  }
  
  borrowBook(book) {
    if (book.availability) {
      book.availability = false;
      this._borrowedBooks.push(book);
      console.log(`${this.name} borrowed ${book.title}`);
    } else {
      console.log(`Sorry, ${book.title} is not available.`);
    }
  }
}

// Librarian Class (Inheritance and Polymorphism)
class Librarian extends Member {
  constructor(name, memberId) {
    super(name, memberId);
  }
  
  addBookToLibrary(title, author, isbn) {
    return new Book(title, author, isbn);
  }

  removeBook(book, library) {
    if (book.availability) {
      library.removeBook(book);
      console.log(`${book.title} has been removed from the library.`);
    } else {
      console.log(`Cannot remove ${book.title}, it's currently borrowed.`);
    }
  }

  borrowBook(book) {
    if (book.availability) {
      book.availability = false;
      this._borrowedBooks.push(book);
      console.log(`Librarian ${this.name} borrowed ${book.title} with priority access.`);
    } else {
      console.log(`Sorry, ${book.title} is not available.`);
    }
  }
}

// Library Class with Search Feature
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    this.books = this.books.filter(b => b !== book);
  }

  searchBooks(keyword) {
    return this.books.filter(book => 
      book.title.toLowerCase().includes(keyword.toLowerCase()) || 
      book.author.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}

// Demo Function to Display Search Results
function searchBooks() {
  const keyword = document.getElementById('search-input').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results
  
  const searchResults = library.searchBooks(keyword);
  if (searchResults.length > 0) {
    searchResults.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';
      bookDiv.textContent = `${book.title} by ${book.author} - ${book.availability ? 'Available' : 'Not Available'}`;
      resultsDiv.appendChild(bookDiv);
    });
  } else {
    resultsDiv.textContent = 'No books found.';
  }
}

// Initialize Library, Books, and Users
const library = new Library();
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "123456789");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "987654321");
library.addBook(book1);
library.addBook(book2);

const member = new Member("John Doe", "M001");
const librarian = new Librarian("Jane Smith", "L001");

member.borrowBook(book1);
librarian.borrowBook(book2);
