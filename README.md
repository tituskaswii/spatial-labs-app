--- Prepared by Titus Kaswii Muia ---

# spatial-labs-app

Welcome to Spatial Labs React Native project for managing personal profiles, inspired by Linktree, tailored for iOS. This project allows users to create and customize their profiles, manage social media links, and maintain control over the layout of their accounts.

## Setting Up and Running the Application on your workstation

To get started with the spatial-labs-app project, follow these instructions:

### Prerequisites

- Make sure you have Node.js and npm installed on your machine.
- Ensure you have React Native CLI installed globally.
- You'll need Xcode/Android Studio and a simulator or a physical iOS device for testing.

### Installation Steps

1. Clone this repository to your local machine:

```bash
git clone https://github.com/tituskaswii/spatial-labs-app
```

2. Navigate into the project directory:

```bash
cd spatial-labs-app
```

3. Install dependencies using npm:

```bash
npm install // for npm package manager users

or

yarn install // for yarn package manager users
```

### Running the Project

4. Start the Metro Bundler:

```bash
npx react-native start // or npm start, or yarn start
```

Start the Application

## IOS: Run the iOS app:

```bash
npx react-native run-android // npm run android // yarn android
```

This will launch the app on your Android simulator or device.

## Android: Run the iOS app:

```bash
npx react-native run-ios  // npm run ios // yarn ios
```

This will launch the app on your iOS simulator or device.

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Modifying the Spatial-Labs App

Now that we have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Features and Functionalities Overview

### 1. Account Creation
- Users can create their profiles with a personalized name, bio, and profile picture.
- They have the option to upload a profile picture from their device's gallery or take a new photo using the camera.

### 2. Profile Customization
- Users can add links to their social media accounts (e.g., Instagram, Twitter, LinkedIn).
- They can rearrange the order of their social media links to customize their profile layout.

### 3. Profile Editing
- Users can edit their name, bio, and profile picture at any time.
- They have the flexibility to update their profile information and adjust their profile picture even after the initial setup.

### 4. Local Data Storage
- React Native's local storage capabilities are utilized to save and manage user data on the device.
- All profile information and social media links are persisted across app restarts, ensuring a seamless user experience.

### 5. Logout Functionality
- The app includes a logout button that completely clears all stored data.
- This enables users to start a new account creation process without any residual data from previous sessions.

### 6. Scalability
- The project is designed and tested to ensure scalability across different iOS device sizes.
- Layout integrity and usability are maintained across various screen dimensions, providing a consistent user experience.

---

Special regards, Titus Kaswii Muia
