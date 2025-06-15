
## Solar Trails

This p5.js sketch renders a dynamic, interactive solar system simulation.

## Features

☀️ Sun	(Static, glowing at the center of the canvas)
🌍 Earth	(Point-based sphere orbiting the Sun while spinning on its axis)
🌕 Moon	(Circles the Earth in a smaller orbit)
🌠 Comets	(Diagonal, multicolored trails that shoot across the screen and respawn)
🌌 Stars	(Randomly placed background stars with subtle brightness variation)


## 🚀 Live Demo

Paste the code into the [p5.js Web Editor](https://editor.p5js.org/) to see it in action.

## Customization Ideas

- Add Mars, Venus, or other planets
- Use shaders or gradients for visual effects
- Implement user controls (toggle trails, adjust orbit speed)
- Add interactive click events for comets or stars

For e.g. you can modify the sketch to include a planetary fact about the Moon is displayed (e.g. in a small tooltip or HUD text).

Add these new variables at the top:

```JS
let showMoonFact = false;
let moonFact = "The Moon is 1/6th the gravity of Earth.";
let moonX = 0;
let moonY = 0;

```

Replace your draw() Moon section with this (near the end of your draw() function):

```JS
// Draw Moon
moonX = earthX + cos(angleMoon) * moonDistance;
moonY = earthY + sin(angleMoon) * moonDistance;

fill(0, 0, 90);
noStroke();
ellipse(moonX, moonY, moonRadius, moonRadius);

// Show moon fact if clicked
if (showMoonFact) {
  fill(0, 0, 100);
  stroke(0, 0, 20);
  strokeWeight(0.5);
  textSize(12);
  textAlign(CENTER);
  text(moonFact, moonX, moonY - moonRadius - 10);
}


```
Add this mousePressed() function:

```JS
function mousePressed() {
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let d = dist(mx, my, moonX, moonY);

  if (d < moonRadius / 2 + 5) {
    showMoonFact = !showMoonFact;
  } else {
    showMoonFact = false;
  }
}

```

## Preview

![Solar](https://github.com/user-attachments/assets/6af6d697-4fba-47fb-90e7-f580d35cb249)

## 📄 License

MIT License – feel free to use and adapt!

