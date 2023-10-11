const canvas = document.querySelector("canvas");
const scoreEl = document.querySelector("#scoreEl");
const c = canvas.getContext("2d");

const audios = [
    new Audio("audio/explosaoinimiga.mp3"),
    new Audio("audio/explosao.mp3"),
    new Audio("audio/tiro.mp3"),
    new Audio("audio/inicio.mp3"),
    new Audio("audio/batida.mp3")
];
const naveDestruida = new Audio("audio/explosaoinimiga.mp3");


canvas.width = 1024;
canvas.height = 576;

const player = new Player();
const projectiles = [];
const invaderProjectiles = [];
const particles = [];
const grids = [];

let frames = 0;
let randomInterval = Math.floor((Math.random() * 500)) + 500;
let game = {}
let score = 0;