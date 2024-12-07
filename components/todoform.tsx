import { useState } from "react";
import CreateTodoModal from "./createTodo";

const AddTodoForm = () => {
  const [creatingTodo, setCreatingTodo] = useState(false);

  return (
    <div className="flex items-center space-x-2">
    <button
      className="w-full mx-auto px-4 py-2 bg-[#9395D3] text-white rounded"
      onClick={() => setCreatingTodo(true)}
    >
      Add New Task
    </button>
      {creatingTodo && (
        <CreateTodoModal
          isOpen={creatingTodo}
          onClose={() => setCreatingTodo(false)}
        />
      )}
    </div>
  );
};

export default AddTodoForm;
