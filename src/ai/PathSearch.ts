import Point from '../common/Point';
import GraphMap from '../common/GraphMap';
import State from './State';

export default class PathSearch {
    private startPoint: Point;
    private endPoint: Point;

    private map: GraphMap;

    private refreshMap: (newPoint: Point, map: GraphMap) => GraphMap;

    constructor(startPoint: Point, endPoint: Point, map: GraphMap) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.map = map;
        this.refreshMap = (n, m) => {
            return m;
        }
    }

    private checkInSet(p: Point, set: State[]): boolean {
        for (let i = 0; i < set.length; i++) {
            if (set[i].getPoint().equals(p)) {
                return true;
            }
        }
        return false;
    }
    public setRefreshMap(callback: (newPoint: Point, map: GraphMap) => GraphMap) {
        this.refreshMap = callback;
    }

    private calculateCost(p: Point, map: GraphMap): number {
        // let dis2 = (p.getX() - this.endPoint.getX()) ** 2 + (p.getY() - this.endPoint.getY()) ** 2;
        // let dis = dis2 ** 0.5;

        return map.pointValue(p);
    }
    private pickInOpenSet(openSet: State[]): number {
        if (openSet.length < 1) {
            return -1;
        }
        if (openSet.length == 1) {
            return 0;
        }
        let minCost = openSet[0].getCost();
        let index = 0
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].getCost() < minCost) {
                minCost = openSet[i].getCost();
                index = i;
            }
        }

        //find
        return index;
    }

    public search(): Point[] | undefined {
        //初始化openSet和closeSet
        let startState = new State(this.map, this.startPoint);
        let openSet = [startState];
        let closeSet = [];

        // let index = 0;
        while (openSet.length != 0) {
            // index++;
            // if (index > 10) {
            //     return undefined;
            // }

            let stateIndex = this.pickInOpenSet(openSet);
            let state = openSet[stateIndex];
            if (stateIndex > -1) {
                openSet.splice(stateIndex, 1);
            }
            if (!state) {
                return undefined;
            }
            if (state.getPoint().equals(this.endPoint)) {
                //达到终点
                let res: Point[] = [state.getPoint()]
                let curState: State | null;
                curState = state;
                while (curState != null) {
                    curState = curState.getParent();
                    if (curState != null) {
                        res.unshift(curState.getPoint());
                    }
                }

                return res;
            }
            if (!this.checkInSet(state.getPoint(), closeSet)) {
                closeSet.push(state);
            }
            //遍历周围的点
            let aroundPoints = state.getAround();
            for (let i = 0; i < aroundPoints.length; i++) {
                //检查closeSet
                let inCloseSet = this.checkInSet(aroundPoints[i], closeSet);
                if (inCloseSet) {

                    //该点在closeSet里
                    continue
                } else {
                    //该点不在closeSet里
                    //创建state，插入open_set

                    //创建地图
                    let newMap = state.getMap().clone();
                    //TODO:更新地图
                    newMap = this.refreshMap(state.getPoint(), newMap);

                    //计算损耗
                    let newPoint = aroundPoints[i];
                    let cost = this.calculateCost(newPoint, newMap);
                    let newState = new State(newMap, newPoint, state, state.getCost() + cost);

                    openSet.push(newState);
                }
            }
        }

        console.log("查找不到路径");
        return undefined;
    }
}