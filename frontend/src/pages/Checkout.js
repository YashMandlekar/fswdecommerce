import { useState } from "react";
import API from "../services/api";
import { load } from "@cashfreepayments/cashfree-js";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      // ✅ VALIDATION
      if (
        !form.name ||
        !form.phone ||
        !form.address ||
        !form.city ||
        !form.pincode
      ) {
        alert("Fill all fields");
        return;
      }

      // ✅ 1. CREATE ORDER
      const orderRes = await API.post("/orders/create", {
        shippingAddress: form,
      });

      if (!orderRes.data || !orderRes.data._id) {
        throw new Error("Order creation failed");
      }

      const orderId = orderRes.data._id;
      const amount = orderRes.data.totalAmount;

      // ✅ 2. CALL BACKEND PAYMENT API
      const paymentRes = await API.post("/payment/create", {
        orderId,
        amount,
      });

      // ✅ 3. REDIRECT TO CASHFREE (FROM BACKEND LINK)
      const sessionId = paymentRes.data?.payment_session_id;

if (!sessionId) {
  throw new Error("Session ID not received");
}

const cashfree = await load({
  mode: "sandbox",
});

cashfree.checkout({
  paymentSessionId: sessionId,
  redirectTarget: "_self",
});

    } catch (err) {
      console.error("❌ PAYMENT ERROR:", err.response?.data || err.message);

      alert(
        err.response?.data?.msg ||
        err.message ||
        "Payment failed"
      );
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
        Checkout
      </h2>

      <div style={box}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={input} />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={input} />
        <input name="address" placeholder="Full Address" value={form.address} onChange={handleChange} style={input} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} style={input} />
        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} style={input} />

        <button onClick={placeOrder} style={btn}>
          Place Order
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const box = {
  background: "#fff",
  padding: "30px",
  borderRadius: "14px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "650px",
  width: "100%",
  margin: "auto",
  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
};

const input = {
  padding: "13px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const btn = {
  background: "#2563eb",
  color: "#fff",
  padding: "15px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Checkout;