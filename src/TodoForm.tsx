import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

interface TodoFormProps {
  onSubmit: (text: string) => void;
  editText: string;
}

export default function TodoForm({ onSubmit, editText }: TodoFormProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editText) setText(editText);
  }, [editText]);

  return (
    <Box display="flex" gap={1}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="✏️ Add your next task..."
        variant="outlined"
        fullWidth
        sx={{
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: "8px",
          "& fieldset": { border: "none" },
        }}
      />
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(45deg, #6a11cb, #2575fc)",
          fontWeight: "bold",
          borderRadius: "8px",
          px: 3,
          "&:hover": {
            background: "linear-gradient(45deg, #2575fc, #6a11cb)",
          },
        }}
        onClick={() => {
          if (text.trim()) {
            onSubmit(text);
            setText("");
          }
        }}
      >
        {editText ? "Update" : "Add"}
      </Button>
    </Box>
  );
}
