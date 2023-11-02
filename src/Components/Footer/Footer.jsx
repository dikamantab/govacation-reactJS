import React, {useEffect} from 'react';
import './footer.css';
import {GiSurferVan} from 'react-icons/gi'
import {AiFillInstagram} from 'react-icons/ai'
import {FaTiktok} from 'react-icons/fa'
import {BiMap} from 'react-icons/bi'

import { useNavigate } from 'react-router-dom';

import 'aos/dist/aos.css'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <div className='footer'>
            <div className="secContainer container grid">
                <div  className="footerLogo">
                    <a href="#" className="logo flex">
                        <h1 className='flex'>
                            <GiSurferVan className="icon"/>
                            GoVacation.
                        </h1>
                    </a>
                </div>
                    

                <div className="footerLinks">
                    <span className="linkTitle">
                        Information
                    </span>
                    <li>
                        <a onClick={() => navigate('/categories')}>Categories</a>
                    </li>
                    <li>
                        <a onClick={() => navigate('/package')}>Package</a>
                    </li>
                    <li>
                        <a onClick={() => navigate('/benefit')}>Benefit</a>
                    </li>
                    <li>
                        <a onClick={() => navigate('/blog')}>Blog</a>
                    </li>
                </div>

                
                <div className="sosmed">
                    <span className="linkTitle">
                        Follow Us
                    </span>
                    <div className="socials flex">
                        <AiFillInstagram className="icon"/>
                        <FaTiktok className="icon"/>
                    </div>
                </div>

                <div className="location">
                    <BiMap className="icon"/>
                    <p>
                        Jl. Soekarno Hatta No.9, Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer