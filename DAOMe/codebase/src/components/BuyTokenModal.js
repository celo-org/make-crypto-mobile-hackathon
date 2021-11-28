import CustomModal from "./CustomModal";
import { Divider, Input, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { CgArrowsExchange } from "react-icons/cg";

function BuyTokenModal({ isOpen, onClose, tokenName }) {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} modalCloseButton={true} modalHeader={`Buy ${tokenName}`} modalFooterButtonText="Buy">
            <VStack spacing={5} px="60px">
                <Input size="lg" variant="unstyled" textAlign="center" fontSize="3xl" placeholder="0" />
                <Text>${process.env.REACT_APP_CURRENCY_TICKER}</Text>
                <Divider />
                <Heading>10</Heading>
                <Text>{tokenName}</Text>
                <HStack>
                    <Text>1 ${process.env.REACT_APP_CURRENCY_TICKER}</Text>
                    <CgArrowsExchange /> 
                    <Text>1 {tokenName}</Text>
                </HStack>
            </VStack>
        </CustomModal>
    );
}

export default BuyTokenModal;