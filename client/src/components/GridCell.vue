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
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "grid-cell",
  props: ["cell", "noBorder", "ships", "gameState", "selectedShip", "playerTurn", "player", "shipOrientation"],
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
    // Absolutely quality fudge
      setTimeout(() => shipCells.forEach(coord => {
      event.target.parentNode.querySelector(`#g-${coord}`).style.background = "purple";
      }), 1)
    },
    leaveDrag(event) {
      const shipCells = this.getShipCells(event)

      shipCells.forEach(coord => {
      event.target.parentNode.querySelector(`#g-${coord}`).style.background = "";
      })
    },
    getShipCells(event){
      const currentCellRow = parseInt(event.target.id.slice(2, 3))
      const currentCellCol = parseInt(event.target.id.slice(3, 4))

      const shipCells = []
      for (let i=0; i<this.selectedShip.length; i++){
          if ((currentCellCol + i) <= 7 && this.shipOrientation === 'h') {
            const nextCell = currentCellRow.toString() + (currentCellCol + i).toString()
            shipCells.push(nextCell)
          }
          if ((currentCellRow - i) >= 0 && this.shipOrientation === 'v') {
            const nextCell = (currentCellRow - i).toString() + currentCellCol.toString()
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

<style scoped>
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