import React, { useContext } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './FloatingButton.css';

const FloatingButton = ({ setShowLogin }) => {
          const { user } = useContext(UserContext);
          const navigate = useNavigate();

          const handleCartClick = () => {
                    if (user) {
                              navigate('/order');
                    } else {
                              setShowLogin(true);
                    }
          };

          return (
                    <button className="floatingCartButton" onClick={handleCartClick}>
                              <IoCartOutline className="floatingCartIcon" />
                    </button>
          );
};

export default FloatingButton;
