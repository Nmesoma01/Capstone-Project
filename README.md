# Artskhonnect

**Artskhonnect** is a cutting-edge web application aimed at revolutionizing formal dance education in Nigeria. By leveraging technology, the platform connects emerging dance professionals with essential educational resources, mentorship opportunities, and industry connections.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Link to the GitHub Repo](#link-to-the-github-repo)
- [Setup Instructions](#setup-instructions)
- [Designs](#designs)
- [Deployment Plan](#deployment-plan)
- [Video Demo](#video-demo)
- [License](#license)

## Project Overview

The platform aims to bridge emerging dance professionals with essential educational resources, mentorship, career opportunities, and industry connections. It is built around four key components:

- **On-demand Dance Educational Resources**: A curated collection of dance education materials, including video tutorials, theoretical lessons, and practical exercises designed to foster both practical and academic learning.

- **Virtual Mentorship Programs**: Connects dancers with seasoned professionals for guidance and support, facilitating structured mentorship programs where experienced dancers offer insights to mentees.

- **Digital Portfolio Upload**: Allows users to create and manage their professional portfolios in a digital format, showcasing their performances, skills, achievements, and credentials through various media formats.

- **Job Opportunity Listings**: A dedicated job board that aggregates dance-related job postings, enabling dancers to search, apply for, and engage with recruiters and employers directly through the platform.

## Features
- User signup and login
- Profile setup and management
- On-demand dance educational resources
- Virtual mentorship program
- Digital portfolio upload
- Job opportunity listings
- Advanced search and filter functionality for dancers and recruiters
- Email contact functionality between dancers and recruiters

### Note
For the sake of the capstone, I will be focusing only on the dancers dashboard.

## Link to the GitHub Repo
[GitHub Repository](https://github.com/Nmesoma01/Capstone.git)  

## Setup Instructions
To set up the environment and run the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Nmesoma01/Capstone.git  
   cd capstone

## Backend Setup
1. **Navigate to the backend directory**
   ```bash
   cd server

2. **Create a .env file**: In the server directory, create a .env file and paste the following environment variables
   ```bash
   JWT_SECRET=c00cd39237c19c625425b6e432bd7c4c17f35cc14f2a302647ae12893fc2498124560eb03b30241c41a707588a62939bb31d804953a2a3cd99afdc1916c67748
   MONGO_URI="mongodb://localhost:27017"
   PORT=5000

3. **Install Dependencies**: Run the following command to install all backend dependencies:
   ```bash
   npm install

4. **Generate JWT Token**: Create a token by running:
   ```bash
   node create.token.js

This will generate a token. Copy the generated token and replace the JWT_SECRET value in the .env file with the new token.

6. **Start the Backend Server**: Finally, start the backend server by running:
   ```bash
   npm start

## Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd client

2. **Run the Frontend**: Start the frontend by running:
   ```bash
   npm run dev

3. **Access the Application**:
Open your web browser and navigate to http://localhost:3000 to access the application.

## Designs
The design mockups and app interfaces can be found in the [Designs](./Designs) directory of the repository.

## Tools Used
- Frontend (Next.js, Tailwind CSS)
- Backend (Express.js, CORS, JWT) 
- Database (Mongo DB)
- Development Tools (Node.js, Nodemon)

## Deployment Plan
My frontend would be deployed using **Vercel** while my Backend would be deployed using **Render**.

## Video Demo
A video demonstration of the application's functionalities can be found here https://drive.google.com/file/d/1Jpijto0YhnCSf4Bs8gJIOiEF9TyzN0e4/view?usp=sharing