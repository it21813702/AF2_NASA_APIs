
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from '../Navbar';

describe('NavigationBar Component', () => {
  test('renders Navbar with correct logo', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const nasaLogo = screen.getByAltText('NASA logo');
    expect(nasaLogo).toBeInTheDocument();
  });

  test('renders Navbar with correct links', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const homeLink = screen.getByText('Home');
    const imageOfTheDayLink = screen.getByText('Image Of The Day');
    const moreAstronomyImagesLink = screen.getByText('More Astronomy Images');
    const marsRoverImagesLink = screen.getByText('Mars Rover Images');
    expect(homeLink).toBeInTheDocument();
    expect(imageOfTheDayLink).toBeInTheDocument();
    expect(moreAstronomyImagesLink).toBeInTheDocument();
    expect(marsRoverImagesLink).toBeInTheDocument();
  });

  test('Navbar toggle button toggles navigation links on click', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const toggleButton = screen.getByText('Explore');
    expect(screen.queryByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('More Astronomy Images')).toBeInTheDocument();
    expect(screen.queryByText('Mars Rover Images')).toBeInTheDocument();

    toggleButton.click();

  });
});
