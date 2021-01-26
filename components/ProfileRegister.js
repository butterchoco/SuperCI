import { Container, Divider, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";

import NormalInput from "@/components/NormalInput";

const BiodataForm = () => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    
    return <Container bg="white" maxW="xl" padding="4" marginTop={4}>
    <Heading as="h5" size="sm" marginY={4}>
      Isi Biodata
    </Heading>
    <Divider marginBottom={4}/>
    <NormalInput
      title="Nama Lengkap"
      type="text"
      value={name}
      setValue={setName}
      />
    <NormalInput
      title="No. Telepon"
      type="text"
      value={phoneNumber}
      setValue={setPhoneNumber}
      />
    <NormalInput
      title="Perusahaan"
      type="text"
      value={company}
      setValue={setPhoneNumber}
    />
  </Container>
}

export default BiodataForm;