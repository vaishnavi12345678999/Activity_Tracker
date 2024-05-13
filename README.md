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
13. In file application_controller please refer the comment for creating a secret key. (![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/1fb6274f-6541-477f-a13f-c899b985cc49))
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

-Logout functionality (Provuded as a button in Header is the user is logged in, clicking on which is redirected to the login page)
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/c54600f1-ab17-40c1-9396-a5655a889917)

### Restricting Websites
-To restrict a website, navigate to the site, click the extension icon, and use the "Restrict this site" feature.
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/b21d76c5-ea2b-4e80-a4b7-a5df38622cd0)
-When the user clicks Restric this site, the hostname is sent to backend and then fetched at extension and then checked if teh active URL is in restricyted domains or not, If it contains it closes the current tab (![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/11b2c7ac-9743-427a-9d59-bf5336d005d0))
-The limting time is yet to be done but can be done in no time, just add an input at the extension for the active site, this sends the data to the backedn which is then fetched at the extension side. Here the extension checks for the active URL and its registered limit and closes it if reaches limit.


### Viewing Dashboard
Access the dashboard by logging in through a web interface using the same credentials as the extension to view detailed activity reports and analytics.
This is a snaphot of domain wise activity of a logged in user
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/742fadea-f28c-4b96-9247-2486897828ce)
This is page specific for a selected domain in seperate tabs
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/40a4c9f9-4fd8-4eda-bcdb-2361606b7947)
If user tries to toggle to a individual section the toast message will be displayed from toast container
![image](https://github.com/vaishnavi12345678999/Activity_Tracker/assets/120002519/b27f3a63-47ec-405d-98c9-da7daaa2d8cd)



## Database Schema

### Users
| Column          | Type   | Description                   |
|-----------------|--------|-------------------------------|
| `id`            | integer| Primary key, auto-incremented |
| `email`         | string | User's email address          |
| `password_digest`| string | Hashed password for security  |
| `created_at`    | datetime| Record creation timestamp     |
| `updated_at`    | datetime| Record update timestamp       |

- Indexes:
  - `email` (unique)

### Activities
| Column          | Type    | Description                         |
|-----------------|---------|-------------------------------------|
| `id`            | integer | Primary key, auto-incremented       |
| `user_id`       | integer | Foreign key to users table          |
| `hostname`      | string  | Hostname of the visited website     |
| `url`           | string  | URL of the page                     |
| `time_spent`    | integer | Time spent on the page in seconds   |
| `date`          | date    | Date of the activity                |
| `created_at`    | datetime| Record creation timestamp           |
| `updated_at`    | datetime| Record update timestamp             |

- Indexes:
  - `user_id`
  - Composite `user_id, url, date` (unique)

### Restricted Sites
| Column          | Type    | Description                   |
|-----------------|---------|-------------------------------|
| `id`            | integer | Primary key, auto-incremented |
| `user_id`       | integer | Foreign key to users table    |
| `hostname`      | string  | Hostname of the restricted site |
| `created_at`    | datetime| Record creation timestamp     |
| `updated_at`    | datetime| Record update timestamp       |

- Indexes:
  - Composite `user_id, hostname` (unique)

##APIs
- [x] Login -> returns a JWT encoded 
- [x] Signup -> creates a user with correct details with hashed password
- [x] Periodic Activity storing (every 5 seconds) -> (**If** the domain in the particular day is present for that user **then** increment it **else** create new record)
- [x] Fetching Activity to the dashboard
- [x] Storing the Restricted domains in the database API
- [x] Fetching the restricted domains for the logged in user.
- [x] Time storage for the restricted domains
- [x] fetching for the restricted domains

##Some honorable mentions of architechture decisions:
- [x] Using JWT for secure API authentication
- [x] Storing the Token in localstorage for temporary purposes (But time permitted created an encrypted cookie in the brower is a good option)
- [x] Periodical Activity Storage at the backend side for real-time updates
- [x] Storing the activity with an innovative strategy, instead of storing every record, stored daywise in the database for better user experience and for front end to use to showcase daywise activity

## Additional Features
- [ ] Categorizing domains
- [ ] Motivation lines for users using Chat GPT Open AI Model and prompt engineering for creative motivation with which we can show the users.
- [ ] Dockerize the front end, backend and the database image with the backup for containerised application. For scalable, resilient application which can be accessed from anywhere.

## Value Proposition
The "Activity Tracker" Chrome extension offers several valuable propositions to users, which can broadly enhance productivity, digital well-being, and data-driven decision-making. Here’s a breakdown of the key values this application brings to society:

### Enhance Productivity
- **Time Management:** By tracking time spent on various websites, users can gain insights into their browsing habits, helping them identify and reduce time-wasting activities. This promotes more focused and efficient work habits.
- **Activity Awareness:** Users become more aware of their digital presence. Awareness is the first step toward behavior change, especially for users looking to optimize their online activities.

### Improve Digital Well-being
- **Reduced Digital Distraction:** The feature to restrict access to non-productive or distracting websites helps users avoid temptation and stay focused on productive tasks.
- **Customizable Restrictions:** Users can set time limits on specific websites, which helps in maintaining a healthy balance between work and leisure activities online.

### Data-Driven Insights
- **Detailed Analytics:** The dashboard provides visual analytics on web activity, which can be used to spot trends, track productivity improvements, and make informed decisions about how one spends their time online.
- **Personalization:** By categorizing websites into groups like "productive," "entertaining," etc., users can tailor their web experience to better align with personal or professional goals.

### Social Responsibility
- **Promoting Responsible Usage:** Encouraging users to be mindful of their browsing habits can lead to more responsible internet use, potentially reducing exposure to harmful content.
- **Supporting Mental Health:** By limiting overexposure to potentially addictive sites and encouraging breaks, the tool can help in reducing anxiety and stress associated with excessive internet use.

### Security and Privacy
- **Data Privacy:** With strong authentication measures and secure data handling practices, users can trust that their browsing data is private and well-protected.
- **User Empowerment:** Users control their data and are empowered to make changes to their settings and restrictions based on their personal preferences.

By integrating these features into daily life, the "Activity Tracker" aims to empower users to make more informed decisions about their digital habits, contributing to a healthier digital society. This tool is not just about tracking and limiting but about understanding and optimizing how digital platforms are used, which in turn can boost overall productivity and well-being.


## Checklist
- [x] User Registration and Login
- [x] Logout
- [x] Activity Tracking
- [x] Website Restriction
- [x] Time Restrictions
- [x] Personalized Dashboard
- [x] Domain specific time activity
- [x] Individual page specific time activity
- [x] Domain specific and Individual Page graph toggle
- [x] Toast for warnings, user experiences
