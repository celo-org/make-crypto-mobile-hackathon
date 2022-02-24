import Head from "next/head";
import Page from "@/components/Page";
import Nav from "@/components/Nav";
import { Heading, Text, Box, Select } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";

const BarChart = dynamic(() => import("@/components/BarChart"), {
  ssr: false,
});

export default function Home(props) {
  const [chain, setChain] = useState("eth");
  return (
    <div>
      <Head>
        <title>Optics Dashboard</title>
        <meta
          name="description"
          content="Monitor the health & metrics of Optics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Page>
        <Heading>Optics Dashboard</Heading>
        <Select
          onChange={(e) => {
            setChain(e.target.value);
            console.log(chain);
          }}
          defaultValue="eth"
        >
          <option value="eth">Ethereum</option>
          <option value="poly">Polygon</option>
        </Select>
        {chain == "eth" && (
          <Box borderWidth={1} borderRadius="md" p={4}>
            <BarChart
              currency
              noflow
              key={chain}
              title={"Bridge balance"}
              data={props.totalBal["eth"]}
              color="#ffffff"
            />
          </Box>
        )}
        <Box borderWidth={1} borderRadius="md" p={4}>
          <BarChart
            currency
            title={"Bridge volume"}
            key={chain}
            data={props.volume[chain]}
          />
        </Box>
        <Box borderWidth={1} borderRadius="md" p={4}>
          <BarChart
            title={"Transaction count"}
            key={chain}
            data={props.txCount[chain]}
          />
        </Box>
        <Box borderWidth={1} borderRadius="md" p={4}>
          <BarChart
            title={"User count"}
            key={chain}
            data={props.userCount[chain]}
          />
        </Box>
      </Page>
    </div>
  );
}

export async function getStaticProps(context) {
  const totalBalRes = {
    eth: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/9430ef32-ea4b-4681-9a11-bde367275ac9/data/latest"
    ).then((r) => r.json()),
  };
  const totalBal = {
    eth: totalBalRes.eth.map((i) => ({
      x: i["DATE"],
      y: Math.round(i["BALANCE"]),
    })),
  };

  const volumeRes = {
    eth: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/35ac2a96-4b1f-4d0e-a222-e9a2a2303ce4/data/latest"
    ).then((r) => r.json()),
    poly: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/2f3e93d5-2ccc-4b67-b783-01178992816f/data/latest"
    ).then((r) => r.json()),
  };

  const volume = {
    eth: volumeRes.eth.map((i) => ({
      x: i["DATE"],
      y: Math.round(i["VOLUME"]),
    })),
    poly: volumeRes.poly.map((i) => ({
      x: i["DATE"],
      y: Math.round(i["VOLUME"]),
    })),
  };

  const txCountRes = {
    eth: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/94931e9c-b454-4ffb-bb96-2442b67de868/data/latest"
    ).then((r) => r.json()),
    poly: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/87f998ba-d932-434e-ab46-4042f2fa235f/data/latest"
    ).then((r) => r.json()),
  };

  const txCount = {
    eth: txCountRes.eth.map((i) => ({
      x: i["DATE"],
      y: i["TRANSACTION_COUNT"],
    })),
    poly: txCountRes.poly.map((i) => ({
      x: i["DATE"],
      y: i["TRANSACTION_COUNT"],
    })),
  };

  const userCountRes = {
    eth: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/7d29928a-d705-4987-a7d6-9dc6bbc9b1f8/data/latest"
    ).then((r) => r.json()),
    poly: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/00fc2575-a739-453c-a488-3917d3575e44/data/latest"
    ).then((r) => r.json()),
  };

  const userCount = {
    eth: userCountRes.eth.map((i) => ({
      x: i["DATE"],
      y: i["NUMBER_OF_USERS"],
    })),
    poly: userCountRes.poly.map((i) => ({
      x: i["DATE"],
      y: i["NUMBER_OF_USERS"],
    })),
  };
  return {
    props: {
      totalBal,
      volume,
      txCount,
      userCount,
    },
    revalidate: 60,
  };
}
