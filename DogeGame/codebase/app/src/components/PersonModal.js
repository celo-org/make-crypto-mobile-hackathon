import React from 'react';
import { inject, observer } from "mobx-react";
import { Button, Modal, Form } from 'react-bootstrap';
import Person from './Person'
import config from '../config'

class PersonModal extends React.Component {
  constructor(props) {
    super(props);

    this.punchInput = React.createRef();
    this.buy = this.buy.bind(this);

    this.state = {
      submitting: false
    }
  }

  async buy(event) {
    try {
      this.setState({ submitting: true })
      event.preventDefault()

      if(!this.punchInput.current.value) {
        alert('Enter a punchline message ')
        return
      }

      // listen to the event here
      const eventListener = this.closeOnPurchase()

      await this.props.web3Store.buy({
        id: this.props.person.id,
        punch: this.punchInput.current.value,
      })

      eventListener.unsubscribe()
    } finally {
      this.props.onHide()
      this.setState({ submitting: false });
    }
  }

  closeOnPurchase() {
    const punchlineInstance = config.isDev ?
      this.props.web3Store.punchlineActionInstance : this.props.web3Store.punchlineWSInstance

    return punchlineInstance.events.Purchase({
      filter: {
        buyer: this.props.web3Store.web3User,
        personId: this.props.person.id
      }
    }, (error, event) => {
      if (error) {
        throw error
      }
      this.props.onHide()
    })
  }

  renderBuyForm() {
    return (
      <Form onSubmit={this.buy}>
        <Form.Label>New stauts message:</Form.Label>
        <Form.Control ref={this.punchInput} type="text" required placeholder="Enter punchline..." maxLength="75" minLength="4" pattern="(?!^ +$)^.+$" />
        <Button variant="primary" type="submit" disabled={this.state.submitting}>
          Take Over
        </Button>
      </Form>
    )
  }

  render() {
    const person = this.props.person

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100" id="contained-modal-title-vcenter">
            {person.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Person person={person} />
          { this.renderBuyForm() }
        </Modal.Body>
      </Modal>
    );
  }

}


export default inject("web3Store")(observer(PersonModal));
