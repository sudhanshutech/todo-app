import { useEffect } from "react";
import "../styles/global.css";
import type { AppProps } from "next/app";
import useTodoStore from "@/store/todostore";

function MyApp({ Component, pageProps }: AppProps) {
  const { todos, setTodos } = useTodoStore();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
