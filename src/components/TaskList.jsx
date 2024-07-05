import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask} className="ml-2">Add</Button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center mb-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(index)}
            />
            <span className={`ml-2 ${task.completed ? "line-through" : ""}`}>
              {task.name}
            </span>
            <Button variant="outline" size="sm" className="ml-2" onClick={() => deleteTask(index)}>
              Delete
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <div>
                  <Input
                    value={task.name}
                    onChange={(e) => {
                      const updatedTasks = tasks.map((t, i) =>
                        i === index ? { ...t, name: e.target.value } : t
                      );
                      setTasks(updatedTasks);
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;