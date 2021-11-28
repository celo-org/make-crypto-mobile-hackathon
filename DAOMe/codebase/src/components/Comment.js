import { HStack, Heading, Text } from "@chakra-ui/react";

function Comment() {
    return (
        <HStack>
            <Heading size="sm" fontWeight="700">vitalik.eth</Heading>
            <Text>Awesome pic ❤!</Text>
        </HStack>
    );
}

export default Comment;