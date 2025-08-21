'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Folder, Settings, ChevronRight } from 'lucide-react';

const Sidebar = ({ projects, selectedProject, setSelectedProject, setShowProjectForm }) => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <motion.div 
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-72 bg-gradient-to-br from-slate-50 to-gray-100 border-r border-gray-200/50 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Avidus Interactive
          </h1>
          <div className="h-0.5 w-16 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto mt-2 rounded-full"></div>
        </motion.div>
      </div>
      
      {/* New Project Button */}
      <div className="p-6">
        <motion.button 
          onClick={() => setShowProjectForm(true)}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center justify-center w-full px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold">New Project</span>
        </motion.button>
      </div>
      
      {/* Projects List */}
      <div className="flex-1 overflow-hidden">
        <div className="px-6 mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Your Projects
          </h3>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-240px)] px-4 pb-4">
          <ul className="space-y-2">
            {projects && projects.length > 0 ? projects.map((project, index) => (
              <motion.li 
                key={project._id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project._id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <motion.button
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex items-center w-full p-4 rounded-xl transition-all duration-300 ${
                    selectedProject && selectedProject._id === project._id 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-md' 
                      : 'hover:bg-white hover:shadow-lg border border-transparent'
                  }`}
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                    selectedProject && selectedProject._id === project._id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-200 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white'
                  }`}>
                    <Folder className="w-5 h-5" />
                  </div>
                  
                  {/* Project Name */}
                  <div className="flex-1 ml-3 text-left">
                    <span className={`font-semibold transition-colors duration-300 ${
                      selectedProject && selectedProject._id === project._id
                        ? 'text-gray-800'
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {project.projectName}
                    </span>
                  </div>
                  
                  {/* Arrow indicator */}
                  <motion.div
                    animate={{ 
                      opacity: hoveredProject === project._id || (selectedProject && selectedProject._id === project._id) ? 1 : 0,
                      x: hoveredProject === project._id || (selectedProject && selectedProject._id === project._id) ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronRight className={`w-4 h-4 ${
                      selectedProject && selectedProject._id === project._id
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    }`} />
                  </motion.div>
                  
                  {/* Selection indicator */}
                  {selectedProject && selectedProject._id === project._id && (
                    <motion.div
                      layoutId="activeProject"
                      className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              </motion.li>
            )) : (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-gray-400">
                  <Folder className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No projects yet</p>
                  <p className="text-xs mt-1">Create your first project to get started</p>
                </div>
              </motion.li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Settings Footer */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 border-t border-gray-200/50"
      >
        <button className="group flex items-center w-full p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300">
          <div className="p-2 rounded-lg bg-gray-200 group-hover:bg-gray-300 transition-colors duration-300">
            <Settings className="w-4 h-4" />
          </div>
          <span className="ml-3 font-medium">Settings</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;