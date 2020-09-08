// Imports
import {mount} from '@vue/test-utils';
import App from "@/App.vue";
import { data } from "./data.js";


// Create mock fetch
global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({} ),
})
);


// Describes

describe('App',() => {
  let wrapper;
    // Tests
    beforeEach(async () => {
        wrapper = mount(App);
        await wrapper.vm.$nextTick();

        wrapper.setData({
            gameName: data.game[0].name,
            playerTurn: data.game[1].playerTurn,
            turns: data.game[2].turns,
            gameState: data.game[3].gameState,
            victor: data.game[4].victor,
            playerOne: data.game[5],
            playerTwo: data.game[6],
            gameID: data._id,
            allGames: [],
            menuState: false,
            selectedShip: {},
            shipOrientation: "h"
        });

      });

    // Test 1: playerOne should have 5 unsunkShips
    it("should have 5 unsunkShips in player 1", () => {

        // Expect
        expect(wrapper.vm.playerOne.ships.notSunk).toHaveLength(5);

    });

    // Test 2: playerTwo should have 5 placed ships
    it("should have 5 placed ships in player 2", () => {

        // Expect
        expect(wrapper.vm.playerTwo.ships.placedShips).toHaveLength(5);

    });
    
    // Test 3: should have inPlay game state
    it("should have inPlay game state", () => {

        // Expect
        expect(wrapper.vm.gameState).toBe("inGame");

    });

    // Test 4: cell states can be changed (untouched => miss)
    it("should change cell state to miss when click and miss", async () => {

        await wrapper.vm.$nextTick()

        // Grab the correct element
        const grid2CellMiss = wrapper.find("#p2 > section > #g-10");

        // Trigger a click on cell
        grid2CellMiss.trigger('click');

        await wrapper.vm.$nextTick();
        
        // Expect
        expect(wrapper.vm.playerTwo.grid[8].state).toBe("miss");

    });

    // Test 5: Cell states can be changed (untouched => hit)
    it("should change cell state to hit when clicked and hit", async () => {

        await wrapper.vm.$nextTick()

        // Grab the cell needed
        const grid2CellMiss = wrapper.find("#p2 > section > #g-00");

        // Trigger click event
        grid2CellMiss.trigger('click');

        await wrapper.vm.$nextTick();
        
        // Expect
        expect(wrapper.vm.playerTwo.grid[0].state).toBe("hit");
    });

    // Test 6: ship is added to sunk when all cells are hit
    it("should sink a ship when hp === 0", () => {

        // await wrapper.vm.$nextTick();

        // // Grab needed cell
        // const clicker = wrapper.find("#p2 > section > #g-70");

        // // Trigger click event
        // clicker.trigger("click");

        // await wrapper.vm.$nextTick();

        // Expect
        expect(wrapper.vm.playerTwo.ships.sunk).toHaveLength(1);
    });
});
