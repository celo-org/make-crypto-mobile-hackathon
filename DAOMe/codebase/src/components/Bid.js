import { Heading, HStack, Spacer } from "@chakra-ui/react";
import CustomAvatar from "./CustomAvatar";
import { HiOutlineExternalLink } from "react-icons/hi";

function Bid() {
    return (
        <HStack width="100%">
            <CustomAvatar size="sm" name="Dan Abramov" />
            <HStack width="100%">
                <Heading color="brand.100" fontWeight="400" size="md">disco.eth</Heading>
                <Spacer />
                <Heading size="md" fontWeight="700">3.1 ${process.env.REACT_APP_CURRENCY_TICKER}</Heading>
                <HiOutlineExternalLink />
            </HStack>
        </HStack>
    );
}

export default Bid;