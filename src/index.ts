import Circle from "./geometry/Circle";
import Polygon from "./geometry/Polygon";
import Vector from "./geometry/Vector";
import circleProjection from "./projections/circleProjection";
import polygonProjection from "./projections/polygonProjection";
import closestVertex from "./sat/closestVertex";

/**
 * Checks whether two circles are overlapping.
 * 
 * This uses a simple distance comparison between the circle centers and their radii
 * 
 * @param a 
 * @param b 
 * @returns `true` if the objects are overlapping, `false` otherwise.
 */

export function circleCollision(a: Circle, b: Circle) {
    const dx = a.center.x - b.center.x;
    const dy = a.center.y - b.center.y;
    const radius = a.radius + b.radius;

    return (dx * dx + dy * dy <= radius * radius);
}

/**
 * Uses the seperating axis theorem to check whether two polygons are overlapping.
 * 
 * @param a 
 * @param b 
 * 
 * @returns `true` if the objects are overlapping, `false` otherwise.
 */

export function polygonCollision(a: Polygon, b: Polygon) {
    const polygons = [a, b];

    for (const polygon of polygons) {
        for (let i = 0; i < polygon.worldVertices.length; i++) {
            let next = (i + 1) % polygon.worldVertices.length;

            const currentVertex = polygon.worldVertices[i];
            const nextVertex = polygon.worldVertices[next];

            const edgeVector = new Vector(nextVertex.x - currentVertex.x, nextVertex.y - currentVertex.y);
            const normalVector = new Vector(-edgeVector.y, edgeVector.x).normalize();

            const projA = polygonProjection(a, normalVector);
            const projB = polygonProjection(b, normalVector);

            if (projA.max < projB.min || projB.max < projA.min) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Uses a variation of the seperating axis theorem to check whether
 * a polygon and a circle are overlapping.
 * 
 * @param a 
 * @param b 
 * 
 * @returns `true` if the objects are overlapping, `false` otherwise.
 */

export function circlePolygonCollision(a: Polygon, b: Circle) {
    for (let i = 0; i < a.worldVertices.length; i++) {
        let next = (i + 1) % a.worldVertices.length;

        const currentVertex = a.worldVertices[i];
        const nextVertex = a.worldVertices[next];

        const edgeVector = new Vector(nextVertex.x - currentVertex.x, nextVertex.y - currentVertex.y);
        const normalVector = new Vector(-edgeVector.y, edgeVector.x).normalize();

        const projA = polygonProjection(a, normalVector);
        const projB = circleProjection(b, normalVector);

        if (projA.max < projB.min || projB.max < projA.min) {
            return false;
        }
    }

    const vertex = closestVertex(a, b.center);
    const axis = new Vector(vertex.x - b.center.x, vertex.y - b.center.y).normalize();

    const projA = polygonProjection(a, axis);
    const projB = circleProjection(b, axis);

    if (projA.max < projB.min || projB.max < projA.min) {
        return false;
    }

    return true;
}

/**
 * The generic method that supports overlapping math for:
 * - Circle vs. Circle
 * - Polygon vs. Circle
 * - Polygon vs. Polygon
 * 
 * @param a - The first Polygon or Circle.
 * @param b - The second Polygon or Circle.
 * 
 * @returns `true` if the objects are overlapping, `false` otherwise.
 */

export default function checkCollision(a: Polygon | Circle, b: Polygon | Circle) {
    if (a instanceof Circle && b instanceof Circle)
        return circleCollision(a, b);

    if (a instanceof Polygon && b instanceof Polygon)
        return polygonCollision(a, b);

    if (a instanceof Circle && b instanceof Polygon)
        [a, b] = [b, a];

    const polygon = a as Polygon;
    const circle = b as Circle;

    return circlePolygonCollision(polygon, circle);
}