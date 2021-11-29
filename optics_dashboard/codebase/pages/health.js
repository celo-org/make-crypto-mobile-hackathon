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
  Spacer,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import ChakraNextImage from "@/components/ChakraNextImage";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ActivityBar = (props) => {
  let divisions = 96;
  let interval = (24 * 60 * 60 * 1000) / divisions;
  return (
    <HStack spacing="4px">
      {[...Array(divisions)].map((e, i) => {
        let startDateTime = new Date(
          props.dateTime.getTime() - 24 * 60 * 60 * 1000 + i * interval
        );
        let endDateTime = new Date(
          props.dateTime.getTime() -
            24 * 60 * 60 * 1000 +
            i * interval +
            interval
        );
        function intervalStats() {
          let check = props.data
            ? props.data.filter(
                (e) =>
                  new Date(e.DATE).getTime() < endDateTime.getTime() &&
                  new Date(e.DATE).getTime() >= startDateTime.getTime()
              )
            : [];
          if (check.length) {
            return check[0].NUMBER_OF_TX;
          } else {
            return 0;
          }
        }
        return (
          <Tooltip
            closeDelay={1}
            key={i}
            label={
              intervalStats() &&
              (intervalStats() != 0 ? intervalStats() + " updates" : "") +
                ` ${startDateTime.toLocaleDateString()} ${startDateTime.toLocaleTimeString()}`
            }
          >
            <Box
              w="100%"
              h="40px"
              bg={intervalStats() != 0 ? "lightgreen" : ""}
              borderWidth={1}
            ></Box>
          </Tooltip>
        );
      })}
    </HStack>
  );
};

export default function Health(props) {
  const [chain, setChain] = useState("eth");
  const [timeframe, setTimeframe] = useState("24hours");

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000 * 10);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Health - Optics Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Page>
        <Heading>Health</Heading>
        <Text>Ethereum updater activity</Text>
        <ActivityBar data={props.updaterStatus.eth} dateTime={dateTime} />
        <Text>Ethereum replica 1667591279 activity</Text>
        <ActivityBar
          data={props.replicaStatus.eth["1667591279"]}
          dateTime={dateTime}
        />
        <Text>Ethereum replica 1886350457 activity</Text>
        <ActivityBar
          data={props.replicaStatus.eth["1886350457"]}
          dateTime={dateTime}
        />
        <Text>Polygon replica 6648936 activity</Text>
        <ActivityBar
          data={props.replicaStatus.poly["6648936"]}
          dateTime={dateTime}
        />
        <Text>Polygon replica 1667591279 activity</Text>
        <ActivityBar
          data={props.replicaStatus.poly["1886350457"]}
          dateTime={dateTime}
        />
      </Page>
    </div>
  );
}

export async function getStaticProps() {
  const updaterStatus = {
    eth: await fetch(
      `https://api.flipsidecrypto.com/api/v2/queries/6bc551bc-fc88-4457-baeb-bce7344413ca/data/latest`
    ).then((r) => r.json()),
  };

  const replicaStatus = {
    eth: {
      1667591279: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/06e072ba-e1a8-49b8-8d5a-f24d79b238a1/data/latest`
      ).then((r) => r.json()),
      1886350457: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/63a9b7b8-60c8-4647-a4e9-a5df4593a10f/data/latest`
      ).then((r) => r.json()),
    },
    poly: {
      6648936: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/bd9fff41-30cd-41ec-a302-4cb907dbefed/data/latest`
      ).then((r) => r.json()),
      1886350457: await fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/63a9b7b8-60c8-4647-a4e9-a5df4593a10f/data/latest`
      ).then((r) => r.json()),
    },
  };
  return {
    props: { updaterStatus, replicaStatus }, // will be passed to the page component as props
  };
}
