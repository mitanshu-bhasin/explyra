import 'package:flutter/material.dart';
// import 'package:cloud_firestore/cloud_firestore.dart';
// import 'package:firebase_auth/firebase_auth.dart';

class LabourDashboard extends StatefulWidget {
  const LabourDashboard({Key? key}) : super(key: key);

  @override
  _LabourDashboardState createState() => _LabourDashboardState();
}

class _LabourDashboardState extends State<LabourDashboard> {
  bool _isOnDuty = false;

  Future<void> _toggleDuty(bool value) async {
    setState(() => _isOnDuty = value);
    // String uid = FirebaseAuth.instance.currentUser!.uid;
    // await FirebaseFirestore.instance.collection('labours').doc(uid).update({
    //   'isOnline': value,
    // });
    
    // Toggle Foreground Location Service depending on [value]
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            color: _isOnDuty ? Colors.green.shade100 : Colors.red.shade100,
            width: double.infinity,
            child: Column(
              children: [
                Icon(
                  _isOnDuty ? Icons.work : Icons.work_off,
                  size: 60,
                  color: _isOnDuty ? Colors.green : Colors.red,
                ),
                const SizedBox(height: 10),
                Text(
                  _isOnDuty ? "You are ON DUTY\nUsers can see your location" : "You are OFF DUTY\nGo online to get work",
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 20),
                Switch(
                  value: _isOnDuty,
                  onChanged: _toggleDuty,
                  activeColor: Colors.green,
                ),
              ],
            ),
          ),
          const Expanded(
            child: Center(
              child: Text('Recent Jobs / Analytics placeholder'),
            ),
          )
        ],
      ),
    );
  }
}
