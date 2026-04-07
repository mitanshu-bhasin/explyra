import 'package:flutter/material.dart';
// import 'package:google_maps_flutter/google_maps_flutter.dart';
// import 'package:cloud_firestore/cloud_firestore.dart';
// import 'package:url_launcher/url_launcher.dart';

class UserMapScreen extends StatefulWidget {
  const UserMapScreen({Key? key}) : super(key: key);

  @override
  _UserMapScreenState createState() => _UserMapScreenState();
}

class _UserMapScreenState extends State<UserMapScreen> {
  // GoogleMapController? mapController;
  // final Set<Marker> _markers = {};

  // void _onMapCreated(GoogleMapController controller) {
  //   mapController = controller;
  //   _fetchLabours();
  // }

  // Future<void> _fetchLabours() async {
  //   // Query Firestore for online labourers
  //   FirebaseFirestore.instance
  //       .collection('labours')
  //       .where('isOnline', isEqualTo: true)
  //       .snapshots()
  //       .listen((snapshot) {
  //     setState(() {
  //       _markers.clear();
  //       for (var doc in snapshot.docs) {
  //         var data = doc.data();
  //         GeoPoint loc = data['location'];
  //         _markers.add(Marker(
  //           markerId: MarkerId(doc.id),
  //           position: LatLng(loc.latitude, loc.longitude),
  //           onTap: () => _showLabourProfile(data, doc.id),
  //         ));
  //       }
  //     });
  //   });
  // }

  // void _showLabourProfile(Map<String, dynamic> data, String id) {
  //   showModalBottomSheet(
  //     context: context,
  //     shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
  //     builder: (context) {
  //       return Padding(
  //         padding: const EdgeInsets.all(20.0),
  //         child: Column(
  //           mainAxisSize: MainAxisSize.min,
  //           children: [
  //             Text(data['name'], style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
  //             Text('${data['skill']} • ₹${data['dailyWage']}/day', style: const TextStyle(fontSize: 16, color: Colors.grey)),
  //             const SizedBox(height: 20),
  //             ElevatedButton(
  //               style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
  //               onPressed: () async {
  //                 // Dummy phone launcher
  //                 // await launchUrl(Uri.parse('tel:+919876543210'));
  //               },
  //               child: const Text('Call Now'),
  //             )
  //           ],
  //         ),
  //       );
  //     }
  //   );
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Nearby Workers')),
      body: Center(
        child: Text('Google Map Implementation Goes Here\nRequires google_maps_flutter package.'),
      ),
      // body: GoogleMap(
      //   onMapCreated: _onMapCreated,
      //   initialCameraPosition: const CameraPosition(
      //     target: LatLng(28.6139, 77.2090), // Default: New Delhi
      //     zoom: 12,
      //   ),
      //   markers: _markers,
      // ),
    );
  }
}
