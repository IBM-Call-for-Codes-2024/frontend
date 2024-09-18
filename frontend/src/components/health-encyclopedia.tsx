import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { User, Search, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";

export default function HealthEncyclopedia() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "Skin Conditions",
    "Eye Conditions",
    "Inflammatory Conditions",
    "Infectious Conditions",
    "Autoimmune Conditions"
  ];

  const conditionCategories = [
    { name: "Skin Conditions", description: "Explore various skin-related issues and treatments", image: "/placeholder.svg?height=200&width=200" },
    { name: "Eye Conditions", description: "Learn about common eye problems and their solutions", image: "/placeholder.svg?height=200&width=200" },
    { name: "Inflammatory Conditions", description: "Understand conditions caused by inflammation in the body", image: "/placeholder.svg?height=200&width=200" },
    { name: "Infectious Conditions", description: "Discover information about various infectious diseases", image: "/placeholder.svg?height=200&width=200" },
    { name: "Autoimmune Conditions", description: "Learn about disorders where the immune system attacks the body", image: "/placeholder.svg?height=200&width=200" }
  ];

  const conditionList = [
    { name: "Psoriasis", summary: "A chronic autoimmune condition that causes the rapid buildup of skin cells, resulting in scaling on the skin's surface.", severity: "Moderate" },
    { name: "Glaucoma", summary: "A group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in your eye.", severity: "Severe" },
    { name: "Rosacea", summary: "A common skin condition that causes redness and visible blood vessels in your face.", severity: "Mild" },
    { name: "Cataracts", summary: "A clouding of the normally clear lens of your eye, leading to a decrease in vision.", severity: "Moderate" },
    { name: "Dermatitis", summary: "A general term that describes inflammation of the skin, often characterized by an itchy rash.", severity: "Mild" }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 text-gray-800">
      <header className="p-4 flex justify-between items-center bg-white bg-opacity-80 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-indigo-600">SkinAI</h1>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
          <Button variant="ghost" onClick={handleAboutClick}>About</Button>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-red-600 hover:opacity-75 transition-opacity"
            >
              <path d="M19.615 6.035c-.556-.557-1.24-.84-2.055-.84-1.876-.03-3.755-.035-5.625-.035-1.87 0-3.745.005-5.625.035-.815 0-1.5.283-2.055.84-.556.556-.835 1.244-.835 2.06-.03 1.873-.035 3.752-.035 5.625s.005 3.745.035 5.625c0 .815.279 1.5.835 2.055.556.556 1.244.835 2.055.835 1.876.03 3.755.035 5.625.035 1.87 0 3.745-.005 5.625-.035.815 0 1.5-.279 2.055-.835.556-.556.835-1.24.835-2.055.03-1.876.035-3.755.035-5.625s-.005-3.755-.035-5.625c0-.815-.279-1.5-.835-2.055zm-10.905 8.46v-4.995l5.195 2.505-5.195 2.49z" />
            </svg>
          </a>
          <a href="https://github.com/ericfly02/SkinAI" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-gray-800 hover:text-gray-600 transition-colors"
            >
              <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.107-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.22-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.653.242 2.873.12 3.176.77.839 1.235 1.91 1.235 3.22 0 4.61-2.807 5.623-5.48 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.218.694.825.576 4.765-1.589 8.2-6.086 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" onClick={toggleDropdown}>
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            {isDropdownOpen && (
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Login</DropdownMenuItem>
                <DropdownMenuItem>Sign Up</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-indigo-800 mb-4">SkinAI Health Encyclopedia</h1>
            <p className="text-indigo-600 mb-6">Your Comprehensive Guide to Skin and Eye Conditions</p>
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search conditions..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Condition Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {conditionCategories.map((category) => (
                  <div key={category.name} className="bg-white overflow-hidden shadow rounded-lg">
                    <img className="h-48 w-full object-cover" src={category.image} alt={category.name} />
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-indigo-900">{category.name}</h3>
                      <p className="mt-1 text-sm text-indigo-600">{category.description}</p>
                      <div className="mt-4">
                        <Button variant="outline" className="flex items-center">
                          Learn More
                          <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Condition List</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {conditionList.map((condition) => (
                    <li key={condition.name}>
                      <a href="#" className="block hover:bg-indigo-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">{condition.name}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                condition.severity === 'Mild' ? 'bg-green-100 text-green-800' :
                                condition.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {condition.severity}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-indigo-500">
                                {condition.summary}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}