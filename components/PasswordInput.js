import {
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Grid,
  GridItem,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";

function PasswordInput({ title, value, setValue, error }) {
  const [show, setShow] = useState(false);
  const numericCharPassword = new RegExp("^(?=.*[0-9])");
  const uppercaseCharPassword = new RegExp("^(?=.*[A-Z])");
  const lowercaseCharPassword = new RegExp("^(?=.*[a-z])");
  const specialCharPassword = new RegExp("^(?=.*[!@#$%^&*()])");

  const hasMinEightChar = () => {
    return value.length > 8 ? "green.500" : "gray.200";
  };

  const hasOneLowerCase = () => {
    return lowercaseCharPassword.test(value) ? "green.500" : "gray.200";
  };

  const hasOneUpperCase = () => {
    return uppercaseCharPassword.test(value) ? "green.500" : "gray.200";
  };

  const hasNumericCase = () => {
    return numericCharPassword.test(value) ? "green.500" : "gray.200";
  };

  const hasSpecialCase = () => {
    return specialCharPassword.test(value) ? "green.500" : "gray.200";
  };

  const handleClick = () => setShow(!show);

  return (
    <FormControl
      id="password"
      isInvalid={error !== undefined && error !== null}
    >
      <FormLabel>{title}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={"Masukkan " + title}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      <FormHelperText>
        <Text marginBottom="2">
          Masukkan password sesuai dengan ketentuan berikut.
        </Text>
        <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)">
          <GridItem display="flex" alignItems="center">
            <CheckCircleIcon marginEnd={1} color={hasMinEightChar} />
            Minimal 8 karakter.
          </GridItem>
          <GridItem display="flex" alignItems="center">
            <CheckCircleIcon marginEnd={1} color={hasOneLowerCase} />
            Minimal satu huruf kecil.
          </GridItem>
          <GridItem display="flex" alignItems="center">
            <CheckCircleIcon marginEnd={1} color={hasOneUpperCase} />
            Minimal satu huruf kapital.
          </GridItem>
          <GridItem display="flex" alignItems="center">
            <CheckCircleIcon marginEnd={1} color={hasNumericCase} />
            Minimal satu angka.
          </GridItem>
          <GridItem display="flex" alignItems="center">
            <CheckCircleIcon marginEnd={1} color={hasSpecialCase} />
            Minimal satu simbol spesial.
          </GridItem>
        </Grid>
      </FormHelperText>
    </FormControl>
  );
}

export default PasswordInput;
