import { useState } from "react";
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
  Spacer,
  Flex,
  Select,
} from "@chakra-ui/react";
import ChakraNextImage from "@/components/ChakraNextImage";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function Trends(props) {
  const [chain, setChain] = useState("eth");
  const [timeframe, setTimeframe] = useState("7days");

  return (
    <div>
      <Head>
        <title>Trends - Optics Dashboard</title>
        <meta
          name="description"
          content="Monitor the health & metrics of Optics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Page>
        <Heading>Trends</Heading>
        <Flex>
          <Select
            onChange={(e) => {
              setChain(e.target.value);
            }}
            defaultValue="eth"
          >
            <option value="eth">Ethereum</option>
            <option value="poly">Polygon</option>
          </Select>
          <Spacer p={1} />
          <Select
            maxW={"20%"}
            onChange={(e) => {
              setTimeframe(e.target.value);
            }}
            defaultValue="7days"
          >
            <option value="24hours">Last 24 hours</option>
            <option value="7days">Last 7 days</option>
            <option value="1month">Last month</option>
          </Select>
        </Flex>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          <GridItem colSpan={{ sm: 2, md: 1, lg: 1 }}>
            <Text>Top currencies bridged in</Text>
            <Stack spacing={3} mt={4}>
              {props.topInflows &&
                props.topInflows[chain][timeframe].map((entry) => (
                  <Box
                    key={entry.SYMBOL}
                    p={6}
                    borderWidth={1}
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                  >
                    <ChakraNextImage
                      width="2em"
                      height="2em"
                      src={
                        entry.SYMBOL == "WETH"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/eth.svg"
                          : "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/" +
                            entry.SYMBOL.toLowerCase() +
                            ".svg"
                      }
                    />
                    <Text pl={2}>{entry.SYMBOL}</Text>
                    <Spacer />
                    <Text>{formatter.format(entry.VOLUME)}</Text>
                  </Box>
                ))}
            </Stack>
          </GridItem>
          <GridItem colSpan={{ sm: 2, md: 1, lg: 1 }}>
            <Text>Top currencies bridged out</Text>
            <Stack spacing={3} mt={4}>
              {props.topOutflows &&
                props.topOutflows[chain][timeframe].map((entry) => (
                  <Box
                    key={entry.SYMBOL && entry.SYMBOL}
                    p={6}
                    borderWidth={1}
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                  >
                    <ChakraNextImage
                      width="2em"
                      height="2em"
                      src={
                        entry.SYMBOL &&
                        (entry.SYMBOL == "WETH"
                          ? "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/eth.svg"
                          : "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@d5c68edec1f5eaec59ac77ff2b48144679cebca1/svg/color/" +
                            entry.SYMBOL.toLowerCase() +
                            ".svg")
                      }
                    />
                    <Text pl={2}>{entry.SYMBOL && entry.SYMBOL}</Text>
                    <Spacer />
                    <Text>
                      {entry.VOLUME && formatter.format(entry.VOLUME)}
                    </Text>
                  </Box>
                ))}
            </Stack>
          </GridItem>
        </Grid>
      </Page>
    </div>
  );
}

export async function getStaticProps() {
  const polygonFlows = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/83ac3619-6d9a-4fd8-bb07-34881c815d51/data/latest"
  ).then((r) => r.json());

  const topInflowsRes = {
    poly: polygonFlows.filter((entry) => entry.DIRECTION == "inflow"),
  };
  const topOutflowsRes = {
    poly: polygonFlows.filter((entry) => entry.DIRECTION == "outflow"),
  };
  const topInflows = {
    eth: {
      "24hours": await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/22d63880-0ee4-4b94-b574-b0106cc7e438/data/latest`
      ).then((r) => r.json()),
      "7days": await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/f0ae1416-1daf-450d-a9f5-d098ca87ffaf/data/latest`
      ).then((r) => r.json()),
      "1month": await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/6d14b23a-64b2-479f-a0db-1d64cc7de8fb/data/latest`
      ).then((r) => r.json()),
    },
    poly: {
      "24hours": topInflowsRes.poly
        .filter((entry) => entry.LABEL == "24hours")
        .sort(function (a, b) {
          return b.VOLUME - a.VOLUME;
        }),
      "7days": topInflowsRes.poly
        .filter((entry) => entry.LABEL == "7days")
        .sort(function (a, b) {
          return b.VOLUME - a.VOLUME;
        }),
      "1month": topInflowsRes.poly
        .filter((entry) => entry.LABEL == "1month")
        .sort(function (a, b) {
          return b.VOLUME - a.VOLUME;
        }),
    },
  };

  const topOutflows = {
    eth: {
      "24hours": await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/b23ccc54-16c6-45e7-b12a-d71bbdd01794/data/latest`
      ).then((r) => r.json()),
      "7days": await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/928b2afb-8ba6-4fb5-8aed-1d005e858def/data/latest`
      ).then((r) => r.json()),
      "1month": await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/31878739-c254-4f31-8a4c-ff9301d908bd/data/latest`
      ).then((r) => r.json()),
    },
    poly: {
      "24hours": topOutflowsRes.poly
        .filter((entry) => entry.LABEL == "24hours")
        .sort(function (a, b) {
          return b.VOLUME - a.VOLUME;
        }),
      "7days": topOutflowsRes.poly
        .filter((entry) => entry.LABEL == "7days")
        .sort(function (a, b) {
          return b.VOLUME - a.VOLUME;
        }),
      "1month": topOutflowsRes.poly
        .filter((entry) => entry.LABEL == "1month")
        .sort(function (a, b) {
          return b.VOLUME - a.VOLUME;
        }),
    },
  };

  return {
    props: { topInflows, topOutflows }, // will be passed to the page component as props
  };
}
