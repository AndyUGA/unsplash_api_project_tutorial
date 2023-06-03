import { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [urlsToDisplay, setUrlsToDisplay] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // Link to Unsplash Search API: https://unsplash.com/documentation#search-photos
  async function getUnsplashPhotos() {
    try {
      //IMPORTANT! Update the below variable with your own api key!!

      //Example of what your api key will look like: 
      // const apiKey = 'tadf23bkyIjWtFP1kq0123JdfjTy-PmbXECj1ronjuXnwD12';
      const apiKey = '';

      //making unsplash api call to search for photos based on search query
      let resp = await axios.get(`https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${searchQuery}&per_page=5&orientation=squarish`);

      //store the array of results into urlsToDisplay variable
      setUrlsToDisplay(resp.data.results);
    } catch (e) {
      console.log(e);
    }

  }



  return (
    <>
      <div className="fullscreen">
        <div className="center">
          {/* Input box where user types in search query */}
          <input placeholder='Enter Search Query' onChange={(e) => {
            // Upate searchQuery variable with what user types into input box
            setSearchQuery(e.target.value);
          }} />
          <button onClick={getUnsplashPhotos}>
            Submit
          </button>
        </div>
        <div class="row">
          {/* Looping through the urlsToDisplay array to get each image url to display */}
          {urlsToDisplay.map((image) => {
            return <div>
              {/* Display image based on results we get back from unsplash api */}
              <img src={image.urls.small} />
            </div>
          })}
        </div>
      </div>
    </>

  );
}

export default App;