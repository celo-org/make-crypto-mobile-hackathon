import { useContext, useState } from "react";

// React Components
import Header from "./components/Header";
import CustomModal from "./components/CustomModal";
import Footer from "./components/Footer";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import OnboardingModal from "./components/OnboardingModal";
import PostPage from "./pages/PostPage";

// React Context
import { Web3Context } from "./context/Web3Context";

// React Router
import { Route, Switch } from "react-router-dom";

// Chakra UI
import {
	VStack,
	Grid,
	Button,
	useDisclosure,
	HStack,
	Spacer,
	Modal,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalBody,
	ModalHeader,
	Heading,
	useColorModeValue,
	Box,
	Icon,
	Link,
} from "@chakra-ui/react";
import { BsCheck2 } from "react-icons/bs";

import { CreatorsContext } from "./context/CreatorsContext";
import { ContextProvider } from "@celo-tools/use-contractkit";
import DaosPage from "./pages/DaosPage";

function App() {
	const { onClose } = useDisclosure();
	const {
		isOpen: isTxModalOpen,
		onOpen: onTxModalOpen,
		onClose: onTxModalClose,
	} = useDisclosure();

	const web3Context = useContext(Web3Context);
	const {
		chainId,
		requestNetworkChange,
		account,
		connectWallet,
		connectingAccount,
		setOngoingTx,
		OngoingTx,
	} = web3Context;

	const creatorsContext = useContext(CreatorsContext);
	const { creator, userRegistered } = creatorsContext;
	return (
		<>
			<Modal
				isOpen={OngoingTx !== null}
				isCentered
				onClose={() => {
					setOngoingTx(null);
					onTxModalClose();
				}}
			>
				<ModalOverlay />
				<ModalContent margin="10px">
					<ModalCloseButton />
					<ModalHeader></ModalHeader>
					<ModalBody padding="20px">
						<VStack justifyContent="center" spacing="20px">
							<Box
								background={useColorModeValue(
									"var(--chakra-colors-brand-200)",
									"var(--chakra-colors-brand-700)"
								)}
								borderRadius="full"
								padding="15px"
							>
								<Icon w="25px" h="25px" as={BsCheck2} />
							</Box>
							<Heading size="md">Transaction Successful</Heading>
							<Link target="_blank" href={OngoingTx}>
								<Button>View on Explorer</Button>
							</Link>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>

			<CustomModal
				modalButtonOnClick={requestNetworkChange}
				isOpen={
					chainId !== "0xaef3" &&
					chainId !== null &&
					chainId !== undefined
				}
				onClose={onClose}
				modalHeader="Invalid Network"
				modalCloseButton={false}
				modalFooterButtonText="Change Network"
			></CustomModal>
			<Grid
				height="100vh"
				width="100vw"
				templateColumns={["1fr", "1fr 1fr 1fr"]}
			>
				<Spacer display={["none", "block"]} />
				<VStack justifyContent="space-between" spacing={0}>
					<Header />
					<HStack
						width="100%"
						height="100%"
						alignItems="flex-start"
						justifyContent="center"
					>
						{account !== null ? (
							creator !== null &&
							creator !== undefined &&
							Object.keys(creator).length !== 0 ? (
								<Switch>
									<Route exact path="/">
										<ProfilePage />
									</Route>
									<Route
										exact
										path="/nft/:creatoraddress/:address/:id"
									>
										<PostPage />
									</Route>
									<Route
										exact
										path="/nft/marketplace/:creator/:address/:itemid"
									>
										<PostPage />
									</Route>
									<Route exact path="/feed">
										<Feed />
									</Route>
									<Route exact path="/daos">
										<DaosPage />
									</Route>
								</Switch>
							) : (
								<OnboardingModal
									accountAddress={account}
									isOpen={userRegistered === false}
									onClose={onClose}
								/>
							)
						) : (
							<Button
								alignSelf="center"
								isLoading={connectingAccount}
								onClick={connectWallet}
							>
								Connect Wallet
							</Button>
						)}
					</HStack>

					<Footer />
				</VStack>
			</Grid>
		</>
	);
}

export default App;
