import { useState } from 'react';
import styles from '../../styles/create.module.css';
function create() {
  const initialState = { name: '', author: '', price: '' };
  const [book, setBook] = useState(initialState);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setBook({
      ...book,
      [inputName]: inputValue,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        setBook(initialState);
        console.log('Libro creado con exito');
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <div>
      <h1 className={styles.h1}>Crear un nuevo libro</h1>
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
        <button onClick={handleClick}>Crear Libro</button>
      </form>
    </div>
  );
}

export default create;
