import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import "./order.css";

const Order = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    if (user) {
      setUserToken(user.token);
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/keranjang', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleOrderNow = async (item) => {
    if (!user) {
      alert("Anda harus login terlebih dahulu");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/pesanan', {
        id_barang: item.id,
        harga_barang: item.harga_barang,
        id_user: user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      });
      alert("Pemesanan berhasil dilakukan");
      fetchCartItems(); // Refresh the cart items after placing order
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Gagal melakukan pemesanan. Silakan coba lagi.");
    }
  };

  return (
    <div className="order-container">
      <h2>Keranjang Belanja Anda</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imgSrc} alt={item.destTitle} />
              <div className="item-details">
                <h4>{item.destTitle}</h4>
                <p>{item.desc}</p>
                <p>Harga: {item.price}</p>
                <button onClick={() => handleOrderNow(item)}>Pesan Sekarang</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
