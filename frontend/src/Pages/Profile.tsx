import React, { useState } from 'react';
import { User, MapPin, Calendar, Link as LinkIcon, Mail, Github as GitHub, Twitter, Award, BookOpen, Users, Activity, Edit, X, Check } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Sarah Anderson',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    email: 'sarah.anderson@example.com',
    portfolio: 'portfolio.dev/sarah',
    github: '@sarahdev',
    twitter: '@sarahcodes',
    about: 'Passionate software engineer with 8+ years of experience in full-stack development. Specialized in React, Node.js, and cloud architecture. Leading technical initiatives and mentoring junior developers. Always excited to learn and share knowledge with the community.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Docker', 'PostgreSQL', 'Redis']
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header/Cover Image */}
        <div className="relative">
          <div className="h-48 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-16"></div>
          <div className="absolute -bottom-12 left-8">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex justify-between items-start mb-8">
          <div>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-3xl font-bold text-gray-900 bg-white border rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="text-gray-600 bg-white border rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="text-gray-600 bg-white border rounded px-2 py-1 w-full"
                />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">{formData.name}</h1>
                <p className="text-gray-600 mt-1">{formData.title}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formData.location}
                  </span>
                  <span className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined March 2022
                  </span>
                </div>
              </>
            )}
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Projects</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Following</p>
                <h3 className="text-2xl font-bold">843</h3>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Contributions</p>
                <h3 className="text-2xl font-bold">2.4k</h3>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border rounded-lg p-2 text-gray-600"
                />
              ) : (
                <p className="text-gray-600">{formData.about}</p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Completed Advanced React Course</p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex-1 border rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <LinkIcon className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="flex-1 border rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <GitHub className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="flex-1 border rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="flex-1 border rounded px-2 py-1"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <LinkIcon className="w-5 h-5 text-gray-400" />
                      <a href="#" className="text-blue-600 hover:underline">{formData.portfolio}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <GitHub className="w-5 h-5 text-gray-400" />
                      <a href="#" className="text-blue-600 hover:underline">{formData.github}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-gray-400" />
                      <a href="#" className="text-blue-600 hover:underline">{formData.twitter}</a>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              {isEditing ? (
                <input
                  type="text"
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Separate skills with commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;