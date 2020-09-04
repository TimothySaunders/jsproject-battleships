use battleships_save_data;

db.dropDatabase();

db.battleship_save.insertMany([
        {                                   
            playerName: "Player 1",         
            ships: {                        
                notSunk: [                    
                    [[2,3]],                
                    [[0,1]],
                    [[0,3]],                
                ],                
                sunk: [                     
                    [[0,5]],                
                    [[4,1]]
                ]
            },
            grid: [
                {                                   
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
                    state: {hitState: "hit"}            
                },
                {
                    coords: {x:0, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:0, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   
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
                {                                   
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
                {                                   
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
                {                                   
                    coords: {x:4, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:4, y:1},             
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
                {                                   
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
                {                                   
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
                {                                   
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
        {                                       
            playerName: "Player 2",         
            ships: {                        
                notSunk: [                  
                    [[1,1]],                
                    [[2,3]],
                    [[4,4]],                
                ],                
                sunk: [                     
                    [[3,5]],               
                    [[2,1]]
                ]
            },
            grid: [
                {                                   
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
                {                                  
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
                {                                  
                    coords: {x:2, y:0},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:2, y:1},
                    state: {hitState: "hit"}       
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
                {                                  
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
                    state: {hitState: "hit"}            
                },
                {
                    coords: {x:3, y:6},
                    state: {hitState: "nothit"}
                },
                {
                    coords: {x:3, y:7},
                    state: {hitState: "nothit"}
                },
                {                                   
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
                {                                   
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
                {                                   
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
                {                                  
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
        }
]);