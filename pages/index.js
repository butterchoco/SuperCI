import { Box, VStack, Heading } from "@chakra-ui/react";

import RegisterForm from "@/components/RegisterForm";
import BiodataForm from "@/components/BiodataForm";

export default function Home() {
  return (
    <Box
      bg="gray.50"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack>
        <Heading as="h3" size="lg" marginY={4}>Jadi salah satu klien kami !</Heading>
        <BiodataForm />
        <RegisterForm />
      </VStack>
    </Box>
  );
}
