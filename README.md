# Social Media Authentication App

A React Native application that demonstrates social media authentication integration with Google and Facebook, featuring a unified interface for managing multiple social media accounts.

## Features

- Google Sign-In integration
- Facebook Login integration
- User profile management
- Social media feed dashboard
- Secure authentication handling
- Modern and responsive UI

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment setup
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Google Cloud Console account (for Google Sign-In)
- Facebook Developer account (for Facebook Login)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SocialMediaAuth
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios
pod install
cd ..
```

## Configuration

### Google Sign-In Setup

1. Create a project in the Google Cloud Console
2. Enable the Google Sign-In API
3. Create OAuth 2.0 credentials
4. Add your SHA-1 signing certificate to the project
5. Update the `webClientId` in `src/screens/LoginScreen.js`

### Facebook Login Setup

1. Create a Facebook Developer account
2. Create a new app in the Facebook Developer Console
3. Configure Facebook Login
4. Add your app's bundle ID/package name
5. Update the Facebook app ID in your native configuration files

## Running the App

### Android

```bash
npx react-native run-android
```

### iOS (macOS only)

```bash
npx react-native run-ios
```

## Project Structure

```
src/
├── assets/         # Images, fonts, and other static files
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # API and authentication services
├── utils/          # Helper functions and utilities
└── constants/      # App-wide constants
```

## Security Considerations

- All API keys and sensitive information are stored securely
- Authentication tokens are managed using AsyncStorage
- Proper error handling and user feedback
- Secure social media API integration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
