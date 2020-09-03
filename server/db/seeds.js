use batteshipGames;

db.dropdatabase();

db.games.insertOne(
    [
        {
            playerName: "Player 1",         // name for player
            ships: {                        
                notSunk: [                  // start of list active ships  
                    [[2,3]],                // ships are a list of coords
                    [[0,1]],
                    [[0,3]],                
                    //[[5,4],[5,5]],          //  EXT 
                    //[[0,1],[0,2][0,3]]      //  EXT
                ],                
                sunk: [                     // start of sunk ships list
                    [[0,5]]                 //just 1 for the demo
                ]
            },
            grid: [
                {                                   // column 1
                    coord: {x:0, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:0, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:0, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:0, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:0, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:0, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:0, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:0, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 2
                    coord: {x:1, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:1, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:1, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:1, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:1, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:1, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:1, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:1, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 3
                    coord: {x:2, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:2, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:2, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:2, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:2, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:2, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:2, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:2, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 4
                    coord: {x:3, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:3, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:3, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:3, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:3, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:3, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:3, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coord: {x:3, y:7},
                    state: {hitState: "nothit"}
                },
                
            ] 
                
            

        },                                    // END OF PLAYER 1
        {

        }
    ]



);