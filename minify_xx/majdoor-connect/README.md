# Majdoor Connect - Mobile Solutions Architecture

Majdoor Connect bridges the gap between blue-collar workers and users needing daily-wage services in India. 
This repository contains the foundation code and architecture for a highly scalable Android application, powered by Flutter and Google Cloud.

## Features Built
1. **Frontend (Flutter)**
   - **LoginScreen:** OTP based phone auth with Role selection (Worker vs User)
   - **AadharScanScreen:** Onboarding interface using the Camera for document capture.
   - **ProfileSetupScreen:** Displays auto-filled info using Vision AI, allows user to setup skills & wages.
   - **LabourDashboard:** Toggle "On Duty" capability for foreground location tracking.
   - **UserMapScreen:** Google Maps implementation to discover online workers nearby.
2. **Backend (Firebase & Google Cloud)**
   - **Cloud Functions:** Upload-triggered Vision AI function (`index.js`) to extract Aadhar info automatically.
   - **Security Rules:** Robust access policies (`firestore.rules` and `storage.rules`).
   - Configurations included.

## Project Structure
```
majdoor-connect/
  ├── README.md
  ├── .env.example                <-- Environment configuration
  ├── firebase.json               <-- Firebase structure
  ├── firestore.rules             <-- Database Security
  ├── storage.rules               <-- Object Storage Security
  ├── android/app/google-services.json
  ├── lib/                        <-- Flutter Source Code
  │   ├── main.dart               <-- App entry point and theme
  │   ├── screens/                <-- UI Views
  │   │   ├── login_screen.dart
  │   │   ├── aadhar_scan_screen.dart
  │   │   ├── profile_setup_screen.dart
  │   │   ├── user_map_screen.dart
  │   │   ├── labour_dashboard.dart
  ├── cloud_functions/            <-- Node.js backend
  │   ├── index.js
  │   ├── package.json
```

## Setup Instructions

### 1. Flutter Setup
1. Open this folder in your terminal and run `flutter pub get` to install dependencies (Needs `firebase_core`, `firebase_auth`, `cloud_firestore`, `firebase_storage`, `flutter_dotenv`, `google_maps_flutter`).
2. Copy `.env.example` to `.env` and fill in your API keys.

### 2. Firebase / Google Cloud Setup
1. Create a project on the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Phone Authentication**.
3. Enable **Firestore Database** and **Cloud Storage**.
4. Upgrade your project to **Blaze Plan** (Required for Cloud Functions).
5. Enable the **Cloud Vision API** in the Google Cloud Console for this project.
6. Run `firebase login`, then `firebase deploy` in the `majdoor-connect/` folder to deploy rules and functions.
7. Download the `google-services.json` from the Firebase Console for your Android app and replace `android/app/google-services.json`.

### 3. Foreground Realtime Service
For background robust functionality in Flutter, consider integrating `flutter_background_geolocation` or `workmanager` to sync coordinates to Firestore when the Labour marks themselves "Online".
