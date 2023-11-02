import React, { useState } from "react";
import "./navbar.css";
import { GiSurferVan } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineBars3 } from "react-icons/hi2";
import ReactWhatsapp from "react-whatsapp";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // show navbar
  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  // remove navbar
  const removeNav = () => {
    setActive("navBar");
  };
  //bg navbar
  const [transparent, setTransparent] = useState("header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader");
    } else {
      setTransparent("header");
    }
  };
  window.addEventListener("scroll", addBg);

  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="logoDiv">
          <a href="/" className="logo">
            <h1 className="flex">
              <GiSurferVan className="icon" />
              GoVacation.
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a onClick={() => navigate("/categories")} className="navLink">
                Categories
              </a>
            </li>
            <li className="navItem">
              <a onClick={() => navigate("/package")} className="navLink">
                Package
              </a>
            </li>
            <li className="navItem">
              <a onClick={() => navigate("/benefit")} className="navLink">
                Benefit
              </a>
            </li>
            <li className="navItem">
              <a onClick={() => navigate("/blog")} className="navLink">
                Blog
              </a>
            </li>

            <ReactWhatsapp number="+6288994115992" class="btn" message="Hello">
              <div className="headerBtns flex">
                  <a href="#">Contact Us</a>
              </div>
            </ReactWhatsapp>
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <HiOutlineBars3 className="icon" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
