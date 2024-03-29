
class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        };

        this.rotation = 0;

        this.opacity = 1;

        const image = new Image();
        image.src = "img/spaceship.png";
        image.onload = () => {
            const scale = .15;
            this.image = image; 
            this.width = image.width * scale;
            this.height = image.height * scale;
        };
        
        this.inicia();
        this.audio = new Audio(audios[1].src);
    }

    inicia() {
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 20
        };
        this.opacity = 1;
    }

    draw() {
        c.save();
        c.globalAlpha = this.opacity;
        c.translate(
            this.position.x + this.width / 2, 
            this.position.y + this.height / 2
        );

        c.rotate(this.rotation);

        c.translate(
            -this.position.x - this.width / 2, 
            -this.position.y - this.height / 2
        );

        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
        c.restore();
    }

    update() {
        if(this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }

    destruir() {
        this.opacity = 0;
        this.audio.play();
    }
}

class Projectile {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 4;
        this.start = true;
        this.audio = new Audio(audios[2].src);

    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
        if(this.start) {
            this.audio.play();
            this.start = false;
        }
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class InvaderProjectile {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.width = 3;
        this.height = 10;
    }

    draw() {
        c.fillStyle = "white";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Invader {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        };

        this.rotation = 0;

        const image = new Image();
        image.src = "img/invader.png";
        image.onload = () => {
            const scale = 1;
            this.image = image; 
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: position.x,
                y: position.y
            };
        };

        this.audio = new Audio(audios[0].src);
    }

    draw() {
        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }

    update({velocity}) {
        if(this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height                
                },
                velocity: {
                    x: 0,
                    y: 3
                }
            }
        ));
    }

    destruir() {
        this.audio.play();
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };

        this.velocity = {
            x: 3,
            y: 0
        };

        this.invaders = [];
        const rows = Math.floor(Math.random() * 5 + 2);
        const columns = Math.floor(Math.random() * 10 + 5);

        this.width = columns * 30;

        for(let x = 0; x < columns; x++) {
            for(let y = 0; y < rows; y++) {
                this.invaders.push(new Invader(
                        {
                            position : {
                                x: x * 30,
                                y: y * 30
                            }
                        }
                ));
            }
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.y = 0;
        if(this.position.x + this.width >= canvas.width ||
            this.position.x <= 0) {
            this.velocity.x *= -1;
            this.velocity.y = 30;
        }
    }
}

class Particle { 
    constructor({position, velocity, radius, color, fades}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fades = fades;
    }

    draw() {
        c.save();
        c.globalAlpha = this.opacity;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle =  this.color;
        c.fill();
        c.closePath();
        c.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.fades) {
            this.opacity -= 0.01;
        }
    }
}