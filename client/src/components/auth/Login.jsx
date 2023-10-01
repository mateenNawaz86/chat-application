import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [enteredInput, setenteredInput] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    setenteredInput({
      ...enteredInput,
      [event.target.name]: event.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack spacing="15px">
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          placeholder="enter your email"
          name="email"
          id="email"
          type="email"
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

      <FormControl className="space-y-2 mt-4">
        <Button className="w-full" colorScheme="green">
          Login
        </Button>
        <Button className="w-full" colorScheme="red">
          Get a guest user credentials
        </Button>
      </FormControl>
    </VStack>
  );
};

export default Login;
