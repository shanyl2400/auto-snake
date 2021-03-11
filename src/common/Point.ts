
export default class Point {
    private x: number;
    private y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }

    public equals(p: Point): boolean {
        if (this.x == p.x && this.y == p.y) {
            return true;
        }
        return false;
    }

    public around(p: Point): boolean {
        if ((this.x + 1 == p.x && this.y == p.y) ||
            (this.x - 1 == p.x && this.y == p.y) ||
            (this.x == p.x && this.y == p.y + 1) ||
            (this.x == p.x && this.y == p.y - 1)) {
            return true
        }
        return false;
    }

    public toString(): string {
        return "point => x:" + this.x + ", y:" + this.y;
    }
}