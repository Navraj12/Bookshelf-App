// Importing `useState` and `useEffect` hooks from React.
// `useState` manages component state, and `useEffect` manages side effects like data fetching.
import { useState, useEffect } from 'react';

// Importing API functions for CRUD operations on books.
import { getBooks, createBook, updateBook, deleteBook } from './api';

// Defining the main `App` component.
function App() {
  // State to store the list of books fetched from the server.
  const [books, setBooks] = useState([]);

  // State to manage the form inputs for adding or updating a book.
  const [form, setForm] = useState({ title: '', author: '', description: '', publishedYear: '' });

  // Function to fetch all books from the server.
  const fetchBooks = async () => {
    try {
      // Using the `getBooks` function to make a GET request to the API.
      const booksFromServer = await getBooks();
      // Updating the `books` state with the fetched data.
      setBooks(booksFromServer.data);
    } catch (error) {
      // Logging an error message if the fetch operation fails.
      console.error("Error fetching books:", error);
    }
  };

  // useEffect hook to fetch books when the component is first rendered.
  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array ensures this runs only once after the initial render.

  // Function to handle form submission for adding a new book.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior (page reload).
    
    // Checking if required fields are filled; alert if any are missing.
    if (!form.title || !form.author || !form.publishedYear) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      // Sending a POST request to create a new book using the `createBook` function.
      await createBook(form);
      // Refetching the list of books after adding a new one.
      fetchBooks();
      // Resetting the form fields after successful submission.
      setForm({ title: '', author: '', description: '', publishedYear: '' });
    } catch (error) {
      // Logging an error message if the book creation fails.
      console.error("Error creating book:", error);
    }
  };

  // Function to handle deleting a book by its ID.
  const handleDelete = async (id) => {
    try {
      // Sending a DELETE request to remove the book using the `deleteBook` function.
      await deleteBook(id);
      // Refetching the list of books after a successful deletion.
      fetchBooks();
    } catch (error) {
      // Logging an error message if the deletion fails.
      console.error("Error deleting book:", error);
    }
  };

  // Returning the JSX structure to render the app's UI.
  return (
    <>
      <div>
        <h1>Bookshelf</h1>
        {/* Form for adding or updating a book. */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title" // Placeholder text for the input.
            value={form.title} // Controlled input: value is tied to the `form` state.
            onChange={(e) => setForm({ ...form, title: e.target.value })} // Updating `title` in `form` state on input change.
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
            onChange={(e) => setForm({ ...form, publishedYear: Number(e.target.value) })} // Parsing input as a number.
          />
          <button type="submit">Add Book</button> {/* Submit button for the form. */}
        </form>
        {/* Displaying the list of books as a series of list items. */}
        <ul>
          {books.map((book) => (
            <li key={book._id}> {/* Unique key to help React efficiently update the list. */}
              {book.title} by {book.author} ({book.publishedYear}) {/* Display book details. */}
              <button onClick={() => handleDelete(book._id)}>Delete</button> {/* Button to delete a book. */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Exporting the `App` component so it can be rendered in the application.
export default App;
