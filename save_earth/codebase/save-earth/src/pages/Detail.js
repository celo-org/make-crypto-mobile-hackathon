import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from './Layout';
import Cardo from './Cardo';
import Checkout from './Checkout';
import DisqusBox from './DisqusBox';
import { GOOG_API } from '../config';



const Detail = (props) => {
  const [detail, setDetail] = useState({
    name: "",
    caption: "",
    description: "",
    username: "",
    location: "",
    attended_to: false,
    created_at: "",
    donated: "",
    images: "",
    imageUpload: "",
    coord: {"coordinates":[6.4474,4.3903],"type":"Point"},
    button_visible: true,
    endanger: "",
    ofClass: "",
    error: "",
    loading: "",
  });

  const [count, setCount] = useState(0);
  const [map, setMap] = useState(false);
  const [latlng, setLatLng] = useState(true);
  


  const loadSingleProduct = (detailID) => {
    axios.post('/.netlify/functions/findDetail', detailID)
    .then((response) => {
      setDetail({
        ...detail,
        name: response.data.name,
        caption: response.data.caption,
        description: response.data.description,
        username: response.data.username,
        location: response.data.location,
        created_at: response.data.created_at,
        endanger: response.data.endanger,
        ofClass: response.data.ofClass,
        images: response.data.images,
        imageUpload: response.data.imageUpload,
        coord: response.data.coord,

      })
    })
    .catch((err) => {
      console.error(err)
    })

  }

  useEffect(()=> {
    const detailID = props.match.params.detailId;
    loadSingleProduct(detailID)
  }, [])

  let pos;

  // Google Maps Starts herer
  const GoogleMap = (placeName="Lagos") => {
    const googleMapRef = useRef();
    let googleMap;
    useEffect(() => {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOG_API}&libraries=places`;
      googleMapScript.async = true;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", () => {
        getLatLng();
      });
    }, [detail, latlng]);

      const createGoogleMap = (coordinates) => {

        pos = (!latlng) ? { lat: detail.coord.coordinates[0], lng: detail.coord.coordinates[1] } : { lat: coordinates.lat(), lng: coordinates.lng() }

        googleMap = new window.google.maps.Map(googleMapRef.current, {
          zoom: 16,
          center: pos,
          disableDefaultUI: true,
        });
      };


    const getLatLng = () => {
      let lat, lng, placeId;
      new window.google.maps.Geocoder().geocode(
        { address: `${placeName}` },
        function (results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            placeId = results[0].place_id;
            createGoogleMap(results[0].geometry.location);
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            new window.google.maps.Marker({
              position: { lat, lng },
              map: googleMap,
              animation: window.google.maps.Animation.DROP,
              title: `${placeName}`,
            });

          } else {
            console.log(
              "Geocode may have not been successful for the following reason: " , status
            );
          }
        }
      );
    };


    return (
      <div
        id="google-map"
        ref={googleMapRef}
        style={ map ? { width: "400px", height: "300px", display: "block" } : { width: "400px", height: "300px", display: "none" } }
      />
    );
  };
  // Google Maps Ends here


  return (
    <Layout
       title={ detail && detail.name  }
       // && detail.description.substring(0,100)  If it breaks add that
       description={ detail && detail.description  }
       className="container-fluid"
     >
        <div className="row faded">
          <div className="col-lg-6 col-xs-12 mb-3">
              { detail && detail.description && <Cardo detail={detail} />}
              <div className="mt-4 ml-1">

                { GoogleMap(detail.location) }
              </div>
              <div className="mb-5">
                <br/> <hr/>
                <button onClick={() => setMap(!map)} className="btn btn-lg btn-outline-danger mr-2 ml-2">Toggle Map</button>
                <button onClick={() => setLatLng(!latlng)} className="btn btn-lg btn-outline-success mr-2 ml-5">Use {`${latlng ? 'Coordinates':'Given Address'}`}</button>
              </div>
          </div>

          <div className="col-lg-6 col-xs-12">
            <span>
              <button className="btn btn-disabled mr-5 mb-2 jumbotron" style={{height: "50px"}}>Celo amount to donate 👉</button>
              <button onClick={() => setCount(count + 1)} className="btn btn-sm btn-outline-primary mr-2 mb-2">$1</button>
              <button onClick={() => setCount(count + 5)} className="btn btn-sm btn-outline-info mr-2 mb-2">$5</button>
              <button onClick={() => setCount(count + 20)} className="btn btn-outline-secondary mr-2 mb-2">$20</button>
              <button onClick={() => setCount(count + 50)} className="btn btn-lg btn-outline-warning mr-2 mb-2">$50</button>
              <button onClick={() => setCount(count + 100)} className="btn btn-lg btn-outline-danger mr-2 mb-2">$100</button>
              <button onClick={() => setCount(0)} className="btn btn-lg btn-outline-danger mr-2 ml-5">Clear</button>
            </span>
            <hr/><br/>
          <Checkout amount={count} nameValue={detail.name}/>
            <DisqusBox detail={detail} />
          </div>
        </div>
    </Layout>

  )
}
// Disqusbox api is a bit twitchy, I still need to modify it to give different commnet section for each discovery

export default Detail;
