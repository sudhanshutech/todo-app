import { useState } from "react";
import { format, addDays, startOfWeek, isToday, subDays } from "date-fns";
import AddTodoForm from "@/components/todoform";
import TodoList from "@/components/todoList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

const Home = () => {
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const generateWeekDates = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i)); // 7 days at a time
  };

  const weekDates = generateWeekDates();

  const handlePreviousWeek = () => {
    setStartDate((prev) => subDays(prev, 7)); // Go back 7 days
  };

  const handleNextWeek = () => {
    setStartDate((prev) => addDays(prev, 7)); // Go forward 7 days
  };

  return (
    <div className="flex flex-col items-center mx-auto min-h-screen">
      <Image
        src="/3d-image.png"
        alt="logo"
        width={200}
        height={200}
        style={{
          position: "absolute",
        }}
      />
      <div className="p-6  max-w-4xl bg-gray-100 rounded-md shadow-md mt-36">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

        {/* Horizontal Calendar with Arrow Navigation */}
        <div className="flex items-center space-x-4">
          <ArrowBackIosIcon onClick={handlePreviousWeek} />

          <div className="flex space-x-1">
            {weekDates.map((date) => {
              const formattedDate = format(date, "yyyy-MM-dd");
              const isSelected = selectedDate === formattedDate;

              return (
                <button
                  key={formattedDate}
                  className={`flex flex-col items-center justify-center p-2 rounded-md ${
                    isSelected
                      ? "bg-[#9395D3] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedDate(formattedDate)}
                >
                  <span className="font-bold">{format(date, "EEE")}</span>
                  <span>{format(date, "dd")}</span>
                </button>
              );
            })}
          </div>

          <ArrowForwardIosIcon onClick={handleNextWeek} />
        </div>

        <h2 className="text-xl font-semibold mt-4">
          Tasks for {isToday(new Date(selectedDate)) ? "Today" : selectedDate}
        </h2>
        <TodoList date={selectedDate} />
        <AddTodoForm />
      </div>
    </div>
  );
};

export default Home;
