import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");

  const addProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, { name: newProject }]);
      setNewProject("");
    }
  };

  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Add a project"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addProject()}
        />
        <Button onClick={addProject} className="ml-2">Add</Button>
      </div>
      <ul>
        {projects.map((project, index) => (
          <li key={index} className="flex items-center mb-2">
            <span>{project.name}</span>
            <Button variant="outline" size="sm" className="ml-2" onClick={() => deleteProject(index)}>
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
                  <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <div>
                  <Input
                    value={project.name}
                    onChange={(e) => {
                      const updatedProjects = projects.map((p, i) =>
                        i === index ? { ...p, name: e.target.value } : p
                      );
                      setProjects(updatedProjects);
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

export default ProjectList;