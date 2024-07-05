import React from "react";
import TaskList from "@/components/TaskList";

const Index = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <TaskList />
    </div>
  );
};

export default Index;