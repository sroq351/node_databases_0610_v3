import axios from "axios";

const API_URL = "http://localhost:4001/api/v1";

export const fetchAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    return [];
  }
};

// another way to fetch data from API - return Promise
export const createBook = async (book) => {
  return await axios.post(`${API_URL}/books/`, book);
};
export const editBook = async (id, book) => {
  return await axios.patch(`${API_URL}/books/${id}`, book);
};
export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/books/${id}`);
};
