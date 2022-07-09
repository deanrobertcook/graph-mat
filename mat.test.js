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

const sing33 = [
  [1, 1, 1], 
  [1, 2, 3], 
  [2, 3, 4]
]

test('Finds determinant using Laplacian expansion', () => {
  expect(mat.detLE(ex2)).toBe(-8);
  expect(mat.detLE(sing33)).toBe(0);
});

test('Finds determinant using LU decomposition', () => {
  expect(mat.detLU(ex2)).toBe(-8);
  console.log(mat.formatMats(mat.LUdec(sing33)));
  expect(mat.detLU(sing33)).toBe(0);
});

test('Test inner product of two vectors', () => {
  expect(mat.innerProduct([1, 1, 1], [1, 1, 1])).toBe(3);
});

test('Test subtracting two vectors', () => {
  expect(mat.vSub([1, 1, 1], [1, 1, 1])).toStrictEqual([0, 0, 0]);
});