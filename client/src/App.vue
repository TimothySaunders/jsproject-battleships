<template>
  <div id="app">
    <game-grid :player="playerOne"></game-grid>
    <game-grid :player="playerTwo"></game-grid>
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
    };
  },
  components: {
    "game-grid": GameGrid,
  },
  methods: {
    checkIfHit(cell) {
      let target = this.getTarget();

      for (let ship of target.ships.notSunk) {
        const index = 0; // index of ship whithin ships, being looped through
        for (let ship_coords of ship) {
          if (
            // Checks if the coords of the ship selected has a ship in it
            ship_coords[0] === cell.coords.x &&
            ship_coords[1] === cell.coords.y
          ) {
            cell.state = "hit";
            // Remove ship from not sunk
            target.ships.notSunk.splice(index, 1);
            // Adds ship to sunken array
            target.ships.sunk.push(ship);
          } else {
            cell.state = "miss";
          }
          index += 1;
        }
      }
      this.switchPlayer();
    },
    getTarget() {
      let target; // identify who is getting shot
      if (this.playerOne.playerName === this.playerTurn) {
        target = this.playerTwo;
      } else {
        target = this.playerOne;
      }
      return target;
    },
    switchPlayer() {
      if (this.playerOne.playerName === this.playerTurn) {
        this.playerTurn = this.playerTwo.playerName;
      } else {
        this.playerTurn = this.playerOne.playerName;
      }
    },
    checkIfShipSunk() {},
    checkIfAllSunk() {},
    saveGame() {},
    pullGame() {
      GameService.getGame().then((result) => {
        this.playerOne = result[0];
        this.playerTwo = result[1];
        this.playerTurn = this.playerOne.playerName;
      });
    },
  },
  mounted() {
    this.pullGame();

    eventBus.$on("cell-selected", (cell) => {
      this.checkIfHit(cell);
    });
  },
  computed: {},
  watch: {},
};
</script>


<style>
</style>