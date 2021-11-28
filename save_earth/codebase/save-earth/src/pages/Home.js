import React from 'react';
import Layout from './Layout';
import { posts } from '../apis';
import { useState, useEffect } from 'react';
import Card from './Card';


const Home = () => {
  const [animal, setAnimal] = useState([]);
  const [plant, setPlant] = useState([]);
  // separating animal from plants
  const plants = []
  const animals = []

  const loadAnimalData = async () => {
    await posts()
    .then((response) => {
      if (response && response.error) {
        console.log(response.error)
      } 
      
      if (response) {
        response.map((item) => {
          if (item.ofClass === "1") {
            animals.push(item)
          }
        })
        setAnimal(animals)
      }
    })
  }

  const loadPlantData = async () => {
    await posts()
    .then((response) => {
      if (response &&  response.error) {
        console.log(response.error)
      } 
      
      if (response) {
        response.map((item) => {
          if (item.ofClass === "0") {
            plants.push(item)
          }
        })
        setPlant(plants)
      }
    })
  }

  useEffect(() => {
    loadPlantData();
    loadAnimalData();
  }, [])

  return (
    <Layout title="Save Earth with Azure AI" description="Discover rare or nearly-extinct Wildlife or Plants with the help of AI for the world to see." className="container-fluid">
      <h2 className="mb-4">Animals</h2>
      <div className="row">
        { animal.map((d, i) => (
            <Card key={i} detail={d}/>
        )) }
      </div>
      <hr style={{height: '3px', borderWidth: 0, color: '#800080', backgroundColor: 'purple'}} />
      <h2 className="mb-4">Plants</h2>
      <div className="row">
        { plant.map((d, i) => (
          <Card key={i} detail={d}/>
        )) }
      </div>
    </Layout>

  );
}

export default React.memo(Home);
