import { Container, Divider, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";

import NormalInput from "@/components/NormalInput";
import PasswordInput from "@/components/PasswordInput";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendEmail = () => {
    fetch("/api/activation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: email.split("@")[0], email: email }),
    })
      .then(() => {
        alert("Success");
      })
      .catch((e) => {
        alert("Failed : " + e);
      });
  };

  const isValidate = () => {
    return email === "" || password === "";
  };

  return (
    <Container bg="white" maxW="xl" padding="4">
      <Heading as="h5" size="sm" marginBottom={4}>
        Registrasi Akun
      </Heading>
      <Divider marginBottom={4} />
      <NormalInput
        title="Email"
        type="email"
        value={email}
        setValue={setEmail}
      />
      <PasswordInput title="Password" value={password} setValue={setPassword} />
      <Button
        colorScheme="teal"
        variant="solid"
        marginTop={4}
        onClick={sendEmail}
        disabled={isValidate()}
      >
        Submit
      </Button>
    </Container>
  );
};

export default RegisterForm;
