import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Input,
} from "@chakra-ui/react";

function SecretInput({ title, type, helper, value, setValue, error }) {
  return (
    <FormControl
      id={title.split(" ").join("-").toLowerCase()}
      isInvalid={error !== undefined && error !== null}
    >
      <FormLabel>{title}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={"Masukkan " + title}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      <FormHelperText>{helper}</FormHelperText>
    </FormControl>
  );
}

export default SecretInput;
