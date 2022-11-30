var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        populateCardsDynamically()
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function writeExercises() {
    var exerciseRef = db.collection("exercises");

    exerciseRef.add({
        code:"UB-EP",
        name: "Eagle Pose",  
        difficulty: "easy",  
        steps: "1. Place right elbow on left elbow <br>"
        + "2. Now take your left hand and interlace it around the right arm<br>"
        + "3. In this position you can apply more pressure to feel your upper back opening<br>"
        + "4. Hold the end position for 20-30 seconds<br>"
        + "5. Repeat on the other side",
        length: "3",
        video: "https://youtube.com/embed/vuGnzLxRvZM?start=24",
    });
    exerciseRef.add({
        code:"UP-UTS",
        name: "Upper Trapezius Stretch ",  
        difficulty: "moderate",
        steps: "1. Start either in a standing or seated position.<br>"
        +"2. Place one of your hands on the opposite side of your head and tuck the other hand behind your back.<br>"
        +"3. Now bring the head down towards your shoulder.<br>"
        +"4. Use the hand on top to press your head down – to get a deeper stretch (Not too hard).<br>"
        +"5. Hold for 20-30 seconds and do both sides",
        length: "2",
        video: "https://youtube.com/embed/vuGnzLxRvZM?start=107",

   });
   exerciseRef.add({
        code:"UP-YWS",
        name: "Y & W & Retract",    
        difficulty: "easy",
        steps:"1. Begin standing with your back straight <br>"
        + "2. Make “W” shape with your arms. Bend both of arms to about 90 degree angle as you lower them to your stomach area and then squeeze your shoulder blades together. Hold for 2 breaths.<br>"
        + "3. Make “Y” shape with your arms by extending both arms up. Hold for 2 breaths.<br>"
        + "4. Hold 1-2 at each end point, Aim for 10 repetitions",
        length:"3",
        video: "https://youtube.com/embed/vuGnzLxRvZM?start=236",
   });
}

function populateCardsDynamically() {
    let exerciseCardTemplate = document.getElementById("cardTemplate");
    let exerciseCardGroup = document.getElementById("exercises-go-here");

    db.collection("upperBack")
        .orderBy("length")
        .get()
        .then(allExercises => {
            allExercises.forEach(doc => {
                var title = doc.data().name; //gets the name field
                var steps = doc.data().steps; //gets the unique ID field
                var length = doc.data().length; //gets the length field
                var exerciseID = doc.data().code;
                var difficulty = doc.data().difficulty;
                var video = doc.data().video;
                let testExCard = exerciseCardTemplate.content.cloneNode(true);
                testExCard.querySelector('.card-title').innerHTML = title;
                testExCard.querySelector('.card-length').innerHTML ="Length of time: " +  length + " Minutes";
                testExCard.querySelector('.card-difficulty').innerHTML = "Level of Difficulty: " + difficulty;
                testExCard.querySelector('.card-text').innerHTML = steps;
                testExCard.querySelector('.video-id').src = video;
                testExCard.querySelector('i').id = 'save-' + exerciseID;            
                testExCard.querySelector('i').onclick = () => saveBookmark(exerciseID);
                currentUser.get().then(userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().bookmarks;
                    if (bookmarks.includes(exerciseID)) {
                      document.getElementById('save-' + exerciseID).innerText = 'bookmark';
                    }
                })

                exerciseCardGroup.appendChild(testExCard);
            })
        })
}

function saveBookmark(exerciseID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(exerciseID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + exerciseID;
            document.getElementById(iconID).innerText = 'bookmark';
        });
}




