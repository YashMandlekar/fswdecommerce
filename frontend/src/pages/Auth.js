import { useState } from "react";
import API from "../services/api";
import { setToken } from "../utils/auth";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔴 LOGIN
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      setToken(res.data.token);

      // 🔥 AUTO REFRESH
      window.location.href = "/";

    } catch (err) {
  console.log("LOGIN ERROR:", err);
  alert("Login failed");
}
  };

  // 🔴 REGISTER
  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);

      alert("Registered successfully");
      setIsLogin(true); // switch to login after register

    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div style={container}>
      <h1 style={heading}>Mobile वाला</h1>

      <div style={card}>
        <h2 style={{ textAlign: "center" }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* 🔴 NAME (ONLY REGISTER) */}
        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={input}
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          style={input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={input}
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          style={btn}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* 🔁 SWITCH BUTTON */}
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {isLogin ? "Don't have account?" : "Already have account?"}
        </p>

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={switchBtn}
        >
          {isLogin ? "Go to Register" : "Go to Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;

/* 🔥 STYLES */

const container = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
};

const heading = {
  color: "#fff",
  marginBottom: "25px",
  fontSize: "32px",
  fontWeight: "bold",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "14px",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const btn = {
  background: "#2563eb",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  transition: "0.3s",
};

const switchBtn = {
  background: "transparent",
  color: "#2563eb",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};