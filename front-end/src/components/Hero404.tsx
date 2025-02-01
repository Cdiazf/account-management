import React, { useState } from "react";
import {
  CDBNavbar,
  CDBNavBrand,
  CDBNavbarNav,
  CDBNavToggle,
  CDBNavItem,
  CDBNavLink,
  CDBBtn,
  CDBCollapse,
} from "cdbreact";
import { Link } from "react-router-dom";
import "./Hero404.css";

const Hero404: React.FC = () => {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <div className="hero404">
      <div className="page-container">
        <header className="navigation">
          <CDBNavbar>
            <div className="bg-transparent p-0">
              <CDBNavBrand href="/">
                <img alt="logo" src="/img/pages/logo.png" width="25px" />
              </CDBNavBrand>
              <div onClick={() => setCollapse(!collapse)}>
                <CDBNavToggle />
              </div>
              <CDBCollapse id="navbarCollapse1" isOpen={collapse} navbar>
                <CDBNavbarNav left>
                  {["Home", "Resources", "Blog", "Contact", "Support"].map(
                    (item, index) => (
                      <CDBNavItem key={index} active={item === "Home"}>
                        <CDBBtn flat className="p-3 border-0 bg-transparent">
                          <CDBNavLink to="#">{item}</CDBNavLink>
                        </CDBBtn>
                      </CDBNavItem>
                    )
                  )}
                </CDBNavbarNav>
              </CDBCollapse>
            </div>
          </CDBNavbar>
        </header>
        <section className="page-body">
          <div className="message404">
            <h4 className="h1 font-weight-bold">Oops</h4>
            <h4 className="h3 my-4">Something went wrong</h4>
            <p>
              Sorry about that, hmmm... probably a missing page or the link's
              incorrect.
            </p>
            <CDBBtn flat color="dark" className="py-2 btn-block">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Back Home
              </Link>
            </CDBBtn>
          </div>
          <img className="image404" alt="404" src="/img/pages/hero404.png" />
        </section>
      </div>
    </div>
  );
};

export default Hero404;
