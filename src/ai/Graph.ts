import GraphMap from '../common/GraphMap';
import Point from '../common/Point';
export default class Graph {
    private paint: CanvasRenderingContext2D | null;
    private size: number;
    constructor(size: number, paint: CanvasRenderingContext2D | null) {
        this.paint = paint;
        this.size = size;
    }

    public drawMap(map: GraphMap, points: Point[], startEndPoint: Point[]) {
        if (this.paint == null) {
            return;
        }
        this.drawGraphBorder(map);

        for (let i = 0; i < points.length; i++) {
            this.fillMapRect(map, points[i], "#55a");
        }

        for (let i = 0; i < startEndPoint.length; i++) {
            this.fillMapRect(map, startEndPoint[i], "#a00");
        }
    }

    private drawGraphBorder(map: GraphMap) {
        if (this.paint == null) {
            return;
        }
        this.paint.strokeStyle = "#888";
        this.paint.strokeRect(0, 0, this.size, this.size);
        map.foreachValue((y, x, v) => {
            this.drawMapRect(new Point(x, y), map, v);
        });
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
        if (v > 0) {
            this.paint.fillStyle = "#000";
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