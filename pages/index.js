import { Box } from "@chakra-ui/react";

import RegisterForm from "@/components/RegisterForm";

export default function Home() {
  return (
    <Box
      bg="gray.50"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <RegisterForm />
    </Box>
  );
}
