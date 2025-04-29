"use client";

import ChatBot from "@/components/ChatBot";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/6454898130246.image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 10,
        py: 5,
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(144, 169, 147, 0.75)", // Sage green with 75% opacity
          zIndex: 1
        }
      }}
    >
      {/* Left side text */}
      <Box sx={{ 
        maxWidth: "70%", 
        position: "relative", 
        zIndex: 2,
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.97) 0%, rgba(144, 169, 147, 0.2) 100%)",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(144, 169, 147, 0.3)"
      }}>
        <Typography variant="h2" sx={{ 
          fontWeight: "bold", 
          mb: 3,
          fontFamily: "Georgia, serif",
          color: "#2d3a2d", // Deep sage for better contrast
          textShadow: "1px 1px 0px rgba(255, 255, 255, 0.5)"
        }}>
          Walla Walla Native Plant AI Support
        </Typography>
        <Typography variant="h5" sx={{
          fontFamily: "Georgia, serif",
          color: "#3c4f3c", // Medium sage for subtitle
          lineHeight: 1.6
        }}>
          Need help with native plants? 🌿 Chat with our PlantPal Bot!
        </Typography>
      </Box>

      {/* Right side chatbot */}
      <Box
        sx={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.97) 0%, rgba(144, 169, 147, 0.2) 100%)",
          borderRadius: "16px",
          width: 400,
          height: 600,
          p: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          position: "relative",
          zIndex: 2,
          border: "1px solid rgba(144, 169, 147, 0.3)"
        }}
      >
        <ChatBot />
      </Box>
    </Box>
  );
}
