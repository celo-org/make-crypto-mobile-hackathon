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

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function Health(props) {
  const [originChain, setOriginChain] = useState("eth");
  const [destinationChain, setDestinationChain] = useState("poly");
  const [timeframe, setTimeframe] = useState("7days");

  return (
    <div>
      <Head>
        <title>Compare - Optics Dashboard</title>
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
        <Text>Average transaction fee</Text>
        <Stack spacing={3} mt={4}>
          {props.bridges &&
            Object.keys(props.bridges).map((index) => {
              let outflowFee = props.bridges[index][originChain].filter(
                (entry) =>
                  entry.DIRECTION == "outflow" && entry.TIMEFRAME == timeframe
              )[0]["AVG_FEE"];
              let inflowFee = props.bridges[index][destinationChain].filter(
                (entry) =>
                  entry.DIRECTION == "inflow" && entry.TIMEFRAME == timeframe
              )[0]["AVG_FEE"];
              let totalFee = outflowFee + inflowFee;

              return (
                <Box
                  key={index}
                  p={6}
                  borderWidth={1}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    bg="#18181c"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    borderRadius="full"
                    width="2em"
                    height="2em"
                  >
                    <ChakraNextImage
                      width={"1.2em"}
                      height={"1.2em"}
                      src={props.icons[index]}
                    />
                  </Box>
                  <Text pl={2}>{index}</Text>
                  <Spacer />
                  {/* <Text>{formatter.format(props.bridges[index][originChain])}</Text> */}
                  <Text>
                    {formatter.format(outflowFee) +
                      " + " +
                      formatter.format(inflowFee) +
                      " = " +
                      formatter.format(totalFee)}
                  </Text>
                </Box>
              );
            })}
        </Stack>
      </Page>
    </div>
  );
}

export async function getStaticProps() {
  const icons = {
    Optics: "/celo.png",
    Wormhole: "/wormhole.svg",
  };
  const bridges = {
    Optics: {
      eth: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/b0337f8d-66f1-4ab9-bfda-2dc62cce0f75/data/latest`
      ).then((r) => r.json()),
      poly: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/99173a75-0c4d-48bf-bf5d-7bdcd8925521/data/latest`
      ).then((r) => r.json()),
    },
    Wormhole: {
      eth: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/ce647fce-60cb-48c6-828a-ccd19059ae0d/data/latest`
      ).then((r) => r.json()),
      poly: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/ce9fe72b-f2c6-48e4-ba35-842700dd6862/data/latest`
      ).then((r) => r.json()),
    },
  };

  return {
    props: { bridges, icons }, // will be passed to the page component as props
  };
}
