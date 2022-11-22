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
        code:"Q-KQS",
        name: "Kneeling Quad Stretch",  
        difficulty: "Easy",  
        steps: "1. Kneel on the side of the leg you want to stretch and bring the other side forward in a lunge position <br>"
        + "2. Flatten out your lower back and keep shoulders and chest upright<br>"
        + "3. Bend forward from the hip to the knee even more to stretch the right hip and quad<br>"
        + "4. Hold for 30 seconds and then switch knees",
        length: "2",
        video: "https://www.youtube.com/embed/U7AOY3obRv4?start=5",
    });
    exerciseRef.add({
        code:"Q-SQS",
        name: "Standing Quad Stretch",  
        difficulty: "Easy",
        steps: "1. Stand on your left foot and grab your right shin by bending your leg behind you<br>"
        +"2. Tuck your pelvis in, pull your shin toward your glutes, making sure your knee is pointing to the ground. Try not to pull the knee backward or sideways<br>"
        +"3. Hold for 30 seconds, then switch sides",
        length: "2",
        video: "https://www.youtube.com/embed/zFpq_j453hQ",

   });
   exerciseRef.add({
        code:"Q-LQS",
        name: "Lying Quad Stretch",    
        difficulty: "Easy",
        steps:"1. Lie in a face-down position, propping your head on your left hand. Alternatively, you can lie on your side to perform this stretch. <br>"
        + "2. After a couple of seconds, pull your right foot toward your butt and bend your left knee to stabilize yourself.<br>"
        + "3. Hold onto your ankle and maintain the position for 30 seconds before returning to the starting position.<br>"
        + "4. Switch sides, pulling your left foot toward your back and bending your right knee.",
        length:"2",
        video: "https://www.youtube.com/embed/599Tvr-JrBc?start=5",
   });
}

function populateCardsDynamically() {
    let exerciseCardTemplate = document.getElementById("cardTemplate");
    let exerciseCardGroup = document.getElementById("exercises-go-here");

    db.collection("quad")
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



