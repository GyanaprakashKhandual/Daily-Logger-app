'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Moon, 
  Sun, 
  Palette, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Code, 
  Zap, 
  Shield, 
  Heart,
  Coffee,
  Cake
} from 'lucide-react';

const themes = {
  white: {
    name: 'White',
    icon: Sun,
    bg: 'bg-white',
    text: 'text-gray-900',
    accent: 'bg-blue-500',
    secondary: 'bg-gray-100',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-50'
  },
  dark: {
    name: 'Dark',
    icon: Moon,
    bg: 'bg-gray-900',
    text: 'text-white',
    accent: 'bg-purple-500',
    secondary: 'bg-gray-800',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-800'
  },
  cupcake: {
    name: 'Cupcake',
    icon: Cake,
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    accent: 'bg-pink-500',
    secondary: 'bg-pink-100',
    border: 'border-pink-200',
    hover: 'hover:bg-pink-100'
  },
  coffee: {
    name: 'Coffee',
    icon: Coffee,
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    accent: 'bg-amber-600',
    secondary: 'bg-amber-100',
    border: 'border-amber-200',
    hover: 'hover:bg-amber-100'
  },
  cream: {
    name: 'Cream',
    icon: Heart,
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    accent: 'bg-orange-400',
    secondary: 'bg-orange-100',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100'
  },
  valentine: {
    name: 'Valentine',
    icon: Heart,
    bg: 'bg-red-50',
    text: 'text-red-900',
    accent: 'bg-red-500',
    secondary: 'bg-red-100',
    border: 'border-red-200',
    hover: 'hover:bg-red-100'
  },
  green: {
    name: 'Green',
    icon: Zap,
    bg: 'bg-green-50',
    text: 'text-green-900',
    accent: 'bg-green-500',
    secondary: 'bg-green-100',
    border: 'border-green-200',
    hover: 'hover:bg-green-100'
  }
};

const sidebarItems = [
  { title: 'Getting Started', icon: Zap, items: ['Installation', 'Quick Start', 'Configuration'] },
  { title: 'Components', icon: Code, items: ['Buttons', 'Forms', 'Navigation', 'Layout'] },
  { title: 'API Reference', icon: BookOpen, items: ['Authentication', 'Endpoints', 'WebSocket'] },
  { title: 'Security', icon: Shield, items: ['Best Practices', 'Authentication', 'CORS'] }
];

export default function ModernDocsPage() {
  const [currentTheme, setCurrentTheme] = useState('white');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Getting Started');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-all duration-300`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 ${theme.secondary} ${theme.border} border-b backdrop-blur-sm bg-opacity-90`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg ${theme.hover} transition-colors`}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <BookOpen className={`w-8 h-8 text-white ${theme.accent} p-1.5 rounded-lg`} />
              <h1 className="text-xl font-bold">ModernDocs</h1>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search docs..."
                className={`pl-10 pr-4 py-2 rounded-lg ${theme.secondary} ${theme.border} border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                style={{ focusRingColor: theme.accent.replace('bg-', '') }}
              />
            </div>

            {/* Theme Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className={`p-2 rounded-lg ${theme.hover} transition-colors`}
              >
                <Palette size={20} />
              </motion.button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 ${theme.secondary} ${theme.border} border rounded-xl shadow-xl z-50`}
                  >
                    <div className="p-2">
                      {Object.entries(themes).map(([key, themeConfig]) => {
                        const IconComponent = themeConfig.icon;
                        return (
                          <motion.button
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setCurrentTheme(key);
                              setThemeMenuOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                              currentTheme === key ? theme.accent + ' text-white' : theme.hover
                            }`}
                          >
                            <IconComponent size={16} />
                            <span>{themeConfig.name}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-80 ${theme.secondary} ${theme.border} border-r z-40 overflow-y-auto`}
            >
              <div className="p-6">
                <nav className="space-y-6">
                  {sidebarItems.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => setActiveSection(section.title)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeSection === section.title 
                              ? `${theme.accent} text-white` 
                              : theme.hover
                          }`}
                        >
                          <IconComponent size={18} />
                          <span className="font-medium">{section.title}</span>
                          <ChevronRight size={16} className="ml-auto" />
                        </button>
                        
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: activeSection === section.title ? 1 : 0,
                            height: activeSection === section.title ? 'auto' : 0
                          }}
                          className="mt-2 ml-6 space-y-1 overflow-hidden"
                        >
                          {section.items.map((item) => (
                            <motion.button
                              key={item}
                              whileHover={{ x: 4 }}
                              className={`block w-full text-left px-3 py-1.5 rounded text-sm ${theme.hover} transition-colors`}
                            >
                              {item}
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-8 lg:ml-0"
        >
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-12"
            >
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Modern Documentation
              </h1>
              <p className="text-xl opacity-80 leading-relaxed">
                Beautiful, fast, and intuitive documentation for modern developers. 
                Built with Next.js, Tailwind CSS, and Framer Motion.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {[
                { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed and performance' },
                { icon: Palette, title: 'Multiple Themes', desc: 'Choose from 7 beautiful themes' },
                { icon: Shield, title: 'Type Safe', desc: 'Built with TypeScript for reliability' }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-6 rounded-xl ${theme.secondary} ${theme.border} border`}
                  >
                    <IconComponent className={`w-12 h-12 ${theme.accent} text-white p-2 rounded-lg mb-4`} />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="opacity-80">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`p-8 rounded-xl ${theme.secondary} ${theme.border} border`}
            >
              <h2 className="text-3xl font-bold mb-6">{activeSection}</h2>
              <div className="prose max-w-none">
                <p className="text-lg opacity-90 leading-relaxed mb-6">
                  This is a modern documentation page showcasing beautiful design patterns 
                  with smooth animations and multiple theme support. The interface adapts 
                  seamlessly to your preferred color scheme.
                </p>
                
                <div className={`p-4 rounded-lg ${theme.bg} ${theme.border} border mb-6`}>
                  <code className="text-sm">
                    npm install @modern-docs/ui
                  </code>
                </div>

                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                    <span>Responsive design that works on all devices</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                    <span>Smooth animations powered by Framer Motion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                    <span>7 carefully crafted themes to choose from</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                    <span>Accessible navigation with keyboard support</span>
                  </li>
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${theme.accent} text-white px-6 py-3 rounded-lg font-medium transition-colors`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}