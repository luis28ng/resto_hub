import Carousel from 'react-bootstrap/Carousel';
import RestoHubImageOne from '../img/restohub1.jpeg';
import RestoHubImageTwo from '../img/restohub2.jpeg';
import RestoHubImageThree from '../img/restohub3.jpeg';

const HomePageCarousel = () => {
    return (
        <Carousel variant='dark'>
            <Carousel.Item>
                <img className="d-block w-100" src={RestoHubImageOne} /> 
                <Carousel.Caption>
                <h3>Find Good Food Fast</h3>
                <p>RestoHub allows you to make reservations to any participating restaurant!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={RestoHubImageTwo} />  
                <Carousel.Caption>
                <h3>Discover a New Dining Experience</h3>
                <p></p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={RestoHubImageThree} />  
                <Carousel.Caption>
                <h3>Restaurant-Friendly</h3>
                <p>RestoHub makes it easy for Restaurants to view, manage and serve patrons for a world-class experience.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomePageCarousel;
