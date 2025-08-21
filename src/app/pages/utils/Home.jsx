'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Users, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  Menu, 
  X, 
  Star,
  PlayCircle,
  Zap,
  Shield,
  Clock,
  Target,
  Eye,
  Edit3,
  Plus
} from 'lucide-react'

export default function MetroniqueLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Project Organization",
      description: "Create multiple projects and organize your work with intuitive project management tools."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Task Tracking",
      description: "Add, track, and manage tasks within each project. Keep everything organized and accessible."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Real-time Viewing",
      description: "View your daily work progress with beautiful dashboards and intuitive interfaces."
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Easy Editing",
      description: "Quickly edit tasks, update statuses, and modify project details with seamless interactions."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Daily Tracking",
      description: "Record and track your daily work activities with precision and ease."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Get insights into your productivity with comprehensive progress tracking and analytics."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "Metronique simplified our project management. It's intuitive and powerful without the complexity.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Software Developer",
      content: "Finally, a project management tool that doesn't get in the way. Clean, fast, and effective.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Team Lead",
      content: "The daily tracking feature keeps our team aligned and productive. Highly recommended!",
      rating: 5
    }
  ]



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-sky-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Metronique
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">Reviews</a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => router.push('/login')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-md"
              >
                <div className="px-4 py-4 space-y-4">
                  <a href="#features" className="block text-gray-700 hover:text-purple-600 transition-colors">Features</a>
                  <a href="#about" className="block text-gray-700 hover:text-purple-600 transition-colors">About</a>
                  <a href="#testimonials" className="block text-gray-700 hover:text-purple-600 transition-colors">Reviews</a>
                  <a href="#pricing" className="block text-gray-700 hover:text-purple-600 transition-colors">Pricing</a>
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => router.push('/login')}
                      className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-left"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => router.push('/register')}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg text-left"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Project Management
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Simplified
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Track, manage, and organize your daily work with Metronique - the lightweight alternative to complex project management tools. 
              Simple, powerful, and designed for productivity.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <button 
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:text-purple-600 transition-colors flex items-center space-x-2">
                <PlayCircle className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-gray-200/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-sm text-gray-600">Metronique Dashboard</div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-purple-800">Active Projects</h3>
                      <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">12</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-blue-800">Tasks Today</h3>
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">8</div>
                  </div>
                  <div className="bg-sky-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sky-800">Completed</h3>
                      <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-sky-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-sky-600">24</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Recent Tasks</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 bg-white rounded border">
                      <div className="w-4 h-4 border-2 border-green-500 rounded bg-green-500"></div>
                      <span className="text-gray-700 line-through">Update user interface</span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full ml-auto">Completed</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-white rounded border">
                      <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
                      <span className="text-gray-700">Review project requirements</span>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full ml-auto">In Progress</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-white rounded border">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                      <span className="text-gray-700">Setup development environment</span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full ml-auto">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Everything you need to stay
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                organized and productive
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metronique provides all the essential tools for project management without the complexity. 
              Focus on what matters most - getting things done.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why choose
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Metronique?
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe project management shouldn't be complicated. Metronique strips away the unnecessary complexity 
                while keeping all the features you actually need to manage your projects effectively.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">Quick setup and intuitive interface mean you can start managing projects in minutes, not hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
                    <p className="text-gray-600">Your data is protected with enterprise-grade security and backed up automatically.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mt-1">
                    <Users className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                    <p className="text-gray-600">Work seamlessly with your team members and keep everyone aligned on project goals.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">Project: Website Redesign</h4>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Design mockups</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Completed</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Frontend development</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">In Progress</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Backend integration</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Testing & QA</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Pending</span>
                    </div>
                  </div>
                  <div className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg h-2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-lg" style={{width: '35%'}}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">35% Complete</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Trusted by teams
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                around the world
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users are saying about their experience with Metronique.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Simple, transparent
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for you. Start with our free plan and upgrade when you're ready.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-300"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Perfect for individuals getting started</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Up to 3 projects</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Unlimited tasks</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Basic analytics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">1 team member</span>
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/register')}
                className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-b from-purple-600 to-blue-600 rounded-2xl p-8 shadow-xl transform hover:-translate-y-2 transition-all duration-300 relative"
            >
              <div className="absolute top-0 right-0 bg-yellow-400 text-purple-900 px-4 py-1 rounded-bl-lg font-semibold text-sm">
                Most Popular
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">$9</span>
                  <span className="text-purple-200 ml-1">/month</span>
                </div>
                <p className="text-purple-200 mt-2">Ideal for small teams and professionals</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-white">Unlimited projects</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-white">Unlimited tasks</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-white">Advanced analytics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-white">Up to 5 team members</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-white">Priority support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-white">Custom integrations</span>
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/register')}
                className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mt-2">For large teams and organizations</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Unlimited everything</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Advanced security</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Custom workflows</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Unlimited team members</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">SLA guarantee</span>
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/register')}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Contact Sales
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to transform your
              <span className="block">project management?</span>
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Join thousands of teams who use Metronique to stay organized and productive.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => router.push('/register')}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:text-purple-200 transition-colors flex items-center space-x-2 border border-white/30 hover:border-white/50">
                <PlayCircle className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Metronique</span>
              </div>
              <p className="text-gray-400 mb-6">
                Simple, powerful project management for teams of all sizes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  {/* Social icons would go here */}
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  {/* Social icons would go here */}
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  {/* Social icons would go here */}
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2023 Metronique. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}