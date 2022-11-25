var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);
        window.location.href ="main.html";
    } else {
        // No user is signed in.
        console.log("No user is signed in");
    }
});

