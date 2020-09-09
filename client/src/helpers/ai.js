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

    getPotentialTargetsFromHistoryHash: function (hitHistoryHash) {                //!!!!!  NEEDED
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
}