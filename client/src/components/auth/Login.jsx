import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { makePostRequest } from "../../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [enteredInput, setenteredInput] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    setenteredInput({
      ...enteredInput,
      [event.target.name]: event.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const submitHandler = async (event) => {
    event.preventDefault();

    // Check that all the fields are filled or NOT
    if (!enteredInput.email || !enteredInput.password) {
      toast({
        title: "Please fill up all the fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const response = await makePostRequest("sign-in", {
        email: enteredInput.email,
        password: enteredInput.password,
      });

      if (response.status === 201) {
        // User login successful
        toast({
          title: response.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/chat");
      } else if (response.status === 401) {
        const responseData = await response.json(); // Parse response data as JSON
        toast({
          title: responseData.error, // Display the error message from the server
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

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
        <Button onClick={submitHandler} className="w-full" colorScheme="green">
          Login
        </Button>
        <Button
          onClick={() => {
            setenteredInput({ email: "amir@gmail.com", password: "12345678" });
          }}
          className="w-full"
          colorScheme="red"
        >
          Get a guest user credentials
        </Button>
      </FormControl>
    </VStack>
  );
};

export default Login;
