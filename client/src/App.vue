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
      let minX = 0;  // probably good to have a method to establis grid bounds
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
      a_shooter.brain.potentialTargets = Array.from(currentTargets).map(JSON.parse);

    },
    filterOutMissesFromPotentialTargets(){ // //! should remove misses from potential targets
      let shooter = this.getShooter()       
      let filtered = [];
      let misses = []
      for (let miss of shooter.brain.hitHistory){
          console.log(miss)
        if (miss.state === "miss"){
          misses.push([miss.coords.x , miss.coords.y])
        }
      }
      console.log(misses);

      for (let target of shooter.brain.potentialTargets){
        for(let miss of misses){
          if(miss[0]===target[0] && miss[1]===target[1] ){
            // console.log("ding ding")
          }
          else {
            filtered.push(target);
          }
        }
      }

        shooter.brain.potentialTargets = filtered;
    },


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
    eventBus.$on("cell-selected", (cell) => {
      this.checkIfHit(cell);
      this.filterOutMissesFromPotentialTargets();
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