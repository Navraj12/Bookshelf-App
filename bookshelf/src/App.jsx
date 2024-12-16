import { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from './api';
// import axios from 'axios';


function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', description: '', publishedYear: '' });

  const fetchBooks = async () => {
    try {
      const booksFromServer = await getBooks();
      setBooks(booksFromServer.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.publishedYear) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await createBook(form);
      fetchBooks();
      setForm({ title: '', author: '', description: '', publishedYear: '' });
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Bookshelf</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Published Year"
            value={form.publishedYear}
            onChange={(e) => setForm({ ...form, publishedYear: Number(e.target.value) })}
          />
          <button type="submit">Add Book</button>
        </form>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author} ({book.publishedYear})
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
