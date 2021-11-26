
import React, {useState} from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    FormFeedback
} from  'reactstrap'
import { EyeSlash, Eye } from 'react-bootstrap-icons';

import API from '../../api';
import './styles.css';

const MintForm = () => {
    const [privateKeyInputType, setPrivateKeyInputType] = useState('password')

    const [contractOwnerAddress, setContractOwnerAddress] = useState('')
    const [contractOwnerAddressError, setContractOwnerAddressError] = useState(null)

    const [toAddress, setToAddress] = useState('')
    const [networkId, setNetworkId] = useState('')
    const [networkIdError, setNetworkIdError] = useState(null)

    const [privateKey, setPrivateKey] = useState('')
    const [privateKeyError, setPrivateKeyError] = useState(null)

    const [quantity, setQuantity] = useState(0)
    const [quantityError, setQuantityError] = useState(null)

    const [contentName, setContentName] = useState('')
    const [contentNameError, setContentNameError] = useState(null)

    const [contentMediaSrc, setContentMediaSrc] = useState('')

    const [responseData, setResponseData] = useState('')


    const handleSubmit = event => {
        event.preventDefault();
        if (!(!!contractOwnerAddress
            && !!networkId
            && !!privateKey
            && !!quantity
            && !!contentName)) {
            setContractOwnerAddressError(!contractOwnerAddress)
            setNetworkIdError(!networkId)
            setPrivateKeyError(!privateKey)
            setQuantityError(!quantity)
            setContentNameError(!contentName)
            return;
        }
        const data = {
            contractOwnerAddress,
            networkId: +networkId,
            toAddress,
            privateKey,
            quantity: +quantity,
            contentName,
            contentMediaSrc,
            contentMeta: {}
        }
        API.post(`mint`, { ...data })
            .then(res => {
                setResponseData(res.data)
            })
    }

    const toggleEye = () => {
        setPrivateKeyInputType(privateKeyInputType === 'text' ? 'password' :'text')
    }

    return (
        <div className='form-wrap'>
            <h1 className='pink-header'>MINTING CONTRACT TOOL</h1>
            <div className='p-0'>
                <Form className='form-minting'>
                    <FormGroup row>
                        <Label for="providerUrl">
                            Network Id
                        </Label>
                        <Col md={9}>
                            <Input
                                id="providerUrl"
                                name="providerUrl"
                                invalid={networkIdError}
                                type="number"
                                value={networkId}
                                onChange={(evt) => {setNetworkId(evt.target.value)}}
                            />
                            <FormFeedback>
                                Required!
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="contractOwnerAddress">
                            Contract Owner Address
                        </Label>
                        <Col md={9}>
                            <Input
                                id="contractOwnerAddress"
                                name="contractOwnerAddress"
                                invalid={contractOwnerAddressError}
                                type="text"
                                value={contractOwnerAddress}
                                onChange={(evt) => {setContractOwnerAddress(evt.target.value)}}
                            />
                            <FormFeedback>
                                Required!
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="toAddress">
                            To Address
                        </Label>
                        <Col md={9}>
                            <Input
                                id="toAddress"
                                name="toAddress"
                                type="text"
                                value={toAddress}
                                onChange={(evt) => {setToAddress(evt.target.value)}}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="privateKey">
                            Private Key
                            <span className='eye-wrap' onClick={toggleEye}>
                                { privateKeyInputType === 'text' ? <Eye /> : <EyeSlash /> }
                            </span>
                        </Label>
                        <Col md={9}>
                            <Input
                                id="privateKey"
                                name="privateKey"
                                invalid={privateKeyError}
                                type={privateKeyInputType}
                                value={privateKey}
                                onChange={(evt) => {setPrivateKey(evt.target.value)}}
                            />
                            <FormFeedback>
                                Required!
                            </FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="quantity">
                            Quantity
                        </Label>
                        <Col md={9}>
                            <Input
                                id="quantity"
                                name="quantity"
                                invalid={quantityError}
                                type="number"
                                value={quantity}
                                onChange={(evt) => {setQuantity(evt.target.value)}}
                            />
                            <FormFeedback>
                                Required!
                            </FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="contentName">
                            Content Name
                        </Label>
                        <Col md={9}>
                            <Input
                                id="contentName"
                                name="contentName"
                                invalid={contentNameError}
                                type="text"
                                value={contentName}
                                onChange={(evt) => {setContentName(evt.target.value)}}
                            />
                            <FormFeedback>
                                Required!
                            </FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="contentMediaSrc">
                            Content Media Src
                        </Label>
                        <Col md={9}>
                            <Input
                                id="contentMediaSrc"
                                name="contentMediaSrc"
                                type="text"
                                value={contentMediaSrc}
                                onChange={(evt) => {setContentMediaSrc(evt.target.value)}}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label for="response">
                            OUTPUT LOG
                        </Label>
                        <Input
                            readOnly
                            id="response"
                            name="text"
                            type="textarea"
                            value={!!responseData ? JSON.stringify(responseData, null, 2) : ''}
                            bsSize="sm"
                            style={{height: '100px'}}
                        />
                    </FormGroup>

                    <Button className='btn-success btn' onClick={handleSubmit}>
                        MINT
                    </Button>
                </Form>
            </div>
        </div>

    );
}

export default MintForm;