import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import axios from 'axios';

// receive user data as props
interface SettingsTabProps {
  userData: any;
}

const SettingsTab = ({ userData }: SettingsTabProps) => {
  const [formData, setFormData] = useState({
    name: '' || userData.name,
    last_name: '' || userData.last_name,
    email: '' || userData.email,
    username: '' || userData.username,
    password: '' || userData.password,
    height: '' || userData.height,
    weight: '' || userData.weight,
    sex: '' || userData.sex,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token'); // Fetch the token from localStorage
      
      const response = await axios.patch(
        'http://localhost:3001/user/update',
        {
          name: formData.name,
          last_name: formData.last_name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          height: parseFloat(formData.height) || null,
          weight: parseFloat(formData.weight) || null,
          sex: formData.sex,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure headers are sent in the 3rd parameter
          },
        }
      );
      
      console.log('Update info successful', response.data);
    } catch (error) {
      console.error('Update error:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">First Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter your username"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter a new password"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your height"
            />
          </div>

          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your weight"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Label htmlFor="sex">Sex</Label>
        <select
          id="sex"
          value={formData.sex}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 mt-1 w-full">
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200">
        Save changes
      </Button>
    </form>
  );
};

export default SettingsTab;
