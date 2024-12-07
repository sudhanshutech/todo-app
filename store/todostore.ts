import { create } from "zustand";

export type Todo = {
  id: string;
  title: string;
  text: string;
  completed: boolean;
  date: string; // ISO date for grouping by day
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string, title: string, date: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, updatedFields: Partial<Omit<Todo, 'id'>>) => void;
  setTodos: (todos: Todo[]) => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (title, text, date) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: crypto.randomUUID(), title, text, completed: false, date },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  editTodo: (id, updatedFields: Partial<Omit<Todo, 'id'>>) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      ),
    })),
  setTodos: (todos) => set(() => ({ todos })),
}));

export default useTodoStore;
