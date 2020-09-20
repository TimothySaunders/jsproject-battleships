// This file contains the code for the battle ships AI, it has been broken off from the main app.vue file to help
// with development

// Register a hit

export default {

    // Register a click to memory
    registerClickToMemory: function (cell, ashooter) {
        //! used for AI
        let shooter = ashooter;
        let length = shooter.brain.hitHistory.push(cell); // Length here used to test in console log below:
        let startHash = this.getHashFromHitCells(shooter); // takes an array of hits from a player
        let newTargets = this.getPotentialTargetsFromHistoryHash(startHash); // tales in the hitHash and converts to hit possibilities
        shooter.brain.potentialTargets = this.covertArrayOfStringsToArray(newTargets);
    },

    covertArrayOfStringsToArray(stringArray) {                    //!!!!!  NEEDED
        let newArray = [];
        for (let element of stringArray) {
            let newElement = Array(element[0], element[1]); // ["x,y"]
            newArray.push(newElement);
        }
        return newArray
    },

    getHashFromHitCells: function (player) {                 // make hash             //!!!!!  NEEDED
        let recordedShotsHash = "";
        player.brain.hitHistory.forEach((shot_cell) => {
            // recordedShotsHash = recordedShotsHash.concat(`${shot_cell.coords.x}${shot_cell.coords.y}${shot_cell.state}`);
            recordedShotsHash = recordedShotsHash.concat(`${shot_cell.coords.x}${shot_cell.coords.y}${shot_cell.state.toString().charAt(0)}x`);
        })
        return recordedShotsHash;
    },

    getHashfromArrayOfCoordArray: function (ArrayOfArrays) {               //!!!!!  NEEDED
        let arrayHash = "";
        for (let row of ArrayOfArrays) {
            arrayHash = arrayHash.concat(`${row[0]}${row[1]}s`)
        }
        return arrayHash;
    },

    getPotentialTargetsFromHistoryHash: function (hitHistoryHash) {                //!!!!!  NEEDED  ??  FOR SOME REASON IT ADDS previously hit targets? 
        let minX = 0;
        let minY = 0;
        let maxX = 7;
        let maxY = 7;

        // let thehistoryHash = hitHistoryHash;
        let array = hitHistoryHash.split('x') // will create an array of 3chars   2 digits and a letter for state: [xyh] => hit at x,y     
        let targetsArray = []
        for (let i = 0; i < array.length; i++) {
            if (array[i][2] === "h") {

                let x = parseInt(array[i][0])
                let y = parseInt(array[i][1])

                // console.log("Newx:",Newx)
                if ((x + 1) <= maxX) {                                // is x+1 out of bounds? 
                    let TwoChars = '';
                    let Newx = (x + 1);
                    TwoChars = TwoChars.concat(Newx.toString() + y.toString()) //  34h  ==> 44
                    if (hitHistoryHash.indexOf(TwoChars.toString()) == -1 && !targetsArray.includes(TwoChars)) {   // is twochars already a hit?   // 34hx52hx
                        targetsArray.push(TwoChars)                               //  [[44]]
                    }
                }

                if ((x - 1) >= minX) {                                // is x-1 out of bounds? 
                    let TwoChars = '';
                    let Newx = (x - 1);
                    TwoChars = TwoChars.concat(Newx.toString() + y.toString())
                    if (hitHistoryHash.indexOf(TwoChars.toString()) == -1 && !targetsArray.includes(TwoChars)) {   // is twochars already a hit?   
                        targetsArray.push(TwoChars)
                    }
                }

                if ((y + 1) <= maxY) {                                // is y+1 out of bounds?
                    let TwoChars = '';
                    let NewY = (y + 1);
                    TwoChars = TwoChars.concat(x.toString() + NewY.toString())
                    if (hitHistoryHash.indexOf(TwoChars.toString()) == -1 && !targetsArray.includes(TwoChars)) {   // is twochars already a hit?   
                        targetsArray.push(TwoChars)
                    }
                }
                if ((y - 1) >= minY) {                                // is y-1 out of bounds?
                    let TwoChars = '';
                    let NewY = y - 1;
                    TwoChars = TwoChars.concat(x.toString() + NewY.toString())
                    if (hitHistoryHash.indexOf(TwoChars.toString()) == -1 && !targetsArray.includes(TwoChars)) {   // is twochars already a hit?, if not, add it
                        targetsArray.push(TwoChars)
                    }
                }

            }
        }
        return targetsArray;
    },

    decideMove2(player) {
        let shot = [];
        // let avoid = [];
        let doNotHitAgain = this.getHashFromHitCells(player);

        if (player.brain.potentialTargets.length >= 1) {
            // console.log("player.brain.potentialTargets.length >= 1 ")

            let randomIndex = Math.floor(Math.random() * player.brain.potentialTargets.length);
            shot = player.brain.potentialTargets[randomIndex];

        };

        if (player.brain.potentialTargets.length === 0) {
            while(shot.length === 0){
                let x = Math.floor(Math.random() * 7);      
                let y = Math.floor(Math.random() * 7);
                let coordString = x.toString().concat(y.toString());
                console.log("coordString:", coordString)
                console.log("doNotHitAgain:", doNotHitAgain)

                shot = Array(x, y);
                console.log("shot:", shot)

                if(doNotHitAgain.indexOf(coordString) >=0) {
                    shot = [];
                }

            }
        }

        return shot;

    },



    decideMove(player) {                        //! the same cell can be shot a 2nd time if shot[] is empty. 
        console.log("inside decide move ")
        if (player.brain.type === 'ai') {
            let shot = []
            let avoid = []
            console.log("inside IF within decideMove ")

            let notToHit = this.getHashFromHitCells(player); // gives a string of all the 
            console.log("notToHit",notToHit)
            if (notToHit.length >0) {
                avoid = notToHit.split('x');                //avoid is now an array of hit cells in the form 'xys' 
            }
            
            // for (let i = 0; i < notToHit.length; i++) {
            //     console.log("inside avoid generation ")
            //     if (notToHit[i][2] != "h") {
            //         // avoid.push(notToHit[i])
            //         avoid.push(notToHit[i])
            //     };
            // };
            console.log("avoid", avoid)         // 
            while (shot.length === 0) {            //changed While to IF
                console.log("inside while shot.length ===0")
                if (player.brain.potentialTargets.length < 1) {

                    // let x = Math.floor(Math.random() * 7);
                    // let y = Math.floor(Math.random() * 7);

                    var x;
                    var y;
                    

                    // for (let coords of avoid) {
                    //     console.log("inside for loop ")
                    //      if (x !== coords[0] && y !== coord[1]) {
                    //         console.log("inside IF within for loop ")
                    //         shot = Array(x, y);
                    //         break;
                    //     };
                    // };

                    // NEW --- WE HAVE shots as an empty array
                    const targetFound = false;

                    while (targetFound === false) {
                        x = Math.floor(Math.random() * 7);      
                        y = Math.floor(Math.random() * 7);  
                        const hitBefore = false;

                        // if(hitBefore === false){
                            for (let coords of avoid) {
                                targetFound = true;
                                shot = Array(x, y);
                                const remComma = "/,/gi";
                                let str = coords.toString().replace(remComma,'');
                                // if (x.toString() === str.charAt(0) && y.toString() === str.charAt(1)) 
                                    if(notToHit.indexOf(str >= 0))
                                    {       
                                    hitBefore = true;
                                    targetFound = false;
                                    shot = [];
                                    }
                                                        }
                                      }

                       


                    // NEW ---
                    
                    // if (avoid.length === 0) {
                    //     shot = Array(x, y)
                    // }
                    // else {
                    //     const coordAlreadyHit = false;
                    //     for (let coords of avoid) {
                            
                    //         const remComma = "/,/gi";
                    //         let str = coords.toString().replace(remComma,'');

                    //         if(notToHit.indexOf(str)>=0){
                    //             coordAlreadyHit = true;
                    //         }


                    //         // if (x !== str.charAt(0) && y !== str.charAt(1)) {
                    //         //     shot = Array(x, y);
                    //         //     break;
                    //         // };
                    //     };
                    //     if (!coordAlreadyHit) {
                    //         shot = Array(x, y);
                    //     }
                    // }



                    // if (avoid.length === 0) {
                    //     shot = Array(x, y)
                    // }
                    // else {
                    //     for (let coords of avoid) {
                    //         if (x !== coords[0] && y !== coords[1]) {
                    //             shot = Array(x, y);
                    //             break;
                    //         };
                    //     };
                    // }





                    
                    // if (shot.length === 0) {
                    //     shot = Array(x, y)
                    // }
                    // else {

                    //     for (let coords of avoid) {
                    //         if (x !== coords[0] && y !== coord[1]) {
                    //             shot = Array(x, y);
                    //             break;
                    //         };
                    //     };

                    // }





                };
                if (player.brain.potentialTargets.length >= 1) {
                    // console.log("player.brain.potentialTargets.length >= 1 ")

                    let randomIndex = Math.floor(Math.random() * player.brain.potentialTargets.length);
                    shot = player.brain.potentialTargets[randomIndex];

                };


            };
            return shot;
        }
    }



}