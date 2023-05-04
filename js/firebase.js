		// Your web app's Firebase configuration
				// For Firebase JS SDK v7.20.0 and later, measurementId is optional
				var firebaseConfig = {
					apiKey: "AIzaSyD4nuT5eNSlWM9KKo8S1Zx-KSKYc9CR1LA",
					authDomain: "web1042--firebaseauth.firebaseapp.com",
					projectId: "web1042--firebaseauth",
					storageBucket: "web1042--firebaseauth.appspot.com",
					messagingSenderId: "16062499435",
					appId: "1:16062499435:web:bdf7c9b77f6b1b366cff2e",
					measurementId: "G-R1LTKH90FC"
				};
				// Initialize Firebase
				firebase.initializeApp(firebaseConfig);

				//auth and firestore
				const auth = firebase.auth();
				const db = firebase.firestore();
				//update database
				db.settings({ timestampsInSnapshots: true });