
//import necessary modules, components
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Alert, Button, Card } from 'react-bootstrap';
import '../MarsRov/MarsRovImg.css';

// functional component for displaying Mars Rover photos
const MarsRovImg = () => {

    //state variables
    const [sol, setSol] = useState('');
    const [camera, setCamera] = useState('');
    const [manifest, setManifest] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showManifest, setShowManifest] = useState(false);

    //NASA API KEY
    const apiKey = 'PigpLCxlUs6J1QkC0RqpJsRaxV6knB6RgUUCtm1I';


    //function to fetch mission manifest data from NASA API    
    const fetchMissionManifest = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${apiKey}`);

            if (!response.ok) {
                throw new Error('Failed to get mission manifest');
            }

            const data = await response.json();
            setManifest(data.photo_manifest);
            setError(null); // Reset error state

        } catch (error) {
            console.error('Error fetching mission manifest:', error);
            setError('Failed to fetch mission manifest');
        }
    };


    //function to get images from rover
    const fetchRoverPhotos = async () => {
        if (!sol) {
            setError('Please enter a valid SOL.');
            return;
        }
        if (isNaN(sol) || sol < 0) {
            setError('Please enter a valid positive number for SOL.');
            return;
        }
        if (!camera) {
            setError('Please select a camera.');
            return;
        }
        if (manifest && parseInt(sol) > manifest.max_sol) {
            setError(`Please enter a SOL less than or equal to the latest SOL (${manifest.max_sol}).`);
            return;
        }
        setLoading(true);
        setError(null);


        //send request to API
        try {
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch photos');
            }

            const data = await response.json();
            setPhotos(data.photos.slice(0, 15)); // Limit to maximum 15 photos

            if (data.photos.length === 0) {
                setError('No images available..'); //display error if no images available on selected sol+camera
            }

        } catch (error) {
            console.error('Error fetching photos:', error);
            setError('Failed to fetch photos');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMissionManifest();
    }, []);


    //function to show/hide manifest contents
    const toggleManifest = () => {
        setShowManifest(!showManifest);
    };


    //display
    return (
        <Container>
            <section>
                {/* header */}
                <Row className="justify-content-center">
                    <Col>
                        <header className="text-center my-4">
                            <h1>Mars Rover Photos</h1>
                        </header>
                    </Col>
                </Row>

                {/* manifest section */}
                <Row>
                    <Col xs={12} md={7} className='manifest-col'>
                        <Button variant="secondary" onClick={toggleManifest} className="manifest-button" >
                            {showManifest ? 'Hide Mission Manifest' : 'Show Mission Manifest'}
                        </Button>
                        {showManifest && manifest && (
                            <div className='manifest-details'>
                                <h3>Mission Manifest</h3>
                                <p>Rover Name: {manifest.name}</p>
                                <p>Landing Date: {manifest.landing_date}</p>
                                <p>Launch Date: {manifest.launch_date}</p>
                                <p>Status: {manifest.status}</p>
                                <p>Max SOL: {manifest.max_sol}</p>
                            </div>
                        )}
                    </Col>


                    {/* form for sol and camera */}
                    <Col xs={12} md={5}>
                        <Form>
                            {/* sol entry */}
                            <Form.Group controlId="formSOL" className='form'>
                                <Form.Label>Enter Sol:</Form.Label>
                                <Form.Control 
                                    className="mb-3" 
                                    type="number" //accepts only numbers
                                    placeholder="Enter Sol" 
                                    value={sol} 
                                    onChange={(e) => setSol(e.target.value)} //update state with new value
                                />
                            </Form.Group>

                            {/* camera seelction */}
                            <Form.Group controlId="formCamera" className='form'>
                                <Form.Label>Filter by Camera:</Form.Label>
                                <Form.Control as="select" value={camera} onChange={(e) => setCamera(e.target.value)}>
                                    <option value="">Select Camera</option>
                                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                                    <option value="MAST">Mast Camera</option>
                                    <option value="CHEMCAM">Chemistry and Camera Complex</option>
                                    <option value="MAHLI">Mars Hand Lens Imager</option>
                                    <option value="MARDI">Mars Descent Imager</option>
                                    <option value="NAVCAM">Navigation Camera</option>
                                </Form.Control>
                            </Form.Group>
                            <Button 
                                className='photo-button' 
                                variant="primary" 
                                onClick={fetchRoverPhotos} 
                                disabled={!sol}> 
                                    Retrieve Photos
                            </Button>
                        </Form>
                    </Col>
                </Row>

                {/* load spinner and err message */}
                <Row>
                    <Col className="text-center">
                        {loading ? ( //display spinner if loading is true
                            <Spinner className='spinner' animation="border" role="status">
                                <span className="sr-only"> </span>
                            </Spinner>

                        ) : error ? ( //display err message 
                            <Alert variant="danger">{error}</Alert>
                            ) : null}
                    </Col>
                </Row>
            </section>

            {/* display images in gallery layout */}   
            <section>
                <Row className="my-4">
                    {photos.map(photo => (
                        <Col key={photo.id} md={4} className="mb-5">

                            <Card className="h-100" style={{ borderRadius: '15px' }}>

                                <Card.Img className="h-90" variant="top" src={photo.img_src} style={{ borderRadius: '10px' }}/>
                                <Card.Body>
                                    <Card.Text>Earth Date: {photo.earth_date}</Card.Text>
                                    <Card.Text>Camera: {photo.camera.full_name}</Card.Text>
                                </Card.Body>

                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>   
            
        </Container>
    );
};

export default MarsRovImg;
