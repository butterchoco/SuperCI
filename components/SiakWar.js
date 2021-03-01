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
  ModalBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NormalInput from "@/components/NormalInput";
import TagInput from "@/components/TagInput";
import PasswordInput from "@/components/PasswordInput";
import UseSocket from "@/components/UseSocket";

const SiakWar = ({ token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listSubject, setListSubject] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ title: "", content: "" });
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (token) {
      fetchCourses(token);
    }
  }, []);

  const socket = UseSocket();

  useEffect(() => {
    if (socket) {
      socket.on("bot.message", (data) => {
        setModalShow(true);
        console.log(data);
        setMessage((prev) => {
          const content = prev.content + data.content + "\n";
          return { title: data.title, content };
        });
      });
      socket.on("bot.end", () => {
        setIsLoading(false);
      });
    }
  }, [socket]);

  const fetchCourses = (token) => {
    fetch("https://ristek.cs.ui.ac.id/susunjadwal/api/user_schedules/" + token)
      .then((response) => response.json())
      .then((data) => {
        const temp = [];
        data.user_schedule.schedule_items.map((data) => {
          if (!temp.includes(data.name)) temp.push(data.name);
        });
        setListSubject(temp);
      })
      .catch((e) => console.log(e));
  };

  const startBot = async () => {
    setIsLoading(true);
    socket.emit("bot.start", {
      username,
      password,
      subject: listSubject,
      gui: false,
    });
  };

  const isDisabled =
    username === "" || password === "" || listSubject.length === 0 || isLoading;

  const onModalClose = () => {
    setMessage({ title: "", content: "" });
    setModalShow(false);
  };

  return (
    <Container bg="white" padding="4">
      {isLoading ? <Progress size="xs" isIndeterminate /> : <></>}

      <Modal isOpen={modalShow} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{message.title}</ModalHeader>
          <ModalCloseButton />
          {isLoading ? <Progress size="xs" isIndeterminate /> : <></>}
          <ModalBody
            whiteSpace="pre-line"
            background="black"
            color="white"
            margin="1rem"
            borderRadius="10px"
          >
            {message.content}
          </ModalBody>
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
