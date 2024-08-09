# Firebase Project Setup

## 1. Link Firebase Project to Code Editor
Now that the Firebase Project is added, we will want to link it to the project in our code editor. Follow these steps:

- Click on the `</>` option on the Firebase Console landing page.
- Create the file `serviceAccount.json` in your project (**add this file to your `.gitignore`**).
- Copy the necessary data to the fields in bold (see below). We will need this file when we import.


## 2. Cloud Firestore Setup
To set up Cloud Firestore:

1. Navigate to the Left Sidebar and click on "Database."
2. Click "Create Database."
3. Choose "Test Mode" because we will need to read/write to your database.
4. Click "Enable."

## 3. Firebase Service Account
To set up a Firebase Service Account:

1. Navigate to the Left Sidebar and click on "Settings."
2. Choose "Users and Permissions."
3. Navigate to the "Service Accounts" tab.
4. Choose Node.js, which should be the default option.
5. Click "Generate New Private Key."
6. Click "Generate Key" on the popup. A JSON file should have downloaded to your computer.
7. Rename the file to `serviceAccount.json`. We will need this file when we import.

### `serviceAccount.json` Example

```json
{
  "type": "service_account",
  "project_id": "PROJECT_ID_HERE",
  "private_key_id": "PRIVATE_ID_KEY_HERE",
  "private_key": "PRIVATE_KEY_HERE",
  "client_email": "CLIENT_EMAIL_HERE",
  "client_id": "CLIENT_ID_HERE",
  "auth_uri": "AUTH_URI_HERE",
  "token_uri": "TOKEN_URI_HERE",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "CLIENT_CERT_URL_HERE"
}
```

## 4. NPM Dependencies
We will be using a library to import the JSON data, so we need to initialize our project as an npm repository.

### Initialize NPM

```bash
npm init
```

### Install Dependencies

```bash
npm install firebase-admin --save
```

## 5. Example Code
This example will be using 2 files:

- `serviceAccount.json`
- `import.js`

### `serviceAccount.json`

```json
{
  "type": "service_account",
  "project_id": "PROJECT_ID_HERE",
  "private_key_id": "PRIVATE_ID_KEY_HERE",
  "private_key": "PRIVATE_KEY_HERE",
  "client_email": "CLIENT_EMAIL_HERE",
  "client_id": "CLIENT_ID_HERE",
  "auth_uri": "AUTH_URI_HERE",
  "token_uri": "TOKEN_URI_HERE",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "CLIENT_CERT_URL_HERE"
}
```

### `import.js`

```javascript
// Imports
const serviceAccount = require('./serviceAccount.json');
const admin = require("firebase-admin");
const data_to_insert = require("./json_data_to_insert/updated_questions.json")  // File to insert only IDs like e 
const { getFirestore } = require('firebase-admin/firestore');


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


        for (const [id, obj] of Object.entries(data_to_insert)) {
            console.log(id);
            var docRef = db.collection("questions").doc(id);
            batch.set(docRef, obj);

        }
        // batch.commit();

        console.log('Upload Success');
    }
    catch (error) {
        console.log(error);
    }
};

jsonToFirestore();


```

## 6. Import Data to Firebase
Run the following command to execute the function and import your JSON data to Firebase Cloud Firestore:

```bash
node import.js
```

It will take some time depending on the size of your file, but your data is now uploading to Firebase Firestore and has a home in the cloud now.
