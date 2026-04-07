import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
// import 'aadhar_scan_screen.dart'; // uncomment to navigate
// import 'user_map_screen.dart'; // uncomment to navigate

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _otpController = TextEditingController();
  String _verificationId = '';
  bool _isCodeSent = false;
  String _userRole = 'labour'; // 'labour' or 'user'

  Future<void> _verifyPhone() async {
    print('Starting phone verification for: ${_phoneController.text}');
    try {
      await FirebaseAuth.instance.verifyPhoneNumber(
        phoneNumber: '+91${_phoneController.text}',
        verificationCompleted: (PhoneAuthCredential credential) async {
          print('Verification completed automatically');
          await FirebaseAuth.instance.signInWithCredential(credential);
          _handleLoginSuccess();
        },
        verificationFailed: (FirebaseAuthException e) {
          print('Verification Failed! Code: ${e.code}, Message: ${e.message}');
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Firebase Error Name: ${e.code}\nMessage: ${e.message}')));
        },
        codeSent: (String verificationId, int? resendToken) {
          print('OTP Code sent successfully. ID: $verificationId');
          setState(() {
            _verificationId = verificationId;
            _isCodeSent = true;
          });
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          print('Timeout for Auto Retrieval ID: $verificationId');
        },
      );
    } catch (e) {
      print('General Exception during verifyPhoneNumber: $e');
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  Future<void> _signInWithOTP() async {
    try {
      PhoneAuthCredential credential = PhoneAuthProvider.credential(
        verificationId: _verificationId,
        smsCode: _otpController.text,
      );
      await FirebaseAuth.instance.signInWithCredential(credential);
      _handleLoginSuccess();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Invalid OTP')));
    }
  }

  void _handleLoginSuccess() {
    // Navigate based on role
    // if (_userRole == 'labour') {
    //   Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const AadharScanScreen()));
    // } else {
    //   Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const UserMapScreen()));
    // }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Majdoor Connect - Login')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            DropdownButton<String>(
              value: _userRole,
              items: const [
                DropdownMenuItem(value: 'labour', child: Text('I am a Labour/Worker')),
                DropdownMenuItem(value: 'user', child: Text('I am looking for workers')),
              ],
              onChanged: (val) {
                setState(() => _userRole = val!);
              },
            ),
            const SizedBox(height: 20),
            if (!_isCodeSent) ...[
              TextField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'Phone Number (10 digits)',
                  prefixText: '+91 ',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _verifyPhone,
                child: const Text('Send OTP'),
              ),
            ] else ...[
              TextField(
                controller: _otpController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Enter OTP',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _signInWithOTP,
                child: const Text('Verify & Login'),
              ),
            ]
          ],
        ),
      ),
    );
  }
}
