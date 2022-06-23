import {mat} from './mat.js'
const graph = {};
//Indexing consistency: any interface interactions are 1-based indicies, 
//convert ASAP into 0-based indicies for doing computations.

graph.Graph = class {
  
  constructor(adjList) {
    for (let i = 0; i < adjList.length; i++) {
      const edges = adjList[i];
      adjList[i] = edges.sort();
    }
    this.adjList = adjList;
  }

  degMat() {
    if (!this.memDegMat) {
      this.memDegMat = mat.diag(this.adjList.map(edges => edges.length));
    }
    return this.memDegMat;
  }

  adjMat() {
    if (!this.memAdjMat) {
      const A = mat.zero(this.adjList.length);
      for (let i = 0; i < this.adjList.length; i++) {
        const edges = this.adjList[i];
        for (let j = 0; j < edges.length; j++) {
          const edge = edges[j];
          A[i][edge - 1] = 1; //edges descriptions are 1-indexed!
        }
      }
      this.memAdjMat = A;
    }
    return this.memAdjMat;
  }

  lapMat() {
    if (!this.memLapMat) {
      this.memLapMat = mat.sub(this.degMat(), this.adjMat());
    }
    return this.memLapMat;
  }
}

let triangle;
graph.triangle = function() {
  if (!triangle) {
    triangle = new this.Graph([[2, 3], [1, 3], [1, 2]]);
  }
  return triangle;
}

graph.add = function(A, B) {
  const C = [];
  for (let r = 0; r < A.length; r++) {
    C.push([]);
    for (let c = 0; c < A[0].length; c++) {
      const arc = assertCell(A, r, c);
      const brc = assertCell(B, r, c);
      C[r].push(arc + brc);
    }
  }
  return C;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Quick and dirty testing:
// console.log(mat.add(
//   [[1, 3, 2], [1, 1, 3]], 
//   [[1, 1, 1], [1, 1, 1]]
// ));

// console.log(mat.mult(
//   [[1, 2, 3], [1, 1, 3]], 
//   [[1, 1], [1, 1], [1, 3]]
// ));

// console.log(mat.id(5));
  
// console.log(mat.tran(
//   [[1, 2, 3], [1, 1, 3], [7, 2, 1]]
// ))

export {graph};