## Tech stack Documentation



### Technology Stack

This section outlines the libraries used in the project and their specific purposes.

#### Client-Side Libraries (from `client/package.json`)

- **Next.js**: A React framework that enables server-side rendering and static site generation, improving performance and SEO.
- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **Tailwind CSS**: A utility-first CSS framework that provides low-level utility classes to build custom designs directly in markup.
- **@radix-ui/react-checkbox**, **@radix-ui/react-dialog**, **@radix-ui/react-label**, **@radix-ui/react-select**, **@radix-ui/react-slot**: These are UI primitives from Radix UI that provide accessible and customizable components for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to the backend API, simplifying data fetching and handling responses.
- **@react-oauth/google**: A library for integrating Google authentication into the application, allowing users to log in using their Google accounts.
- **class-variance-authority**: A utility for managing class names based on variants, helping to create dynamic styles in a clean manner.
- **clsx**: A utility for constructing `className` strings conditionally, simplifying the management of CSS classes.
- **jose**: A library for handling JSON Web Tokens (JWT), used for secure authentication.
- **lucide-react**: A collection of SVG icons that can be easily integrated into React applications.
- **tailwind-merge**: A utility that merges Tailwind CSS class names intelligently, ensuring no conflicting styles are applied.
- **tailwindcss-animate**: A library providing animation utilities specifically designed for use with Tailwind CSS.

#### Server-Side Libraries (from `server/package.json`)

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for building web applications and APIs.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution to model application data.
- **bcryptjs**: A library for hashing passwords securely, ensuring user credentials are stored safely.
- **cookie-parser**: Middleware for parsing cookies attached to the client request object, facilitating cookie management in the application.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing the server to accept requests from different origins (e.g., the client).
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, simplifying configuration management.
- **google-auth-library**: A library for authenticating users with Google accounts, facilitating OAuth2 workflows.
- **jsonwebtoken**: A library for creating and verifying JSON Web Tokens (JWT), used for secure authentication and authorization.
- **multer**: Middleware for handling `multipart/form-data`, primarily used for uploading files (e.g., images).

### Folder Structure

The project is organized into a monorepo structure with clear separation between client and server codebases.

```
ArtsKhonnect/
├── client/
│   ├── App/                # Next.js App Router
│   ├── hooks/              # Custom React hooks
│   ├── Components/         # Reusable UI components#
│   ├── context/            # Context API providers to be called into copmnonents
│   ├── utils/              # Utility functions
│   ├── public/             # Static assets like images
│   ├── data/               # for data objects configurations
│   └── package.json        # Frontend dependencies


└── server/
    ├── config/             # Configuration files (e.g., database connection)
    ├── middleware/         # Custom middleware functions
    ├── models/             # Mongoose models (e.g., User, Mentorship)
    ├── routes/             # API route definitions
    ├── uploads/            # Directory for uploaded files
    ├── server.js           # Main entry point of the server
    └── package.json        # Backend dependencies
```


### Explanation of Folder Structure

#### Client Directory

- **components/**: Contains reusable UI components that can be shared across different pages. This promotes code reuse and consistency in design.
  
- **hooks/**: Houses custom hooks that encapsulate logic related to state management or side effects, enhancing code organization.

- **pages/**: Contains Next.js pages which correspond to different routes in the application. Each file represents a route that users can access.

- **context/**: Includes Context API providers that manage global state across components without prop drilling.

- **utils/**: Contains utility functions that provide helper methods used throughout the application.

- **public/**: Holds static assets such as images or fonts that can be directly accessed by users.

- **styles/**: Contains global styles and configurations related to Tailwind CSS.

#### Server Directory

- **config/**: Contains configuration files such as database connection settings.

- **middleware/**: Includes custom middleware functions that can process requests before they reach route handlers.

- **models/**: Houses Mongoose models representing data structures in MongoDB (e.g., User model, Mentorship model).

- **routes/**: Contains route definitions organized by functionality (e.g., authentication routes, mentorship routes).

- **uploads/**: Directory designated for storing uploaded files like user profile images or documents.

Certainly! Below are detailed instructions on how to run the ArtsKhonnect project, including examples of commands you would use in your terminal to start both the client and server applications.

## Running the ArtsKhonnect Project

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- **Node.js**: Version 14.x or higher
- **npm**: Comes bundled with Node.js
- **MongoDB**: Make sure you have a MongoDB database set up (either locally or using a service like MongoDB Atlas).

### Step-by-Step Instructions

1. **Clone the Repository**

   First, clone the repository to your local machine. 

2. **Set Up Environment Variables**

   Create a `.env` file in the `server` directory to store your environment variables. Here’s an example of what it might look like:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   - Replace `your-database-name` with the name of your MongoDB database.
   - Set a secure secret for JWT authentication.

3. **Install Dependencies**

   Navigate to both the `client` and `server` directories and install the necessary dependencies.

   ```bash
   # Install dependencies for the server
   cd server
   npm install

   # Install dependencies for the client
   cd ../client
   npm install
   ```

4. **Run the Server**

   After installing the server dependencies, navigate back to the `server` directory and start the server:

   ```bash
   cd server
   npm start
   ```

   This command will execute `node server.js`, starting your Express server on port 5000 (or whatever port you specified in your `.env` file). You should see output similar to:

   ```plaintext
   Server running on port 5000
   ```

5. **Run the Client**

   In a new terminal window (keeping the server running), navigate to the `client` directory and start the Next.js application:

   ```bash
   cd client
   npm run dev
   ```

   This command will start the Next.js development server, usually accessible at `http://localhost:3000`. You should see output indicating that Next.js is running:

   ```plaintext
   Local: http://localhost:3000
   ```

6. **Accessing the Application**

   Open your web browser and go to `http://localhost:3000`. You should see the landing page of ArtsKhonnect. From here, you can navigate through different pages such as Dashboard, Mentorship, Profile, etc.

### Example Commands Summary

Here’s a quick summary of all commands you need to run in sequence:

```bash
# Clone repository and navigate into it
git clone repo
cd ArtsKhonnect

# Set up environment variables (create .env file in server directory)

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Run the server
cd ../server
npm start

# In a new terminal window, run the client
cd ../client
npm run dev
```

### Additional Notes

- If you encounter any issues with MongoDB connection, ensure that your MongoDB service is running and that you have provided correct connection details in your `.env` file.