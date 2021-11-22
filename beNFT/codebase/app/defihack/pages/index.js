import Tabs from "../components/tabs"
import Home from "./home"
import Profile from "./profile";
import { useRouter } from "next/router"
import {ContractKitProvider} from "@celo-tools/use-contractkit";

function App() {
    const router = useRouter()
    return (
        <div className="container mx-auto min-h-screen">
            <Tabs active={ router.query.active !== undefined ? router.query.active : "Home"}>
                <div icon="home" label="Home">
                    <Home />
                </div>
                <div icon="search" label="Search" />
                <div icon="fav" label="Favorites" />
                <div icon="profile" label="Profile">
                    <Profile />
                </div>
            </Tabs>
        </div>
    )
}

function WrappedApp() {
    return (
        <ContractKitProvider
            dapp={{
                name: "beNFT",
                description: "beNFT, marketing NFTs for good causes!",
                url: "",
            }}
        >
            <App />
        </ContractKitProvider>
    );
}

export default WrappedApp;