import React, { useEffect } from "react";
import "./overall.css";

import { IoTicketOutline } from "react-icons/io5";
import { TbBottleFilled } from "react-icons/tb";
import { MdAirportShuttle } from "react-icons/md";
import { FaPersonWalking } from "react-icons/fa6";
import { BsArrowRightShort } from "react-icons/bs";
import ReactWhatsapp from "react-whatsapp";

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
      id:2,
      imgSrc: img1,
      destTitle: 'Paint Ball',
      price: 'Rp. 135.000,00',
      category : 'Outbound',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
    },
  {
      id:3,
      imgSrc: img1,
      destTitle: 'Paket Outbound Anak',
      price: 'Rp. 80.000,00',
      category : 'Outbound',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
  },
  {
      id:4,
      imgSrc: img1,
      destTitle: 'Paket Outbound Offroad',
      price: 'Rp. 250.000,00',
      category : 'Outbound',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
  },
  {
      id:5,
      imgSrc: img1,
      destTitle: 'Paket Training Motivasi',
      price: 'Rp. 100.000,00',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
      category : 'Outbound'
  },
  {
      id:6,
      imgSrc: img1,
      destTitle: 'Paket Outbound Training',
      price: 'Rp. 100.000,00',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
      category : 'Outbound'
  },
  {
      id:7,
      imgSrc: img2,
      destTitle: 'Paket Batu Rafting',
      price: 'Rp. 195.000,00',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
      category : 'Rafting'
  },
  {
      id:8,
      imgSrc: img2,
      destTitle: 'Paket Outbound + Rafting',
      price: 'Rp. 285.000,00',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
      category : 'Rafting'
  },
  {
      id:9,
      imgSrc: img3,
      destTitle: 'Paket Trip Bromo',
      price: 'Rp. 243.000,00',
      desc: "Mengeksplore keindahan alam kawasan Kota Wisata Batu dan Kabupaten Malang Bagian Barat dengan menggunakan mobil jeep memiliki sensasi tersendiri yang menyenangkan dan dapat memacu adrenalin.",
      category : 'Trip'
  }
];

const Overall = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="overall container section">
      <div className="secContainer">
        <div data-aos="fade-up" data-aos-duration="2000" className="secIntro">
            <h2 className="secTitle">
                All Packages
            </h2>
            <p>
                From historical cities to natural spectaculars.
            </p>
        </div>

        <div className="mainContent">
            {
                semuaPaket.map(({ id, imgSrc, destTitle, price, category, desc }) => {
                return (
                    <div data-aos="fade-up" data-aos-duration="3300" className="singleOverall">
                        <div className="destImage">
                            <img src={imgSrc} alt={destTitle} />
                            <div>
                                <span className="category">
                                    {category}
                                </span>
                            </div>
                            <div>
                                <span className="price">
                                    {price}
                                </span>
                            </div>

                            <div className="overallBody">
                                <div className="title flex">
                                    <h4>
                                        {destTitle}
                                    </h4>
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
                                <p>{desc}</p>
                            </div>

                            <ReactWhatsapp number="+6288994115992" class="btn flex" message="Hello">
                                                <a href="#">Book Now</a>
                                                <BsArrowRightShort className="icon"/>
                            </ReactWhatsapp>
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
