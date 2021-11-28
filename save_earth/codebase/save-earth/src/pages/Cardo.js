import React from 'react';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({detail}) => {
  return (
    <div className="mb-1">
      <div className="card">
        <div className="card-header">
          <p className="moment mr-3">{moment(detail.created_at).fromNow()}</p>
          <em className="ml-3">{detail.caption}</em>
        </div>
        <div className="card-body faded">
          <ShowImage url={detail.images || detail.imageUpload} />
          <p><strong>Address:</strong> {detail.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
