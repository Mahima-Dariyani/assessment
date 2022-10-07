import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get(
        `https://dummyjson.com/products?&skip=${skip}&limit=${limit}`
      );

      setProducts(products.concat(response.data.products));
    }
    fetchProducts();
  }, [skip, limit]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 2 >=
      document.documentElement.scrollHeight
    ) {
      setSkip((prev) => prev + 12);
      setLimit((prev) => prev + 5);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="container">
        {products.length > 0 &&
          products.map((product, index) => (
            <div className="card" style={{ width: "22rem" }} key={index}>
              <img src={product.images[0]} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
