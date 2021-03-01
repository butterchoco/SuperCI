import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SiakWar from "@/components/SiakWar";
import { useEffect, useState } from "react";

export default function index() {
  const router = useRouter();
  const { token } = router.query;
  const [tokenSite, setTokenSite] = useState(null);

  useEffect(() => {
    if (token) {
      var response = prompt("Hayo,.. Tokennya apa yaa?");
      setTokenSite(response);
    }
  }, [token]);

  const isPassAble = (response) => {
    if (!response) return false;
    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth();
    const year = today.getFullYear();
    const toDateTime = new Date(year, month, day).getTime();
    const birthDateTime = new Date(1999, 2, 20).getTime();
    const result = toDateTime + birthDateTime;
    const token = result
      .toString()
      .split("")
      .splice(0, 6)
      .map((data, index) => {
        return (
          data + process.env.NEXT_PUBLIC_TOKEN_SITE.toString().charAt(index)
        );
      })
      .join("");
    console.log(token);
    return response === token;
  };

  if (!token) return null;
  else if (!tokenSite || !isPassAble(tokenSite)) return <>You lost</>;

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
