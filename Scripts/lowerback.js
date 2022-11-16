function writeExercises() {
    var exerciseRef = db.collection("exercises");

    exerciseRef.add({
        code:"LB-CP",
        name: "Child's Pose",  
        difficulty: "moderate",  
        steps: "1. With your hands and knees on the ground, sink back through your hips to rest them on your heels."
         + "2. Hinge at your hips as you fold forward, walking your hands out in front of you."
         + "3. Rest your belly on your thighs. 4. Extend your arms in front of or alongside your body with your palms facing up."
         + "4. Focus on breathing deeply and relaxing any areas of tension or tightness. 5. Hold this pose for up to 1 minute.",
        length: "10",
    });
    exerciseRef.add({
        code:"LB-PFS",
        name: "Piriformis stretch ",  
        difficulty: "moderate",
        steps: "1. Lie on your back with both knees bent and your feet flat on the floor."
        + "2. Place your right ankle at the base of your left thigh."
        + "3. Then, place your hands behind your left thigh and pull up toward your chest until you feel a stretch."
        + "4. Hold this position for 30 seconds to 1 minute."
        +" 5. Then do the opposite side. ",
        length: "3",

   });
   exerciseRef.add({
        code:"LB-ST",
        name: "Seated Spinal Twist",    
        difficulty: "easy",
        steps:"1. Sit on the floor with both legs extended out in front."
        + "2. Bend your left knee and place your foot to the outside of your right thigh."
        + "3. Place your right arm on the outside of your left thigh."
        + "4. Place your left hand behind you for support."
        + "5. Starting at the base of your spine, twist to the left side."
        + "6. Hold this pose for up to 1 minute."
        + "7. Repeat on the other side.",
        length:"3",
   });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("cardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var steps = doc.data().steps;   // get value of the "details" key
                //var difficulty = doc.data().difficulty;
                //var length = doc.data().length;
				//var exerciseID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = steps;
                //newcard.querySelector('.card-image').src = `./images/${exerciseID}.jpg`; //Example: NV01.jpg
                //newcard.querySelector('.card-difficulty').innerHTML = difficulty;
                //newcard.querySelector('.card-length').innerHTML = length;


                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("exercises");