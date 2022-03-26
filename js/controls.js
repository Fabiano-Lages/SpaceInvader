const keys = {
    a: {
        pressed : false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
};

addEventListener("keydown", ({key}) => {
    if(!game.over) {
        switch(key) {
            case "a":
                keys.a.pressed = true;
                break;
            case "d":
                keys.d.pressed = true;
                break;
            case " ":
                keys.space.pressed = true;
                projectiles.push(new Projectile ({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }));
                break;
        }
    }
});

addEventListener("keyup", ({key}) => {
    switch(key) {
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
        case " ":
            keys.space.pressed = false;
            break;
    }
});


function animate() {
    if(game.active) {
        requestAnimationFrame(animate);

        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);
        
        player.update();

        particles.forEach((particle, p) => {
            if(particle.position.y - particle.radius >= canvas.height) {
                particle.position.x = Math.random() * canvas.width;
                particle.position.y = -particle.radius;
            }

            if(particle.opacity <= 0) {
                setTimeout(() => {
                    particles.splice(p, 1);
                });
            } else {
                particle.update();
            }
        });

        projectiles.forEach((projectile, ind) => {
            if (projectile.position.y + projectile.radius <= 0) {
                setTimeout(() => {
                    projectiles.splice(ind, 1)
                }, 0);
            } else {
                projectile.update();
            }
        });

        grids.forEach((grid, g) => {
            grid.update();
            
            if(frames % 100 === 0 && grid.invaders.length) {
                grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
            }

            invaderProjectiles.forEach((invaderProjectile, p) => {
                if(invaderProjectile.position.y <= canvas.height) {
                    invaderProjectile.update();
                    if(invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
                        invaderProjectile.position.x + invaderProjectile.width >= player.position.x && 
                        invaderProjectile.position.x <= player.position.x + player.width) {
                            createParticles({object: player, color:"whitesmwhiteoke"});
                            setTimeout(() => {
                                invaderProjectiles.splice(p, 1);
                                player.opacity = 0;
                                game.over = true;
                            }, 0);

                            setTimeout(() => {
                                game.active = false;
                            }, 2000);
                    }
                } else {
                    setTimeout(() => {
                        invaderProjectiles.splice(p, 1);
                    }, 0);
                }
            });

            grid.invaders.forEach((invader, i) => {
                invader.update({velocity: grid.velocity});

                projectiles.forEach((projectile, j) => {
                    if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                        projectile.position.x + projectile.radius >= invader.position.x &&
                        projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                        projectile.position.y + projectile.position.y >= invader.position.y) {
                            setTimeout(() => {
                            const invaderFound = grid.invaders.find(invader2 => invader2 === invader);
                            const projectileFound = projectiles.find(projectile2 => projectile2 === projectile);
                            if(invaderFound && projectileFound) {
                                score += 100;
                                scoreEl.innerHTML = score;
                                createParticles({object: invader});

                                grid.invaders.splice(i, 1);
                                projectiles.splice(j, 1);

                                if(grid.invaders.length) {
                                    const firstInvader = grid.invaders[0];
                                    const lastInvader = grid.invaders[grid.invaders.length - 1];

                                    grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                                    grid.position.x = firstInvader.position.x;
                                } else {
                                    grids.splice(g, 1);
                                }
                            }
                        }, 0);
                    }
                });
            })
        });

        if (keys.a.pressed && player.position.x >= 0) {
            player.velocity.x = -7;
            player.rotation = -0.15;
        } else if (keys.d.pressed && player.position.x <= canvas.width - player.width) {
            player.velocity.x = 7;
            player.rotation = 0.15;
        } else {
            player.velocity.x = 0;
            player.rotation = 0;
        }

        if(frames % randomInterval === 0) {
            grids.push(new Grid());
            randomInterval = Math.floor((Math.random() * 500)) + 500;
            frames = 0;
        }

        frames ++;
    }
}

function estrelas() { 
    for(let i = 0; i < 100; i++) {
        particles.push(new Particle({
            position: {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            },
            velocity: {
                x: 0,
                y: .3
            },
            radius: Math.random() * 2,
            color: "white"
        }));
    }
}

function createParticles({object, color}) {
    for(let i = 0; i < 15; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color || "#BAA0DE",
            fades: true
        }));
    }
}