import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import "./order.css";

const Order = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [paymentImage, setPaymentImage] = useState(null);

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchTransactions();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
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

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://127.0.0.1:8000/api/transaksi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
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
          <input type="file" id="paymentImage" class="swal2-input" placeholder="Upload Bukti Pembayaran" accept="image/*">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Checkout',
      confirmButtonColor: 'tomato',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const fileInput = Swal.getPopup().querySelector('#paymentImage');
        if (fileInput.files.length === 0) {
          Swal.showValidationMessage('Anda harus mengunggah bukti pembayaran');
        } else {
          setPaymentImage(fileInput.files[0]);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        checkoutCart();
      }
    });
  };

  const checkoutCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("gambar", paymentImage);

      const promises = cartItems.map(item => {
        formData.append("status", "pending");
        return axios.post(`http://127.0.0.1:8000/api/transaksi/${item.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      });
      await Promise.all(promises);

      setCartItems([]);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Checkout berhasil',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchTransactions();
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
      {transactions.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Nama Paket</th>
                <th>Harga Barang</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.nama_paket}</td>
                  <td>{transaction.harga_barang}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Order;
