import { authService } from '../services/authService';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserSuccess } from '../features/auth/authSlice';

const Profile = () => {
  // get user data from Redux state
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // initialize form data with current user data or empty strings
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // state to track whether the form is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // call API to update user profile
      const { user: updatedUser } = await authService.updateProfile(user.id, formData);
      
      // update Redux state with new user data
      dispatch(updateUserSuccess(updatedUser));
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
            {/* toggle Edit Mode Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* profile update form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm
                    ${isEditing 
                      ? 'bg-white border focus:border-blue-500 focus:ring-blue-500' 
                      : 'bg-gray-50 border-none'
                    }
                  `}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm
                    ${isEditing 
                      ? 'bg-white border focus:border-blue-500 focus:ring-blue-500' 
                      : 'bg-gray-50 border-none'
                    }
                  `}
                />
              </div>

              {/* save changes button, shown in edit mode */}
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* additional account information section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="text-gray-900">{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;