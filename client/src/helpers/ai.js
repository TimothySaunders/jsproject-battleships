// This file contains the code for the battle ships AI, it has been broken off from the main app.vue file to help
// with development

// Register a hit


export default {

    saysomething: function(){
        // console.log('not hello world')
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
        this.addPotentialTargetsNEW(shooter, cell);     //! TRYING NEW METHOD

    },

    // Add potential targets
    // addPotentialTargets: function(a_shooter, a_cell) {
    addPotentialTargetsNEW: function(a_shooter, a_cell) {
        console.log("NEW");
        let minX = 0; // probably good to have a method to establis grid bounds
        let minY = 0;
        let maxX = 7;
        let maxY = 7;

        let recordedShotsHash = "";
        let recordedShots = [];          //  CONVERTS shot history into another object type.

        a_shooter.brain.hitHistory.forEach((shot_cell) => {
            let obj = {
                key: `${shot_cell.coords.x}${shot_cell.coords.x}`,
                state: shot_cell.state
            }
            recordedShots.push(obj);
            recordedShotsHash = recordedShotsHash.concat(`${obj.key}${obj.state}`);
        })
        // console.log("hash:",recordedShotsHash);
        // //! now  we have a hash string for coords and states.


        // if (a_cell.state === "hit"){
        //     if(a_cell.coords.x <)
        // }
    },

    getHashFromHitCells: function (player){                 // make hash
        let recordedShotsHash = "";
        player.brain.hitHistory.forEach((shot_cell) => {
            // recordedShotsHash = recordedShotsHash.concat(`${shot_cell.coords.x}${shot_cell.coords.y}${shot_cell.state}`);
            recordedShotsHash = recordedShotsHash.concat(`${shot_cell.coords.x}${shot_cell.coords.y}a`);
        })
        return recordedShotsHash;

    },
    

    getHashfromArrayOfCoordArray: function(ArrayOfArrays){
        let arrayHash = "";
        for (let row of ArrayOfArrays){
            arrayHash = arrayHash.concat(`${row[0]}${row[1]}s`)
        }
        return arrayHash;
    },
      
    

    

    // addPotentialTargetsOLD: function(a_shooter, a_cell) {
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

        // removes duplicate potential-targets      //! not working 
        // let currentTargets = new Set(
        //     a_shooter.brain.potentialTargets.map(JSON.stringify)
        // );
        // a_shooter.brain.potentialTargets = Array.from(currentTargets).map(
        //     JSON.parse
        // );


        let newHashfromPotentialTargets = this.getHashfromArrayOfCoordArray(a_shooter.brain.potentialTargets);
        console.log("potentialHASH",newHashfromPotentialTargets)

        let newHashFromHitHistory = this.getHashFromHitCells(a_shooter);
        console.log("hitHASH",newHashFromHitHistory)

        // let resultHash = "";
        
        
        
        let start1 = newHashfromPotentialTargets.split("s");  // '45s64a    [45][s][64]   
        console.log("start1:", start1)
        let end1 = [];
        let end2 = [];
        let end3 = [];
        let end4 = [];
        
        start1.forEach((coord) => {
            console.log("coord to string: ",coord.toString())
            console.log("newHashFromHitHistory to string: ",newHashFromHitHistory.toString())
            
          if (newHashFromHitHistory.toString().indexOf(coord.toString())<0){
               end1.push(coord)
                }
        })
        console.log("end1:",end1)
        

        end1.forEach((coord) => {
            // console.log("coord to string: ",coord.toString())
          if (newHashFromHitHistory.toString().indexOf(coord.toString())<0){
               end2.push(coord)
                }
        })
        end2.forEach((coord) => {
            // console.log("coord to string: ",coord.toString())
          if (newHashFromHitHistory.toString().indexOf(coord.toString())<0){
               end3.push(coord)
                }
        })
        console.log("end3:", end3)
        end3.forEach((coord) => {
            // console.log("coord to string: ",coord.toString())
          if (newHashFromHitHistory.toString().indexOf(coord.toString())<0){
               end4.push(coord)
                }
        })
        console.log("end4:", end4)

        
        // for(let i=0; i<=newHashfromPotentialTargets.length; i++) {
        //     let TwoChars = "";
        //     TwoChars = TwoChars.concat(newHashfromPotentialTargets.charAt(i)+newHashfromPotentialTargets.charAt(i+1));
        //     console.log("2-charz:",TwoChars);
        //     if( newHashFromHitHistory.indexOf(TwoChars) < 0){
        //         resultHash = resultHash.concat(`${TwoChars}f`);
        //         // console.log("I hate you");
        //     }

        // }
        console.log("FilteredHASH",newHashFromHitHistory);
        
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
        let targeted_cells_obj = [];
        let potentials_as_obj = []
        
        shooter.brain.hitHistory.forEach((shot) => {                // converts array of clicked cells to array of arrays of their coords  
            // converts all shots in hit history fo arrys of coords
            
            // let new_array = Array(shot.coords.x, shot.coords.y);
            let obj = {                                                     //! NOW!! with objects
                key1: `${shot.coords.x}${shot.coords.y}`,
                x:shot.coords.x,
                y:shot.coords.y
            }


            targeted_cells_obj.push(obj);
            // targeted_cells.push(new_array);
            // console.log("h:", new_array);
        });
            // console.log("tcs",targeted_cells)
            console.log("tcs o's",targeted_cells_obj)

            shooter.brain.potentialTargets.forEach((target) => {

            console.log("potential target looping");
            let obj = {                                                     //! NOW!! with objects
                key1: `${target[0]}${target[1]}`,
                x:target[0],
                y:target[1]
            }

            potentials_as_obj.push(obj);
            // potentials.push(target);
        });

        // console.log("p:", potentials);
        console.log("p:", potentials_as_obj);

        // for (let p of potentials){
        //     let a = p[0];
        //     let b = p[1];
           
        //     if (!targeted_cells.includes([a,b])){
        //         keep.push(p)
        //     }
        // }

        for (let obj of potentials_as_obj){
            let index = 0;
            for (let targeted of targeted_cells_obj){
                if(obj.key1 === targeted.key1){
                    potentials_as_obj.splice(index,1)
                }
            }
        }
        // potentials_as_obj.forEach((pt) => {
        //     targeted_cells_obj.filter((tc) => {
        //       console.log("pt key1:",pt.key1)  
        //       console.log("tc key1:",tc.key1)  
        //       pt.key1 !== tc.key1
        //     })
            
        // });

        console.log("p a o:", potentials_as_obj);

        //convert obj back to arrays: 
        potentials_as_obj.forEach((obj) => {
          let new_array = [obj.x,obj.y]
          keep.push(new_array);
        })

        // console.log("kb:",keep);

       
            //!
        // let remainingPTs = new Set(keep.map(JSON.stringify)); //! this should remove duplicates but instead it removes non duplicates too
        // keep = Array.from(remainingPTs).map(JSON.parse);

        // console.log("re:", rejected);
        // console.log("ke:", keep);
        console.log("ka:",keep);
        shooter.brain.potentialTargets = keep;
    }
}