import Point from "../common/Point";

export default class Apple {
    private pos: Point;

    constructor(pos: Point) {
        this.pos = pos;
    }

    public getPosition(): Point {
        return this.pos;
    }
}