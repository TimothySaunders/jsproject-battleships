<template>
  <div id="app">

    <header id="__app_header">
      <h1>BATTLESHIPS!!</h1>
      <button v-on:click="menuToggle">Menu</button>

      <div id="__app_menu" class="menu hidden">
        <button>New Game</button>
        <button>Load Game</button>
        <button v-if="gameState === 'inGame'" v-on:click="saveMenu">Save Game</button>
      </div>
    </header>

    <div id="__app_new_game" class="menu-secondary hidden"></div>

    <div id="__app_load_game" class="menu-secondary hidden"></div>

    <div id="__app_save_game" class="menu-secondary hidden">

      <form v-on:submit.prevent="saveGame">
        <label for="game_name">Game Name:</label>
        <input type="text" id="game_name" v-model="gameName" placeholder="Game Name" required /><br />
        <input type="submit" value="Save Game" />
      </form>

    </div>

    <main id="__app_game">

      <div class="game-turn">
        <h2>{{ message }}</h2>
      </div>

      <div class="flex">
        <div>
          <p>Player 1 board</p>
          <game-grid :player="playerOne" :playerTurn="playerTurn" :gameState="gameState"></game-grid>
        </div>
        <div>
          <p>Player 2 board</p>
          <game-grid :player="playerTwo" :playerTurn="playerTurn" :gameState="gameState"></game-grid>
        </div>
      </div>

    </main>

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
      gameState: "",
      victor: "",
      gameName: "",
      gameID: "",
      menuState: false
    };
  },
  components: {
    "game-grid": GameGrid
  },
  methods: {
    checkIfHit(cell) {
      let target = this.getTarget();
      const key = 8 * cell.coords.x + cell.coords.y;
      let isHit;
      let shipToSinkIndex;
      let shipToSink;

      target.ships.notSunk.forEach(ship => {
        let index = 0;

        ship.forEach(ship_coords => {
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
          (this.gameState = 'endGame'),
          (this.playerTurn = null))
        : (this.gameState = 'inGame');
    },

    checkIfAllSunk(player) {
      return player.ships.notSunk.length === player.ships.sunk.length;
    },
    saveMenu(){
      // Grab the elements needed 
      const game_area = document.querySelector("#__app_game");
      const save_form = document.querySelector("#__app_save_game");

      // Hide/Show elements
      game_area.classList.add("hidden");
      save_form.classList.remove("hidden");
    },
    saveGame() {
      // Grab the elements needed 
      const game_area = document.querySelector("#__app_game");
      const save_form = document.querySelector("#__app_save_game");

      if (this.gameName !== ""){

        if (GameService.getById(this.gameID)){
          const game_to_save = {
            // creates a game object to hold current game state and populates game_to_save with current state
            game: [
              { name: this.gameName },
              { playerTurn: this.playerTurn },
              { turns: this.turns },
              { gamingRunning: this.gamingRunning },
              { victor: this.victor },
              this.playerOne,
              this.playerTwo
            ]
          };

          // Update DB
          GameService.updateGame(this.gameID, game_to_save);

        } else {
          const game_to_save = {
            // creates a game object to hold current game state and populates game_to_save with current state
            game: [
              { name: this.gameName },
              { playerTurn: this.playerTurn },
              { turns: this.turns },
              { gamingRunning: this.gamingRunning },
              { victor: this.victor },
              this.playerOne,
              this.playerTwo
            ]
          };

          // Add to DB
          GameService.addGame(this.gameID, game_to_save);
        }

        // Hide/Show elements
        game_area.classList.remove("hidden");
        save_form.classList.add("hidden");
      }
    },
    pullGame() {
      GameService.getGame().then(result => {
        // takes seed game at array index 0
        this.gameID = result[0]._id;
        this.playerOne = result[0].game[5];
        this.playerTwo = result[0].game[6];
        this.playerTurn = result[0].game[1].playerTurn;
        this.turns = result[0].game[2].turns;
        this.gameState = result[0].game[3].gameState;
        this.victor = result[0].game[4].victor;
        this.gameName = result[0].game[0].name;

        this.playerTurn = this.playerOne.playerName;
        this.gameState = 'inGame';
      });
    },
    menuToggle: function(){
      const menu = document.querySelector('#__app_menu');
      if (this.menuState === false){
        menu.classList.remove("hidden");
        this.menuState = true;
      } else {
        menu.classList.add("hidden");
        this.menuState = false;
      }
    }
  },
  mounted() {
    this.pullGame();

    eventBus.$on("cell-selected", cell => {
      this.checkIfHit(cell);
    });
  },
  computed: {
    message: function() {
      // Provides feedback to the user describing current game state
      return this.gameState==='inGame'
        ? `${this.playerTurn}'s turn to Fire!`
        : `${this.victor} Wins!`;
    }
  },
  watch: {}
};
</script>


<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  /* display: flex;
  justify-content: space-around; */
}

.flex{
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

header{
  padding: 10px;
  text-align: center;
  background: rgb(233, 233, 233);
}

.game-turn{
  margin: 20px;
  text-align: center;
}
.menu{
  margin: 20px 0 0 0;
  padding: 10px;
  background: rgb(219, 219, 219);
}
.menu-secondary{
  padding: 10px;
  height: calc(100vh - 234px);
  background: rgb(216, 216, 216);
  text-align: center;
}

label{
  width: 40%;
}
input{
  margin: 10px;
  padding: 10px 5px;
  width: 60%;
}

button, input[type=submit]{
  margin: 0 10px;
  padding: 10px;
  width: 30%;
}

.hidden{
  display: none;
}
</style>