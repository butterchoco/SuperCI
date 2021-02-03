import { Box } from "@chakra-ui/react";

import SiakWar from "@/components/SiakWar";

export default function index() {
  return (
    <Box
      bg="gray.50"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <SiakWar />
    </Box>
  );
}
