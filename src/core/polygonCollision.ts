import Polygon from "../geometry/Polygon";
import Vector from "../geometry/Vector";
import polygonProjection from "../projections/polygonProjection";

/**
 * Uses the separating axis theorem to check whether two polygons are overlapping.
 * 
 * @param a 
 * @param b 
 * 
 * @returns `true` if the objects are overlapping, `false` otherwise.
 */

export default function polygonCollision(a: Polygon, b: Polygon) {
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