import PathSearch from "../ai/PathSearch";
import GraphMap from "../common/GraphMap";
import Point from "../common/Point";
import Apple from "./Apple";
import GameGraph from "./GameGraph";
import Snake from "./Snake";

export default class World {
    static readonly APPLE_MAP_VALUE = 1;
    static readonly SNAKE_MAP_VALUE = 50000;

    private snake: Snake;
    private apple: Apple;
    private map: GraphMap;

    private intervalId: NodeJS.Timeout | undefined;

    private rerender: (map: GraphMap) => void;

    constructor(snake: Snake, apple: Apple, map: GraphMap) {
        this.snake = snake;
        this.apple = apple;
        this.map = map;
        this.renderMap();

        this.rerender = () => { }
    }

    public async start() {
        while (true) {
            this.playGame();
            await this.sleep(200);
        }
    }

    public setRender(rerender: (map: GraphMap) => void) {
        this.rerender = rerender;
    }

    public getMap() {
        return this.map;
    }
    sleep = async function (ms: number) {
        return new Promise((res, rej) => {
            setTimeout(res, ms)
        })
    }

    private async playGame() {
        //AI寻路
        let nextPoints = this.calcNavigation();
        //AI无路可走
        nextPoints?.shift();
        if (nextPoints == undefined) {
            alert("AI已无路可走");
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            return;
        }
        for (let i = 0; i < nextPoints.length; i++) {
            let isDead = this.updateState(nextPoints[i]);
            this.rerender(this.map);
            if (isDead) {
                alert("你死了");
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                return;
            }
            await this.sleep(1000);
        }
    }
    private updateState(newPoint: Point): boolean {
        //苹果检查
        if (!newPoint.equals(this.apple.getPosition())) {
            //移动蛇头
            this.snake.move(newPoint);
        } else {
            //吃苹果
            let ret = this.snake.eat(newPoint);
            if (ret) {
                //若吃到苹果，则刷新苹果
                this.apple = this.randApple();
            }
        }
        //更新Map
        this.renderMap();

        //合法性检查
        return this.gameCheck();
    }

    private renderMap() {
        this.map.reset();
        this.map.setPointValue(this.apple.getPosition(), World.APPLE_MAP_VALUE);
        this.map.setPointsValue(this.snake.getBody(), World.SNAKE_MAP_VALUE);
    }

    private calcNavigation(): Point[] | undefined {
        //启动AI寻路功能
        let ai = new PathSearch(this.snake.getHead(), this.apple.getPosition(), this.map);
        //配置地图更新函数
        //用于蛇每次移动时，地图实时更新
        ai.setRefreshMap((point, newMap) => {
            //创建新的蛇身体
            let virtualSnake = this.snake.clone();
            virtualSnake.move(point);
            newMap.setPointsValue(virtualSnake.getBody(), World.SNAKE_MAP_VALUE);

            return newMap;
        })
        return ai.search();
    }
    private gameCheck(): boolean {
        //检查蛇是否咬到自己
        let ret = this.snake.isEatSelf();
        //咬到自己，结束
        if (ret) {
            return ret;
        }

        //检查蛇是否咬到边界
        ret = this.map.isPointInMap(this.snake.getHead());
        //咬到边框，结束
        if (!ret) {
            return true;
        }

        return false;
    }

    private randApple(): Apple {
        let points: Point[] = [];

        this.map.foreachValue((y, x, v) => {
            if (v == 0) {
                points.push(new Point(x, y));
            }
        })
        let offset = Math.floor(Math.random() * (points.length))

        return new Apple(points[offset]);
    }
}