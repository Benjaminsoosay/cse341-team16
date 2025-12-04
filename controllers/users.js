// controllers/users.js
// User controller for handling user-related operations

// In-memory user data (for development)
// In a real app, this would come from a database
let users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'admin',
    createdAt: new Date('2024-01-15'),
    active: true
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAt: new Date('2024-02-20'),
    active: true
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    role: 'user',
    createdAt: new Date('2024-03-10'),
    active: false
  }
];

// Get all users
const getAllUsers = (req, res) => {
  console.log('Getting all users');
  
  try {
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found in the system'
      });
    }
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
    
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
      error: error.message
    });
  }
};

// Get a single user by ID
const getUserById = (req, res) => {
  console.log('Getting user by ID:', req.params.id);
  
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User ID must be a number'
      });
    }
    
    const foundUser = users.find(user => user.id === userId);
    
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${userId} not found`
      });
    }
    
    res.status(200).json({
      success: true,
      data: foundUser
    });
    
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user',
      error: error.message
    });
  }
};

// Get users by role
const getUsersByRole = (req, res) => {
  console.log('Getting users by role:', req.params.role);
  
  try {
    const role = req.params.role;
    const filteredUsers = users.filter(user => 
      user.role.toLowerCase() === role.toLowerCase()
    );
    
    if (filteredUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No users found with role '${role}'`
      });
    }
    
    res.status(200).json({
      success: true,
      count: filteredUsers.length,
      data: filteredUsers
    });
    
  } catch (error) {
    console.error('Error in getUsersByRole:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while filtering users by role',
      error: error.message
    });
  }
};

// Search users
const searchUsers = (req, res) => {
  console.log('Searching users with query:', req.query);
  
  try {
    const { name, email, role } = req.query;
    let results = [...users];
    
    if (name) {
      results = results.filter(user => 
        user.firstName.toLowerCase().includes(name.toLowerCase()) ||
        user.lastName.toLowerCase().includes(name.toLowerCase())
      );
    }
    
    if (email) {
      results = results.filter(user => 
        user.email.toLowerCase().includes(email.toLowerCase())
      );
    }
    
    if (role) {
      results = results.filter(user => 
        user.role.toLowerCase() === role.toLowerCase()
      );
    }
    
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found matching your search criteria'
      });
    }
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
    
  } catch (error) {
    console.error('Error in searchUsers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching users',
      error: error.message
    });
  }
};

// Get active users count
const getActiveUsersCount = (req, res) => {
  console.log('Getting active users count');
  
  try {
    const activeUsers = users.filter(user => user.active);
    const activeCount = activeUsers.length;
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers: users.length,
        activeUsers: activeCount,
        inactiveUsers: users.length - activeCount,
        activePercentage: Math.round((activeCount / users.length) * 100)
      }
    });
    
  } catch (error) {
    console.error('Error in getActiveUsersCount:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while counting active users',
      error: error.message
    });
  }
};

// Export all controller functions
module.exports = {
  getAllUsers,
  getUserById,
  getUsersByRole,
  searchUsers,
  getActiveUsersCount
};
