# @megaofmegalodon/2d-collisions

A lightweight TypeScript library for 2D collision detection. 
Uses the **Separating Axis Theorem (SAT)** for collision detection for **convex** polygons. 

The library supports:
- Circle vs. Circle collisions
- Polygon vs. Circle collisions
- Polygon vs. Polygon collisions

## Installation
```bash
npm i @megaofmegalodon/2d-collisions
```

## Usage
```js
import { checkCollision, circleCollision, Circle, Vertex } from "@megaofmegalodon/2d-collisions";

const c1 = new Circle(new Vertex(0, 0), 5);
const c2 = new Circle(new Vertex(3, 4), 5);

console.log(checkCollision(c1, c2)); // true
console.log(circleCollision(c1, c2)); // true
```