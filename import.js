// Imports
const serviceAccount = require('./serviceAccount.json');
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');

// File to insert: Follow the same structure regarding the IDs
const data_to_insert = require("./json_data_to_insert/example_questions.json")


// JSON To Firestore
const jsonToFirestore = async () => {
    try {
        console.log('Initialzing Firebase');
        await admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Initialized');


        const db = getFirestore();
        var batch = db.batch()

        // Prepare each doc to create
        for (const [id, obj] of Object.entries(data_to_insert)) {
            console.log(id);
            var docRef = db.collection("questions").doc(id);
            batch.set(docRef, obj);
        }

        batch.commit(); // Push all doc to Firestore
        console.log('Upload Success');
    }
    catch (error) {
        console.log(error);
    }
};

jsonToFirestore();

// To start the code use the terminal and Run: node import.js