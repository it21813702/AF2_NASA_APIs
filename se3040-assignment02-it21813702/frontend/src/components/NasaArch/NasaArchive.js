
// Importing necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import '../NasaArch/NasaArchive.css';


// Functional component for NASA APOD API image Gallery
function NasaArchive() {

    //initializing state variables
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // effect hook to add event listener for page refresh when user navs to a link
    useEffect(() => {
        const handleNavigation = () => {
            window.location.reload(); //refresh the page when navigate to it
        };

        window.addEventListener('popstate', handleNavigation); //add event listener for page navigation
        return () => {
            window.removeEventListener('popstate', handleNavigation); //remove event listener when component unmounts
        };
    }, []);


    // function to get current date in yyyy-mm-dd format
    const getCurrentDate = () => {
        const today = new Date(); //get current date
        const year = today.getFullYear(); // "" year
        let month = today.getMonth() + 1; // ""montth
        let day = today.getDate(); // "" day of month

        // to add zero if month/day is single digit
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

         //return formatted date
        return `${year}-${month}-${day}`;
    };


    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if both start date and end date are empty
        if (!startDate && !endDate) {
            setError('Please select dates from the date pickers.');
            return; // early exit if both dates are empty
        }

        setError(''); // reset error message
        setLoading(true); // set loading to true when starting API request


        // making API request to NASA API to fetch images using axios
        try {
            const response = await axios.get(
                `https://api.nasa.gov/planetary/apod?${

                    //check if start date has value. then adds it to url if true
                    startDate ? `start_date=${startDate}&` : '' 
                
                }${endDate ? `end_date=${endDate}&` : ''}api_key=PigpLCxlUs6J1QkC0RqpJsRaxV6knB6RgUUCtm1I` //same scenario as above
            );
            setImages(response.data);

        } catch (error) {
            setError('Error fetching images. Please try again later.');
        
        } finally {
            setLoading(false); // Set loading to false when API request completes

        }
    };


    return (
        <Container >
            <header>
                {/* page title and error message */}
                <h1 className="mb-4 text-center">NASA Image Gallery</h1>
                {error && <p className="text-danger">{error}</p>} {/* style error mssg */}
                
                
                <Row className="mb-4">
                    <Col>
                        {/* displaying form for start and end dates */}
                        <form onSubmit={handleSubmit}>
                            <Row className="g-2 align-items-center">

                                <Col xs="auto" className="pe-0">
                                    {/* input for start date */}
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        max={getCurrentDate()} // restrict to current date
                                        className="form-control"
                                        style={{ width: '100%' }} // match width with title
                                    />
                                </Col>

                                <Col xs="auto" className="pe-0">

                                    {/* input for end date */}
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        max={getCurrentDate()} // Restrict to current date
                                        className="form-control"
                                        style={{ width: '100%' }} 
                                    />
                                </Col>

                                {/* form submit button */}
                                <Col xs="auto" className="ps-0">
                                    <button type="submit" className="btn btn-primary">
                                        Search
                                    </button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
        
                {/* spinner while loading */}
                {loading && (
                    <Row className="justify-content-center">
                        <Col xs="auto">

                            {/* spinner element */}
                            <Spinner animation="border" role="status" className='mb-4'>
                                <span className="visually-hidden"> </span>
                            </Spinner>
                        </Col>
                    </Row>
                )}
            </header>


            {/* display images in gallery layout */}
            <main>
                {/* display images if no errs and not loading */}
                {!error && !loading && (
                    <Row xs={1} md={4}>
                        {images.map((image) => (
                            <Col key={image.date} md={4} className='mb-5'>

                                <Card className="h-100" style={{ borderRadius: '15px' }}>
                                    {/* image held in card */}
                                    <Card.Img className="h-90" variant="top" src={image.url} style={{ borderRadius: '10px' }} />
                                    
                                    {/* contents of card */}
                                    <Card.Body className='mb-5'>
                                        <Card.Title className='text-center'>{image.title}</Card.Title>
                                        <Card.Text className='text-center'>{image.date}</Card.Text>
                                        <Card.Text className='text-justify'>{image.explanation}</Card.Text>
                                    </Card.Body>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </main>
        </Container>
    );
}

export default NasaArchive;
