import React, { useState, useEffect, useRef } from 'react';
import GraphMap from '../common/GraphMap';
import Point from '../common/Point';
import Apple from './Apple';
import GameGraph from './GameGraph';
import Snake from './Snake';
import World from './World';

const size = 750;
function Game() {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    let graph: GameGraph

    let map = new GraphMap(10);
    let snake = new Snake([new Point(1, 1), new Point(0, 1), new Point(0, 0)]);
    let apple = new Apple(new Point(5, 5));

    let world = new World(snake, apple, map);

    useEffect(() => {
        const element = canvas.current;
        if (element != null) {
            const ctx = element.getContext('2d');
            graph = new GameGraph(size, ctx);
            graph.drawMap(world.getMap());
            world.setRender((map: GraphMap) => {
                graph.drawMap(map);
            })
            world.start();
        }
    }, []);
    return (
        <div>
            <canvas ref={canvas} width={size} height={size}></canvas>
        </div>);
}

export default Game;
