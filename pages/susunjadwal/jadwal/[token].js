import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SiakWar from "@/components/SiakWar";

export default function index() {
  const router = useRouter();
  const { token } = router.query;

  if (!token) return null;

  return (
    <VStack
      minHeight="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        bg="yellow.100"
        color="yellow.600"
        fontWeight="bold"
        maxW="xl"
        borderWidth="1px"
        borderColor="yellow.600"
        borderRadius="10px"
      >
        Informasi penting seperti Username dan Password tidak akan disimpan di
        database ini! Harap berhati-hati terhadap data-data penting anda!
      </Box>
      <Box maxW="xl" width="100%">
        <SiakWar token={token} />
      </Box>
    </VStack>
  );
}
