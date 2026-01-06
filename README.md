# seperating-axis-theorem

A lightweight TypeScript library for 2D collision detection. 
Seperating Axis Theorem is a method used to detect collisions between **convex** shapes.

The library supports:
- Circle vs. Circle collisions
- Polygon vs. Circle collisions
- Polygon vs. Polygon collisions

## Installation
```bash
npm i seperating-axis-theorem
```

## Usage
```js
import { checkCollision, circleCollision, Circle, Vertex } from "seperating-axis-theorem";

const c1 = new Circle(new Vertex(0, 0), 5);
const c2 = new Circle(new Vertex(3, 4), 5);

console.log(checkCollision(c1, c2)); // true
console.log(circleCollision(c1, c2)); // true
```