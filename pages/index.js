import { useState, useEffect } from "react";
import { Box, Heading, HStack, VStack, Button } from "@chakra-ui/react";
import { MdSync } from "react-icons/md";
import RepositoryItem from "../components/RepositoryItem";
import { NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_TOKEN } from "../utils/constants";

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    setIsLoading(true);
    console.log("NEXT_PUBLIC_TOKEN ", NEXT_PUBLIC_TOKEN);
    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/user/repos`, {
      method: "GET",
      headers: {
        Authorization: "token " + NEXT_PUBLIC_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
    setRepos(response);
    setIsLoading(false);
  };

  return (
    <Box
      width="50vw"
      margin="2rem auto"
      sx={{
        "@media only screen and (max-width: 768px)": {
          width: "90vw",
        },
      }}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Heading size="md">Repositories</Heading>
        <Button
          size="md"
          onClick={fetchRepos}
          isLoading={isLoading}
          loadingText="Syncing..."
          colorScheme="blue"
          leftIcon={<MdSync />}
        >
          Sync
        </Button>
      </HStack>
      <VStack mt="2">
        {repos.length > 0 ? (
          repos.map((data) => (
            <RepositoryItem data={data} key={data.id} isSyncing={isLoading} />
          ))
        ) : (
          <Heading size="sm" color="gray.500">
            Tidak ada repository
          </Heading>
        )}
      </VStack>
    </Box>
  );
};

export default Home;
