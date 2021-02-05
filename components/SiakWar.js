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
import { useEffect, useState } from "react";
import NormalInput from "@/components/NormalInput";
import TagInput from "@/components/TagInput";
import PasswordInput from "@/components/PasswordInput";
import UseSocket from "@/components/UseSocket";

const SiakWar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listSubject, setListSubject] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ title: "", content: "" });
  const [modalShow, setModalShow] = useState(false);

  const socket = UseSocket();

  useEffect(() => {
    if (socket) {
      socket.on("bot.message", (data) => {
        setModalShow(true);
        console.log(data);
        setMessage({ title: data.title, content: data.content });
      });
    }
  }, [socket]);

  const startBot = async () => {
    setIsLoading(true);
    socket.emit("bot.start", {
      username,
      password,
      subject: listSubject,
      gui: false,
    });
    setMessage({ title: "", content: "" });
    setIsLoading(false);
  };

  const isDisabled =
    username === "" || password === "" || listSubject.length === 0 || isLoading;

  const onModalClose = () => {
    setModalShow(false);
  };

  return (
    <Container bg="white" maxW="xl" padding="4">
      {isLoading ? <Progress size="xs" isIndeterminate /> : <></>}

      <Modal isOpen={modalShow} onClose={onModalClose}>
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
