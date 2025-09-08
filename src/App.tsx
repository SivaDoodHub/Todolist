import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Paper, Box } from "@mui/material";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import SnackbarAlert from "./SnackbarAlert";
import type { Todo } from "./types";
import "@fontsource-variable/golos-text";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const API_URL = "http://localhost:5000/todolist/apis";

  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

const fetchTodos = async () => {
  try {
    const res = await axios.get(API_URL);
    setTodos(res.data.tasks || []); // backend 'tasks' array
  } catch (err) {
    console.error("Fetch Todos Error:", err);
    showSnackbar("Something went wrong");
  }
};

const handleSubmit = async (text: string) => {
  try {
    if (editTodo) {
      const res = await axios.put(`${API_URL}/${editTodo._id}`, { text });
      setTodos(todos.map((t) => (t._id === editTodo._id ? res.data : t)));
      setEditTodo(null);
      showSnackbar("Updated successfully");
    } else {
      const res = await axios.post(API_URL, { text });
      setTodos([...todos, res.data]);
      showSnackbar("Created successfully");
    }
  } catch (err) {
    console.error("Submit Error:", err);
    showSnackbar("Something went wrong");
  }
};


  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
      showSnackbar("Deleted successfully");
    } catch (err) {
      console.error("Delete Error:", err);
      showSnackbar("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #c9d6ff, #e2e2e2)",
        fontFamily: "'Golos Text Variable', sans-serif",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "transform 0.2s ease",
            "&:hover": { transform: "scale(1.02)" }
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#2C3E50",
              letterSpacing: "1px",
            }}
          >
            ✅ To-Do-List
          </Typography>

          <Box mb={2}>
            <TodoForm
              onSubmit={handleSubmit}
              editText={editTodo ? editTodo.text : ""}
            />
          </Box>

          <TodoList
            todos={todos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Paper>

        <SnackbarAlert
          open={snackbar.open}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Container>
    </Box>
  );
}
