interface SquareConfig {
    [index: number]: string;
    color: string;
    width: number;
    logo: 'default' | 'custom';
    plot: 1 | 2 | 3;
    // [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
    config[2] = '5';
    return { color: config.color, area: config.width * config.width };
}

const config = { color: 'red', width: 10, logo: 'default' as 'default', plot: 3 as 3 };
const square = createSquare(config);
console.log(square);