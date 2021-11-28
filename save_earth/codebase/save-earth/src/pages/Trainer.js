import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { isAuthenticated } from '../authBE';
import StartTrainingAI from '../StartTrainingAI';

const Trainer = (props) => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    tag: "",
    description: "",
    username: "",
    email: "",
    photo: "",
    endanger: "",
    ofClass: "",
    error: "",
    loading: "",
    createdProduct: "",
    redirectToProfile: false
  })

  // setting state for files upload
  const [fileSelected, setFileSelected] = useState([]);

  const {
    tag,
    description,
    username,
    email,
    photo,
    endanger,
    ofClass,
    error,
    loading,
    createdProduct
  } = values

  const init = () => {
    setValues({ ...values, username: user.name, email: user.email })

  }

  useEffect(() => {
    init()
  }, [email])



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
    setFileSelected(event.target.files);
    setValues({...values, photo: event.target.files.length})

  };

  const onFileUpload = async () => {
    const trainingResult = await StartTrainingAI(fileSelected, tag);
    console.log('trainingResult', trainingResult);

  };


  // This runs on submit
  const clickSumbit = (event) => {
    setValues({...values, error: '', loading: true})

    event.preventDefault();

    onFileUpload().then( data => {
      console.log("imageUploaded");
    }).then(
      axios.post('/.netlify/functions/addDataToTrain', values)

    )

    .then(data => {
      window.confetti.start(5000)

      setValues({
        ...values,
        tag: '',
        description: '',
        error: "",
        loading: false,
        createdProduct: tag
      })
    })
    .catch(error => {
      console.log("error", error)
      alert(`something went wrong! \n It seems like **${tag}** was previously used \n Contact us 👇 on what to do! \n or use another tag name`)
      setValues({
        ...values,
        tag: '',
        error: 'Error! The task failed, try again!',
        loading: false,
      })

    })

  };

  const productForm = () => {
  return (
    <form onSubmit={ clickSumbit } className="mb-3 pl-2 pr-2 placeholderInput" data-netlify="true">

      <div className="form-group placeholderInput">
        <label className="text-muted">Tag Name <strong style= {{color: "red"}}>(Should be globally unique)</strong></label>
        <input type="text" className="form-control" value={tag} required onChange={ handleChange('tag') } placeholder = "        **Give a name to the group of image **"/>
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea type="text" className="form-control" value={description} onChange={ handleChange('description') } placeholder = "     **Add a desciption to the data**"/>
      </div>

      <div className="form-group">
        <div className="new border border-info pt-2 pl-2 pr-2 pb-2">
          <label className="text-muted">Upload images <strong style= {{color: "red"}}>(MAX: 62, MIN: 5)</strong></label>
          <input type="file" className="form-control" onChange= { onFileChange } multiple />
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

      <br/> <hr/>

      <button type="submit" className="btn btn-outline-primary">Send for Training ➕</button>
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
      <h2>{ `${createdProduct} was successfully sent for training!` }</h2>
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
    <Layout title="Add a new discovery" description={ `Hello ${user.name}, add an image datasets to help train AI` }>
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

export default Trainer;
