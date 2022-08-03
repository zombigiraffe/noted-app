import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Arron Mixell Dev {year}</p>
    </footer>
  );
}

export default Footer;