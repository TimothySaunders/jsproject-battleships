// This file contains the code for the battle ships AI, it has been broken off from the main app.vue file to help
// with development

// Register a hit


export default {

    saysomething: function(){
        console.log('not hello world')
    },

    // Register a click to memory
    registerClickToMemory: function(cell,ashooter) {
        //! used for AI
        let shooter = ashooter;
        let length = shooter.brain.hitHistory.push(cell); // Length here used to test in console log below:

        console.log(
            `${shooter.playerName} registered: x:${
            shooter.brain.hitHistory[length - 1].coords.x
            } y:${shooter.brain.hitHistory[length - 1].coords.y} state: ${
            shooter.brain.hitHistory[length - 1].state
            }`
        );

        // this.setPotentialTargets(shooter,cell);
        this.addPotentialTargets(shooter, cell);
    },

    // Add potential targets
    addPotentialTargets: function(a_shooter, a_cell) {
        let minX = 0; // probably good to have a method to establis grid bounds
        let minY = 0;
        let maxX = 7;
        let maxY = 7;
        

        // console.log(a_cell.state);
        if (a_cell.state === "hit") {
            a_shooter.brain.potentialTargets.push([
                a_cell.coords.x + 1,
                a_cell.coords.y,
            ]);
            a_shooter.brain.potentialTargets.push([
                a_cell.coords.x,
                a_cell.coords.y + 1,
            ]);
            a_shooter.brain.potentialTargets.push([
                a_cell.coords.x - 1,
                a_cell.coords.y,
            ]);
            a_shooter.brain.potentialTargets.push([
                a_cell.coords.x,
                a_cell.coords.y - 1,
            ]);
        }

        let index = 0;
        for (let target of a_shooter.brain.potentialTargets) {
            if (target[0] < minX || target[0] > maxX || target[1] < minY || target[1] > maxY) {

                a_shooter.brain.potentialTargets.splice(index, 1);
            }
        index += 1;
        }

        // removes duplicate potential-targets
        let currentTargets = new Set(
            a_shooter.brain.potentialTargets.map(JSON.stringify)
        );
        a_shooter.brain.potentialTargets = Array.from(currentTargets).map(
            JSON.parse
        );
    },

    // Filter missed shots
    filterOutTargeted: function(ashooter) {
        console.log("Welcome")
        let shooter = ashooter;
        console.log("shooter",shooter.playerName)
        let potentials = [];
        let rejected = [];
        let keep = [];
        let targeted_cells = [];


        shooter.brain.hitHistory.forEach((shot) => {                // converts array of clicked cells to array of arrays of their coords
            // converts all shots in hit history fo arrys of coords
            let new_array = Array(shot.coords.x, shot.coords.y);
            
            targeted_cells.push(new_array);
            // console.log("h:", new_array);
        });
            console.log("tcs",targeted_cells)
        shooter.brain.potentialTargets.forEach((target) => {
            console.log("potential target looping");
            potentials.push(target);
        });

        console.log("p:", potentials);

        for (let p of potentials){
            let a = p[0];
            let b = p[1];
           
            if (!targeted_cells.includes([a,b])){
                keep.push(p)
            }
        }



        // for (let ms of misses) {
        //     let a = ms[0];
        //     let b = ms[1];
    
        //     if (!potentials.includes([a,b])){
                

        //     }

        //     // keep = potentials.filter((element) => {
        //     //     element[0] !== a && element[1] !== b
        //     // })
        // }

        //  m [1,1][1,2]
        //  p [1,1][1,3]
        //  
        //  1,1 v 1,1 ==> X
        //  1,1 v 1,3 ==> 1,1
        //  1,2 v 1,1 ==> 1,2
        //  1,2 v 1,3 ==> 1,2
        //



        console.log("kb:",keep);

        // for (let p of potentials) {
        //     let index = 0;

        //     for (let m of misses) {
        //         if (parseInt(p[0]) === parseInt(m[0]) && parseInt(p[1]) === parseInt(m[1])) {
        //             // if(p[0] === m[0] && p[1] === m[1]) {

        //             console.log("spliced:", potentials[index]);

        //             rejected.push(potentials[index]);

        //             // potentials.splice(index,1)

        //             // index -=1
        //         } else {
        //             keep.push(potentials[index]);
        //         }

        //         index += 1;
        //     }
        //     // index +=1
        // }
            //!
        let remainingPTs = new Set(keep.map(JSON.stringify)); //! this should remove duplicates but instead it removes non duplicates too
        keep = Array.from(remainingPTs).map(JSON.parse);

        // console.log("re:", rejected);
        // console.log("ke:", keep);
        console.log("ka:",keep);
        shooter.brain.potentialTargets = keep;
    }
}