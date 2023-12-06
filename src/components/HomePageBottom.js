import Carousel from 'react-bootstrap/Carousel';
import RestoHubImageOne from '../img/food1.jpg';
import RestoHubImageTwo from '../img/food2.jpg';
import RestoHubImageThree from '../img/food3.jpg';

const HomePageCarouselBottom = () => {
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
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomePageCarouselBottom;
