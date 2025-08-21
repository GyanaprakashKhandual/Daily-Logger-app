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
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTask, setNewTask] = useState({
    taskName: '',
    status: 'Open',
    assignTo: '',
    startDate: '',
    endDate: '',
    hours: 0,
    githubLink: '',
    reportLink: ''
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

  const updateProject = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://metronique.onrender.com/api/project/${editingProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ projectName: newProjectName })
      });
      
      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(projects.map(project => 
          project._id === editingProject._id ? updatedProject : project
        ));
        if (selectedProject && selectedProject._id === editingProject._id) {
          setSelectedProject(updatedProject);
        }
        setNewProjectName('');
        setShowProjectForm(false);
        setEditingProject(null);
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://metronique.onrender.com/api/project/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setProjects(projects.filter(project => project._id !== projectId));
        if (selectedProject && selectedProject._id === projectId) {
          setSelectedProject(null);
        }
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
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
          hours: 0,
          githubLink: '',
          reportLink: ''
        });
        setShowTaskForm(false);
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://metronique.onrender.com/api/work/${selectedProject._id}/${editingTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });
      
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(task => 
          task._id === editingTask._id ? updatedTask : task
        ));
        setNewTask({
          taskName: '',
          status: 'Open',
          assignTo: '',
          startDate: '',
          endDate: '',
          hours: 0,
          githubLink: '',
          reportLink: ''
        });
        setShowTaskForm(false);
        setEditingTask(null);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://metronique.onrender.com/api/work/${selectedProject._id}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        setShowProjectForm={setShowProjectForm}
        setEditingProject={setEditingProject}
        setNewProjectName={setNewProjectName}
        deleteProject={deleteProject}
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
        showTaskForm={showTaskForm || showEditTaskForm}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        setShowEditTaskForm={setShowEditTaskForm}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        updateProject={updateProject}
        deleteProject={deleteProject}
      />
    </div>
  );
};

export default ProjectManagementDashboard;