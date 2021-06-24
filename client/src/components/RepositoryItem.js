import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  SkeletonText,
} from "@chakra-ui/react";

import { clientGet, clientPost } from "../utils/api";

const RepositoryItem = ({ data }) => {
  const { name, owner } = data;
  const [activated, setActivated] = useState(null);
  const [commit, setCommit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHooks();
  }, []);

  const fetchHooks = async () => {
    const response = await clientGet(
      `/api/repos/${owner.username}/${name}/hooks`
    )
      .then((res) => res)
      .catch((err) => err);
    if (response.length !== 0) setActivated(true);
    else setActivated(false);
    setIsLoading(false);
    console.log(response);
  };

  const activateRepo = async () => {
    const response = clientPost(`/repos/${owner.username}/${name}/hooks`, {
      active: true,
      branch_filter: "*",
      config: {
        url: "https://project.supri.dev/api/hooks/create/" + name,
        content_type: "json",
      },
      events: ["push"],
      type: "gitea",
    })
      .then((res) => res)
      .catch((err) => err);

    if (response.err) return;
    setActivated(true);
  };

  if (isLoading)
    return (
      <Box width="100%" shadow="md" padding="4">
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
    );

  console.log(name, activated);
  return (
    <Box
      width="100%"
      shadow="md"
      padding="4"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <VStack alignItems="flex-start" justifyContent="center">
        <Heading size="sm">{name}</Heading>
        {activated && (
          <Box>
            <Text fontSize="12px" color="gray.400">
              pushed{" "}
              <Text as="mark" backgroundColor="green.100">
                2fe3b4
              </Text>{" "}
              to <Text as="mark">main</Text> --{" "}
              <Text as="i">Refactor main</Text>
            </Text>
          </Box>
        )}
      </VStack>
      {!activated && (
        <Button
          onClick={activateRepo}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          Activate
        </Button>
      )}
    </Box>
  );
};

export default RepositoryItem;
