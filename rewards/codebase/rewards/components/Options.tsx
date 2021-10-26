import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { toast } from 'react-toastify';
//import { useWeb3React } from '@web3-react/core';
import { Button, Input, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Contract } from '@harmony-js/contract';
import { useHarmony } from '../context/harmonyContext';
import { createGrantFactoryContract, getGrantFactoryContractFromConnector } from '../helpers/contractHelper';

type Props = {
	isGrantor : boolean;
	setIsGrantor: (isGrantor: boolean) => void;
	setConvertToOne: (convertToOne: boolean) => void;
	convertToOne: boolean;
}

const Options: React.FC<Props> = ({isGrantor, setIsGrantor, setConvertToOne, convertToOne}) => {
	const [loadingSpinner, setLoadingSpinner] = useState(false);
	const { hmy } = useHarmony();
	const [grantFactoryContract, setGrantFactoryContract] =
		useState<Contract | null>(createGrantFactoryContract(hmy));
	const { account, connector, library } = useWeb3React();

	const registerGrantor = async() => {
		//console.log("AAAAA");
		setLoadingSpinner(true);
		if (account && grantFactoryContract && !isGrantor) {
			try {
				await grantFactoryContract.methods.
					RegisterGrantor().send({
						from: account,
						// gasLimit: '10000001',
						// gasPrice: new hmy.utils.Unit('10').asGwei().toWei(),
						//gasPrice: 1000000000, gasLimit: 6721900,
						gasPrice: 1000000000,
						gasLimit: 31000000,
					});
			} catch (error) {
				console.error(error);
			}
			const ret = await isGrantorCall();
			setIsGrantor(ret);
		}
		setLoadingSpinner(false);
	}

	const isGrantorCall = async() => {
		if (account && grantFactoryContract) {
			let isGrantorRet = false;
			try {
				isGrantorRet = await grantFactoryContract.methods.IsGrantor(account).call();
			} catch(error) {
				console.log(error);
			}
			return isGrantorRet;
		}
		else return false;
	};

	useEffect(() => {
		// 
	}, [isGrantor]);

	useEffect(() => {
		if (!account) {
			setGrantFactoryContract(null);
		}
	}, [account]);

	useEffect(() => {
		if (connector) {
			(async () => {
				const contract =
					await getGrantFactoryContractFromConnector(connector, library);
				setGrantFactoryContract(contract);
			})();
		}
	}, [connector, setGrantFactoryContract]);

	return (
		<OptionsComponent>
			<Wrapper className="wrapper-card">
				<Title className="title-card">Settings</Title>
				<Table>
					<Table.Header>
						<Table.Row>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<Table.Row>
							<Table.Cell>Register your address as grantor</Table.Cell>
							<Table.Cell textAlign="right" className="info-th-style">
								<Button primary onClick={registerGrantor} loading={loadingSpinner} disabled={isGrantor}>
									{isGrantor ? "Registered" : "Register"}
								</Button>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Show address in ETH format</Table.Cell>
							<Table.Cell textAlign="right" className="info-th-style">
								<Input
									type="checkbox" checked={!convertToOne} 
									onChange={(event) => setConvertToOne(!event.target.checked)}>
								</Input>
							</Table.Cell>
						</Table.Row>
					</Table.Body>		
				</Table>
			</Wrapper>
			
				{/* {!isGrantor && (
					<Wrapper className="wrapper-card">
						<Title className="title-card">Register your address as grantor</Title>
						<br/>
						<Button primary onClick={registerGrantor} loading={loadingSpinner}>
							Register
						</Button>
						</Wrapper>
				)}
				{isGrantor && (
					<Wrapper className="wrapper-card">
						<Title className="title-card">You are already the grantor</Title>
					</Wrapper>
				)} */}
			
		</OptionsComponent>
	);
};

const OptionsComponent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
`;

const Wrapper = styled.div``;
const Title = styled.div``;

export default Options;
