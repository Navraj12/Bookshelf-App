import axios from 'axios';

// Defining the base API URL for all book-related endpoints.
const API_URL = 'http://localhost:3000/api/books';

// Function to fetch all books by making a GET request to the API.
// It returns a promise that resolves with the response data.
export const getBooks = () => axios.get(API_URL);


// Function to create a new book by sending a POST request to the API with the book data.
// The `book` parameter is the data to be sent in the request body.
export const createBook = (book) => axios.post(API_URL, book);

// Function to update an existing book by sending a PUT request to the API.
// The `id` parameter identifies the book to be updated, and `updatedBook` contains the new data.
export const updateBook = (id, updatedBook) => axios.put(`${API_URL}/${id}`, updatedBook);

// Function to delete a book by sending a DELETE request to the API.
// The `id` parameter identifies the book to be deleted.
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);