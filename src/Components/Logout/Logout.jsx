import React, { useContext } from 'react';
import './logout.css';
import { UserContext } from '../../context/userContext';
import Swal from 'sweetalert2';

const Logout = ({ setShowLogout }) => {
          const { setUser } = useContext(UserContext);

          const handleLogout = () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('user');
                    setUser(null);
                    Swal.fire('Success!', 'Logout successful!', 'success');
                    setShowLogout(false);
                    window.location.href = "/";
          };

          return (
                    <div className='logout-popup'>
                              <div className="logout-popup-container">
                                        <div className="logout-popup-header">
                                                  <h2>Logout</h2>
                                                  <img className="close-icon" onClick={() => setShowLogout(false)} src={require('../../Assets/close.png')} alt="Close" />
                                        </div>
                                        <div className="logout-popup-content">
                                                  <p>Apakah anda ingin keluar?</p>
                                                  <button onClick={handleLogout} className="logout-button">Yes, Logout</button>
                                                  <button onClick={() => setShowLogout(false)} className="cancel-button">Cancel</button>
                                        </div>
                              </div>
                    </div>
          );
};

export default Logout;
