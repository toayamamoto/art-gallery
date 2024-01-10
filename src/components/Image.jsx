import React from 'react';

export default function Image({ imageUrl, tags }) {
  return (
    <div className="image-container">
      <img src={imageUrl} alt={tags} />
    </div>
  );
}
