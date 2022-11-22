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
        code:"LB-CP",
        name: "Child's Pose",  
        difficulty: "moderate",  
        steps: "1. With your hands and knees on the ground, sink back through your hips to rest them on your heels.<br>"
         + "2. Hinge at your hips as you fold forward, walking your hands out in front of you.<br>"
         + "3. Rest your belly on your thighs. 4. Extend your arms in front of or alongside your body with your palms facing up.<br>"
         + "4. Focus on breathing deeply and relaxing any areas of tension or tightness. 5. Hold this pose for up to 1 minute.",
        length: "10",
        video: "https://www.youtube.com/embed/X-OGH5-gLUs?start=7",
    });
    exerciseRef.add({
        code:"LB-PFS",
        name: "Piriformis stretch ",  
        difficulty: "moderate",
        steps: "1. Lie on your back with both knees bent and your feet flat on the floor.<br>"
        + "2. Place your right ankle at the base of your left thigh.<br>"
        + "3. Then, place your hands behind your left thigh and pull up toward your chest until you feel a stretch.<br>"
        + "4. Hold this position for 30 seconds to 1 minute.<br>"
        +" 5. Then do the opposite side. ",
        length: "3",
        video: "https://www.youtube.com/embed/eKp2f5-jRbI?start=20",

   });
   exerciseRef.add({
        code:"LB-ST",
        name: "Seated Spinal Twist",    
        difficulty: "easy",
        steps:"1. Sit on the floor with both legs extended out in front.<br>"
        + "2. Bend your left knee and place your foot to the outside of your right thigh.<br>"
        + "3. Place your right arm on the outside of your left thigh.<br>"
        + "4. Place your left hand behind you for support.<br>"
        + "5. Starting at the base of your spine, twist to the left side.<br>"
        + "6. Hold this pose for up to 1 minute.<br>"
        + "7. Repeat on the other side.",
        length:"3",
        video: "https://www.youtube.com/embed/ciGK6HyYqV4",
   });
}

function populateCardsDynamically() {
    let exerciseCardTemplate = document.getElementById("cardTemplate");
    let exerciseCardGroup = document.getElementById("exercises-go-here");

    db.collection("lowerBack")
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
