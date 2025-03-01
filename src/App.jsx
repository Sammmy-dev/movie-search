import { useState } from 'react'

function App() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center"> {/* Container */}
    <img 
      src="https://academics.winona.edu/povwinona/wp-content/uploads/sites/4/2023/09/collage.jpg"
      alt="Background" 
      className="absolute inset-0 w-full h-full object-cover" 
    />
    <div className="bg-black bg-opacity-80 p-8 rounded-lg text-white text-center z-10 md:w-[60%]"> {/* Content */}
      <h1 className="text-3xl font-bold mb-4">Discover Your Favourite Movies</h1>
      <form className="flex flex-col justify-center items-center md:flex-row gap-4"> {/* Form */}
        <input 
          type="text"
          placeholder="Movie title" 
          className="text-black w-full md:flex-1 px-4 py-2 rounded-md border border-gray-300" 
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md md:w-[100px]">
          Search
        </button>
      </form>
    </div>
  </div>
  )
}

export default App

