import Carousel from 'react-bootstrap/Carousel';
import RestoHubImageOne from '../img/restohub1.jpeg';
import RestoHubImageTwo from '../img/restohub2.jpeg';
import RestoHubImageThree from '../img/restohub3.jpeg';

const textStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: '20px',
    borderRadius: '5px',
};

const HomePageCarousel = () => {
    return (
        <Carousel variant='dark'>
            <Carousel.Item>
                <div className="carousel-image-container">
                    <img className="d-block w-100" src={RestoHubImageOne} alt="Slide 1" />
                    <div style={textStyles}>
                        <h3>Find Good Food Fast</h3>
                        <p>RestoHub allows you to make reservations to any participating restaurant!</p>
                        <p>WELCOME</p> {/* Add the constant text here */}
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-image-container">
                    <img className="d-block w-100" src={RestoHubImageTwo} alt="Slide 2" />
                    <div style={textStyles}>
                        <h3>Discover a New Dining Experience</h3>
                        <p>WELCOME</p> {/* Add the constant text here */}
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-image-container">
                    <img className="d-block w-100" src={RestoHubImageThree} alt="Slide 3" />
                    <div style={textStyles}>
                        <h3>Restaurant-Friendly</h3>
                        <p>RestoHub makes it easy for Restaurants to view, manage and serve patrons for a world-class experience.</p>
                        <p>WELCOME</p> {/* Add the constant text here */}
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomePageCarousel;
