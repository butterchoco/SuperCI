import { useState } from "react";
import { Box, Heading, HStack, VStack, Button } from "@chakra-ui/react";
import { MdSync } from "react-icons/md";
import RepositoryItem from "../../components/RepositoryItem";
import { clientGet } from "../../utils/api";

const baseUrl = process.env.URL || "http://localhost:8000";
const Home = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepos = async () => {
    setIsLoading(true);
    const response = await clientGet("/api/user/repos")
      .then((res) => res)
      .catch((err) => err);
    setRepos(response);
    setIsLoading(false);
    console.log("----");
    console.log(response);
    console.log("----");
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
          repos.map((data) => <RepositoryItem data={data} key={data.id} />)
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
