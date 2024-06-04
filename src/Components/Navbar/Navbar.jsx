import React, { useState, useContext } from "react";
import "./navbar.css";
import { GiSurferVan } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = ({ setShowLogin, setShowLogout }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  const removeNav = () => {
    setActive("navBar");
  };

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
            <li className="btn">
              <div className="headerBtns flex">
                {user ? (
                  <>
                    <a onClick={() => setShowLogout(true)} className="navLink">Hai, {user.name}</a>
                  </>
                ) : (
                  <a onClick={() => setShowLogin(true)}>Login</a>
                )}
              </div>
            </li>
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
