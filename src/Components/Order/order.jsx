import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import "./order.css";

const Order = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token"); // Adjust based on where you store your token
      const response = await axios.get(`http://127.0.0.1:8000/api/keranjang`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token"); // Adjust based on where you store your token
      await axios.delete(`http://127.0.0.1:8000/api/keranjang/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter(item => item.id !== itemId));
      Swal.fire({
        title: 'Berhasil!',
        text: 'Item berhasil dihapus dari keranjang',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Error deleting cart item:", error);
      Swal.fire({
        title: 'Gagal!',
        text: 'Item gagal dihapus dari keranjang',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const showCheckoutModal = () => {
    const items = cartItems.map(item => `<p>${item.nama_paket} - ${item.harga_barang}</p>`).join('');
    const total = cartItems.reduce((sum, item) => sum + item.harga_barang, 0);

    Swal.fire({
      title: 'Detail Pemesanan',
      html: `
        <div>
          ${items}
          <hr/>
          <p><strong>Total: ${total}</strong></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Checkout',
      confirmButtonColor: 'tomato',
      cancelButtonText: 'Batal',
      preConfirm: checkoutCart,
    });
  };

  const checkoutCart = async () => {
    try {
      const token = localStorage.getItem("token"); // Adjust based on where you store your token
      const promises = cartItems.map(item =>
        axios.post(`http://127.0.0.1:8000/api/transaksi/${item.id}`, { status: 'pending' }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      await Promise.all(promises);
      setCartItems([]);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Checkout berhasil',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire({
        title: 'Gagal!',
        text: 'Checkout gagal',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="order-container">
      <h2>Keranjang Belanja Anda</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Nama Paket</th>
                <th>Harga Barang</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama_paket}</td>
                  <td>{item.harga_barang}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteCartItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="checkout-button" onClick={showCheckoutModal}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Order;
