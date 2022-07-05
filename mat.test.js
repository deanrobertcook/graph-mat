const mat = require('./mat');

const ex1 = [
  //taken from Strang's linear algebra course (video 8?)
  [1, 2, 2, 2],
  [2, 4, 6, 8],
  [3, 6, 8, 10],
];

const ex2 = [
  [3, 1, -1], 
  [1, -1, 1], 
  [2, 1, 1]
];

test('Finds determinant using Laplacian expansion', () => {
  expect(mat.detLE(ex2)).toBe(-8);
});

test('Finds determinant using LU decomposition', () => {
  expect(mat.detLU(ex2)).toBe(-8);
});