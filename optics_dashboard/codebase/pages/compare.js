import { useState, useEffect } from "react";
import Head from "next/head";
import Page from "@/components/Page";
import Nav from "@/components/Nav";
import {
  Heading,
  Text,
  Stack,
  Grid,
  GridItem,
  Box,
  Flex,
  Select,
  Spacer,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import ChakraNextImage from "@/components/ChakraNextImage";

export default function Health(props) {
  const [originChain, setOriginChain] = useState("eth");
  const [destinationChain, setDestinationChain] = useState("poly");

  return (
    <div>
      <Head>
        <title>Health - Optics Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Page>
        <Heading>Compare</Heading>
        <Text>
          Compare Optics with other cross-chain protocols on key metrics.
        </Text>
        <Flex fontSize="md" align="center">
          <Text pr={2}>From:</Text>
          <Select
            onChange={(e) => {
              setOriginChain(e.target.value);
            }}
            defaultValue={originChain}
          >
            <option value="eth">Ethereum</option>
            <option value="poly">Polygon</option>
          </Select>
          <Spacer p={2} />
          <Text pr={2}>To:</Text>
          <Select
            // maxW={"20%"}
            onChange={(e) => {
              setDestinationChain(e.target.value);
            }}
            defaultValue={destinationChain}
          >
            <option value="eth">Ethereum</option>
            <option value="poly">Polygon</option>
          </Select>
        </Flex>
      </Page>
    </div>
  );
}

export async function getStaticProps() {
  const optics = {
    eth: await fetch(
      `https://api.flipsidecrypto.com/api/v2/queries/b0337f8d-66f1-4ab9-bfda-2dc62cce0f75/data/latest`
    ).then((r) => r.json()),
  };

  return {
    props: {}, // will be passed to the page component as props
  };
}
