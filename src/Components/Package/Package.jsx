import React, {useEffect} from 'react';
import './package.css';
import {BsArrowLeftShort} from 'react-icons/bs'
import {BsArrowRightShort} from 'react-icons/bs'
import {BsDot} from 'react-icons/bs'
import img from '../../Assets/3.1.jpg'
import img2 from '../../Assets/3.jpg'
import img3 from '../../Assets/4.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css'
import Offer from '../Offer/Offer';

import { useNavigate } from 'react-router-dom';

const Data = [
    {
        id:1,
        imgSrc: img,
        destTitle: 'Outbound',
        location: 'Outbound atau mengacu pada rekreasi yang dilakukan di luar ruangan, paling sering di alam. Kegiatan yang mencakup outbound berbeda-beda tergantung pada lingkungan fisik tempat kegiatan tersebut dilakukan.',
    },
    {
        id:2,
        imgSrc: img2,
        destTitle: 'Trip',
        location: 'Trip adalah pergerakan orang antarlokasi geografi yang jauh. Trip juga dapat meliputi persinggahan yang relatif singkat antara pergerakan berkelanjutan.',
    },
    {
        id:3,
        imgSrc: img3,
        destTitle: 'Rafting',
        location: 'Rafting adalah suatu aktifitas pengarungan bagian alur sungai yang berjeram/riam, dengan menggunakan wahana tertentu.',
    }
]

const Package = () => {

    const navigate = useNavigate()

    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])

    return (
        <>
        <section className="package section container">
            <div className="secContainer">
                <div className="secHeader flex">
                    <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
                        <h2 className="secTitle">
                            Pilih Paket Anda
                        </h2>
                        <p>
                            Kami menawarkan beberapa paket perjalanan untuk anda. Silahkan lihat dibawah ini untuk detailnya. 
                        </p>
                    </div>
                </div>

                <div className="mainContent grid">
                    {
                        Data.map(({id, imgSrc, destTitle, location}) => {
                            return(
                                <div data-aos="fade-up" className="destination">
                                    <div className="destImage">
                                        <img src={imgSrc} alt="Image title" />
                                        <div className="overlayInfo">
                                            <h3>{destTitle}</h3>
                                            <p>
                                                {location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="destFooter">
                                        <div className="number">
                                            0{id}
                                        </div>
                                        <div className="destText flex">
                                            <h6>{destTitle}</h6>
                                            <span className='flex'>
                                            <BsArrowRightShort className="icon" onClick={() => navigate('/package')}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
        <Offer />
        </>
    )
}

export default Package