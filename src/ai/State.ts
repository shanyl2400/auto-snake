import Point from '../common/Point';
import GraphMap from '../common/GraphMap';

export default class State {
    private map: GraphMap;
    private parent: State | null;
    private cost: number;
    private point: Point;

    //初始化状态
    constructor(map: GraphMap, point: Point, parent: State | null = null, cost: number = 0) {
        this.map = map;
        this.point = point;
        this.cost = cost;
        this.parent = parent;
    }

    getMap(): GraphMap {
        return this.map;
    }
    getPoint(): Point {
        return this.point;
    }
    getAround(): Point[] {
        return this.map.aroundPoints(this.point);
    }
    getCost(): number {
        return this.cost;
    }
    getParent(): State | null {
        return this.parent;
    }
}