import React, { useState, useEffect } from "react";

const Image = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [isButtonHovered, setButtonHovered] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product")
      .then((response) => response.json())
      .then((data) => {
        setProductData({
          title: data.title,
          description: data.description,
          price: data.price,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleButtonClick = (size) => {
    setSelectedSize(size);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", marginLeft: "20%", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ flex: "1" }}>
        <img src="classic-tee.jpg" alt="tee image" style={{ width: "70%" }} />
      </div>

      <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", paddingLeft: "30px" }}>
        <h3 style={{ fontWeight: "normal" }}>{productData.title}</h3>
        <hr style={{ width: "50%", margin: "10px 0", borderColor: "#F6F6F7" }} />

        <h5 style={{ fontWeight: "bold" }}>{`$${productData.price}`}</h5>
        <hr style={{ width: "50%", margin: "10px 0", borderColor: "#F6F6F7" }} />
        <p style={{ color: "#888888" }}>{productData.description}</p>

        <div>
          <p>
            SIZE
            <span style={{ color: "red" }}>*</span> {selectedSize && <span>{selectedSize}</span>}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <button
            style={{
              width: "40px",
              height: "40px",
              margin: "5px",
              border: "1px solid #888888",
              backgroundColor: selectedSize === "S" ? "white" : "transparent",
              outline: selectedSize === "S" ? "2px solid black" : "none",
            }}
            onClick={() => handleButtonClick("S")}
          >
            S
          </button>
          <button
            style={{
              width: "40px",
              height: "40px",
              margin: "5px",
              border: "1px solid #888888",
              backgroundColor: selectedSize === "M" ? "white" : "transparent",
              outline: selectedSize === "M" ? "2px solid black" : "none",
            }}
            onClick={() => handleButtonClick("M")}
          >
            M
          </button>
          <button
            style={{
              width: "40px",
              height: "40px",
              margin: "5px",
              border: "1px solid #888888",
              backgroundColor: selectedSize === "L" ? "white" : "transparent",
              outline: selectedSize === "L" ? "2px solid black" : "none",
            }}
            onClick={() => handleButtonClick("L")}
          >
            L
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
          <button
            style={{
              width: "calc(40px * 3 + 20px * 2)",
              height: "40px",
              border: "1px solid black",
              backgroundColor: isButtonHovered ? "black" : "white",
              color: isButtonHovered ? "white" : "black",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;
