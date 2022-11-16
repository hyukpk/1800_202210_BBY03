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