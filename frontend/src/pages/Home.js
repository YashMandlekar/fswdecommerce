import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (e, id) => {
    e.stopPropagation();

    try {
      await API.post("/cart/add", {
        productId: id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="page container">
      <h2 style={{ marginBottom: "20px" }}>Products</h2>

      <div style={gridStyle}>
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            style={cardStyle}
          >
            {/* IMAGE */}
            <img
              src={
                p.image
                  ? p.image
                  : "https://via.placeholder.com/200"
              }
              alt={p.name}
              style={imageStyle}
            />

            {/* DETAILS */}
            <h3 style={titleStyle}>{p.name}</h3>

            <p style={priceStyle}>₹{p.price}</p>

            <p
              style={{
                ...stockStyle,
                color: p.countInStock > 0 ? "green" : "red",
              }}
            >
              {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* BUTTON */}
            <button
              onClick={(e) => addToCart(e, p._id)}
              style={btnStyle}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔴 STYLES */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "15px",
  cursor: "pointer",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "340px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
};

const titleStyle = {
  fontSize: "16px",
  margin: "10px 0 5px",
};

const priceStyle = {
  fontWeight: "bold",
  marginBottom: "5px",
};

const stockStyle = {
  fontSize: "12px",
};

const btnStyle = {
  marginTop: "auto",
  padding: "10px",
  background: "#ff9900",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Home;