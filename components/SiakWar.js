import {
  Container,
  Divider,
  Button,
  Heading,
  Progress,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import NormalInput from "@/components/NormalInput";
import TagInput from "@/components/TagInput";
import PasswordInput from "@/components/PasswordInput";

const SiakWar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listSubject, setListSubject] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ title: "", content: "" });

  const startBot = async () => {
    setIsLoading(true);
    const promise = await fetch("/api/start-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        subject: listSubject,
        gui: false,
      }),
    });
    const response = await promise.json();
    if (response.error === undefined) {
      setMessage({ title: "Bot Sukses", content: response.data });
    } else {
      setMessage({ title: "Bot Gagal", content: response.error });
    }
    setIsLoading(false);
  };

  const isDisabled =
    username === "" || password === "" || listSubject.length === 0 || isLoading;

  const onModalClose = () => {
    setMessage({ title: "", message: "" });
  };

  return (
    <Container bg="white" maxW="xl" padding="4">
      {isLoading ? <Progress size="xs" isIndeterminate /> : <></>}

      <Modal
        isOpen={message.title !== "" && message.content !== ""}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{message.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message.content}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading as="h5" size="sm" marginBottom={4}>
        xXx ---- SIAK WAR BOT ---- xXx
      </Heading>
      <Divider marginBottom={4} />
      <NormalInput
        title="Username"
        type="text"
        value={username}
        setValue={setUsername}
        isRequired={true}
      />
      <PasswordInput
        title="Password"
        value={password}
        setValue={setPassword}
        isRequired={true}
      />
      <TagInput
        title="Nama Kelas"
        type="text"
        value={listSubject}
        setValue={setListSubject}
      />
      <Button
        colorScheme="teal"
        variant="solid"
        marginTop={4}
        onClick={startBot}
        isDisabled={isDisabled}
      >
        {isLoading ? "Loading..." : "Start Bot"}
      </Button>
    </Container>
  );
};

export default SiakWar;
