import GraphMap from '../common/GraphMap';
import PathSearch from './PathSearch';
import Point from '../common/Point';
import Graph from './Graph';

let map = new GraphMap(10);
let search = new PathSearch(new Point(0, 0), new Point(6, 8), map);

let points = search.search();
if (points)
    points.forEach(point => {
        console.log(point.toString());
    })
