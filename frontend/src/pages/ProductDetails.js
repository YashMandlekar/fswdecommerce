import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../index.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  };

  const addToCart = async () => {
    await API.post("/cart/add", {
      productId: product._id,
      quantity: 1,
    });
    alert("Added to cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <div style={{ display: "flex", gap: "40px" }}>
        <img
          src={product.image}
          style={{ width: "350px", borderRadius: "10px" }}
        />

        <div>
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>

          <p>{product.description}</p>

          <p>
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;