import { useState, useEffect } from "react";
import axios from "axios";

const initialData = {
  title: "",
  content: "",
  image: "",
  tags: "",
};

export default function App() {
  // inizializzo lo stato (con un array vuoto) per la lista degli elementi invocati tramite chiamate alle API
  const [foodsPost, setFoodsPost] = useState([]);
  // inizializzo lo stato (con un oggetto vuoto) per i dati del form
  const [formData, setFormData] = useState(initialData);

  // Tramite una funzione paramentrica gestisco il cambiamento dei campi del form tramite il fieldname e il valore
  const handleFormField = (fieldName, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));
  };

  // Tramite una funzione gestisco la submit del form
  const handleSubmit = (event) => {
    event.preventDefault();
    // 1. Aggiungo i dati del form alla lista
    setList((currentList) => [...currentList, formData]);
    // 2. Reinizializzo i dati del form con l'oggetto vuoto
    setFormData({
      title: "",
      content: "",
      image: "",
      tags: "",
    });
  };

  function fetchFoodsPost() {
    axios
      .get("http://127.0.0.1:3000/foods")
      .then((res) => setFoodsPost(res.data))
      .catch((error) => {
        console.error("Errore nel recupero dei dati da express", error);
      });
  }

  useEffect(fetchFoodsPost, []);

  return (
    <div>
      <h1>React form multifield</h1>
      <ul>
        {/* Mappo la lista degli elementi e renderizzo un elemento <li> per ogni elemento */}
        {foodsPost.map((food) => (
          <li key={food.id}>
            <strong>Titolo:</strong> {food.title}
            <br />
            <strong>Contenuto:</strong> {food.content}
            <br />
            <img src={food.image} alt={food.title} />
            <br />
            <strong>Tags:</strong> {food.tags}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        {/* Input per il titolo */}
        <input
          type="text"
          placeholder="Inserisci l'autore"
          name="title"
          value={formData.title}
          onChange={(event) => handleFormField("title", event.target.value)}
          required
        />
        <br />
        {/* Input per il contenuto */}
        <input
          type="text"
          placeholder="Inserisci il contenuto"
          name="content"
          value={formData.content}
          onChange={(event) => handleFormField("content", event.target.value)}
          required
        />
        <br />
        {/* Selezione per la categoria */}
        <select
          name="category"
          value={formData.category}
          onChange={(event) => handleFormField("category", event.target.value)}
          required
        >
          <option value="" hidden>
            Seleziona la categoria
          </option>
          <option value="frontend">FrontEnd</option>
          <option value="backend">BackEnd</option>
          <option value="uiux">UI/UX</option>
        </select>
        <br />
        {/* Checkbox per la pubblicazione */}
        <input
          name="isPublished"
          type="checkbox"
          checked={formData.isPublished}
          onChange={(event) =>
            handleFormField("isPublished", event.target.checked)
          }
        />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
}
