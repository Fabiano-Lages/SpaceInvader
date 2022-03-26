const canvas = document.querySelector("canvas");
const scoreEl = document.querySelector("#scoreEl");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const player = new Player();
const projectiles = [];
const invaderProjectiles = [];
const particles = [];
const grids = [];

let frames = 0;
let randomInterval = Math.floor((Math.random() * 500)) + 500;
let game = {
    over: false,
    active: true
}
let score = 0;

animate();
estrelas();