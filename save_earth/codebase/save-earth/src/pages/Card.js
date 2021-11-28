import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({ detail }) => {
  const detailBtn = () => {
    return (
       (
         <Link to={`/detail/${detail.id}`}>
         <button className="btn btn-outline-primary mt-2 mb-2 mr-2">More Details</button>
         </Link>
       )
    )
  }

  return (
    <div className="col-lg-4 col-md-4 col-xs-12 mb-3">
      <div className="card">
        <div className="card-header">
          {detail.name} &nbsp;
          {detail.attended_to && <sup><span className="badge badge-danger badge-pill">✨ AI Discovered!</span></sup> }
        </div>
        <div className="card-body">
          <ShowImage url={detail.images || detail.imageUpload} />
          <p className="moment">{moment(detail.created_at).fromNow()}</p>
          <p><em>{detail.caption}</em></p>
          <p><strong>Found at:</strong> {detail.location}</p>
          { detailBtn() }
        </div>
      </div>
    </div>
  );
};

export default Card;
