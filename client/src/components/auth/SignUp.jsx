import React, { useState } from "react";
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
import { makePostRequest } from "../../api";

const SignUp = () => {
  const [enteredInput, setenteredInput] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    profile: "",
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const inputChangeHandler = (event) => {
    setenteredInput({
      ...enteredInput,
      [event.target.name]: event.target.value,
    });
  };

  const imageUploadHandler = (profile) => {
    setLoading(true);

    if (profile === undefined) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Set loading to false here
      return; // Exit the function
    }

    if (
      profile.type === "image/jpeg" ||
      profile.type === "image/png" ||
      profile.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", profile);
      data.append("upload_preset", "chat-application");
      data.append("cloud_name", "dqjy4zlv9");

      fetch("https://api.cloudinary.com/v1_1/dqjy4zlv9/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          const newProfileValue = result.url.toString();
          console.log(result.url.toString());

          setenteredInput((prevState) => ({
            ...prevState,
            profile: newProfileValue,
          }));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false); // Set loading to false in case of an error
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Set loading to false here as well
    }
  };

  // function for handling the submit request
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Check that all the fields are filled or NOT
    if (
      !enteredInput.name ||
      !enteredInput.email ||
      !enteredInput.password ||
      !enteredInput.confirm_password ||
      !enteredInput.profile
    ) {
      toast({
        title: "Please fill up all the fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // Check for password matching
    if (enteredInput.password !== enteredInput.confirm_password) {
      toast({
        title: "Password does not match.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await makePostRequest("register", {
        name: enteredInput.name,
        email: enteredInput.email,
        password: enteredInput.password, // Send only the password
        profile: enteredInput.profile, // Assuming you want to send the profile URL
      });

      if (response.status === 201) {
        // User registered successfully
        toast({
          title: response.data.message, // Display the success message from the server
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });

        // here we store the use in the local storage
        localStorage.setItem("user", JSON.stringify(response));
      } // Handle validation errors
      else if (response.status === 400) {
        const errorResponse = await response.json();

        if (Array.isArray(errorResponse)) {
          errorResponse.forEach((error) => {
            toast({
              title: error.msg, // Display the error message
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "bottom",
            });
          });
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
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
        <FormLabel htmlFor="profile">Upload Profile</FormLabel>
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
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
