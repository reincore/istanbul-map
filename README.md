# Interactive Map with Firebase Integration

## Project Overview

This project is an interactive web-based map application that allows users to add and remove location markers. Built with Leaflet.js for map rendering and Firebase Realtime Database for data persistence, it offers real-time synchronization of map markers across different sessions and users. The application is designed with a focus on ease of use, with a simple and intuitive interface ideal for personal and small-scale mapping projects.

## Features

- **User Authentication**: Secure login functionality to ensure that only authorized users can add or remove markers.
- **Interactive Map**: Users can double-click on the map to add new markers and double-click on existing markers to remove them.
- **Real-Time Updates**: Changes made by users are instantly reflected in the Firebase Realtime Database and synchronized across all sessions.
- **Responsive Design**: Optimized for both desktop and mobile devices, providing a seamless user experience.

## How to Use

1. **Login**: Start by logging in with your credentials. If you don't have an account, please contact the administrator to obtain access.

2. **Adding a Marker**: Simply double-click on any location in the map where you want to add a marker. A prompt will appear for you to enter the marker's description.

3. **Removing a Marker**: To remove a marker, double-click on it, and confirm the deletion in the prompt.

4. **Viewing Markers**: All markers added by users will be visible on the map, with their descriptions shown in tooltips permanently.

## Technologies Used

- **Leaflet.js**: An open-source JavaScript library for mobile-friendly interactive maps.
- **Firebase Realtime Database**: A cloud-hosted NoSQL database for storing and syncing data in real-time.
- **Firebase Authentication**: A service that provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users.

## Setup and Installation

> ### Prerequisites

- Node.js and npm installed
- Access to Firebase and creation of a Firebase project

### Steps

1. **Clone the Repository**:
    ```
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2. **Install Dependencies**:
    ```
    npm install
    ```

3. **Firebase Configuration**:
    - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Firebase Authentication and Realtime Database.
    - Add your Firebase project configuration to the application. You can find your project's configuration in the Firebase Console under Project Settings.

4. **Environment Variables**:
    - Set up your environment variables for Firebase configuration. (Refer to the Firebase documentation for required keys).

5. **Running the Application**:
    - To start the application locally, run:
        ```
        npm start
        ```
    - The application should now be running on `localhost:YOUR_PORT`.

6. **Deployment**:
    - Deploy the application to your preferred hosting service (e.g., Firebase Hosting, Netlify, Vercel).


## Contributing

Contributions to this project are welcome! Here's how you can contribute:

1. **Fork the Repository**:
    - Fork the project to your own GitHub account.

2. **Clone Your Fork**:
    ```
    git clone https://github.com/your-username/your-forked-repo.git
    cd your-forked-repo
    ```

3. **Create a New Branch**:
    ```
    git checkout -b your-new-feature
    ```

4. **Make Your Changes**:
    - Implement your new feature or fix issues.
    - Ensure your code follows the project's style and contribution guidelines.

5. **Commit Your Changes**:
    ```
    git commit -am 'Add some feature'
    ```

6. **Push to the Branch**:
    ```
    git push origin your-new-feature
    ```

7. **Create a New Pull Request**:
    - Go to your forked repository on GitHub and create a new pull request to the main project.

8. **Code Review**:
    - Once your pull request is opened, it will be reviewed by the maintainers. They may suggest changes or improvements.

Remember to keep your fork up to date with the main project to avoid merge conflicts.
