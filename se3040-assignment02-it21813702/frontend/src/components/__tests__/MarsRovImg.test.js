
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MarsRovImg from '../MarsRov/MarsRovImg';

// Mocking fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        photo_manifest: {
          name: 'Curiosity',
          landing_date: '2012-08-06',
          launch_date: '2011-11-26',
          status: 'active',
          max_sol: 3000,
        },
      }),
    ok: true,
  })
);

describe('MarsRovImg Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Mars Rover Photos section', async () => {
    render(<MarsRovImg />);

    // expect header to be present
    expect(screen.getByText('Mars Rover Photos')).toBeInTheDocument();

    // expect form elements to be present
    expect(screen.getByLabelText('Enter Sol:')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by Camera:')).toBeInTheDocument();
    expect(screen.getByText('Retrieve Photos')).toBeInTheDocument();

    // Expect initial state of manifest and photos to be null/empty
    expect(screen.queryByText('Show Mission Manifest')).toBeInTheDocument();
    expect(screen.queryByText('Mission Manifest')).not.toBeInTheDocument();
    expect(screen.queryByTestId('photo')).not.toBeInTheDocument();

    });

    test('fetches rover photos when button is clicked with valid input', async () => {
        render(<MarsRovImg />);
      
        // Enter valid SOL and select a camera
        fireEvent.change(screen.getByLabelText('Enter Sol:'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('Filter by Camera:'), { target: { value: 'FHAZ' } });
      
        // Click on the button to fetch rover photos
        fireEvent.click(screen.getByText('Retrieve Photos'));
    });
    
});
