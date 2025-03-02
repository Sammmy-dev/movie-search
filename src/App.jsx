import axios from 'axios';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    console.log(movieTitle);
    setMovieTitle(event.target.value);
    if (event.target.value === "") {
      setMovieDetails(null);
      setError(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setMovieDetails(null);
    setError(null);
  
    if (!movieTitle.trim()) {
      setError('Please enter a movie title.');
      return;
    }
  
    try {
      setLoading(true)
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          t: movieTitle, // No need for encodeURIComponent here
          apikey: apiKey,
        },
      });
      console.log(response);
      
      const data = response.data; // Axios automatically parses the response
  
      if (data.Response === 'True') {
        setMovieDetails(data);
      } else {
        setError(data.Error || 'Movie not found.');
      }
      setLoading(false)
    } catch (error) {
      setError('Failed to fetch movie details. Please check your network or API key.');
      console.error('Error fetching movie details:', error);
      setLoading(false)
    }
  };
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
    {/* <div className="relative bg-[url('https://academics.winona.edu/povwinona/wp-content/uploads/sites/4/2023/09/collage.jpg')] bg-cover bg-center bg-fixed w-full flex items-center justify-center"> */}
      <div className="bg-black bg-opacity-80 p-8 rounded-lg my-10 text-white text-center z-10 md:w-[60%]">
        <h1 className="text-3xl font-bold mb-4">Discover Movies</h1>
        <form className="flex flex-col justify-center items-center md:flex-row gap-4" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Movie title"
            className="text-black w-full md:flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-blue-500"
            value={movieTitle}
            onChange={handleInputChange}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md md:w-[100px] flex justify-center items-center">
            {loading? <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />: "Search"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {movieDetails && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">{movieDetails.Title}</h2>
            <img src={movieDetails.Poster} alt={movieDetails.Title} className="max-w-xs mx-auto mb-4" />
            <p><strong>Release Date:</strong> {movieDetails.Released}</p>
            <p><strong>Rating:</strong> {movieDetails.imdbRating}/10</p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

