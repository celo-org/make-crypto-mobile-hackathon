import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "@fontsource/inter";

import { Web3ContextProvider } from "./context/Web3Context";
import { NFTContextProvider } from "./context/NFTContext";
import { NFTMarketContextProvider } from "./context/NFTMarketContext";
import { CreatorsContextProvider } from "./context/CreatorsContext";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Web3ContextProvider>
				<Router>
					<CreatorsContextProvider>
						<NFTContextProvider>
							<NFTMarketContextProvider>
								<App />
							</NFTMarketContextProvider>
						</NFTContextProvider>
					</CreatorsContextProvider>
				</Router>
			</Web3ContextProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
