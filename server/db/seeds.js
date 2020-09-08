use battleships_save_data;

db.dropDatabase();

db.battleship_save.insertMany(
    [
        {
            game: [

                { name: "default_save" },
                { playerTurn: "Player 1" },         // 0
                { turns: 0 },                  // 1
                { gameState: "" },
                { victor: "" },
                {
                    playerName: "Player 1",
                    ships: {
                        notSunk: [
                            [[2, 3]],
                            [[0, 1]],
                            [[0, 3]],
                            [[0, 5]],
                            [[4, 1]]
                        ],
                        sunk: []
                    },
                    grid: [
                        {                                   // column 1
                            coords: { x: 0, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 5 },
                            state: "untouched"           //! matches sunk[]
                        },
                        {
                            coords: { x: 0, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 2
                            coords: { x: 1, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 3
                            coords: { x: 2, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 4
                            coords: { x: 3, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 5
                            coords: { x: 4, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 1 },              //! matches sunk[]
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 6
                            coords: { x: 5, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 7
                            coords: { x: 6, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 8
                            coords: { x: 7, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 7 },
                            state: "untouched"
                        },

                    ]

                },
                {
                    playerName: "Player 2",
                    ships: {
                        notSunk: [
                            [[1, 1]],
                            [[2, 3]],
                            [[4, 4]],
                            [[3, 5]],
                            [[2, 1]]
                        ],
                        sunk: []
                    },
                    grid: [
                        {                                   // column 1
                            coords: { x: 0, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 0, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 2
                            coords: { x: 1, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 1, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 3
                            coords: { x: 2, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 1 },
                            state: "untouched"       //! matches sunk[]
                        },
                        {
                            coords: { x: 2, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 2, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 4
                            coords: { x: 3, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 5 },
                            state: "untouched"           //! matches sunk[]
                        },
                        {
                            coords: { x: 3, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 3, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 5
                            coords: { x: 4, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 4, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 6
                            coords: { x: 5, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 5, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 7
                            coords: { x: 6, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 6, y: 7 },
                            state: "untouched"
                        },
                        {                                   // column 8
                            coords: { x: 7, y: 0 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 1 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 2 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 3 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 4 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 5 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 6 },
                            state: "untouched"
                        },
                        {
                            coords: { x: 7, y: 7 },
                            state: "untouched"
                        },
                    ]
                }
            ]
        }

    ]

);