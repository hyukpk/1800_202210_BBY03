firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
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
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = title;
                        newCard.querySelector('.card-length').innerHTML = "Length of time: " +  length + " Minutes";
                        newCard.querySelector('.card-difficulty').innerHTML = "Level of Difficulty: " + difficulty;
                        newCard.querySelector('.card-text').innerHTML = steps;
                        newCard.querySelector('.video-id').src = video;
                        
                        exerciseCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}