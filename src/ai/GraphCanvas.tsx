import React, { useState, useEffect, useRef } from 'react';
import Graph from './Graph';
import GraphMap from '../common/GraphMap';
import PathSearch from './PathSearch';
import Point from '../common/Point';

const size = 750;
function GraphCanvas() {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    let startPoint = new Point(0, 0);
    let endPoint = new Point(11, 1);
    let map = new GraphMap(12);

    let search = new PathSearch(startPoint, endPoint, map);

    let points = search.search();
    let graph: Graph;

    useEffect(() => {
        const element = canvas.current;
        if (element != null) {
            const ctx = element.getContext('2d');
            graph = new Graph(size, ctx);
            if (points != undefined) {
                graph.drawMap(map, points, [startPoint, endPoint]);
            }
        }
    }, []);
    return (
        <div>
            <canvas ref={canvas} width={size} height={size}></canvas>
        </div>);
}

export default GraphCanvas;
