import Point from "../common/Point";

export default class Snake {
    private body: Point[];

    constructor(body: Point[]) {
        if (body.length < 1) {
            throw new Error("body is null");
        }
        this.body = body;
    }

    public move(newPoint: Point): boolean {
        if (this.getHead().around(newPoint)) {
            this.body.unshift(newPoint);
            this.body.pop();
            return true;
        }
        return false;
    }

    public eat(newPoint: Point): boolean {
        if (this.getHead().around(newPoint)) {
            this.body.unshift(newPoint);
            return true;
        }
        return false;
    }

    public isEatSelf(): boolean {
        for (let i = 0; i < this.body.length; i++) {
            for (let j = i + 1; j < this.body.length; j++) {
                if (this.body[i].equals(this.body[j])) {
                    return true;
                }
            }
        }

        return false;
    }

    public getBody(): Point[] {
        return this.body;
    }
    public getHead(): Point {
        return this.body[0];
    }

    clone(): Snake {
        let body = this.getBody();
        let newBody = [];
        for (let i = 0; i < body.length; i++) {
            newBody.push(body[i]);
        }
        return new Snake(newBody);
    }
}