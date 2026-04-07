import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';
import 'package:flutter/foundation.dart'; // Added for kIsWeb

import 'screens/login_screen.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");

  // Modern Web/Cross-Platform Firebase Initialization Setup
  await Firebase.initializeApp(
    options: kIsWeb ? FirebaseOptions(
      apiKey: dotenv.env['FIREBASE_API_KEY'] ?? '',
      authDomain: dotenv.env['FIREBASE_AUTH_DOMAIN'] ?? '',
      projectId: dotenv.env['FIREBASE_PROJECT_ID'] ?? '',
      storageBucket: dotenv.env['FIREBASE_STORAGE_BUCKET'] ?? '',
      messagingSenderId: dotenv.env['FIREBASE_MESSAGING_SENDER_ID'] ?? '',
      appId: dotenv.env['FIREBASE_APP_ID'] ?? '',
    ) : null, // Uses google-services.json on Android natively
  );
  
  runApp(const MajdoorConnectApp());
}

class MajdoorConnectApp extends StatelessWidget {
  const MajdoorConnectApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Majdoor Connect',
      theme: ThemeData(
        primarySwatch: Colors.orange,
        scaffoldBackgroundColor: Colors.grey[50], // Clean light theme
        fontFamily: 'Inter',
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            minimumSize: const Size(double.infinity, 50),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      ),
      home: const LoginScreen(),
    );
  }
}
