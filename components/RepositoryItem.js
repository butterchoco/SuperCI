import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  SkeletonText,
} from "@chakra-ui/react";
import ModalCustom from "./ModalCustom";
import { getBase } from "../utils/api";

const RepositoryItem = ({ data, isSyncing }) => {
  const { name, owner } = data;
  const [activated, setActivated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [isSyncing]);

  const fetchData = async () => {
    await fetchRepo();
    await fetchHooks();
    setIsLoading(false);
  };

  const fetchRepo = async () => {
    const response = await getBase(`/api/repos/${owner.username}/${name}`);
    if (response.error) {
      setError(response.error);
      return;
    }
    console.log(response);
    setRepo(response);
  };

  const fetchHooks = async () => {
    const response = await getBase(
      `/api/repos/${owner.username}/${name}/hooks`
    );
    if (response.error) {
      setError(response.error);
      return;
    }
    console.log(response);
    if (response.length > 0) setActivated(true);
    else setActivated(false);
  };

  const activateRepo = async () => {
    setIsLoading(true);
    const response = await postBase(
      `/api/repos/${owner.username}/${name}/hooks`,
      JSON.stringify({
        active: true,
        branch_filter: "*",
        config: {
          url: `http://localhost:8000/api/repos/${owner.username}/${name}/hooks/run`,
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
      })
    );
    setIsLoading(false);
    if (response.error) {
      setError(response.error);
      return;
    }
    setActivated(true);
  };

  if (isLoading)
    return (
      <Box width="100%" shadow="md" padding="4">
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
    );

  return (
    <Box
      width="100%"
      shadow="md"
      padding="4"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <ModalCustom
        title="Notification"
        body={error}
        isOpen={error || error !== ""}
        onClose={() => setError("")}
      />
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
