// JSON server API where all auth-related requests will be sent
const API_URL = "http://localhost:3001";

// authService -> for authentication-related API calls
export const authService = {
  // register new user
  signup: async (userData) => {
    try {
      // POST request to create new user
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData, // spread the user data (name, email, password)
          id: Date.now(), // generate unique ID
          createdAt: new Date().toISOString(),
        }),
      });

      // check if the request was successful
      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // return the created user data
      const user = await response.json();
      return { user };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // log in an existing user
  login: async ({ email, password }) => {
    try {
      // fetch user with matching email
      const response = await fetch(`${API_URL}/users?email=${email}`);
      const users = await response.json();

      // find user with matching email and password
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      return { user };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Update user profile
  // userId: the ID of the user to update
  // userData: new data to update
  updateProfile: async (userId, userData) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      // check if update was successful
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // return updated user data
      const updatedUser = await response.json();
      return { user: updatedUser };
    } catch (error) {
      throw error;
    }
  },
};
