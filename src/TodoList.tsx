
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Todo } from "./types";

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onEdit, onDelete }: TodoListProps) {
  return (
 <List>
  {Array.isArray(todos) && todos.map((todo) => (
    <ListItem key={todo._id} secondaryAction={
      <>
        <IconButton edge="end" onClick={() => onEdit(todo)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" onClick={() => onDelete(todo._id)}>
          <DeleteIcon />
        </IconButton>
      </>
    }>
      <ListItemText primary={todo.text} />
    </ListItem>
  ))}
</List>

  );
}
