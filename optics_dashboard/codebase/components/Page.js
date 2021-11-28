import { Container, Stack } from "@chakra-ui/react";
const Page = ({ children }) => {
  return (
    <div>
      <Container mt={6} maxW="container.lg">
        <Stack spacing={4}>{children}</Stack>
      </Container>
    </div>
  );
};

export default Page;
