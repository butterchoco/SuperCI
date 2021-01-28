import {
  Container,
  Divider,
  Button,
  Heading,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Validation,
  minCharLength,
  hasLowerCase,
  hasUpperCase,
  hasNumericCase,
  hasSpecialCase,
} from "@/util/Validation";
import NormalInput from "@/components/NormalInput";
import PasswordInput from "@/components/PasswordInput";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [error, setError] = useState({});

  const validation = new Validation({
    email: {
      value: email,
      validate: ["required", "isEmail"],
    },
    password: {
      value: password,
      validate: [
        "required",
        "minCharLength-8",
        "hasLowerCase",
        "hasUpperCase",
        "hasNumericCase",
        "hasSpecialCase",
      ],
    },
    konfirmasiPassword: {
      value: konfirmasiPassword,
      validate: ["required", "sameAs-password"],
    },
  });

  const sendEmail = () => {
    validation
      .touch()
      .then((response) => {
        fetch("/api/activation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: email.split("@")[0], email: email }),
        })
          .then(() => {
            alert(response);
          })
          .catch((e) => {
            alert("Failed : " + e);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const validColor = "green.500";
  const invalidColor = "gray.200";

  const hasMinEightChar = () => {
    return minCharLength(password, 8) ? validColor : invalidColor;
  };
  const hasOneLowerCase = () => {
    return hasLowerCase(password) ? validColor : invalidColor;
  };
  const hasOneUpperCase = () => {
    return hasUpperCase(password) ? validColor : invalidColor;
  };
  const hasOneNumericCase = () => {
    return hasNumericCase(password) ? validColor : invalidColor;
  };
  const hasOneSpecialCase = () => {
    return hasSpecialCase(password) ? validColor : invalidColor;
  };

  return (
    <Container bg="white" maxW="xl" padding="4">
      <Heading as="h5" size="sm" marginBottom={4}>
        Daftar Admin
      </Heading>
      <Divider marginBottom={4} />
      <NormalInput
        title="Email"
        type="text"
        value={email}
        setValue={setEmail}
        isRequired={true}
        error={error["email"]}
      />
      <PasswordInput
        title="Password"
        value={password}
        setValue={setPassword}
        isRequired={true}
        error={error["password"]}
        helper={
          <>
            <Text marginBottom="2">
              Masukkan password sesuai dengan ketentuan berikut.
            </Text>
            <Grid
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(2, 1fr)"
            >
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
                <CheckCircleIcon marginEnd={1} color={hasOneNumericCase} />
                Minimal satu angka.
              </GridItem>
              <GridItem display="flex" alignItems="center">
                <CheckCircleIcon marginEnd={1} color={hasOneSpecialCase} />
                Minimal satu simbol spesial.
              </GridItem>
            </Grid>
          </>
        }
      />
      <PasswordInput
        title="Konfirmasi Password"
        value={konfirmasiPassword}
        setValue={setKonfirmasiPassword}
        isRequired={true}
        error={error["konfirmasiPassword"]}
      />
      <Button
        colorScheme="teal"
        variant="solid"
        marginTop={4}
        onClick={sendEmail}
      >
        Submit
      </Button>
    </Container>
  );
};

export default RegisterForm;
