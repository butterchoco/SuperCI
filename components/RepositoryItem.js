import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  SkeletonText,
} from "@chakra-ui/react";
import { NEXT_PUBLIC_BASE_URL, TOKEN } from "../utils/constants";

const RepositoryItem = ({ data, isSyncing }) => {
  const { name, owner } = data;
  const [activated, setActivated] = useState(null);
  const [commit, setCommit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHooks();
  }, [isSyncing]);

  const fetchHooks = async () => {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/repos/${owner.username}/${name}/hooks`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
    if (response.length !== 0) setActivated(true);
    else setActivated(false);
    setIsLoading(false);
    console.log(response);
  };

  const activateRepo = async () => {
    setIsLoading(true);
    const response = fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/repos/${owner.username}/${name}/hooks`,
      {
        active: true,
        branch_filter: "*",
        config: {
          url: `http://192.168.100.7:8000/api/repos/${owner.username}/${name}/hooks/run`,
          content_type: "json",
        },
        events: [
          "create",
          "delete",
          "push",
          "pull_request",
          "pull_request_assign",
          "pull_request_label",
          "pull_request_milestone",
          "pull_request_comment",
          "pull_request_review_approved",
          "pull_request_review_rejected",
          "pull_request_review_comment",
          "pull_request_sync",
        ],
        type: "gitea",
      }
    )
      .then((res) => res)
      .catch((err) => err);

    if (response.err || response.message) return;
    setIsLoading(false);
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
          isLoading={isLoading}
          loadingText="Activating..."
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
