const mat = {};
//Indexing consistency: any interface interactions are 1-based indicies, 
//convert ASAP into 0-based indicies for doing computations.

//formats a list of matrices for Jest
mat.formatMats = function(mats) {
  return mats.map(M => mat.format(M)).join('\n\n');
}

//Based off of:
//https://gist.github.com/lbn/3d6963731261f76330af
mat.format = function (A) {
  function col(i) {
    return A.map(row => row[i]);
  }
  
  let colMaxes = [];
  for (let i = 0; i < A[0].length; i++) {
    colMaxes.push(Math.max(...col(i).map(n => n.toString().length)));
  }

  return A.map(row => {
    return row.map((val, j) => {
      return new Array(colMaxes[j] - val.toString().length + 1).join(" ") + val.toString();
    }).join(' ');
  }).join('\n');
}

//O(n^2)
mat.copy = function(A) {
  let C = this.zero(A.length);
  for (let r = 0; r < A.length; r++) {
    for (let c = 0; c < A[0].length; c++) {
      C[r][c] = A[r][c];
    }
  }
  return C;
}

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

mat.diagOf = function(A) {
  const vec = [];
  for (let i = 0; i < A.length; i++) {
     vec[i] = A[i][i];
  }
  return vec;
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

// For A=m*n, B=n*p, O(m*n*p). For square matrices, O(n^3)
mat.mult = function(A, B) {
  assert(A[0].length == B.length, "Inner dimmensions do not match")
  const leftDim = A.length;
  const innerDim = A[0].length;
  const rightDim = B[0].length;

  const C = [];
  for (let r = 0; r < leftDim; r++) {
    C.push([]);
    for (let c = 0; c < rightDim; c++) {
      let sum = 0;
      for (let i = 0; i < innerDim; i++) {
        const ari = assertCell(A, r, i);
        const bic = assertCell(B, i, c);
        sum += ari * bic;
      }
      C[r].push(sum);
    }
  }
  return C;
}

/** 
 * O(n^2). 
 * The push ops only make for 2n cell copies (as there are log(n) copies done along the loop).
 * */ 
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

// O(n^2), see mat.id
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

//row permutation matrix
mat.permMat = function(n, i, j) {
  const E = this.id(n);
  i = i - 1;
  j = j - 1;
  E[i][i] = 0;
  E[j][j] = 0;
  E[j][i] = 1;
  E[i][j] = 1;
  return E;
}

/**
 * Counts how many permutations were performed in order to arrive at the given 
 * permutation matrix P. Does so by counting 1s in the main diagonal
 */
mat.permCount = function(P) {
  let dim = P.length;
  let sum = 0;
  for (let i = 1; i < dim; i++) {
    sum += P[i][i];
  }
  return dim - sum - 1;
}

//Row operations are not functional, destroy the original matrix!
mat.rowSwitch = function(E, i, j) {
  for (let c = 0; c < E[0].length; c++) {
    const temp = E[i - 1][c];
    E[i - 1][c] = E[j - 1][c];
    E[j - 1][c] = temp;
  }
}

//adds m lots of row i to row j
mat.rowAdd = function(E, m, i, j) {
  for (let c = 0; c < E[0].length; c++) {
    E[j - 1][c] = E[j - 1][c] + m * E[i - 1][c];
  }
}

//multiplies row i by scalar s
mat.rowMult = function(E, s, i) {
  for (let c = 0; c < E[0].length; c++) {
    E[i - 1][c] = s * E[i - 1][c];
  }
}

// LU decomposition, assumes square
// naive implementation, currently O(n^4)
mat.LUdec = function(A) {
  const dim = A.length;
  const L = this.id(dim);
  const P = this.id(dim);
  let An = this.copy(A);
  for (let n = 0; n < dim; n++) {
    if (An[n][n] == 0) {
      for (let i = n + 1; i < dim; i++) {
        if (An[i][n] != 0) {
          this.rowSwitch(An, n + 1, i + 1);
          this.rowSwitch(P, n + 1, i + 1);
        }
      }
    }

    if (An[n][n] != 0) {
      const Ln = this.id(dim);
      for (let i = n + 1; i < dim; i++) {
        Ln[i][n] = - An[i][n] / An[n][n];
        L[i][n] = An[i][n] / An[n][n];
      }
      An = this.mult(Ln, An);
    }
  }
  return [this.tran(P), L, An];
}

//Uses LU. Assumes square matrix
mat.detLU = function(A) {
  const [P, _, U] = this.LUdec(A);
  
  const diagU = this.diagOf(U);
  let prod = 1;
  for (let i = 0; i < diagU.length; i++) {
    prod = prod * diagU[i];
  }

  const perms = this.permCount(P); 
  const sign = 1 - 2 * (perms % 2);
  return sign * prod;
}

//Uses Laplacian expansion - will be wildly inefficient, but good for
//understanding. Assumes square matrix
mat.detLE = function(A) {
  if (A.length == 1) {
    return A[0][0];
  }
  let sum = 0;
  //iterate ea. col
  for (let col = 0; col < A[0].length; col++) {
    //create our submatrix
    let S = this.zero(A.length - 1);
    //always use the first row
    for (let i = 0; i < S.length; i ++) {
      for (let j = 0; j < S.length; j ++) {
        if (j < col) {
          S[i][j] = A[i+1][j];
        } else {
          S[i][j] = A[i+1][j+1];
        }
      }
    }
    const minor = this.detLE(S);
    const el = A[0][col];
    const sign = 1 - 2 * (col % 2);
    sum += sign * el * minor;
  }
  return sum;
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

module.exports = mat;