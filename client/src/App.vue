<template>
  <div id="app">
    <h3>{{ message }}</h3>
    <button v-on:click="saveGame">Save Game</button>
    <game-grid :player="playerOne" :playerTurn="playerTurn" :gameState="gameRunning"></game-grid>
    <game-grid :player="playerTwo" :playerTurn="playerTurn" :gameState="gameRunning"></game-grid>
  </div>
</template>

<script>
import GameGrid from "./components/GameGrid.vue";
import GameService from "./services/GameService.js";

import { eventBus } from "@/main.js";

export default {
  name: "App",
  data() {
    return {
      playerOne: {},
      playerTwo: {},
      // playerTurn: null,
      playerTurn: "Player 1",
      turns: 0,
      gameRunning: false,
      victor: "",
    };
  },
  components: {
    "game-grid": GameGrid,
  },
  methods: {
    checkIfHit(cell) {
      let target = this.getTarget();
      const key = 8 * cell.coords.x + cell.coords.y;
      let isHit;
      let shipToSinkIndex;
      let shipToSink;

      target.ships.notSunk.forEach((ship) => {
        let index = 0;

        ship.forEach((ship_coords) => {
          if (
            ship_coords[0] === cell.coords.x &&
            ship_coords[1] === cell.coords.y
          ) {
            // Checks if the coords of the ship selected has a ship in it
            isHit = true;
            shipToSinkIndex = index;
            shipToSink = ship;
          }
        });
        index += 1;
      });
      if (isHit) {
        this.sinkShip(target, shipToSinkIndex, shipToSink);
        target.grid[key].state = "hit";
      } else {
        target.grid[key].state = "miss";
      }
      this.registerHitToMemory(cell); //! used for AI
      this.turns += 1;
      // this.switchPlayer();
    },
    getTarget() {
      // identify who is getting shot
      return this.playerOne.playerName === this.playerTurn
        ? this.playerTwo
        : this.playerOne;
    },
    getShooter() {
      //! used for AI
      return this.playerOne.playerName === this.playerTurn
        ? this.playerOne
        : this.playerTwo;
    },

    switchPlayer() {
      this.playerOne.playerName === this.playerTurn
        ? (this.playerTurn = this.playerTwo.playerName)
        : (this.playerTurn = this.playerOne.playerName);
    },

    sinkShip(target, index, ship) {
      // Adds ship to sunken array
      target.ships.sunk.push(ship);
      // Sets the winner and ends the game if all ships of target are sunk
      this.checkIfAllSunk(target)
        ? ((this.victor = this.playerTurn),
          (this.gameRunning = false),
          (this.playerTurn = null))
        : (this.gameRunning = true);
    },

    checkIfAllSunk(player) {
      return player.ships.notSunk.length === player.ships.sunk.length;
    },
    registerHitToMemory(cell) {
      //! used for AI
      let shooter = this.getShooter();
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
    addPotentialTargets(a_shooter, a_cell) {
      let minX = 0; // probably good to have a method to establis grid bounds
      let minY = 0;
      let maxX = 7;
      let maxY = 7;
      let index = 0;

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

      for (let target of a_shooter.brain.potentialTargets) {
        if (
          target[0] < minX ||
          target[0] > maxX ||
          target[1] < minY ||
          target[1] > maxY
        ) {
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
    filterOotMisses(){
      let shooter = this.getShooter();
      let filtered = [];
      let potentials = []
      let rejected = [];
      let keep = [];
      // console.log(shooter.brain.hitHistory)
      let misses = []
      shooter.brain.hitHistory.forEach((shot) => {      // converts all shots in hit history fo arrys of coords
        let new_array = Array(shot.coords.x,shot.coords.y);
        console.log("h:", new_array)
        misses.push(new_array);
        })
        // let x = shot.coords.x
        // let y = shot.coords.y
        // let s = shot.state
        // let new_array = Array(shot.coords.x,shot.coords.y);
        // console.log("shot:",shot)
        // console.log("x:",x)
        // console.log("y:",y)
        // console.log("s:",s)
        // console.log("arr:",new_array)
      // if (shot.state === "miss" || shot.state === "hit"){   /// !ok this should be all the shots there
      //   misses.push(new_array);
      // }
      //  console.log("m:",misses);
      // })




      shooter.brain.potentialTargets.forEach((target) => {
        // console.log(target);
        let new_array = Array(target[0],target[1])
        console.log("n:",new_array)
        potentials.push(new_array)
      })
      console.log("p:",potentials);
      
      
   

    for (let p of potentials) {
      let index = 0;
      for (let m of misses){

       
        if(parseInt(p[0]) === parseInt(m[0]) && parseInt(p[1]) === parseInt(m[1])) {
        // if(p[0] === m[0] && p[1] === m[1]) {
          console.log("spliced:",potentials[index])
          rejected.push(potentials[index]);
          // potentials.splice(index,1)
          // index -=1
        }else {
          keep.push(potentials[index]);
        }

        index +=1
      }
      // index +=1
    }

      let remainingPTs = new Set(keep.map(JSON.stringify)); //! this should remove duplicates but instead it removes non duplicates too
      keep = Array.from(remainingPTs).map(JSON.parse);

      console.log("re:", rejected)
      console.log("ke:", keep)

    

    shooter.brain.potentialTargets = keep;


      // console.log(misses);

      // shooter.brain.potentialTargets.forEach((target) => { // gets potential targets
      // //  console.log(target); 
      // shooter.brain.hitHistory.forEach((shot) => {
      //   console.log(shot.coords)
      // })

      // })


    },

    filterOutMissesFromPotentialTargets() {
      // //! should remove misses from potential targets
      let shooter = this.getShooter();

      let toDiscard = new Array();
      let filtered = new Array();
      let misses = [];
      console.log(`M1: ${misses}`);
      // let an_array = []
      for (let miss of shooter.brain.hitHistory) {
        // generates a list of miss coords for each miss in hit history
        console.log(miss);
        if (miss.state === "miss") {
          let an_array = [];
          an_array.push(miss.coords.x);
          an_array.push(miss.coords.y);
          // let an_array = new Array(miss.coords.x, miss.coords.y)
          misses.push(an_array);
          an_array = [];

          // misses.push([miss.coords.x, miss.coords.y]);
        }
      }

      console.log("M2:", misses);

      for (let target of shooter.brain.potentialTargets) {
        //! needs to filter
        for (let miss of misses) {
          if (
            String(miss[0]) !== String(target[0]) &&
            String(miss[1]) !== String(target[1])
          ) {
            // toDiscard.push(Array(target[0],target[1]))
            filtered.push(Array(target[0], target[1]));
          }
          // else {

          // }

          let fianl = new Set(
            filtered.map(JSON.stringify)
          );
          filtered = Array.from(fianl).map(
            JSON.parse
          );

          // if (miss[0] === target[0] && miss[1] === target[1]) {
          //   let an_array1 = new Array(target[0],target[1])
          //   toDiscard.push(an_array1);
          //   an_array1 = [];
          //   // toDiscard.push([target[0],target[1]]);
          //   // console.log("ding ding")
          // } else {
          //   let an_array2 = new Array(target[0],target[1])
          //   filtered.push(an_array2);
          //   an_array2 = [];
          //   // filtered.push([target[0],target[1]]);
          // }
        }
      }

      console.log("D: ", toDiscard);
      console.log("F: ", filtered);
      shooter.brain.potentialTargets = filtered; //! overwrites potentialtargets with filtered
    },

    // decideWhereToShootNext() {
    //   console.log("shooter");
    //   let currentlyShooting = this.getShooter();

    //   // shooter.brain.type = "synthetic";   //! this needs to be here to test

    //   // if (shooter.brain.type==="synthetic"){
    //   //     if(shooter.brain.type.hitHistory.length == 0){
    //   //       console.log("Shooting random")
    //   //     }
    //   //     else{
    //   //       console.log("shooting from possible targets")
    //   //     }
    //   // }
    // },

    saveGame() {
      const game_to_save = {
        // creates a game object to hold current game state and populates game_to_save with current state
        game: [
          { playerTurn: this.playerTurn },
          { turns: this.turns },
          { gamingRunning: this.gamingRunning },
          { victor: this.victor },
          this.playerOne,
          this.playerTwo,
        ],
      };

      GameService.addGame(game_to_save);
    },
    pullGame() {
      GameService.getGame().then((result) => {
        // takes seed game at array index 0
        this.playerOne = result[0].game[4];
        this.playerTwo = result[0].game[5];
        this.playerTurn = result[0].game[0].playerTurn;
        this.turns = result[0].game[1].turns;
        this.gameRunning = result[0].game[2].gameRunning;
        this.victor = result[0].game[3].victor;

        this.playerTurn = this.playerOne.playerName;
        this.gameRunning = true;
      });
    },
  },
  mounted() {
    this.pullGame();
    // this.decideWhereToShootNext();
    eventBus.$on("cell-selected", (cell) => {
      this.checkIfHit(cell);
      this.filterOotMisses();
      // this.filterOutMissesFromPotentialTargets();
      this.switchPlayer();
    });
  },
  computed: {
    message: function () {
      // Provides feedback to the user describing current game state
      return this.gameRunning
        ? `${this.playerTurn}'s turn to Fire!`
        : `${this.victor} Wins!`;
    },
  },
  watch: {},
};
</script>


<style>
#app {
  display: flex;
  justify-content: space-around;
}
</style>