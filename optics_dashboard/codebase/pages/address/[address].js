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

export default function Address(props) {
  return (
    <div>
      <Head>
        <title>Address - Optics Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Page>
        <Heading>Address</Heading>
        <Text>Your transactions</Text>
      </Page>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: true,
  };
}
