# @megaofmegalodon/2d-collisions

A lightweight TypeScript library for 2D collision detection. 
Uses the **Separating Axis Theorem (SAT)** for collision detection on **convex** polygons. 

The library supports:
- Circle vs. Circle collisions
- Polygon vs. Circle collisions
- Polygon vs. Polygon collisions

## Installation
```bash
npm i @megaofmegalodon/2d-collisions
```

## Usage

### Circle Collisions
```js
import { checkCollision, circleCollision, Circle, Vertex } from "@megaofmegalodon/2d-collisions";

const c1 = new Circle(new Vertex(0, 0), 5);
const c2 = new Circle(new Vertex(3, 4), 5);

console.log(checkCollision(c1, c2)); // true
console.log(circleCollision(c1, c2)); // true
```

### Polygon vs. Circle Collisions
```js
import { checkCollision, Polygon, Circle, Vertex } from "@megaofmegalodon/2d-collisions";

const c1 = new Circle(new Vertex(1, 1), 0.5);
const p1 = new Polygon(new Vertex(0, 0))
    .addVertex(new Vertex(0, 0))
    .addVertex(new Vertex(2, 0))
    .addVertex(new Vertex(1, 2));

console.log(checkCollision(c1, p1)); // true
console.log(checkCollision(p1, c1)); // true

```

### Polygon Collisions
```js
import { checkCollision, Polygon, Vertex } from "@megaofmegalodon/2d-collisions";

const p1 = new Polygon(new Vertex(0, 0))
    .addVertex(new Vertex(0, 0))
    .addVertex(new Vertex(2, 0))
    .addVertex(new Vertex(1, 2));

const p2 = new Polygon(new Vertex(1, 1))
    .addVertex(new Vertex(0, 0))
    .addVertex(new Vertex(2, 0))
    .addVertex(new Vertex(1, 2));

console.log(checkCollision(p1, p2)); // true
```
**Notes**:
- Polygons must be convex, meaning that all interior angles must be less than 180 degrees.
- Vertices must be added in **clockwise or counter-clockwise order**. Inconsistent ordering may cause the collision detection to fail.