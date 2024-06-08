
import Carousel from 'react-bootstrap/Carousel';
import '../Home/HeroSection.css';

//details of images in carousel
var heroData = [
  {
    id: 1,
    title: 'Discover The Mysteries of Deep Space',
    description:'lorem ipsum dcwbwvh',
    image: require('../images/astro1.jpg')

  },
  {
    id: 2,
    title: 'There is more to see than meets the eye..',
    description:'lorem ipsum wcwhbcwv',
    image: require('../images/astro2.jpg')

  }

]

//functional component for displaying images in  carousel in home page
function HeroSection() {
  return (
    <section id="home" className="hero-block">
       <Carousel>
          {
            heroData.map(hero => {
              return (
                
                <Carousel.Item key={hero.id}>
                  <img
                    className="heroImg"
                    src={hero.image}
                    alt={"slide " + hero.id}
                  />

                  <Carousel.Caption>
                    <h1>{hero.title}</h1>
                    <p>{hero.description}</p>
                    
                  </Carousel.Caption>   
                            
                </Carousel.Item>
              );
            })
          }
      </Carousel>
    </section>
  );
}

//export component
export default HeroSection; 
