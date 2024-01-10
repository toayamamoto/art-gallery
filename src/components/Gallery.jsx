import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from './Image';
import './Gallery.css';

export default function Gallery() {
  const [imageData, setImageData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [commentMap, setCommentMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = '41402799-594edb217f0d16205a55aa768'; 
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&per_page=12&q=${searchQuery}`;

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(apiUrl);
      const fetchedImageData = response.data.hits;

      if (fetchedImageData && fetchedImageData.length > 0) {
        setImageData(fetchedImageData);
      } else {
        console.error('No image data received from Pixabay API');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [apiUrl]);

  const handleSearch = () => {
    fetchImages();
  };

  const handleCommentChange = (imageId, comment) => {
    setCommentMap((prevComments) => ({
      ...prevComments,
      [imageId]: comment,
    }));
  };

  return (
    <div className="image-gallery">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for images"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="gallery-container">
        {imageData.map((image, index) => (
          <div key={index} className="image-with-comment">
            <Image imageUrl={image.webformatURL} tags={image.tags} />
            <textarea
              placeholder="Add a comment..."
              value={commentMap[image.id] || ''}
              onChange={(e) => handleCommentChange(image.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
