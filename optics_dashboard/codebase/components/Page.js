import { Container, Stack } from "@chakra-ui/react";
import Footer from "@/components/Footer";
const Page = ({ children }) => {
  return (
    <div>
      <Container mt={6} maxW="container.lg">
        <Stack spacing={4}>{children}</Stack>
      </Container>
      <Footer />
    </div>
  );
};

export default Page;
