# jsproject_battleships_game

## MVP

1. Must display 2 grids for each users layout, user grid pre-populated
2. Rotate between each users turn
3. Select a square on oponents grid
4. Display a hit or a miss, prevent hit square being clicked twice
5. Keep track of current game

## Extensions

1. User places own ships
2. Multi-square ships
3. AI STUFF
    - Randomly generate AI board
    - Generate AI choice
      - Dont repeat choices
    - Difficulty settings
4. Look good

## How to setup

### Once you have cloned the repo to your machine you will need to install all npm packages for the project. To do this follow the below steps

For the Vue packages:

```bash
project-folder > cd clients
npm install
```

For the express server:

```bash
project-folder > cd server
npm install
```

### Once you have the packages installed follow these intructions to get the servers running

If you would like an example game when you initially set up the app (not required)

```bash
project-folder > cd server
server > npm run seed
```

To start up the express server

```bash
project-server > cd server
server > npm run server:dev
```

To start up the vue server

```bash
project-folder > cd client
client > npm run serve
```
