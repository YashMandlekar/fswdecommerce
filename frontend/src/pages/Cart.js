import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const removeItem = async (id) => {
    await API.post("/cart/remove", { productId: id });
    fetchCart();
  };

  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;

    await API.post("/cart/update", {
      productId: id,
      quantity: newQty,
    });

    fetchCart();
  };

  const getTotal = () => {
    return cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="page container">
      <h2 style={{ marginBottom: "25px" }}>My Cart</h2>

      {cart.items.length === 0 && (
        <p style={{ color: "gray" }}>Cart is empty</p>
      )}

      {cart.items.map((item) => (
        <div key={item._id} style={card}>
          
          {/* IMAGE */}
          <img
            src={item.product.image}
            alt={item.product.name}
            style={image}
          />

          {/* DETAILS */}
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: "5px" }}>
              {item.product.name}
            </h3>

            <p style={{ fontWeight: "bold" }}>
              ₹{item.product.price}
            </p>

            {/* QUANTITY */}
            <div style={qtyBox}>
              <button
                onClick={() =>
                  updateQty(item.product._id, item.quantity - 1)
                }
                disabled={item.quantity === 1}
                style={qtyBtn}
              >
                -
              </button>

              <span style={{ margin: "0 12px", fontWeight: "bold" }}>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQty(item.product._id, item.quantity + 1)
                }
                style={qtyBtn}
              >
                +
              </button>
            </div>

            <p style={{ marginTop: "10px" }}>
              Subtotal: <strong>₹{item.product.price * item.quantity}</strong>
            </p>
          </div>

          {/* REMOVE */}
          <button
            onClick={() => removeItem(item.product._id)}
            style={removeBtn}
          >
            Remove
          </button>
        </div>
      ))}

      {/* TOTAL SECTION */}
      {cart.items.length > 0 && (
        <div style={totalBox}>
          <h2>Total: ₹{getTotal()}</h2>

          <button onClick={goToCheckout} style={checkoutBtn}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

/* 🔴 STYLES */

const card = {
  display: "flex",
  alignItems: "center",
  background: "#fff",
  padding: "18px",
  marginBottom: "18px",
  borderRadius: "12px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  gap: "20px",
};

const image = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "10px",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
};

const qtyBtn = {
  padding: "6px 12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
  background: "#f1f5f9",
};

const removeBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const totalBox = {
  marginTop: "30px",
  padding: "20px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const checkoutBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Cart;