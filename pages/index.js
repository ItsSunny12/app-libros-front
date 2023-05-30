import { useEffect, useState } from 'react';
import styles from '../styles/create.module.css';
export default function create() {
  const initialState = { name: '', author: '', price: '' };
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [book, setBook] = useState(initialState);
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setBook({
      ...book,
      [inputName]: inputValue,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const data = await res.json();
      setBook(initialState);
      const newBook = [data.book, ...books];
      setBooks(newBook);
      //fetchBooks();
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchBooks = () => {
    fetch(`${baseUrl}/books`)
      .then((res) => res.json())
      .then(({ books }) => {
        setBooks(books);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className={`${styles.container} ${styles.df} ${styles.jcsa}`}>
        <div className={`${styles.df} ${styles.fdc}`}>
          <h2 className={styles.h2}>Crear un nuevo libro</h2>
          <form className={styles.form}>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={book.name}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
            />

            <button className={styles.button} onClick={handleClick}>
              Crear Libro
            </button>
          </form>
        </div>
        <div className={styles.booksContainer}>
          {books.map((b) => (
            <div
              className={`${styles.books} ${styles.df} ${styles.aic} ${styles.jcsb} ${styles.p5} ${styles.mb5} ${styles.br5}`}
              key={b._id}
            >
              <span>{b.name}</span>
              <span>{b.author}</span>
              <div className={`${styles.df} ${styles.fdc}`}>
                <span>${b.price}</span>
                <span
                  className={styles.delete}
                  onClick={() => {
                    fetch(`${baseUrl}/books/${b._id}`, { method: 'DELETE' })
                      .then((res) => res.json())
                      .then((data) => {
                        console.log({ data });
                      });
                  }}
                >
                  BORRAR
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
