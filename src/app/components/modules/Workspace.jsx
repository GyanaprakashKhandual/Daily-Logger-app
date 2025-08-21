'use client';

import { motion, AnimatePresence } from 'framer-motion';

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
  const getStatusColor = (status) => {
    switch (status) {
      case 'Close': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {selectedProject ? (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">{selectedProject.projectName}</h1>
              <div className="ml-4 flex space-x-2">
                <button 
                  onClick={() => setShowEditProjectForm(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => deleteProject(selectedProject._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <button 
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
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Task
            </button>
          </div>

          {tasks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.div 
                    key={task._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-white rounded-lg shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{task.taskName}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <button 
                          onClick={() => {
                            setEditingTask(task);
                            setShowEditTaskForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => deleteTask(task._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {task.assignTo || 'Unassigned'}
                      </div>
                      
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {task.hours} hours
                      </div>

                      {task.githubLink && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <a href={task.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            GitHub Repository
                          </a>
                        </div>
                      )}

                      {task.reportLink && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <a href={task.reportLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View Report
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg shadow-md">
              <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mb-2 text-lg font-medium text-gray-900">No tasks yet</h3>
              <p className="text-gray-500">Get started by adding a new task to this project.</p>
              <button 
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
                className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Your First Task
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <svg className="w-24 h-24 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">No Project Selected</h2>
          <p className="text-gray-500">Select a project from the sidebar or create a new one to get started.</p>
        </div>
      )}

      {/* Project Creation Modal */}
      <AnimatePresence>
        {showProjectForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowProjectForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <div className="mt-4">
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter project name"
                />
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={editingProject ? updateProject : createProject}
                  disabled={!newProjectName.trim()}
                  className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm ${!newProjectName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {editingProject ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                    setNewProjectName('');
                  }}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Creation Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowTaskForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    value={newTask.taskName}
                    onChange={(e) => setNewTask({...newTask, taskName: e.target.value})}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter task name"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="In Review">In Review</option>
                    <option value="Close">Close</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">
                    Assign To
                  </label>
                  <input
                    type="text"
                    id="assignTo"
                    value={newTask.assignTo}
                    onChange={(e) => setNewTask({...newTask, assignTo: e.target.value})}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Assign to"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={newTask.startDate}
                      onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={newTask.endDate}
                      onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    id="hours"
                    value={newTask.hours}
                    onChange={(e) => setNewTask({...newTask, hours: parseInt(e.target.value) || 0})}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    id="githubLink"
                    value={newTask.githubLink}
                    onChange={(e) => setNewTask({...newTask, githubLink: e.target.value})}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label htmlFor="reportLink" className="block text-sm font-medium text-gray-700">
                    Report Link
                  </label>
                  <input
                    type="url"
                    id="reportLink"
                    value={newTask.reportLink}
                    onChange={(e) => setNewTask({...newTask, reportLink: e.target.value})}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/report"
                  />
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={editingTask ? updateTask : addTask}
                  disabled={!newTask.taskName.trim()}
                  className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm ${!newTask.taskName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTaskForm(false);
                    setEditingTask(null);
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
                  }}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainContent;