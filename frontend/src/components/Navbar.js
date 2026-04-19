import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./logoji.png";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <div style={navStyle}>
      
      {/* 🔵 LEFT: LOGO */}
      <div style={logoBox} onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="logo"
          style={logoImg}
        />
        <h2 style={{ margin: 0 }}>आपका Mobile वाला</h2>
      </div>

      {/* 🔵 CENTER: SEARCH */}
      <div style={searchBox}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          style={searchInput}
        />
      </div>

      {/* 🔵 RIGHT: BUTTONS */}
      <div>
        <button onClick={() => navigate("/")} style={btnStyle}>Home</button>
        <button onClick={() => navigate("/cart")} style={btnStyle}>Cart</button>
        <button onClick={() => navigate("/orders")} style={btnStyle}>Orders</button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          style={logoutBtn}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "18px 30px",
  background: "#ff9900",
  color: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};

const logoImg = {
  width: "130px",
  height: "60px",
};

const searchBox = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const searchInput = {
  width: "60%",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  fontSize: "14px",
};

const btnStyle = {
  marginLeft: "10px",
  padding: "8px 12px",
  background: "#5881d7",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const logoutBtn = {
  marginLeft: "10px",
  padding: "8px 12px",
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Navbar;