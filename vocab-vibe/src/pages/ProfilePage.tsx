import React, { useState, useEffect } from 'react';
import { User, Mail, Globe, Camera } from 'lucide-react';
import supabase from '../util/supabaseClient'; // Import the Supabase client

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: '',
    country: '',
  });

  // Fetch profile data when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      // Step 1: Get the current user
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Step 2: Fetch the user's profile
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('username, email, full_name, bio, country')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          // Step 3: Set the profile data in state
          setProfileData({
            username: profile.username || '',
            email: profile.email || '',
            fullName: profile.full_name || '',
            bio: profile.bio || '',
            country: profile.country || '',
          });
        }
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Get the current user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Step 2: Update the profile in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profileData.username,
          email: profileData.email,
          full_name: profileData.fullName,
          bio: profileData.bio,
          country: profileData.country,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        alert('Profile updated successfully!');
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={64} className="text-gray-400" />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
              <Camera size={20} />
            </button>
          </div>
          <h2 className="text-2xl font-semibold mt-4">{profileData.fullName}</h2>
          <p className="text-gray-600">{profileData.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <User size={20} />
                </span>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Mail size={20} />
                </span>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Globe size={20} />
                </span>
                <input
                  type="text"
                  value={profileData.country}
                  onChange={(e) =>
                    setProfileData({ ...profileData, country: e.target.value })
                  }
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;