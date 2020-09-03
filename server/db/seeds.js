use batteshipGames;

db.dropdatabase();

db.games.insertOne(
    [
        {                                   //!PLAYER 1 START
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
                    [[0,5]],                // just 2 for the demo
                    [[4,1]]
                ]
            },
            grid: [
                {                                   // column 1
                    coords: {x:0, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:2},
                    state: {hitState: "miss"}
                },
                {
                    coords: {x:0, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:5},
                    state: {hitState: "hit"}            //! matches sunk[]
                },
                {
                    coords: {x:0, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 2
                    coords: {x:1, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 3
                    coords: {x:2, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 4
                    coords: {x:3, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 5
                    coords: {x:4, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:1},              //! matches sunk[]
                    state: {hitState: "hit"}
                },
                {
                    coords: {x:4, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 6
                    coords: {x:5, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 7
                    coords: {x:6, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:6},
                    state: {hitState: "miss"}
                },
                {
                    coords: {x:6, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 8
                    coords: {x:7, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:7},
                    state: {hitState: "nothit"}
                },
                
            ] 
                
            

        },                                      //! END OF PLAYER 1

        {                                       //! PLAYER 2 START
            playerName: "Player 2",         // name for player 2
            ships: {                        
                notSunk: [                  // start of list active ships  
                    [[1,1]],                // ships are a list of coords
                    [[2,3]],
                    [[4,4]],                
                    //[[3,4],[3,5]],          //  EXT 
                    //[[0,0],[0,1][0,2]]      //  EXT
                ],                
                sunk: [                     // start of sunk ships list
                    [[3,5]],                // just 2 for the demo
                    [[2,1]]
                ]
            },
            grid: [
                {                                   // column 1
                    coords: {x:0, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:5},
                    state: {hitState: "nothit"}            
                },
                {
                    coords: {x:0, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 2
                    coords: {x:1, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:1, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 3
                    coords: {x:2, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:1},
                    state: {hitState: "hit"}        //! matches sunk[]
                },
                {
                    coords: {x:2, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 4
                    coords: {x:3, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:4},
                    state: {hitState: "miss"}
                },
                {
                    coords: {x:3, y:5},
                    state: {hitState: "hit"}            //! matches sunk[]
                },
                {
                    coords: {x:3, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 5
                    coords: {x:4, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:1},              
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 6
                    coords: {x:5, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:5, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 7
                    coords: {x:6, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:2},
                    state: {hitState: "miss"}
                },
                {
                    coords: {x:6, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:6, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   // column 8
                    coords: {x:7, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:1},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:2},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:3},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:4},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:5},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:7, y:7},
                    state: {hitState: "nothit"}
                },
            ]               
        },
    ]
);