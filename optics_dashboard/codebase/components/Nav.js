import { useRouter } from "next/router";
import Link from "next/link";
import ChakraNextImage from "@/components/ChakraNextImage";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Text,
  Spacer,
} from "@chakra-ui/react";
const Nav = (props) => {
  const router = useRouter();
  const pages = {
    "/": "Overview",
    "/trends": "Trends",
    "/health": "Health",
    "/compare": "Compare fees",
  };
  const index = Object.entries(pages).findIndex((e) => e[0] == router.asPath);

  return (
    <Box borderBottomWidth="2px">
      <Container maxW="container.lg">
        <Tabs colorScheme="white" index={index}>
          <TabList borderWidth={0}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width={"80px"}
            >
              <ChakraNextImage
                src="/celo.png"
                alt="descriptive"
                width="20px"
                height="20px"
              />
              <Text pl={2}>Optics</Text>
              <Spacer />
            </Box>
            {Object.entries(pages).map((entry) => (
              <Link key={entry[0]} href={entry[0]}>
                <a>
                  <Tab>{entry[1]}</Tab>
                </a>
              </Link>
            ))}
          </TabList>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Nav;
