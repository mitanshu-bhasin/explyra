import 'dart:io';
import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';
// import 'package:firebase_storage/firebase_storage.dart';
// import 'package:firebase_auth/firebase_auth.dart';
// import 'profile_setup_screen.dart';

class AadharScanScreen extends StatefulWidget {
  const AadharScanScreen({Key? key}) : super(key: key);

  @override
  _AadharScanScreenState createState() => _AadharScanScreenState();
}

class _AadharScanScreenState extends State<AadharScanScreen> {
  File? _imageFile;
  bool _isUploading = false;

  Future<void> _takePhoto() async {
    // Placeholder for ImagePicker implementation
    // final pickedFile = await ImagePicker().pickImage(source: ImageSource.camera);
    // if (pickedFile != null) {
    //   setState(() { _imageFile = File(pickedFile.path); });
    //   _uploadPhoto();
    // }
  }

  Future<void> _uploadPhoto() async {
    setState(() => _isUploading = true);
    try {
      // String uid = FirebaseAuth.instance.currentUser!.uid;
      // Reference ref = FirebaseStorage.instance.ref().child('aadhar/$uid/front.jpg');
      // await ref.putFile(_imageFile!);
      // ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Verification in progress...')));
      
      // Proceed to profile setup where fetched Aadhar details will be shown
      // Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const ProfileSetupScreen()));
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Upload failed')));
    } finally {
      setState(() => _isUploading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scan Aadhar Card')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.document_scanner, size: 100, color: Colors.blue),
            const SizedBox(height: 20),
            const Text(
              'Please scan your Aadhar Card to auto-fill your profile.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 40),
            _isUploading 
              ? const CircularProgressIndicator()
              : ElevatedButton.icon(
                  onPressed: _takePhoto,
                  icon: const Icon(Icons.camera_alt),
                  label: const Text('Open Camera'),
                ),
          ],
        ),
      ),
    );
  }
}
