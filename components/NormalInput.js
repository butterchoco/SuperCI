import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Input,
} from "@chakra-ui/react";

function NormalInput({
  title,
  type,
  helper,
  value,
  setValue,
  error,
  isRequired,
}) {
  return (
    <FormControl
      id={title.split(" ").join("-").toLowerCase()}
      pt={2}
      isInvalid={error !== undefined && error !== null && error.length > 0}
    >
      <FormLabel>{title}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={"Masukkan " + title}
          isRequired={isRequired}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      <FormHelperText>{helper}</FormHelperText>
    </FormControl>
  );
}

export default NormalInput;
