import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

const SignUp = () => {
  const [enteredInput, setenteredInput] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    picture: "",
  });

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const inputChangeHandler = (event) => {
    setenteredInput({
      ...enteredInput,
      [event.target.name]: event.target.value,
    });
  };

  const imageUploadHandler = (picture) => {
    console.log(picture);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <VStack spacing="15px">
      <FormControl isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          name="name"
          id="name"
          type="text"
          placeholder="enter your name"
          value={enteredInput.name}
          onChange={inputChangeHandler}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="enter your email"
          value={enteredInput.email}
          onChange={inputChangeHandler}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            id="password"
            type={show ? "text" : "password"}
            placeholder="******"
            value={enteredInput.password}
            onChange={inputChangeHandler}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            name="confirm_password"
            id="confirm_password"
            type={show ? "text" : "password"}
            placeholder="******"
            value={enteredInput.confirm_password}
            onChange={inputChangeHandler}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="confirm_password">Upload Profile</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => imageUploadHandler(e.target.files[0])}
        />
      </FormControl>
      <Button
        onClick={submitHandler}
        colorScheme="green"
        className="w-full mt-4"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
