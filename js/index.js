function line(particle, particle2) {
    context.beginPath();
    context.moveTo(particle.x, particle.y);
    context.lineTo(particle2.x, particle2.y);
    context.stroke();
  }
   
  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < maxParticles; i++) {
      let particle = particles[i];
      context.fillRect(particle.x - particleSize / 2, particle.y - particleSize / 2, particleSize, particleSize);
      for (let j = 0; j < maxParticles; j++) {
        if (i != j) {
          let particle2 = particles[j];
          let distanceX = Math.abs(particle.x - particle2.x);
          let distanceY = Math.abs(particle.y - particle2.y);
          if (distanceX < threshold && distanceY < threshold) {
            context.lineWidth = ((threshold * 2) - (distanceX + distanceY)) / 50;
            let color = 200 - Math.floor(distanceX + distanceY);
            context.strokeStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
            line(particle, particle2);
          }
        }
      }
      //particle.x = particle.x + -particle.vx;
      particle.y = particle.y + -particle.vy;
      if (particle.x > canvas.width - particleSize || particle.x < particleSize)
        particle.vx = -particle.vx;
      if (particle.y > canvas.height - particleSize || particle.y < particleSize)
        particle.vy = -particle.vy;
    }
    window.requestAnimationFrame(animate);
  }
   
  let canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

// Set display size (css pixels).
var size = 2000;
canvas.style.width = size + "px";
canvas.style.height = size + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);

// Normalize coordinate system to use css pixels.
context.scale(scale, scale);

  let particles = [];
  let particleSize = 4;
  let maxParticles = 200;
  let threshold = 100;
  for (let i = 0; i < maxParticles; i++) {
    let particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random(),
      vy: Math.random()
    }
    particles.push(particle);
  }
  context.fillStyle = 'white';
  animate();