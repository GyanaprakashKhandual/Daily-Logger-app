'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/assets/Sidebar';
import MainContent from '../../components/modules/Workspace';

const ProjectManagementDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTask, setNewTask] = useState({
    taskName: '',
    status: 'Open',
    assignTo: '',
    startDate: '',
    endDate: '',
    hours: 0
  });

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch tasks when a project is selected
  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject._id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://metronique.onrender.com/api/project', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://metronique.onrender.com/api/work/${projectId}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createProject = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://metronique.onrender.com/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ projectName: newProjectName })
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects([...projects, data.project]);
        setNewProjectName('');
        setShowProjectForm(false);
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const addTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://metronique.onrender.com/api/work/${selectedProject._id}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });
      
      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data.task]);
        setNewTask({
          taskName: '',
          status: 'Open',
          assignTo: '',
          startDate: '',
          endDate: '',
          hours: 0
        });
        setShowTaskForm(false);
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        setShowProjectForm={setShowProjectForm}
      />
      
      <MainContent 
        selectedProject={selectedProject}
        tasks={tasks}
        setShowTaskForm={setShowTaskForm}
        showProjectForm={showProjectForm}
        setShowProjectForm={setShowProjectForm}
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
        createProject={createProject}
        showTaskForm={showTaskForm}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    </div>
  );
};

export default ProjectManagementDashboard;