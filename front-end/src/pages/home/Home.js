import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
const Home = () => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    async function loadProducts() {
      setLoadingProducts(true);
      await delay(2000);
      setLoadingProducts(false);
    }
    loadProducts();
  }, []);
  const loadCSS = css`
    margin: 150px 0 0 180px;
  `;
  if (loadingProducts === true) {
    return <ClipLoader size={80} color="#0b3783" css={loadCSS} />;
  }

  return (
    <>
      <h1 className="home-h1">Bem-Vindo!!</h1>
    </>
  );
};
export default Home;
