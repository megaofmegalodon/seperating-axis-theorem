import Circle from "../geometry/Circle";
import Polygon from "../geometry/Polygon";
import Vector from "../geometry/Vector";
import circleProjection from "../projections/circleProjection";
import polygonProjection from "../projections/polygonProjection";
import closestVertex from "../sat/closestVertex";

/**
 * Uses a variation of the separating axis theorem to check whether
 * a polygon and a circle are overlapping.
 * 
 * @param a 
 * @param b 
 * 
 * @returns `true` if the objects are overlapping, `false` otherwise.
 */

export default function circlePolygonCollision(a: Polygon, b: Circle) {
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