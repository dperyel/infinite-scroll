## Infinite scroll

![](/docs/demo.gif)

**Demo is available on pages: [dperyel.github.io/infinite-scroll](https://dperyel.github.io/infinite-scroll/)**

For current task as an experiment Giphy API was taken. The main goal was do not drop performance when even a million images are loaded. The trick is that rendered only few pictures which are visible on the display with some threshold. It allows browser to download new images just in time when you scroll.

As for data structure for images a linked list was taken. It's needed for optimizing a memory allocation, also shifting a list has a constant time complexity, which is a big plus for scrolling.

Search component will dispatch a search as you type with a customizable delay.

## To start the app

First install all dependancies by running

```
    yarn
```

In the project directory, you can run:

```
    yarn start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

```
    yarn test
```

Launches the test runner in the interactive watch mode.<br>

## Known bugs ans things to improve

 * After loading new set of data the adjusted padding should be set to the useScroll hook to have a more precise scrolling.

 * When scroll is dragged fast the data can be not shown as position should be recalculated and traversing a linked list is linear complexity. Should be refined.

 * Several places with hardcoded thresholds should be fixed.

 * useScroll hook can be decoupled from calculating functions which can be moved to the helper functions.

 * Cover the presentational components and hooks by unit tests.

 * Thresholds could be calculated based on the viewport size
