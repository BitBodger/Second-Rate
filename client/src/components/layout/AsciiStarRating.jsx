import React, { useState } from 'react';

const AsciiStarRating = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);

  // Function to handle click on a star
  const handleClick = (index) => {
    setRating(index);
    onRatingSubmit(index);  // Submit the rating when clicked
  };

  return (
    <div>
      {/* Generate 5 stars for rating */}
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={{ cursor: 'pointer', color: rating > index ? 'yellow' : 'grey' }}
          onClick={() => handleClick(index + 1)}  // +1 because index starts at 0
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default AsciiStarRating;
