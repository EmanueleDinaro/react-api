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

  // Funzione per recuperare i dati dei cibi dal server tramite una richiesta GET
  function fetchFoodsPost() {
    axios
      .get("http://127.0.0.1:3000/foods")
      // Se la richiesta ha successo, aggiorna lo stato con i dati ricevuti
      .then((res) => setFoodsPost(res.data))
      .catch((error) => {
        console.error("Errore nel recupero dei dati da express", error);
      });
  }

  // Funzione per gestire l'invio del modulo
  function handleSubmitForm(event) {
    event.preventDefault();
    // Invia una richiesta POST per creare un nuovo alimento
    axios.post("http://localhost:3000/foods", formData).then((res) => {
      // Aggiorna lo stato con i dati ricevuti dalla risposta, aggiungendoli all'array corrente
      setFoodsPost((currentUsers) => [...currentUsers, res.data]);
      setFormData(initialData);
    });
  }

  // Funzione per gestire le modifiche nei dati del modulo tramite il nome del campo (fieldName) e valore (value)
  function handleFormData(fieldName, value) {
    // Aggiorna lo stato dei dati del modulo con il nuovo valore per il campo specificato
    setFormData((currentFormData) => {
      return { ...currentFormData, [fieldName]: value };
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
            <strong>Tags:</strong>
            {typeof food.tags === "string" ? food.tags : food.tags.join(", ")}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmitForm}>
        {/* Input per il titolo */}
        <input
          type="text"
          placeholder="Inserisci il nome dell'alimento"
          name="title"
          value={formData.title}
          onChange={(event) => handleFormData("title", event.target.value)}
          required
        />
        <br />
        {/* Input per il contenuto */}
        <input
          type="text"
          placeholder="Inserisci il contenuto"
          name="content"
          value={formData.content}
          onChange={(event) => handleFormData("content", event.target.value)}
          required
        />
        <br />
        {/* Input per l'inserimento del'URL dell'img */}
        <input
          type="url"
          placeholder="Inserisci l'URL dell'immagine"
          name="image"
          value={formData.image}
          onChange={(event) => handleFormData("image", event.target.value)}
        />
        <br />
        {/* Input per l'inserimento dei tag */}
        <input
          type="text"
          placeholder="Inserisci i tag"
          name="tags"
          value={formData.tags}
          onChange={(event) => handleFormData("tags", event.target.value)}
          required
        />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
}
