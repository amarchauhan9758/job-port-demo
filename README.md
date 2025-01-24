Job Application Portal
A Next.js application for managing job listings, viewing job details, submitting applications, and tracking application history. This project includes user authentication using Google and GitHub sign-in options, ensuring a secure and seamless user experience.


Features
1. Job Listing Page
Displays a list of jobs fetched from an API.
Each job card shows:
Job title
Company name
Location
Brief description
Clicking "View Details" navigates to the Job Details page.
2. Job Details Page
Shows detailed job information:
Job description
Location
Additional details
Includes an "Apply Now" button that navigates to the Application page.
3. Application Page
Users can submit:
Name
Email
Resume upload
Includes:
Form validation
Success or failure notifications upon submission
4. Application History Page
Displays jobs the user has applied for.
Includes application status tracking.
5. User Authentication
Social login using Google and GitHub (powered by NextAuth.js).
Protects all routes except the login page.




Here's a well-structured README for your project:

Job Application Portal
A Next.js application for managing job listings, viewing job details, submitting applications, and tracking application history. This project includes user authentication using Google and GitHub sign-in options, ensuring a secure and seamless user experience.

Features
1. Job Listing Page
Displays a list of jobs fetched from an API.
Each job card shows:
Job title
Company name
Location
Brief description
Clicking "View Details" navigates to the Job Details page.
2. Job Details Page
Shows detailed job information:
Job description
Location
Additional details
Includes an "Apply Now" button that navigates to the Application page.
3. Application Page
Users can submit:
Name
Email
Resume upload
Includes:
Form validation
Success or failure notifications upon submission
4. Application History Page
Displays jobs the user has applied for.
Includes application status tracking.
5. User Authentication
Social login using Google and GitHub (powered by NextAuth.js).
Protects all routes except the login page.
Getting Started
Follow these steps to set up and run the project on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js (v14 or later)
npm or yarn
A GitHub or Google OAuth Client ID and Secret for authentication

Installation
Clone the repository: 
https://github.com/amarchauhan9758/job-port-demo
cd job-application-portal
install all dependencies
npm install



Configure environment variables:

Create a .env.local file in the root directory.

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret



Running the Project
Start the development server:

npm run dev




