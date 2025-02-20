import feature1 from "../img/feature1.jpeg";
import feature2 from "../img/feature2.jpeg";
import feature3 from "../img/feature3.jpeg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export const Features = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
      return (
        <section className="features" id="featuress">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="features-bx wow zoomIn">
                            <h2>Features</h2>
                            <p>Stay In Control</p>
                            <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme features-slider">
                                <div className="item">
                                    <img src={feature1} alt="Image" />
                                    <h5>Geofencing & alerts</h5>
                                </div>
                                <div className="item">
                                    <img src={feature2} alt="Image" />
                                    <h5>Health monitoring</h5>
                                </div>
                                <div className="item">
                                    <img src={feature3} alt="Image" />
                                    <h5>Data & report</h5>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )
}