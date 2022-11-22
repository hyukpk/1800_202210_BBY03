var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);
        getBookmarks(user)
        // the following functions are always called when someone is logged in
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("cardTemplate");
            bookmarks.forEach(thisExerciseID => {
                console.log(thisExerciseID);
                db.collection("exercises").where("code", "==", thisExerciseID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        var doc = queryData[0].data();
                        var title = doc.name; //gets the name field
                        var steps = doc.steps;
                        var length = doc.length;
                        var difficulty = doc.difficulty;
                        var video = doc.video;
                        var exerciseID = doc.code;
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = title;
                        newCard.querySelector('.card-length').innerHTML = "Length of time: " +  length + " Minutes";
                        newCard.querySelector('.card-difficulty').innerHTML = "Level of Difficulty: " + difficulty;
                        newCard.querySelector('.card-text').innerHTML = steps;
                        newCard.querySelector('.video-id').src = video;
                        newCard.querySelector('i').id = 'save-' + exerciseID;            
                        newCard.querySelector('i').onclick = () => deleteBookmark(exerciseID);
                        currentUser.get().then(userDoc => {
                            //get the user name
                            var bookmarks = userDoc.data().bookmarks;
                            if (bookmarks.includes(exerciseID)) {
                              document.getElementById('save-' + exerciseID).innerText = 'bookmark';
                            }
                        })
                        exerciseCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}

function deleteBookmark(exerciseID) {
    currentUser.update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove(exerciseID)
    }, {
        merge: true
    })
    .then(function () {
        console.log("bookmark has been removed for: " + currentUser);
        var iconID = 'save-' + exerciseID;
        document.getElementById(iconID).innerText = 'bookmark_border';
    });
}