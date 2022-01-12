import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import './styles/global.css'

class Thumbnail extends React.Component {
  constructor(props) {
		super(props)
  }

  state = {
    li : `/${this.props.image_itemId}`,
    status: ''
  }
  componentWillMount(){
    console.log();
    let stats = this.props.image_status.toString();
    if(stats == 'true'){
      this.setState({
        status: 'sold'
      })
    }
    else{
      this.setState({
        status: 'available'
      })
    }

  }
  render() {
    return (
      <>
        <a href= {this.state.li} className="card link">
          <div className="image">
            <img id ='img' src ={this.props.image_id}  height='200' alt= 'of NFT'/>

            <div className="tryguy content meta button ">
            {this.props.image_name}
            <br />
              $ {this.props.image_price} {this.state.status}
            </div>
          </div>
          </a>
        </>
    )
  }
}
export default Thumbnail
