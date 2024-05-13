# Activity Tracker Chrome Extension

Activity Tracker is a powerful Chrome Extension designed to help users monitor their browsing activity, manage website usage, and enhance productivity through various built-in features.

## Features

### Account Management
- **User Registration and Login**: Allows any user with an email address to create an account and log into the extension.

### Activity Tracking
- **Track Time Spent**: Automatically tracks the amount of time spent on each active website tab.
- **Page-Specific Activity**: Tracks time spent on specific parts of websites, such as specific job pages or articles.

### Productive Browsing
- **Website Restriction**: Users can add websites to a restricted list. Accessing a restricted site triggers a warning, preventing further access.
- **Time Restrictions**: Users can set time limits for specific websites. Exceeding this limit will automatically close the tab.

### Personalized Dashboard
- **Dashboard Access**: Users can log into a web-based dashboard with the same credentials used for the extension to access detailed analytics.
- **Activity Metrics**: The dashboard displays graphical representations of time spent on various websites.
- **Categorization**: Allows users to categorize websites into groups such as "Productive", "Distracting", etc.

## Installation

### Prerequisites
- Google Chrome Browser
- Internet Access

### Steps to Install
1. Clone the repository:
   git clone https://github.com/vaishnavi12345678999/Activity_Tracker.git
   
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** at the top right.
4. Click on **Load unpacked** and select the "extension" directory where you cloned the repo.

5. Open "tracker-frontend" directory in the cloned repo. This is the React front end application.
6. The package.json is present, open terminal and run command "npm install" (prerequisites: Node.js server for javascript runtime)
7. Then, do "npm start" for development environment running of the application.
8. The tracker-front end is essential for user sign up, login, logout and dashboard view.

9. Then, finally setup our backend as well.
10. Open tracker directory in cloned repo and run gem install (prerequisites: ruby latest version, rails latest version, mysql2, and create a database tracker and spin it up for connection with user name and password (change in databse.yml at your_new_password))
11. Then run gem install.
12. Now we have extension, front end, and backend installed. 
## Usage

### Login
-After installation, click on the extension icon and log in using your credentials to start tracking your activity.
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/22c39294-c424-4fb1-b710-3a8e80834e41)

-The Login is necessary for activity to be tracked.
-If the User does not have the login, Sign up which will redirect to the front end app.
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/d46f6617-be8b-4d4f-b824-4da02979c46c)
-Signup if no account
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/1a51c66d-fc3e-4e38-ab2c-f31347e2ed59)
-Some validations for Signuppage
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/573d2141-e7fd-41c5-83b5-d7ebdc4047a3)
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/2e8171a4-f74d-43be-acdd-5de7fb9a6a2d)

-Validations for Loginpage
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/8ebaaa95-61bb-41e1-baeb-48955025739b)
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/cf8d1d5a-f760-4e61-817e-a7361a459c01)




### Restricting Websites
To restrict a website, navigate to the site, click the extension icon, and use the "Restrict this site" feature.

### Viewing Dashboard
Access the dashboard by logging in through a web interface using the same credentials as the extension to view detailed activity reports and analytics.

## Screenshots
Include screenshots here to show how the extension works.

## Database Schema
Provide a detailed database schema to show how data is structured within your application.

## Contributions
Instructions for how others can contribute to the project. Include guidelines for code style, branches, commits, pull requests, etc.

## License
State the license under which this extension is released, typically found at the bottom of the README.

## Additional Features
List any additional features that you plan to implement in the future.

## Value Proposition
Describe the value this project brings to its users and potentially to society, focusing on productivity enhancements and data privacy.

## Checklist
- [x] User Registration and Login
- [x] Activity Tracking
- [x] Website Restriction
- [x] Time Restrictions
- [x] Personalized Dashboard
