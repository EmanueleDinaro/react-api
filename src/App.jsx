import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [foodsPost, setFoodsPost] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setProductList([...productList, newProduct]);
  };
  const deleteProduct = (productToDelete) => {
    setProductList((currentProduct) =>
      currentProduct.filter((product) => product !== productToDelete)
    );
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
    <>
      <h1>Products List</h1>
      <ul>
        {foodsPost.map((food) => {
          return (
            <li key={food.id}>
              {food.title}
              <button onClick={() => deleteProduct(food.title)}>
                Cancella
              </button>
            </li>
          );
        })}
      </ul>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newProduct}
          onChange={(event) => {
            setNewProduct(event.target.value);
          }}
          placeholder="Inserisci un nuovo prodotto"
        />
        <button type="submit">Aggiungi</button>
      </form>
    </>
  );
}

export default App;
