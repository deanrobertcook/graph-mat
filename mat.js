const mat = {};
//Indexing consistency: any interface interactions are 1-based indicies, 
//convert ASAP into 0-based indicies for doing computations.

mat.add = function(A, B) {
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

mat.sub = function(A, B) {
  const C = [];
  for (let r = 0; r < A.length; r++) {
    C.push([]);
    for (let c = 0; c < A[0].length; c++) {
      const arc = assertCell(A, r, c);
      const brc = assertCell(B, r, c);
      C[r].push(arc - brc);
    }
  }
  return C;
}

mat.diag = function(vec) {
  const D = this.id(vec.length);
  for (let i = 0; i < vec.length; i++) {
    D[i][i] = vec[i];
  }
  return D;
}

mat.scale = function(s, A) {
  const B = [];
  for (let r = 0; r < A.length; r++) {
    B.push([]);
    for (let c = 0; c < A[0].length; c++) {
      const arc = assertCell(A, r, c);
      B[r].push(arc * s);
    }
  }
  return B;
}

mat.mult = function(A, B) {
  assert(A[0].length == B.length, "Inner dimmensions do not match")
  const rowsA = A.length;
  const colsA = A[0].length;
  const colsB = B[0].length;

  const C = [];
  for (let r = 0; r < rowsA; r++) {
    C.push([]);
    for (let c = 0; c < colsB; c++) {
      let sum = 0;
      for (let i = 0; i < colsA; i++) {
        const ari = assertCell(A, r, i);
        const bic = assertCell(B, i, c);
        sum += ari * bic;
      }
      C[r].push(sum);
    }
  }
  return C;
}

mat.id = function(n) {
  const I = [];
  for (let r = 0; r < n; r++) {
    I.push([]);
    for (let c = 0; c < n; c++) {
      if (r == c) {
        I[r].push(1);
      } else {
        I[r].push(0);
      }
    }
  }
  return I;
}

mat.zero = function(n) {
  const Z = [];
  for (let r = 0; r < n; r++) {
    Z.push([]);
    for (let c = 0; c < n; c++) {
      Z[r].push(0);
    }
  }
  return Z;
}

mat.tran = function(A) {
  const T = [];
  for (let r = 0; r < A[0].length; r++) {
    T.push([]);
    for (let c = 0; c < A.length; c++) {
      const acr = assertCell(A, c, r);
      T[r].push(acr)
    }
  }
  return T;
}

mat.rowSwitch = function(n, i, j) {
  const E = this.id(n);
  i = i - 1;
  j = j - 1;
  E[i][i] = 0;
  E[j][j] = 0;
  E[j][i] = 1;
  E[i][j] = 1;
  return E;
}

mat.eigenvalues = function(A) {
  // A - lam * I = 0
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertCell(M, r, c) {
  const v = M[r][c];
  assert(v || v == 0, `missing value at ${r+1}, ${c+1}`);
  return v;
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

export {mat};