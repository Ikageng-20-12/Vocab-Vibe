import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Mic, Book, BarChart2, User, BookOpen, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, text: 'Home', path: '/' },
    { icon: <Mic size={20} />, text: 'Take a Test', path: '/take-test' },
    { icon: <Book size={20} />, text: 'Practice Mode', path: '/practice' },
    { icon: <BarChart2 size={20} />, text: 'My Scores', path: '/scores' },
    { icon: <User size={20} />, text: 'Profile', path: '/profile' },
    { icon: <BookOpen size={20} />, text: 'Resources', path: '/resources' },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">IELTS Simulator</h2>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.text}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 w-full">
              <LogOut size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;