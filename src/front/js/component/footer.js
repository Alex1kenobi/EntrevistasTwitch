import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/a1k-entero.png";
import twitter from "../../img/twitter.svg" 

export const Footer = () => {
  return (
    <footer className="py-3"><div className="container">
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="d-flex mb-3">
        <a href="#">
          <img src={Logo} height={"50px"}/></a>

        
      </div>
      <div className="d-flex">
        <p className="mb-0 small text-muted">© 2022 Alex1kenobi. All rights reserved.</p>
      </div>
    </div>
    </div>
  </footer>
  );
};
