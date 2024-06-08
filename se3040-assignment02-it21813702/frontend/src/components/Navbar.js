
//import modudules, components and compoentnts
import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


// Functional component for navigation bar
function NavigationBar() {  
    return (
        <Navbar expand='lg' bg='dark' variant='dark'>

            {/* Container to limit the width of Navbar content */}
            <Container>

                {/* Navbar brand with link to home page */}
                <Navbar.Brand as={Link} to='/'>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg'
                        width='60'
                        height='60'
                        alt='NASA logo'
                    />
                </Navbar.Brand>

                {/* Navbar toggle button for smaller screens*/}
                <Navbar.Toggle aria-controls='basic-navbar-nav' 
                    style={{
                        border: "none", 
                        fontSize: "1.3em", 
                        padding: "0.4em",
                        paddingRight: "0",
                        paddingLeft: "0"
                        
                        }}>
                    Explore
                </Navbar.Toggle>

                {/* Navbar content when collapsed */}
                <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'> 
                    <Nav className='me-auto text-right'>
                        <Nav.Link as={Link} to='/home-page'>Home</Nav.Link>
                        <Nav.Link href='#astroImg'>Image Of The Day</Nav.Link>
                        <Nav.Link as={Link} to='/nasa-archive'>More Astronomy Images</Nav.Link>
                        <Nav.Link as={Link} to='/mars-rov'>Mars Rover Images</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


//export component for use in other parts of app
export default NavigationBar;
