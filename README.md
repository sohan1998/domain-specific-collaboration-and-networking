# Circles

## Overview

Circles is a professional social networking and collaboration platform that connects users based on mutual academic and professional interests. Unlike existing platforms like LinkedIn and Meetup, Circles provides domain-specific group recommendations and enables users to collaborate on projects based on their skills and backgrounds.

The platform uses a recommendation system (collaborative filtering technique) to match users with relevant groups and project opportunities, facilitating cross-domain collaboration and professional growth.

## Features

- **User Profiles:** Users can create profiles showcasing their skills, job experience, and interests
- **Group Collaboration:** Join domain-specific groups for professional discussions and networking
- **Project Matching:** Discover and contribute to real-world projects based on domain expertise
- **Recommendation System:** AI-based collaborative filtering to recommend projects, roles, and groups
- **Messaging System:** Direct messaging and discussions within project groups
- **Secure Authentication:** Secure login and session management
- **File Uploads:** Users can upload files and documents via AWS S3

## Technologies Used

### **Backend** (Node.js & Express.js)

- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Bcrypt for password hashing
- **Session Management:** Express-session & Cookie-parser
- **Cloud Services:** AWS SDK (for file storage)
- **CORS Handling:** CORS middleware
- **API Requests:** Axios for internal/external API calls

### **Frontend** (React.js)

- **UI Framework:** Material UI & Bootstrap
- **Routing:** React Router
- **State Management:** React hooks & context
- **Forms & Selects:** React Select Search
- **File Uploads:** React S3 (AWS S3 integration)
- **Cookies Handling:** React-Cookie
- **Testing:** React Testing Library

## Setup & Installation

### **Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (e.g., MongoDB URI, AWS credentials) in a `.env` file

4. Start the server:
   ```bash
   npm start
   ```

### **Frontend Setup**

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. **Sign up or Log in** using an email and password
2. **Create or Join Groups** related to your professional interests
3. **Find or Start Projects** to gain real-world experience
4. **Engage in Discussions** through direct messaging
5. **Upload & Share Files** securely via AWS S3

## Contributing

Contributions are welcome! 

To contribute:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes and push
4. Open a pull request

## License

This project is licensed under the MIT License.
