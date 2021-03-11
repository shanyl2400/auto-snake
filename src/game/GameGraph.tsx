import GraphMap from '../common/GraphMap';
import Point from '../common/Point';
import World from './World';
export default class GameGraph {
    private paint: CanvasRenderingContext2D | null;
    private size: number;
    constructor(size: number, paint: CanvasRenderingContext2D | null) {
        this.paint = paint;
        this.size = size;
    }

    public drawMap(map: GraphMap) {
        if (this.paint == null) {
            return;
        }
        this.drawGraphBorder(map);
    }

    private drawGraphBorder(map: GraphMap) {

        map.foreachValue((y, x, v) => {
            this.drawMapRect(new Point(x, y), map, v);
        });
        if (this.paint == null) {
            return;
        }
        this.paint.strokeStyle = "#888";
        this.paint.strokeRect(0, 0, this.size, this.size);
    }

    private drawMapRect(point: Point, map: GraphMap, v: number) {
        if (this.paint == null) {
            return;
        }

        let len = this.size / map.getSize();
        let startX = len * point.getX();
        let startY = len * point.getY();

        this.paint.strokeStyle = "#000";
        this.paint.strokeRect(startX, startY, len, len);
        if (v == World.APPLE_MAP_VALUE) {
            this.paint.fillStyle = "#f00";
            this.paint.fillRect(startX, startY, len, len);
        } else if (v == World.SNAKE_MAP_VALUE) {
            this.paint.fillStyle = "#000";
            this.paint.fillRect(startX, startY, len, len);
        } else {
            this.paint.fillStyle = "#fff";
            this.paint.fillRect(startX, startY, len, len);
        }
    }

    private fillMapRect(map: GraphMap, point: Point, color: string) {
        if (this.paint == null) {
            return;
        }

        let len = this.size / map.getSize();
        let startX = len * point.getX();
        let startY = len * point.getY();

        this.paint.fillStyle = color;
        this.paint.strokeStyle = "#000";
        this.paint.strokeRect(startX, startY, len, len);
        this.paint.fillRect(startX, startY, len, len);
    }
}