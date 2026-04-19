import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PaymentStatus from "./pages/PaymentStatus";
import { getToken } from "./utils/auth";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";



function Layout() {
  return (
    <div>
      {/* 🔴 GLOBAL NAVBAR */}
      <Navbar />

      {/* 🔴 PAGE CONTENT */}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* ✅ FIX: ADD HERE */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

function App() {
  const token = getToken();

  return (
  <Router>
    <Routes>
      {!token ? (
        <>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </>
      ) : (
        <Route path="/*" element={<Layout />} />
      )}
    </Routes>
  </Router>
);
}

export default App;