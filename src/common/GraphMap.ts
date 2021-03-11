import Point from './Point';

export default class GraphMap {
    private map: number[][] = new Array<Array<number>>();
    private size: number;

    constructor(size: number) {
        this.size = size;
        for (let i: number = 0; i < size; i++) {
            this.map.push([]);
            for (let j: number = 0; j < size; j++) {
                this.map[i].push(0)
            }
        }
    }

    public reset() {
        for (let i: number = 0; i < this.size; i++) {
            for (let j: number = 0; j < this.size; j++) {
                this.map[i][j] = 0
            }
        }
    }
    public setPointValue(point: Point, value: number) {
        this.map[point.getY()][point.getX()] = value;
    }
    public setPointsValue(points: Point[], value: number) {
        for (let i = 0; i < points.length; i++) {
            this.map[points[i].getY()][points[i].getX()] = value;
        }
    }

    public pointValue(point: Point): number {
        if (point.getX() < 0 || point.getX() >= this.size || point.getY() < 0 || point.getY() >= this.size) {
            console.error("point out of range", point);
            return 0;
        }

        return this.map[point.getY()][point.getX()];
    }

    public aroundPoints(point: Point) {
        let points: Point[] = [];
        if (point.getX() > 0) {
            points.push(new Point(point.getX() - 1, point.getY()));
        }
        if (point.getX() < this.size - 1) {
            points.push(new Point(point.getX() + 1, point.getY()));
        }
        if (point.getY() > 0) {
            points.push(new Point(point.getX(), point.getY() - 1));
        }
        if (point.getY() < this.size - 1) {
            points.push(new Point(point.getX(), point.getY() + 1));
        }
        return points;
    }

    public isPointInMap(point: Point) {
        if (point.getX() < 0 || point.getX() >= this.size) {
            return false;
        }
        if (point.getY() < 0 || point.getY() >= this.size) {
            return false;
        }
        return true;
    }

    public getSize(): number {
        return this.size;
    }

    public foreachValue(handle: (y: number, x: number, v: number) => void) {
        for (let i: number = 0; i < this.size; i++) {
            for (let j: number = 0; j < this.size; j++) {
                handle(i, j, this.map[i][j]);
            }
        }
    }

    clone(): GraphMap {
        let sm: GraphMap = new GraphMap(this.size);
        for (let i: number = 0; i < this.size; i++) {
            sm.map.push([])
            for (let j: number = 0; j < this.size; j++) {
                sm.map[i].push(this.map[i][j])
            }
        }

        return sm;
    }
}