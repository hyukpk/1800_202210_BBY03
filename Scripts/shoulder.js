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
        code:"S-SR",
        name: "Shoulder Rolls",  
        difficulty: "Easy",  
        steps: "1. Stand with feet hip-width apart <br>"
        + "2. Let the arms hang down at the sides of the body<br>"
        + "3. Breathe in and lift the shoulders up towards the ears<br>"
        + "4. Exhale and drop the shoulders back<br>"
        + "5. Move elblows forward, feeling the stretch at the back of the shoulders<br>"
        + "6. Repeat as many times as you need to",
        length: "2",
        video: "https://www.youtube.com/embed/sGi0fR3L80g",
    });
    exerciseRef.add({
        code:"S-CBS",
        name: "Cross Body Shoulder Stretch",  
        difficulty: "Easy",
        steps: "1. Stand with feet hip-width apart<br>"
        +"2. Stretch the right arm out straight.<br>"
        +"3. Bring the right arm across the body, so that the hand points to the floor on the other side of the left leg.<br>"
        +"4. Bend the left arm at the elbow.<br>"
        +"5. Hook the left forearm under the right arm, supporting the right arm above the elbow.<br>"
        +"6. Use the left forearm to pull the right arm further in and across the body, stretching the back of the right shoulder. <br>"
        +"7. Hold this for 20 seconds, then repeat the stretch on the other side.",
        length: "1",
        video: "https://www.youtube.com/embed/vkmTnIr944M",

   });
   exerciseRef.add({
        code:"S-TTN",
        name: "Thread the Needle",    
        difficulty: "Moderate",
        steps:"1. Come onto your all fours with your hands directly under your shoulders and your knees underneath your hips. <br>"
        + "2. Lift your right hand and slowly bring it over to the left with your palm facing up.<br>"
        + "3. Rest your body on your right shoulder and turn your head to face to the left.<br>"
        + "4. Make sure you’re not sinking onto your shoulder.<br>"
        + "5. Hold this pose for 30 seconds.<br>"
        + "6. Slowly release and come back to the original position.<br>"
        + "7. Repeat on the opposite side.",
        length:"3",
        video: "https://www.youtube.com/embed/QK50Vso1NZI",
   });
}

function populateCardsDynamically() {
    let exerciseCardTemplate = document.getElementById("cardTemplate");
    let exerciseCardGroup = document.getElementById("exercises-go-here");

    db.collection("shoulder")
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
            //console.log(iconID);
						//this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'bookmark';
        });
}



