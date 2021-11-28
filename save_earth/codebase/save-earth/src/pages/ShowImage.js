import React from 'react';

const ShowImage = ({ url, item="image" }) => {
  return (
    <div className="product-img">
      <img src={`${url}`} alt={item} className="mb-3" style={{maxHeight: "100%", maxWidth: "100%"}} />
    </div>
  );
};

export default ShowImage;
