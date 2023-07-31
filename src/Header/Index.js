import React from "react";

const Header = () => {
  return (
    <nav style={{ backgroundColor: "#F6F6F7", paddingTop:"20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 25px", 
        }}
      >
        <div
          style={{
            cursor: "pointer",
            marginRight: "20%",
            marginTop:"10px",
            color:"#888888",
            fontsize: "10px", 
          }}
        >
          My Cart
        </div>
      </div>
    </nav>
  );
};

export default Header;
