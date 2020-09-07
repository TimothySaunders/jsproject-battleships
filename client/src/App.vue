<template>
  <div id="app">

    <header id="__app_header">
      <h1>BATTLESHIPS!!</h1>
      <button v-on:click="menuToggle">Menu</button>

      <div id="__app_menu" class="menu hidden">
        <button v-on:click="subMenuToggle('create')">New Game</button>
        <button v-if="allGames.length > 0" v-on:click="subMenuToggle('load')">Load Game</button>
        <button v-if="gameState === 'inGame'" v-on:click="subMenuToggle('save')">Save Game</button>
      </div>
    </header>

    <div id="__app_create_menu" class="menu-secondary hidden">
      <form v-on:submit.prevent="newGameGenerator">
        <label for="game_name">Game Name:</label>
        <input type="text" id="game_name" v-model="gameName" placeholder="Game Name" required /><br />
        <input type="submit" value="Create Game" />
      </form>
      <!-- Add to this when we create different size boards && personal placement -->
    </div>

    <div id="__app_load_menu" class="menu-secondary hidden">
      <ul>
        <game-item v-for="(game, index) in allGames" :key="index" :game="game"></game-item>
      </ul>
    </div>

    <div id="__app_save_menu" class="menu-secondary hidden">

      <form v-on:submit.prevent="saveGame">
        <label for="game_name">Game Name:</label>
        <input type="text" id="game_name" v-model="gameName" placeholder="Game Name" required /><br />
        <input type="submit" value="Save Game" />
      </form>

    </div>

    <main v-if="gameState !== ''" id="__app_game">

      <div class="game-turn">
        <h2>{{ message }}</h2>
      </div>

      <div class="flex">
        <div>
          <p>Player 1 board</p>
          <game-grid :player="playerOne" :playerTurn="playerTurn" :gameState="gameState" :selectedShip="selectedShip"></game-grid>
        </div>
        <div>
          <p>Player 2 board</p>
          <game-grid :player="playerTwo" :playerTurn="playerTurn" :gameState="gameState" :selectedShip="selectedShip"></game-grid>
        </div>
      </div>

    </main>

    <main v-else class="center" id="__app_game">
      <h2>Please start a new game or load a game to continue</h2>
    </main>

  </div>
</template>

<script>
// Imports
import GameGrid from "./components/GameGrid.vue";
import GameItem from "./components/GameItem.vue";
import GameService from "./services/GameService.js";
import { eventBus } from "@/main.js";
import defaultGrids from "./services/DefaultGrids.js";

