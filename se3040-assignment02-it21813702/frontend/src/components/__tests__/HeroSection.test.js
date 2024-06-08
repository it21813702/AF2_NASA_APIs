import React from 'react';
import { render } from '@testing-library/react';
import HeroSection from '../Home/HeroSection'

describe('HeroSection Component', () => {
  it('renders without crashing', () => {
    render(<HeroSection />);
  });

  it('displays carousel items with correct titles and descriptions', () => {
    const { getByText } = render(<HeroSection />);
    
    expect(getByText('Discover The Mysteries of Deep Space')).toBeInTheDocument();
    expect(getByText('lorem ipsum dcwbwvh')).toBeInTheDocument();
    expect(getByText('There is more to see than meets the eye..')).toBeInTheDocument();
    expect(getByText('lorem ipsum wcwhbcwv')).toBeInTheDocument();
  });

  
});

