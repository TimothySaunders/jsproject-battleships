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
      gameRunning: 'setUp',
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
      this.turns += 1;
      this.switchPlayer();
    },
    getTarget() {
      // identify who is getting shot
      return this.playerOne.playerName === this.playerTurn
        ? this.playerTwo
        : this.playerOne;
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