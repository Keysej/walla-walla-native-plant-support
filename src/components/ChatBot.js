"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey there! 🌿 I'm here to help with your native plant questions!" }
  ]);
  const [input, setInput] = useState("");

  const quickTopics = [
    "🌞 Plants for Full Sun",
    "💧 Watering New Plants",
    "🌼 Best Time to Plant",
    "🌿 Low-Water Plants",
    "📚 Gardening Resources",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { role: "assistant", content: "Oops! Something went wrong 🌱" }]);
    }
  };

  const handleQuickSelect = (text) => {
    setInput(text);
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: "black", // Text color black
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          🌿 PlantPal Bot
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Chat Area */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#37474f",
              color: "white",
              p: 2,
              borderRadius: 4,
              maxWidth: "80%",
              mb: 2,
              ml: 0,
            }}
          >
            <Typography variant="body1">{msg.content}</Typography>
          </Box>
        ))}

        {/* Quick Help Buttons */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {quickTopics.map((topic, index) => (
            <Button
              key={index}
              variant="outlined"
              fullWidth
              onClick={() => handleQuickSelect(topic)}
              sx={{ justifyContent: "flex-start" }}
            >
              {topic}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Input Area */}
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button variant="contained" sx={{ ml: 1, bgcolor: "#8e24aa" }} onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
