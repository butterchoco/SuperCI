import {
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput({ title, value, setValue, helper, error, isRequired }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl
      id={title.split(" ").join("-").toLowerCase()}
      py={2}
      isInvalid={error !== undefined && error !== null && error.length > 0}
    >
      <FormLabel>{title}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={"Masukkan " + title}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isRequired={isRequired}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      <FormHelperText>{helper}</FormHelperText>
    </FormControl>
  );
}

export default PasswordInput;
