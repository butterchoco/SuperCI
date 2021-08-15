import { Button } from "@chakra-ui/button";
import { ModalContent } from "@chakra-ui/modal";
import { ModalCloseButton } from "@chakra-ui/modal";
import { ModalFooter } from "@chakra-ui/modal";
import { ModalBody } from "@chakra-ui/modal";
import { ModalHeader } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/modal";

const ModalCustom = ({ title, body, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCustom;
