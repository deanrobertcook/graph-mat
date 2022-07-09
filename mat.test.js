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
];

test('Matrix multiplication', () => {
  expect(mat.mult(
    [
      [1, 2],
      [1, 3],
    ],
    [
      [3, 1],
      [1, 0],
    ]
  )).toStrictEqual(
    [
      [5, 1],
      [6, 1],
    ]
  );
});

test('Finds determinant using Laplacian expansion', () => {
  expect(mat.detLE(ex2)).toBe(-8);
  expect(mat.detLE(sing33)).toBe(0);
});

test('Finds determinant using LU decomposition', () => {
  expect(mat.detLU(ex2)).toBe(-8);
  expect(mat.detLU(sing33)).toBe(0);
});

test('QR decomposition of diagonal matrix should be I', () => {
  expect(mat.QRdec(
    [
      [3, 0, 0],
      [4, 2, 0],
      [8, 1, 1]
    ],
    mat.id(3)
  ));
  expect(mat.QRdec(
    [
      [3, 1, 7],
      [0, 2, 2],
      [0, 0, 1]
    ],
    mat.id(3)
  ));
  expect(mat.QRdec(
    [
      [3, 1, 7, 2],
      [0, 2, 2, 1],
      [0, 0, 1, 3],
      [0, 0, 0, 1]
    ],
    mat.id(4)
  ));
});

test('QR decomposition of singular matrix should be?', () => {
  console.log(mat.format(mat.QRdec(sing33)));
});



