import { useRouter } from "next/router";
import Link from "next/link";
import ChakraNextImage from "@/components/ChakraNextImage";
import { SearchIcon } from "@chakra-ui/icons";

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
  Input,
  Button,
  Flex,
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

  const searchUser = (event) => {
    event.preventDefault();
    router.push("/address/" + event.target.address.value);
  };

  return (
    <Box borderBottomWidth="2px">
      <Container
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        maxW="container.lg"
      >
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
        <Spacer />
        <form
          onSubmit={(e) => {
            searchUser(e);
          }}
        >
          <Flex>
            <Input
              required
              placeholder="Search by address"
              name="address"
              size="md"
              maxW="sm"
            />{" "}
            <Button
              fontSize="sm"
              type="submit"
              fontWeight="regular"
              leftIcon={<SearchIcon />}
              size="md"
              variant="outline"
            >
              Search
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  );
};

export default Nav;
