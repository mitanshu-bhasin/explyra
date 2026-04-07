import 'package:flutter/material.dart';
// import 'package:cloud_firestore/cloud_firestore.dart';
// import 'package:firebase_auth/firebase_auth.dart';
// import 'labour_dashboard.dart';

class ProfileSetupScreen extends StatefulWidget {
  const ProfileSetupScreen({Key? key}) : super(key: key);

  @override
  _ProfileSetupScreenState createState() => _ProfileSetupScreenState();
}

class _ProfileSetupScreenState extends State<ProfileSetupScreen> {
  final TextEditingController _nameController = TextEditingController(text: 'Auto-filled from Aadhar');
  final TextEditingController _aadharController = TextEditingController(text: 'xxxx-xxxx-1234');
  final TextEditingController _wageController = TextEditingController();
  String _selectedSkill = 'Mason';

  final List<String> _skills = ['Mason', 'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Labour'];

  Future<void> _saveProfile() async {
    // String uid = FirebaseAuth.instance.currentUser!.uid;
    // await FirebaseFirestore.instance.collection('labours').doc(uid).set({
    //   'name': _nameController.text,
    //   'aadharLast4': '1234',
    //   'skill': _selectedSkill,
    //   'dailyWage': double.tryParse(_wageController.text) ?? 500,
    //   'isOnline': false,
    //   'rating': 5.0,
    //   'location': const GeoPoint(0, 0), // Will be updated by Foreground Service
    // }, SetOptions(merge: true));
    
    // Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const LabourDashboard()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile Setup')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name', border: OutlineInputBorder()),
              readOnly: true, // Extracted by Vision AI
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _aadharController,
              decoration: const InputDecoration(labelText: 'Aadhar Number', border: OutlineInputBorder()),
              readOnly: true, // Extracted by Vision AI
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _selectedSkill,
              decoration: const InputDecoration(labelText: 'Skill / Category', border: OutlineInputBorder()),
              items: _skills.map((skill) => DropdownMenuItem(value: skill, child: Text(skill))).toList(),
              onChanged: (val) => setState(() => _selectedSkill = val!),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _wageController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Daily Wage (in ₹)',
                hintText: 'e.g. 500',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _saveProfile,
              child: const Text('Complete & Go Online'),
            ),
          ],
        ),
      ),
    );
  }
}
