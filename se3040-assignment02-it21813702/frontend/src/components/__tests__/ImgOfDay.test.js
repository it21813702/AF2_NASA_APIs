import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ImgOfDay from '../Home/ImgOfDay';

jest.mock('axios');

describe('ImgOfDay Component', () => {
  it('renders loading state initially', async () => {
    // Mocking Axios response for loading state
    axios.get.mockResolvedValueOnce({ data: null });

    const { getByText } = render(<ImgOfDay />);

    // Assert loading state
    expect(getByText('Loading...')).toBeInTheDocument();

    // Ensure Axios was called with correct URL
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod?api_key=PigpLCxlUs6J1QkC0RqpJsRaxV6knB6RgUUCtm1I');
    });
  });

  it('renders error message when API request fails', async () => {
    // mockin Axios response for error state
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { getByText } = render(<ImgOfDay />);

    // Ensure error message is rendered
    await waitFor(() => {
      expect(getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });

  it('renders image and data when API request succeeds', async () => {
    // Mocking Axios response for successful data retrieval
    const mockImageData = {
      url: 'https://example.com/image.jpg',
      title: 'Test Image',
      explanation: 'This is a test image',
    };
    axios.get.mockResolvedValueOnce({ data: mockImageData });

    const { getByText, getByAltText } = render(<ImgOfDay />);

    // Ensure image and data are rendered
    await waitFor(() => {
      expect(getByText('TODAY')).toBeInTheDocument();
      expect(getByAltText('Test Image')).toBeInTheDocument();
      expect(getByText('Test Image')).toBeInTheDocument();
      expect(getByText('This is a test image')).toBeInTheDocument();
    });
  });
});
