"use client";

import { Box, Button } from "@mui/material";

export default function QuickHelpButtons({ onSelect }) {
  const topics = [
    "🌞 Plants for Full Sun",
    "💧 Watering New Plants",
    "🌼 Best Time to Plant",
    "🌿 Low-Water Plants",
    "📚 Gardening Resources",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {topics.map((topic, idx) => (
        <Button key={idx} variant="outlined" onClick={() => onSelect(topic)}>
          {topic}
        </Button>
      ))}
    </Box>
  );
}
