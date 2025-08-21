'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, User, Calendar, Clock, X, CheckCircle2, AlertCircle, PlayCircle, PauseCircle } from 'lucide-react';

const MainContent = ({ 
  selectedProject, 
  tasks = [], 
  setShowTaskForm, 
  showProjectForm, 
  setShowProjectForm, 
  newProjectName, 
  setNewProjectName, 
  createProject, 
  showTaskForm, 
  newTask, 
  setNewTask, 
  addTask 
}) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Close': 
        return { 
          bg: 'bg-gradient-to-r from-green-100 to-emerald-100', 
          text: 'text-green-800', 
          icon: CheckCircle2,
          border: 'border-green-200'
        };
      case 'Ongoing': 
        return { 
          bg: 'bg-gradient-to-r from-blue-100 to-cyan-100', 
          text: 'text-blue-800', 
          icon: PlayCircle,
          border: 'border-blue-200'
        };
      case 'In Review': 
        return { 
          bg: 'bg-gradient-to-r from-yellow-100 to-amber-100', 
          text: 'text-yellow-800', 
          icon: PauseCircle,
          border: 'border-yellow-200'
        };
      default: 
        return { 
          bg: 'bg-gradient-to-r from-gray-100 to-slate-100', 
          text: 'text-gray-800', 
          icon: AlertCircle,
          border: 'border-gray-200'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 min-h-screen">
        {selectedProject ? (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-8"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {selectedProject.projectName}
                        </h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                    </motion.div>
                    
                    <motion.button 
                        onClick={() => setShowTaskForm(true)}
                        whileHover={{ 
                            scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="group flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-semibold">Add Task</span>
            </motion.button>
          </div>

          {/* Tasks Grid */}
          {tasks.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence>
                {tasks.map((task, index) => {
                  const statusConfig = getStatusConfig(task.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <motion.div 
                      key={task._id}
                      variants={itemVariants}
                      layout
                      whileHover={{ 
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                      }}
                      className="group relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.h3 
                          className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {task.taskName}
                        </motion.h3>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`flex items-center px-3 py-1.5 text-xs font-semibold rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border backdrop-blur-sm`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {task.status}
                        </motion.div>
                      </div>
                      
                      {/* Task Details */}
                      <div className="space-y-3 text-sm text-gray-600">
                        <motion.div 
                          className="flex items-center group-hover:text-gray-700 transition-colors duration-300"
                          whileHover={{ x: 2 }}
                        >
                          <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 mr-3">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{task.assignTo || 'Unassigned'}</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center group-hover:text-gray-700 transition-colors duration-300"
                          whileHover={{ x: 2 }}
                        >
                          <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 mr-3">
                            <Calendar className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Duration</span>
                            <span className="font-medium">
                              {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center group-hover:text-gray-700 transition-colors duration-300"
                          whileHover={{ x: 2 }}
                        >
                          <div className="p-1.5 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 mr-3">
                            <Clock className="w-4 h-4 text-amber-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Estimated</span>
                            <span className="font-medium">{task.hours} hours</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Hover effect border */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300"></div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center justify-center p-16 text-center bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-blue-600" />
              </motion.div>
              <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                No tasks yet
              </h3>
              <p className="mb-6 text-gray-600 max-w-md">
                Transform your project with organized tasks. Start by adding your first task and watch your productivity soar!
              </p>
              <motion.button 
                onClick={() => setShowTaskForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 shadow-lg font-semibold"
              >
                Add Your First Task
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center h-full px-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 mb-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle2 className="w-16 h-16 text-blue-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-4xl font-bold bg-gradient-to-r from-gray-700 via-blue-600 to-purple-600 bg-clip-text text-transparent text-center"
          >
            Welcome to Avidus Interactive
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-center max-w-md text-lg"
          >
            Select a project from the sidebar or create a new one to start managing your tasks with style.
          </motion.p>
        </motion.div>
      )}

      {/* Enhanced Project Creation Modal */}
      <AnimatePresence>
        {showProjectForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProjectForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-lg p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                  Create New Project
                </h3>
                <button
                  onClick={() => setShowProjectForm(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-6">
                <label htmlFor="projectName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Enter an amazing project name"
                />
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={createProject}
                  disabled={!newProjectName.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 font-semibold ${!newProjectName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Create Project
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowProjectForm(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-semibold"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Task Creation Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowTaskForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
                  Add New Task
                </h3>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="taskName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    value={newTask?.taskName || ''}
                    onChange={(e) => setNewTask({...newTask, taskName: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter task name"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={newTask?.status || 'pending'}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  >
                    <option value="pending">Open</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="In Review">In Review</option>
                    <option value="Close">Close</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="assignTo" className="block text-sm font-semibold text-gray-700 mb-2">
                    Assign To
                  </label>
                  <input
                    type="text"
                    id="assignTo"
                    value={newTask?.assignTo || ''}
                    onChange={(e) => setNewTask({...newTask, assignTo: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="Assign to team member"
                  />
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={newTask?.startDate || ''}
                    onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={newTask?.endDate || ''}
                    onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="hours" className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    id="hours"
                    value={newTask?.hours || ''}
                    onChange={(e) => setNewTask({...newTask, hours: parseInt(e.target.value) || 0})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="Estimated hours"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <motion.button
                  type="button"
                  onClick={addTask}
                  disabled={!newTask?.taskName?.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 font-semibold ${!newTask?.taskName?.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add Task
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowTaskForm(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-semibold"
                >
                  Cancel
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