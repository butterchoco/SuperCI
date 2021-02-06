import {
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Input,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

function TagInput({ title, type, value, setValue, helper, error }) {
  const [tempValue, setTempValue] = useState([]);

  const deleteItem = (sbj) => {
    const subjTemp = [...value];
    const filteredSbj = subjTemp.filter((data) => data !== sbj);
    setValue(filteredSbj);
  };

  const addItem = () => {
    if (tempValue === "") return;
    const subjTemp = [...value];
    subjTemp.push(tempValue);
    setValue(subjTemp);
    setTempValue("");
  };

  return (
    <FormControl
      id={title.split(" ").join("-").toLowerCase()}
      py={2}
      isInvalid={error !== undefined && error !== null && error.length > 0}
    >
      <HStack flexWrap="wrap">
        {value.map((sbj) => (
          <Tag
            size="lg"
            key={sbj}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
            marginBottom="4px"
            marginInlineStart="4px"
          >
            <TagLabel>{sbj}</TagLabel>
            <TagCloseButton onClick={() => deleteItem(sbj)} />
          </Tag>
        ))}
      </HStack>
      <FormLabel>{title}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={type}
          placeholder={"Masukkan " + title}
          value={tempValue}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              addItem();
            }
          }}
          onChange={(e) => setTempValue(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={addItem}>
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      <FormHelperText>{helper}</FormHelperText>
    </FormControl>
  );
}

export default TagInput;
