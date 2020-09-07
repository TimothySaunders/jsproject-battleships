<template>
  <div
    v-on:click="handleSelect()"
    class="cell"
    :class="[cell.state, noBorder]"
    v-on:drop="onDrop($event)"
    v-on:dragover.prevent
    v-on:dragenter.prevent="enterDrag($event)"
    v-on:dragleave="leaveDrag($event)"
  >
    <p v-if="cell.state !== 'untouched'">&#x25CF;</p>
    <div v-if="hasShip && playerTurn === player.playerName" class="ship"></div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "grid-cell",
  props: ["cell", "noBorder", "ships", "gameState", "selectedShip", "playerTurn", "player"],
  data() {
    return {
      hasShip: false,
    };
  },
  methods: {
    handleSelect() {
      while (this.gameState === "inGame") {
        if (this.cell.state === "untouched" && !this.noBorder) {
          eventBus.$emit("cell-selected", this.cell);
          this.hasShip = false;
        }
        break;
      }
    },
    shipCheck: function () {
      // Loop through ships
      this.ships.forEach((ship) => {
        // Loop through the ships coords
        ship.forEach((cell) => {
          // Turn the ship coords into string
          const ship_coord = String(cell).split(",");
          const current_coord = ship_coord[0] + ship_coord[1];

          // Get just coords from cell id
          const cell_coords = this.cell.coords.x + "" + this.cell.coords.y;

          // Check both coords
          if (current_coord === cell_coords) {
            this.hasShip = true;
          }
        });
      });
    },
    
    onDrop(event) {
      const shipCells = this.getShipCells(event)

      //checks if ship hanging off grid before creating event
      if (shipCells.length === this.selectedShip.length) {
        eventBus.$emit('place-ship', shipCells)
      }
      
      //resets purple highlighted cells
      shipCells.forEach(coord => {
      event.target.parentNode.querySelector(`#g-${coord}`).style.background = "";
      })
    },
    enterDrag(event) {
      const shipCells = this.getShipCells(event)

      shipCells.forEach(coord => {
      event.target.parentNode.querySelector(`#g-${coord}`).style.background = "purple";
      })
    },
    leaveDrag(event) {
      const shipCells = this.getShipCells(event)

      shipCells.forEach(coord => {
      event.target.parentNode.querySelector(`#g-${coord}`).style.background = "";
      })
    },
    getShipCells(event){
      const currentCellX = parseInt(event.target.id.slice(2, 3))
      const currentCellY = parseInt(event.target.id.slice(3, 4))

      const shipCells = []
      for (let i=0; i<this.selectedShip.length; i++){
          if ((currentCellY + i) <= 7) {
            const nextCell = currentCellX.toString() + (currentCellY + i).toString()
            shipCells.push(nextCell)
          }
      }
      return shipCells
    }
  },
  mounted() {
    this.shipCheck();
  },
};
</script>

<style>
.cell {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  text-align: center;
  cursor: crosshair;
}

.cell > p {
  font-size: 2.5em;
  padding: 0;
  margin: 0 auto;
  height: 50%;
  user-select: none;
}
.hit > p {
  color: red;
}
.miss > p {
  color: white;
}
.untouched:hover {
  border: 3px solid black;
}
.no-highlight:hover {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: none;
  border-top: none;
}

.ship {
  margin: 15px auto;
  width: 50%;
  height: 50%;
  background: rgb(121, 116, 116);
  border-radius: 25%;
}
</style>