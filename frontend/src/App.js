
    import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8500/products")
      .then((res) => {
        console.log("API RESPONSE:", res.data);

        // ✅ If backend returns direct array
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        }

        // ✅ If backend returns { products: [] }
        else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        }

        // ✅ If backend returns { data: [] }
        else if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        }

        
        else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.log("API ERROR:", err);
      });
  }, []);

  return (
    <div className="container">
      <h1>MERN Task 1 - Product List</h1>

      <div className="productList">
        {products.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          products.map((p) => (
            <ProductCard key={p._id} name={p.name} price={p.price} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;