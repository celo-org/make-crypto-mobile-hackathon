import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { isAuthenticated } from '../authBE';
import MyButton from './MyButton';
import uploadFileToBlob, { predictYourImage, predictYourImageTwo } from '../BlobStorageAndAI';

import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import saveearthAbi from '../contracts/saveearth.abi.json';

const ContractAddress = "0x186933a8ebc64c9827D0365AE9558589c1820BB8";


const storageAccountName = process.env.REACT_APP_STORAGE_RESOURCE_NAME || ""; // Fill string with your Storage resource name

const Upload = (props) => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    caption: "",
    description: "",
    username: "",
    email: "",
    location: "",
    attended_to: false,
    created_at: "",
    donated: "",
    photo: "",
    imageUpload: "",
    coord: "",
    button_visible: true,
    endanger: "",
    ofClass: "",
    error: "",
    loading: "",
    createdProduct: "",
    redirectToProfile: false
  })

  // setting state for file upload
  const [fileSelected, setFileSelected] = useState(null);

  const {
    name,
    caption,
    description,
    location,
    photo,
    error,
    loading,
    createdProduct
  } = values

  // Celo contract start here
  const [address, setAddress] = useState('0x0')
  const [kit, setKit] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    loadWeb3()
  }, [address])

  useEffect(() => {
    if (!kit) return; // useeffect run first before checking dependecy, this ensure that it doesn't run before
    loadCeloContract()
  }, [kit])


  async function loadWeb3() {
    if (window.celo) {
      try {
        // enable celo interaction
        await window.celo.enable();
        window.web3 = new Web3(window.celo);
        let celoKit = newKitFromWeb3(window.web3);
        await setKit(celoKit); // return kit

      }
      catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.web3.eth.net.getId()
        .then(async (res) => {
          if (res == 44787) {
            window.ethereum.send('eth_requestAccounts');
            let celoKit = newKitFromWeb3(window.web3);
            await setKit(celoKit);

          } else {
            alert("You need to switch to celo network on metamask")
          }
        }).catch(error => console.error(error))
    } else {
      alert("Get the celo browser extension from chrome extensions")
    }
  }

  async function loadCeloContract() {
    let address_ = await kit.web3.eth.getAccounts();

    // console.log(address_);
    // get and set default address
    kit.defaultAccount = address_[0];
    await setAddress(address_[0]); // return address

    // sign and set contract
    const myContract = new kit.web3.eth.Contract(saveearthAbi, ContractAddress);
    await setContract(myContract); // return contract        


  }


  async function reward(name_) {
    alert("You're about to be'rewarded 5cUSD for the discovery")
    contract.methods.reward(address, name_)
      .send({ from: kit.defaultAccount })
      .on('transactionHash', hash => {
        console.log("reward sent");
      }).catch(error => { setValues({ ...values, error: error.message }); console.log(error); })
  }


  // try to get coords
  let ofCoord = {
    "coordinates": [],
    "type": "Point"
  }


  const init = () => {
    setValues({ ...values, coord: ofCoord })

  }

  useEffect(() => {
    init()
  }, [])



  const handleChange = key => event => {
    const value = event.target.value
    setValues({
      ...values,
      [key]: value
    })
  }

  // for file upload and consume your ai here
  const onFileChange = (event) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
    setValues({ ...values, imageUpload: `https://${storageAccountName}.blob.core.windows.net/all/${event.target.files[0].name}` });

  };

  const onFileUpload = async () => {

    const blobsInContainer = await uploadFileToBlob(fileSelected);
    console.log('blobsInContainer', blobsInContainer);

  };

  const toPredictWithUrl = async () => {

    const predictedData = await predictYourImage(photo);
    console.log("predictedData" ,predictedData);
    if (predictedData && predictedData.probability > 0.95) {
      window.confetti.start(5000)
      console.log('predictedData.tagName', predictedData.tagName);
      reward(predictedData.tagName) // call celo contract
      setValues({
        ...values,
        attended_to: true
      })
    }
    return predictedData
  };

  const toPredictWithFile = async () => {

    const predictedData = await predictYourImageTwo(fileSelected);
    console.log("predictedData1" ,predictedData);
    if (predictedData && predictedData.probability > 0.95) {
      // Doing this make a good container name
      let goodName = predictedData.tagName.replace(/[.*+?^${}()|[\]\\]/g, '').toLowerCase()
      goodName = goodName.replace(/\s/g, '-')

      reward(predictedData.tagName) // call celo contract
      // A little Celebration
      window.confetti.start(5000)
      // This will notify backend admin to watch for this
      setValues({
        ...values,
        attended_to: true
      })

      await uploadFileToBlob(fileSelected, goodName)
    }
    return predictedData
  };

  // get location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showGeoErrors);
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  // add coordinates to ofCoord
  const showPosition = (position) => {
    alert(`Your Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`)
    ofCoord.coordinates.push(position.coords.latitude)
    ofCoord.coordinates.push(position.coords.longitude)
    setValues({
      ...values,
      coord: ofCoord,
      username: user.name,
      email: user.email,
      created_at: new Date()
    })
  }
  // Prepare for errors
  const showGeoErrors = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("Something went terribly wrong!");
    }
  }
  // get location ends



  // This runs on submit
  const clickSumbit = (event) => {
    setValues({...values, error: '', loading: true})

    event.preventDefault();

    onFileUpload().then( data => {
      console.log("File was uploaded");
    })
    .then(
      axios.post('/.netlify/functions/addData', values)
    )
    .then(data => {
      window.confetti.start(5000)

      setValues({
        ...values,
        name: '',
        description: '',
        photo: '',
        error: "",
        loading: false,
        createdProduct: name
      })
    })
    .catch(error => {
      console.log("error", error)
      setValues({
        ...values,
        name: '',
        description: '',
        photo: '',
        error: "Something went wrong!",
        loading: false,
      })
    })

  };

  const productForm = () => {
  return (
    <form onSubmit={ clickSumbit } className="mb-3 pl-2 pr-2 placeholderInput" data-netlify="true">

      <div className="form-group placeholderInput">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" value={name} required onChange={ handleChange('name') } placeholder = "        **White Tiger 🐯 **"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Caption</label>
        <input type="text" className="form-control" value={caption} onChange={ handleChange('caption') } placeholder = "      **Injured Male Tiger 🐯 **"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea type="text" className="form-control" value={description} onChange={ handleChange('description') } placeholder = "     **This white tiger is a native of...**"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Found at</label>
        <input type="text" className="form-control" value={location} onChange={ handleChange('location') } placeholder = "       **10 Downing St, Westminster, London..."/>
      </div>
      <div className="form-group">
        <div className="new border border-primary pt-2 pl-2 pr-2 pb-2">
          <label className="text-muted">Add an image link</label>
          <input type="text" className="form-control" value={photo} onChange={ handleChange('photo') } placeholder = "       **Link Format: 'https://abcxyz.jpg' Can upload at <postimages.org or imgur> **"/>
          {/* <button type="button" onClick={ () => toPredictWithUrl(photo) } className="btn btn-lg btn-outline-danger mt-2 ml-2">Send to AI</button> */}
          <MyButton whenClicked = { () => toPredictWithUrl(photo) } />
        </div>
      </div>
      <div><h3>OR</h3></div>
      <div className="form-group">
        <div className="new border border-info pt-2 pl-2 pr-2 pb-2">
          <label className="text-muted">Upload image</label>
          <input type="file" className="form-control" onChange= { onFileChange } />
          {/* <button type="button" onClick={ () => toPredictWithFile(fileSelected) } className="btn btn-lg btn-outline-info mt-2 ml-2">Send to AI</button> */}
          <MyButton whenClicked = { () => toPredictWithFile(fileSelected) } changecolor = { true } />
        </div>
      </div>
      <div className="form-group">
        <label className="text-muted">Class</label>
        <select className="form-control" onChange={ handleChange('ofClass') }>
          <option>Please Select...</option>
          <option value="0">Plant</option>
          <option value="1">Animal</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Ask Donation</label>
        <select className="form-control" onChange={ handleChange('button_visible') }>
          <option>Please Select...</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Endangered</label>
        <select className="form-control" onChange={ handleChange('endanger') }>
          <option>Please Select...</option>
          <option value="0">extinct</option>
          <option value="1">extinct in the wild</option>
          <option value="2">critically endangered</option>
          <option value="3">endangered</option>
          <option value="4">vulnerable</option>
          <option value="5">near threatened</option>
          <option value="6">least concern</option>
          <option value="7">Data deficient</option>
          <option value="8">Not evaluated</option>
        </select>
      </div>
      <div className="form-group">
        <label className="btn btn btn-info">
          &nbsp;  Add coordinates to allow pinpoint accuracy  &nbsp;
          <input type="button" value="Save location" onClick={getLocation} />
        </label>
      </div>
      <br/> <hr/>

      <button type="submit" className="btn btn-outline-primary">Save ➕</button>
    </form>
  )
}

const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      <h2> { error } </h2>
    </div>
)

const showSuccess = () => (
    <div className="alert alert-info" style={{ display: createdProduct ? "" : "none" }}>
      <h2>{ `${createdProduct} was created successfully!` }</h2>
    </div>
)

const showLoading = () => (
  loading && (
    <div className="alert alert-success">
      <h2>Loading...</h2>
    </div>
  )
)



  return (
    <Layout title="Add a new discovery" description={ `Hello ${user.name}, add a discovery` }>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          { showError() }
          { showSuccess() }
          { showLoading() }
          { productForm() }
          <br/><hr/>

        </div>
      </div>
    </Layout>
  )
}

export default Upload;
