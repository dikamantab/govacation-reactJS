import React, { useContext, useEffect, useState } from "react";
import "./overall.css";

import { IoTicketOutline } from "react-icons/io5";
import { TbBottleFilled } from "react-icons/tb";
import { MdAirportShuttle } from "react-icons/md";
import { FaPersonWalking } from "react-icons/fa6";
import { BsArrowRightShort } from "react-icons/bs";
import { UserContext } from "../../context/userContext";
import axios from 'axios';

// --------- image
import img1 from "../../Assets/paket/outbond.jpg";
import img2 from "../../Assets/paket/rafting.jpg";
import img3 from "../../Assets/paket/trip.jpg";

import Aos from "aos";
import "aos/dist/aos.css";

const semuaPaket = [
    {
        id: 1,
        imgSrc: img1,
        destTitle: "Paket Outbound Middle",
        price: "Rp. 115.000,00",
        category: "Outbound",
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
    },
    {
        id: 2,
        imgSrc: img1,
        destTitle: 'Paint Ball',
        price: 'Rp. 135.000,00',
        category: 'Outbound',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
    },
    {
        id: 3,
        imgSrc: img1,
        destTitle: 'Paket Outbound Anak',
        price: 'Rp. 80.000,00',
        category: 'Outbound',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
    },
    {
        id: 4,
        imgSrc: img1,
        destTitle: 'Paket Outbound Offroad',
        price: 'Rp. 250.000,00',
        category: 'Outbound',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
    },
    {
        id: 5,
        imgSrc: img1,
        destTitle: 'Paket Training Motivasi',
        price: 'Rp. 100.000,00',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
        category: 'Outbound'
    },
    {
        id: 6,
        imgSrc: img1,
        destTitle: 'Paket Outbound Training',
        price: 'Rp. 100.000,00',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
        category: 'Outbound'
    },
    {
        id: 7,
        imgSrc: img2,
        destTitle: 'Paket Batu Rafting',
        price: 'Rp. 195.000,00',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
        category: 'Rafting'
    },
    {
        id: 8,
        imgSrc: img2,
        destTitle: 'Paket Outbound + Rafting',
        price: 'Rp. 285.000,00',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
        category: 'Rafting'
    },
    {
        id: 9,
        imgSrc: img3,
        destTitle: 'Paket Trip Bromo',
        price: 'Rp. 243.000,00',
        desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
        category: 'Trip'
    }
];

const Overall = () => {
    const [cart, setCart] = useState([]);
    const [cartQuantity, setCartQuantity] = useState({});
    const { user } = useContext(UserContext);
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setUserToken(storedToken);
        }
    }, []);

    const addToCart = async (item) => {
        if (!user) {
            alert("Anda harus login terlebih dahulu");
            return;
        }

        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            alert("Token pengguna tidak tersedia. Silakan coba lagi.");
            return;
        }

        setUserToken(storedToken);

        const updatedCart = [...cart, item];
        setCart(updatedCart);

        const updatedQuantity = { ...cartQuantity };
        updatedQuantity[item.id] = (updatedQuantity[item.id] || 0) + 1;
        setCartQuantity(updatedQuantity);

        const cartData = {
            id_user: user.id,
            id_barang: item.id,
            harga_barang: parseInt(item.price.replace(/\D/g, '')),
        };

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/keranjang/${item.id}`, cartData, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                }
            });
            alert("Item berhasil ditambahkan ke keranjang");
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menambahkan item ke keranjang. Silakan coba lagi.");
            updatedQuantity[item.id] = 0;
            setCartQuantity(updatedQuantity);
        }
    };

    const removeFromCart = async (item) => {
        const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
        setCart(newCart);

        const updatedQuantity = { ...cartQuantity };
        updatedQuantity[item.id] = (updatedQuantity[item.id] || 0) - 1;
        if (updatedQuantity[item.id] <= 0) {
            delete updatedQuantity[item.id];
        }
        setCartQuantity(updatedQuantity);

        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            alert("Token pengguna tidak tersedia. Silakan coba lagi.");
            return;
        }

        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/keranjang/${item.id}`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                }
            });
            alert("Item berhasil dihapus dari keranjang");
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menghapus item dari keranjang. Silakan coba lagi.");
        }
    };
    const handleOrderNow = async (item) => {
        if (!user) {
            alert("Anda harus login terlebih dahulu");
            return;
        }

        const orderData = {
            id: item.id,
            id_user: user.id,
            harga_barang: parseInt(item.price.replace(/\D/g, '')),
        };

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/keranjang/${item.id}`, orderData, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                }
            });
            alert("Pemesanan berhasil dilakukan");
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal melakukan pemesanan. Silakan coba lagi.");
        }
    };
    return (
        <section className="overall container section">
            <div className="secContainer">
                <div
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    className="secIntro"
                >
                    <h2 className="secTitle">All Packages</h2>
                    <p>From historical cities to natural spectaculars.</p>
                </div>

                <div className="mainContent">
                    {semuaPaket.map(
                        ({
                            id,
                            imgSrc,
                            destTitle,
                            price,
                            category,
                            desc
                        }) => {
                            const item = { id, destTitle, price, category, desc, imgSrc };
                            return (
                                <div
                                    key={item.id}
                                    data-aos="fade-up"
                                    data-aos-duration="3300"
                                    className="singleOverall"
                                >
                                    <div className="destImage">
                                        <img src={item.imgSrc} alt={item.destTitle} />
                                        <div>
                                            <span className="category">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="price">
                                                {item.price}
                                            </span>
                                        </div>

                                        <div className="overallBody">
                                            <div className="title flex">
                                                <h4>{item.destTitle}</h4>
                                            </div>

                                            <div className="amenities flex">
                                                <div className="singleAmenity flex">
                                                    <IoTicketOutline className="icon" />
                                                    <small>Free Ticket</small>
                                                </div>
                                                <div className="singleAmenity flex">
                                                    <TbBottleFilled className="icon" />
                                                    <small>Mineral Water</small>
                                                </div>
                                                <div className="singleAmenity flex">
                                                    <MdAirportShuttle className="icon" />
                                                    <small>Jeep</small>
                                                </div>
                                                <div className="singleAmenity flex">
                                                    <FaPersonWalking className="icon" />
                                                    <small>Guide</small>
                                                </div>
                                            </div>

                                            <div className="desc">
                                                <p>{item.desc}</p>
                                            </div>

                                            <div className="quantityBtn">
                                                <button onClick={() => addToCart(item)}>+</button>
                                                <span>{cartQuantity[item.id] || 0}</span> {/* Gunakan id paket sebagai kunci untuk cartQuantity */}
                                                <button onClick={() => removeFromCart(item)}>-</button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleOrderNow(item)
                                                }
                                                className="btnOrderNow"
                                            >
                                                Pesan Sekarang
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
};
export default Overall;

