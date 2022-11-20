import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { BASEURL } from "@env";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const getBooks = () => {
    setIsLoading(true);
    try {
      fetch(`${BASEURL}/book/get-books`)
        .then((res) => res.json())
        .then((res) => {
          setBooks(res.books);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <BookContext.Provider value={{ isLoading, books }}>
      {children}
    </BookContext.Provider>
  );
};
