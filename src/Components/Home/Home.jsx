import React, {useEffect} from 'react';
import './home.css';

import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom';

// -------- import
import Package from '../Package/Package';
import About from '../About/About';
import Review from '../Review/Review';

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])

    return (
        <>
        <section className='home'>
            {/* <div className="overlay"></div> */}
            <div className="secContainer">
                <div className="homeText">
                    <h1 data-aos="fade-up" className="title">
                        Jelajahi Wisata <br /> di Kota Malang Bersama Kami
                    </h1>
                    <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
                        Jelajahi Destinasi Terbaik Bersama Kami dalam Petualangan Kelompok Tak Terlupakan. Temukan Open Trip Anda Hari Ini!
                    </p>

                    <button data-aos="fade-up" data-aos-duration="3000" className='btn'>
                        <a onClick={() => navigate('/package')}>Explore Now</a>
                    </button>
                </div>
            </div>
        </section>
        
        <Package />
        <About />
        <Review />
        </>
    
    )
    
}

export default Home