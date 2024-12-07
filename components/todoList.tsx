import useTodoStore from "@/store/todostore";
import { useState } from "react";
import EditTodoModal from "@/components/edittodo";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TodoList = ({ date }: { date: string }) => {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const filteredTodos = todos.filter((todo) => todo.date === date);

  return (
    <div
      style={{
        height: "400px",
        overflowY: "auto",
        scrollbarWidth: "thin",
        backgroundColor: "rgba(179, 183, 238, 0.5)",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {filteredTodos.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <p className="text-gray-500">No tasks created</p>
        </div>
      ) : (
        filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`flex justify-between items-center p-2 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              marginBottom: "5px",
              padding: "15px",
            }}
          >
            <div className="flex items-center">
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
              </div>
              <div>
                <h3 className="font-semibold">{todo.title}</h3>
                <span />
                {todo.text}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <IconButton
                sx={{
                  padding: "3px",
                }}
                onClick={() => setEditingTodoId(todo.id)}
                className="text-blue-500 hover:underline"
              >
                <Edit />
              </IconButton>
              <IconButton
                sx={{
                  padding: "3px",
                }}
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:underline"
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        ))
      )}
      {editingTodoId && (
        <EditTodoModal
          isOpen={!!editingTodoId}
          onClose={() => setEditingTodoId(null)}
          todoId={editingTodoId}
        />
      )}
    </div>
  );
};

export default TodoList;