// APP Component
export default {
  name: "App",
  data() {
    return {
      playerOne: {},
      playerTwo: {},
      playerTurn: "Player 1",
      turns: 0,
      gameState: "",
      victor: "",
      gameName: "",
      gameID: "",
      allGames: null,
      menuState: false,
      selectedShip: {}
    }
  },
  components: {
    "game-grid": GameGrid,
    "game-item": GameItem
  },
  methods: {

    createGrid(){
      const max_x = 7;
      const max_y = 7;
      const grid = [];

      for (let i=0; i<=max_x;i++){
        for(let j=0;j<=max_y;j++){
          const cell = {
            coords: {x: i, y: j},
            state: "untouched"
          }
          grid.push(cell);
        }
      }

      return grid;
    },


    checkIfHit(cell) {
      let target = this.getTarget();
      // console.log("cell: ", cell);
      const key = 8 * cell.coords.x + cell.coords.y;
      let isHit;
      let shipToSinkIndex;
      let shipToSink;
      let targ_x;
      let targ_y;

      target.ships.notSunk.forEach(ship => {
        let index = 0;
        
        for (let ship_coords of ship){

          const x = parseInt(ship_coords[0]);
          const y = parseInt(ship_coords[1]);
          
          if (x === cell.coords.x && y === cell.coords.y) {
            
            // Checks if the coords of the ship selected has a ship in it
            targ_x = x;
            targ_y = y;

            isHit = true;
            shipToSinkIndex = index;
            shipToSink = ship;
            // console.log(ship)
          }
        }

        index += 1;
      });

      if (isHit) {
        const coords = String(targ_x) + String(targ_y);
        console.log(coords);

        target.ships.placedShips.forEach(ship => {
          ship.coords.forEach(ship_coords => {
            if (coords === ship_coords){
              console.log(ship.hp);
              ship.hp -= 1;
              console.log(ship.hp);
              target.grid[key].state = "hit";

              if (ship.hp === 0){
                this.sinkShip(target, shipToSinkIndex, shipToSink); 
              }
            }
          });
        });
      } else {
        target.grid[key].state = "miss";
      }
      this.turns += 1;
      // Switches the player after 1 second. Time can be adjusted if need be
      setTimeout(() => this.switchPlayer(), 1000);
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

    newGameGenerator(){
      // Set game state to setUp
      this.gameState = "setUp";
      const p1_grid = this.createGrid();
      const p2_grid = this.createGrid();

      // Set up the players
      this.playerOne = {
        playerName: "Player 1",
        ships: {
          notSunk: [],
          sunk: []
        },
        grid: p1_grid
      }

      this.playerTwo = {
        playerName: "Player 2",
        ships: {
          notSunk: [],
          sunk: []
        },
        grid: p2_grid
      }

      // Set game state to setUp:ship-placement
      this.gameState = "setUp:ship-placement";

    },
    
    saveGame() {
      // Grab the elements needed 
      const game_area = document.querySelector("#__app_game");
      const save_form = document.querySelector("#__app_save_menu");

      if (this.gameName !== ""){

        if (GameService.getById(this.gameID) && this.gameID !== ""){
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
              { gameState: this.gameState },
              { victor: this.victor },
              this.playerOne,
              this.playerTwo
            ]
          };

          // Add to DB
          GameService.addGame(game_to_save);
        }

        // Hide/Show elements
        game_area.classList.remove("hidden");
        save_form.classList.add("hidden");
      }
    },

    getShooter() {
      
      return this.playerOne.playerName === this.playerTurn
        ? this.playerOne
        : this.playerTwo;
    },

    pullGame(game = null) {
      // Grab the required areas
      const load_menu = document.querySelector("#__app_load_menu");
      const game_area = document.querySelector("#__app_game");

      // Run  check
      if (game !== null){
        GameService.getById(game._id)
        .then(result => {
            this.gameID = result._id;
            this.playerOne = result.game[5];
            this.playerTwo = result.game[6];
            this.playerTurn = result.game[1].playerTurn;
            this.turns = result.game[2].turns;
            this.gameState = result.game[3].gameState;
            this.victor = result.game[4].victor;
            this.gameName = result.game[0].name;

            this.playerTurn = this.playerOne.playerName;
            this.gameState = 'inGame';

            // Hide/Show as appropriate
            game_area.classList.remove("hidden");
            load_menu.classList.add("hidden");
        });
      }
    },
    menuToggle: function(){
      // Grab the main menu
      const menu = document.querySelector('#__app_menu');

      // Grab all submenus
      const save_menu = document.querySelector("#__app_save_menu");
      const load_menu = document.querySelector("#__app_load_menu");
      const create_menu = document.querySelector("#__app_create_menu");

      if (this.menuState === false){
        menu.classList.remove("hidden");
        this.menuState = true;
      } else {
        menu.classList.add("hidden");
        save_menu.classList.add("hidden");
        load_menu.classList.add("hidden");
        create_menu.classList.add("hidden");
        this.menuState = false;
      }
    },
    subMenuToggle: function(menu) {
      // Grab all submenus
      const save_menu = document.querySelector("#__app_save_menu");
      const load_menu = document.querySelector("#__app_load_menu");
      const create_menu = document.querySelector("#__app_create_menu");

      // Check what menu to toggle
      if (menu === "create") {
        // show create menu, hide others
        save_menu.classList.add("hidden");
        load_menu.classList.add("hidden");

        create_menu.classList.remove("hidden");
      } else if (menu === "load") {
        // show create menu, hide others
        save_menu.classList.add("hidden");
        create_menu.classList.add("hidden");

        load_menu.classList.remove("hidden");
      } else if (menu === "save") {
        // show create menu, hide others
        load_menu.classList.add("hidden");
        create_menu.classList.add("hidden");

        save_menu.classList.remove("hidden");
      }
    },
    dbGames: function(){
      GameService.getGame()
      .then(result => this.allGames = result)
    }
  },
  mounted() {
    // this.pullGame();
    this.dbGames();

    eventBus.$on("cell-selected", cell => {
      this.checkIfHit(cell);
    });

    eventBus.$on("save-game-selected", game => {
      this.pullGame(game);
    });
    
    eventBus.$on("change-selected-ship", (ship) => {
      this.selectedShip = ship;
    });

    eventBus.$on("submit-positions", (shipPositions) => {
       let player = this.getShooter()
       player.ships.placedShips = shipPositions
       player.ships.notSunk = player.ships.placedShips.map((ship) => {
         const cellArray = []
         ship.coords.forEach((coord) => {
            cellArray.push([coord[0], coord[1]])
         })
         return cellArray
       })
       this.switchPlayer()
       player = this.getShooter()
       if (player.ships.notSunk.length !== 0) {
         this.gameState = "inGame"
       }
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

.flex{
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.center{
  text-align: center;
}

header{
  padding: 10px;
  text-align: center;
  background: rgb(233, 233, 233);
}
ul{
  margin: 0;
  padding: 0;
  list-style-type: none;
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