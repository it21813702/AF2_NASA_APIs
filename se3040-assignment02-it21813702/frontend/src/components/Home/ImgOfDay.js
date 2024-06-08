import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Home/ImgOfDay.css';
import axios from 'axios';

//function to get image fo the day from NASA APOD API
function ImgOfDay() {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageOfTheDay = async () => {
      try {
        const response = await axios.get(
          'https://api.nasa.gov/planetary/apod?api_key=PigpLCxlUs6J1QkC0RqpJsRaxV6knB6RgUUCtm1I'
        );
        setImageData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchImageOfTheDay();
  }, []);


  if (isLoading) {
    return <div className='container'>Loading...</div>;
  }

  if (error) {
    return <div className='container'>Error: {error}</div>;
  }

  //display
  return (    
    <section id="astroImg" className="block astroImg-block">
      <Container fluid>
        <div className="title-holder">
          <h2>TODAY</h2>
          <div className="subtitle" >Image Of The Day</div>
        </div>

        {/*display image*/}
        <Row>
          <Col sm={12} md={6} className='order-md-1'>
            <Image 
              src={imageData.url} 
              className='img-fluid mb-3'
              style={{
                borderRadius: '2em',
                padding: '1em',
                
              }}
            />
          </Col>


          <Col sm={12} md={6} className='order-md-2'>
            <h2 className="img-title">{imageData.title}</h2>
            <p className="img-explanation">{imageData.explanation}</p>

            {/* button with link to nasa arch page*/}
            <Link
               className='btn btn-primary' 
               to='/nasa-archive'
               style={{ 
                 backgroundColor: '#FC3D21', 
                 borderRadius: '10px', 
                 borderColor: '#FC3D21',
                 fontWeight: 'bold', 
                 textDecoration: 'none',
                 display: 'inline-block',
                 padding: '10px 20px',
                 transition: 'background-color 0.3s',
               }}>
                
                More images... 
                
              </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ImgOfDay;