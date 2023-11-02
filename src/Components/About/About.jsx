import React, {useEffect} from 'react';
import './about.css';
import img1 from '../../Assets/benefit/img1.jpg'
import img2 from '../../Assets/benefit/img2.jpg'
import img3 from '../../Assets/benefit/img3.jpg'
import img4 from '../../Assets/benefit/img4.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css'

const About = () => {

    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])

    return (
        <section className='about section'>
            <div className="secContainer">
                <div className="title">
                    <h2>Our Benefit</h2>
                </div>

                <div className="mainContent container grid">
                    <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
                        <img src={img1} alt="Image Name"/>
                        <h3>Easiness</h3>
                        <p>
                            Research shows that a chance to break away from the normal rhythms of daily life reduces stress and improves health and well-being
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="2500" className="singleItem">
                        <img src={img2} alt="Image Name" />
                        <h3>Trusted</h3>
                        <p>
                            Research shows that a chance to break away from the normal rhythms of daily life reduces stress and improves health and well-being
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <img src={img3} alt="Image Name" />
                        <h3>Best Service</h3>
                        <p>
                            Research shows that a chance to break away from the normal rhythms of daily life reduces stress and improves health and well-being
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <img src={img4} alt="Image Name" />
                        <h3>Exciting Adventure</h3>
                        <p>
                            Research shows that a chance to break away from the normal rhythms of daily life reduces stress and improves health and well-being
                        </p>
                    </div>
                </div>

                {/* <div className="videoCard container">
                    <div className="cardContent grid">
                        <div className="cardText">
                            <h2>Wonderful House experience in there!</h2>
                            <p></p>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default About