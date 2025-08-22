'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MainContent = ({ 
  selectedProject, 
  tasks, 
  setShowTaskForm, 
  showProjectForm, 
  setShowProjectForm, 
  newProjectName, 
  setNewProjectName, 
  createProject, 
  showTaskForm, 
  newTask, 
  setNewTask, 
  addTask,
  updateTask,
  deleteTask,
  editingTask,
  setEditingTask,
  setShowEditTaskForm,
  showEditTaskForm
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Close': return 'bg-green-100 text-green-800 border-green-200';
      case 'Ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddTask = async () => {
    setIsLoading(true);
    try {
      await addTask();
      setAlertMessage('Task added successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertMessage('Failed to add task. Please try again.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    setIsLoading(true);
    try {
      await updateTask();
      setAlertMessage('Task updated successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertMessage('Failed to update task. Please try again.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom Alert Component
  const CustomAlert = ({ message, show }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-[60] max-w-sm"
        >
          <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">{message}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
    />
  );

  // Enhanced GitHub Icon with animation
  const GitHubIcon = ({ className = "w-4 h-4" }) => (
    <motion.svg
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </motion.svg>
  );

  // Enhanced Report Icon with animation
  const ReportIcon = ({ className = "w-4 h-4" }) => (
    <motion.svg
      whileHover={{ scale: 1.1, y: -1 }}
      transition={{ duration: 0.2 }}
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </motion.svg>
  );

  // Dropdown Arrow Icon
  const DropdownArrow = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <CustomAlert message={alertMessage} show={showAlert} />
      
      {selectedProject ? (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">{selectedProject.projectName}</h1>
              <div className="ml-4 flex space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditProjectForm(true)}
                  className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteProject(selectedProject._id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
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
                setEditingTask(null);
                setShowTaskForm(true);
              }}
              className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Task
            </motion.button>
          </div>

          {tasks.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {tasks.map((task, index) => (
                  <motion.div 
                    key={task._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{task.taskName}</h3>
                      <div className="flex items-center space-x-2 ml-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <div className="flex items-center space-x-1">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setEditingTask(task);
                              setShowEditTaskForm(true);
                            }}
                            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteTask(task._id)}
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-medium">{task.assignTo || 'Unassigned'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{task.hours} hours</span>
                      </div>

                      {(task.githubLink || task.reportLink) && (
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            {task.githubLink && (
                              <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={task.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                              >
                                <GitHubIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-gray-900" />
                                <span className="text-sm font-medium">GitHub</span>
                              </motion.a>
                            )}

                            {task.reportLink && (
                              <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={task.reportLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                              >
                                <ReportIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-gray-900" />
                                <span className="text-sm font-medium">Report</span>
                              </motion.a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl shadow-sm"
            >
              <motion.svg 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </motion.svg>
              <h3 className="mb-2 text-lg font-medium text-gray-900">No tasks yet</h3>
              <p className="text-gray-500 mb-6">Get started by adding a new task to this project.</p>
              <motion.button 
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
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
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
                className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transition-all duration-200"
              >
                Add Your First Task
              </motion.button>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full"
        >
          <motion.svg 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 mb-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </motion.svg>
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">No Project Selected</h2>
          <p className="text-gray-500">Select a project from the sidebar or create a new one to get started.</p>
        </motion.div>
      )}

      {/* Enhanced Task Creation Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setShowTaskForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg p-6 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingTask ? 'Edit Task' : 'Add New Task'}
                </h3>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name *
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    value={newTask.taskName}
                    onChange={(e) => setNewTask({...newTask, taskName: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter task name"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      value={newTask.status}
                      onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                      className="block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                    >
                      <option value="Open">Open</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="In Review">In Review</option>
                      <option value="Close">Close</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <DropdownArrow className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <input
                    type="text"
                    id="assignTo"
                    value={newTask.assignTo}
                    onChange={(e) => setNewTask({...newTask, assignTo: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Assign to team member"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={newTask.startDate}
                      onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={newTask.endDate}
                      onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Hours
                  </label>
                  <input
                                        type="number"
                    id="hours"
                    value={newTask.hours}
                    onChange={(e) => setNewTask({...newTask, hours: parseInt(e.target.value) || 0})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter estimated hours"
                    min="0"
                  />
                </div>
                
                <div>
                  <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    id="githubLink"
                    value={newTask.githubLink}
                    onChange={(e) => setNewTask({...newTask, githubLink: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                
                <div>
                  <label htmlFor="reportLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Report Link
                  </label>
                  <input
                    type="url"
                    id="reportLink"
                    value={newTask.reportLink}
                    onChange={(e) => setNewTask({...newTask, reportLink: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://example.com/report"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTaskForm(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={editingTask ? handleUpdateTask : handleAddTask}
                  disabled={isLoading || !newTask.taskName.trim()}
                  className={`px-6 py-3 text-white rounded-lg transition-colors duration-200 font-medium flex items-center ${
                    isLoading || !newTask.taskName.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-2">Processing...</span>
                    </>
                  ) : editingTask ? (
                    'Update Task'
                  ) : (
                    'Add Task'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Creation Modal */}
      <AnimatePresence>
        {showProjectForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setShowProjectForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New Project</h3>
                <button
                  onClick={() => setShowProjectForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter project name"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowProjectForm(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createProject}
                  disabled={!newProjectName.trim()}
                  className={`px-6 py-3 text-white rounded-lg transition-colors duration-200 font-medium ${
                    !newProjectName.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  }`}
                >
                  Create Project
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainContent;