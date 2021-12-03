"use strict";
function createSquare(config) {
    return { color: config.color, area: config.width * config.width };
}
const square = createSquare({ color: 'red', width: 10 });
console.log(square);
