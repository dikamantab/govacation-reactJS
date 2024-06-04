import React, {useEffect} from 'react';
import './offer.css';

import {IoTicketOutline} from 'react-icons/io5'
import {TbBottleFilled} from 'react-icons/tb'
import {MdAirportShuttle} from 'react-icons/md'
import {FaPersonWalking} from 'react-icons/fa6'
import {BsArrowRightShort} from 'react-icons/bs'
import ReactWhatsapp from "react-whatsapp";

import img5 from '../../Assets/3.jpg'
import img6 from '../../Assets/6.jpg'
import img7 from '../../Assets/4.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Offers = [
    {
        id:1,
        imgSrc: img5,
        destTitle: 'Bromo',
        price: 'Rp. 245.000,00',
    },
    {
        id:2,
        imgSrc: img6,
        destTitle: 'Outbound Training',
        price: 'Rp. 95.000,00',
    },
    {
        id:3,
        imgSrc: img6,
        destTitle: 'Batu Offroad',
        price: 'Rp. 550.000,00',
    },
    {
        id:4,
        imgSrc: img7,
        destTitle: 'Batu Rafting',
        price: 'Rp. 150.000,00',
    }
]

const Offer = () => {

    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])

    return (
        <section className='offer container section'>
            <div className="secContainer">
                <div data-aos="fade-up" data-aos-duration="2000" className="secIntro">
                    <h2 className="secTitle">
                        Special Offers
                    </h2>
                    <p>
                        From historical cities to natural spectaculars.
                    </p>
                </div>

                <div className="mainContent grid">

                    {
                        Offers.map(({id, imgSrc, destTitle, location, price}) => {
                            return(
                                <div data-aos="fade-up" data-aos-duration="3300" className="singleOffer">
                                    <div className="destImage">
                                        <img src={imgSrc} alt={destTitle} loading='lazy'/>
                                        <span className="discount">
                                            30% Off
                                        </span>
                                    </div>

                                    <div className="offerBody">
                                        <div className="price flex">
                                            <h4>
                                            {destTitle}
                                            </h4>
                                            <span className="status">
                                                For Rent
                                            </span>
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

                                        <div className="location flex">
                                            <small>{price}</small>
                                        </div>

                                        <ReactWhatsapp number="+6288994115992" class="btn flex" message="Hello">
                                                <a href="#">Book Now</a>
                                                <BsArrowRightShort className="icon"/>
                                        </ReactWhatsapp>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </section>
    )
}

export default Offer