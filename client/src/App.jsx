import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div className="h-screen flex ">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chat" element={<ChatPage />} exact />
      </Routes>
    </div>
  );
};

export default App;
