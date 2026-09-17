import * as bookService from '../services/bookService.js';

export const fetchAllBooks = async (requestAnimationFrame, res) =>{
    const books = await bookService.fetchAllBooks();
    res.status(200).json(books);
}