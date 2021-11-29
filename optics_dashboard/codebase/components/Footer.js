import Link from "next/link";
import { Box, Container, Text, Stack, Spacer, Input } from "@chakra-ui/react";

const Footer = () => {
  // const sections = [
  //     []
  // ]

  return (
    <Box my={10} borderTopWidth="2px">
      <Container display="flex" alignItems="center" maxW="container.lg">
        <Stack mt={10}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="https://docs.celo.org/celo-codebase/protocol/optics">
            <a>About Optics</a>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
