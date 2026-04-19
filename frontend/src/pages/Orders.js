import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={card}
        >
          {/* 🔴 ORDER HEADER */}
          <div style={header}>
            <div>
              <p style={label}>Order ID</p>
              <strong>{order._id}</strong>
            </div>

            <div>
              <p style={label}>Total Amount</p>
              <strong>₹{order.totalAmount}</strong>
            </div>

            <div>
              <p style={label}>Status</p>
              <span
                style={{
                  ...status,
                  background:
                    order.status === "paid" ? "#d4edda" : "#fff3cd",
                  color:
                    order.status === "paid" ? "green" : "#856404",
                }}
              >
                {order.status.toUpperCase()}
              </span>
            </div>
          </div>

          <hr style={{ marginBottom: "15px" }} />

          {/* 🔴 ITEMS */}
          {order.items.map((item) => (
  <div key={item._id} style={itemRow}>
    
    {/* IMAGE */}
    {item.product ? (
      <img
        src={item.product.image}
        alt={item.product.name}
        style={image}
      />
    ) : (
      <div
        style={{
          ...image,
          background: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
        }}
      >
        No Image
      </div>
    )}

    {/* DETAILS */}
    <div style={{ flex: 1 }}>
      <h4 style={{ marginBottom: "5px" }}>
        {item.product?.name || "Product Deleted"}
      </h4>

      <p style={subText}>
        Quantity: {item.quantity} × ₹{item.product?.price || 0}
      </p>
    </div>

  </div>
))}

          {/* 🔵 ADDRESS SECTION (NEW) */}
          <div style={addressBox}>
            <h4 style={{ marginBottom: "8px", color: "#2563eb" }}>
              Delivery Address
            </h4>

            <p style={text}>
              <strong>Name:</strong> {order.shippingAddress?.name}
            </p>

            <p style={text}>
              <strong>Phone:</strong> {order.shippingAddress?.phone}
            </p>

            <p style={text}>
              <strong>Address:</strong> {order.shippingAddress?.address}
            </p>

            <p style={text}>
              <strong>City:</strong> {order.shippingAddress?.city}
            </p>

            <p style={text}>
              <strong>Pincode:</strong> {order.shippingAddress?.pincode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 🔥 STYLES */

const card = {
  background: "#fff",
  borderRadius: "14px",
  padding: "22px",
  marginBottom: "25px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "15px",
};

const label = {
  fontSize: "12px",
  color: "gray",
};

const status = {
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
  fontSize: "12px",
};

const itemRow = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "15px",
};

const image = {
  width: "70px",
  height: "70px",
  objectFit: "cover",
  borderRadius: "8px",
};

const subText = {
  fontSize: "13px",
  color: "gray",
};

const addressBox = {
  marginTop: "15px",
  padding: "12px",
  borderRadius: "10px",
  background: "rgba(37, 99, 235, 0.05)",
  border: "1px solid rgba(37, 99, 235, 0.2)",
};

const text = {
  margin: "3px 0",
  fontSize: "14px",
};

export default Orders;