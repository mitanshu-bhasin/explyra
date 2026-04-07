const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');

admin.initializeApp();
const client = new vision.ImageAnnotatorClient();

exports.processAadharImage = functions.storage.object().onFinalize(async (object) => {
    // Check if the uploaded file is in the 'aadhar/' folder
    const filePath = object.name;
    if (!filePath.startsWith('aadhar/')) {
        return console.log('Not an Aadhar image. Skipping.');
    }

    const bucket = admin.storage().bucket(object.bucket);
    const file = bucket.file(filePath);
    
    // Extract UID from path, assuming path format aadhar/{uid}/front.jpg
    const pathParts = filePath.split('/');
    if (pathParts.length < 3) return console.log('Invalid file path structure.');
    const uid = pathParts[1];

    try {
        console.log(`Analyzing image for UID: ${uid}`);
        const [result] = await client.textDetection(`gs://${object.bucket}/${filePath}`);
        const detections = result.textAnnotations;
        
        if (detections.length === 0) {
            console.log('No text detected in the image.');
            return;
        }

        const rawText = detections[0].description;
        
        // Simple regex logic for demonstration (in production, use highly tuned AI parsing)
        // Match 12-digit numbers
        const aadharRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/g;
        const matchedNumbers = rawText.match(aadharRegex);
        
        let last4Digits = "0000";
        if (matchedNumbers && matchedNumbers.length > 0) {
            const numStr = matchedNumbers[0].replace(/\s/g, '');
            last4Digits = numStr.substring(numStr.length - 4);
        }

        // For Name/DOB, we would typically prompt Vertex AI with the text,
        // or parse via specific regex for Indian names/DOBs.
        const extractedData = {
            ocrCompleted: true,
            extractedText: rawText, // Storing raw text for demo
            aadharLast4: last4Digits,
        };

        // Save back to Firestore under the labour's profile
        await admin.firestore().collection('labours').doc(uid).set(extractedData, { merge: true });
        console.log('Aadhar text extracted and saved successfully.');

    } catch (error) {
        console.error('Error processing Vision API:', error);
    }
});
