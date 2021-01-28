import { Box } from "@chakra-ui/react";

import AccountRegister from "@/components/AccountRegister";

export default function Home() {
  return (
    <Box
      bg="gray.50"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <AccountRegister />
    </Box>
  );
}
