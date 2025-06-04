# CryptoNewsApp

🔗 **Live Demo:** [https://structura-two.vercel.app](https://structura-two.vercel.app)

**CryptoNewsApp** This is a React Native project for fetching and displaying crypto-related news, bootstrapped using @react-native-community/cli.
A cross-platform (iOS & Android) mobile application that demonstrates capabilities in API integration, state management, offline caching, native module integration, and modern UI/UX patterns.

## 🚀 Getting Started

 **Note**: Make sure you have completed the Set Up Your Environment guide before proceeding.


## 📋 Prerequisites
- Node.js >= 16.x
- React Native CLI environment
- Xcode and Android Studio setup
- CryptoPanic API key

Create a .env file in the root directory with your API key:

```bash 
CRYPTO_PANIC_API_KEY=your_api_key_here
```

## 1️⃣ Step 1: Install Dependencies
```bash
# Using npm
npm install

# OR using Yarn
yarn install
```
For iOS, install CocoaPods dependencies:

```bash
npx pod-install ios
```

## 2️⃣ Step 2: Start Metro
You will need to run Metro, the JavaScript build tool for React Native.
To start the Metro dev server, run the following command from the root of your React Native project:
```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

## 3️⃣ Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

```bash
🤖 Android
sh# Using npm
npm run android

# OR using Yarn

yarn android


🍎 iOS

# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see the CryptoNewsApp running in the Android Emulator, iOS Simulator, or your connected device.
This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## 🚀 Features
1  📰 News Feed UI

- Fetches and displays crypto news from CryptoPanic API in a scrollable list
- Opens articles in WebView with headlines, thumbnails, and timestamps
2 📱 Offline & Cache Support
- Caches news using AsyncStorage for offline viewing
- Shows offline banner when network is unavailable

3 🔗 Deep Linking
- Navigate directly to specific articles via URL

4 .🧠 State Management
- Uses Zustand for global state management of articles, filters, and loading states

5 🔔 Local Notifications
- Shows notifications for newly fetched articles when app is backgrounded

6 🧪 Unit Testing
- Comprehensive test coverage using Jest and React Native Testing Library

🎁 Bonus Features
- ✅ Pull to Refresh for updating the article list
- ✅ Dark Mode support using system appearance and toggle
- ✅ Pagination: Load more articles on scroll(added an alternate code is there but it wont work since api plan needs to be upgraded)

## 🧱 Architecture Overview
⚙️ Tech Stack

- React Native
- Zustand for state management
- React Navigation for routing and deep linking
- AsyncStorage for persistence
- Axios for API calls
- React Native Push Notifications for for local notifications
- WebView for rendering articles

```bash
CryptoNewsApp/
├── api/               # API client setup and functions
├── components/        # Reusable UI components
├── navigation/        # Navigation and deep linking setup
├── screens/           # Screen-level components (NewsFeed, Article)
├── store/             # Zustand stores for state management
├── theme/             # Dark/light theme toggle logic
├── utils/             # Utility functions (network check, etc.)
├── App.tsx
├── ...
```
