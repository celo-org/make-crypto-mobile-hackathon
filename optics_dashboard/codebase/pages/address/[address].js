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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import ChakraNextImage from "@/components/ChakraNextImage";
import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("@/components/BarChart"), {
  ssr: false,
});

export default function Address(props) {
  return (
    <div>
      <Head>
        <title>{"Address: " + props.address + " - Optics Dashboard"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Page>
        <Heading>{props.address}</Heading>
        <Text>Address</Text>
        <Text>New transactions can take over 3 hours to propagate.</Text>
        {/* <HStack>
          <Stat borderWidth={1} borderRadius="md" p={6}>
            <StatLabel>Volume bridged to date</StatLabel>
            <Text fontSize="2xl">$0.00</Text>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat borderWidth={1} borderRadius="md" p={6}>
            <StatLabel>Number of bridge transactions to date</StatLabel>
            <Heading fontSize="2xl">$0.00</Heading>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </HStack> */}
        <Box borderWidth={1} borderRadius="md" p={4}>
          <BarChart
            key={props.address}
            currency
            title={"User volume on Ethereum"}
            data={props.volume && props.volume.eth}
          />
        </Box>
        <Box borderWidth={1} borderRadius="md" p={4}>
          <BarChart
            key={props.address}
            currency
            title={"User volume on Polygon"}
            data={props.volume && props.volume.poly}
          />
        </Box>
      </Page>
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
  const volumeRes = {
    eth: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/86b0130e-d0c0-4e05-8d1a-f959272fd517/data/latest"
    ).then((r) => r.json()),
    poly: await fetch(
      "https://api.flipsidecrypto.com/api/v2/queries/94926cbd-22d8-4722-b202-cc6393133fc2/data/latest"
    ).then((r) => r.json()),
  };

  const volume = {
    eth: await volumeRes.eth
      .filter((entry) => entry.USER == params.address.toLowerCase())
      .map((i) => ({
        x: i["DATE"],
        y: Math.round(i["VOLUME"]),
      })),
    poly: await volumeRes.poly
      .filter((entry) => entry.USER == params.address.toLowerCase())
      .map((i) => ({
        x: i["DATE"],
        y: Math.round(i["VOLUME"]),
      })),
  };

  return {
    props: {
      volume,
      address: params.address,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const ethRes = await fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/86b0130e-d0c0-4e05-8d1a-f959272fd517/data/latest"
  ).then((r) => r.json());

  // Get the paths we want to pre-render based on posts
  const paths = ethRes.map((entry) => ({
    params: { address: entry.USER },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
