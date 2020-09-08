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
        })
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
        expect(wrapper.vm.gameState).toBe("inPlay");

    });
});
