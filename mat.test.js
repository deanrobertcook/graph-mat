const { formatMats } = require('./mat');
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

//Shows the need for pivoting! 
test.skip('Test rounding errors in LU decomposition', () => {
  const A = [
    [1e-16, -1],
    [1,      1],
  ];
  const [_, L, U] = mat.LUdec(A);
  expect(mat.mult(L, U)).toStrictEqual(A);
});

test('QR decomposition of upper triangular matrix should be I and itself', () => {
  const ex1 = [
      [3, 1, 7],
      [0, 2, 2],
      [0, 0, 1]
    ];

  const [Q1, R1] = mat.QRdec(ex1)
  expect([Q1, R1]).toStrictEqual([mat.id(3), ex1]);
  expect(mat.mult(Q1, R1)).toStrictEqual(ex1);

  const ex2 = [
    [3, 1, 7, 2],
    [0, 2, 2, 1],
    [0, 0, 1, 3],
    [0, 0, 0, 1]
  ];

  const [Q2, R2] = mat.QRdec(ex2)
  expect([Q2, R2]).toStrictEqual([mat.id(4), ex2]);
  expect(mat.mult(Q2, R2)).toStrictEqual(ex2);
});

test('QR decomposition of singular matrix should be?', () => {
  const [Q, R] = mat.QRdec(sing33);
  expect(mat.mult(Q, R)).matrixIsEqualTo(sing33);
});

test.skip("Some gram schmitt stuff", () => {

  // const mu1 = Math.sqrt(6)
  // const nu1 = Math.sqrt(1 / 6);
  // const mu2 = Math.sqrt(2 / 4);
  // const nu2 = Math.sqrt(1 / 2);
  // const mu3 = Math.sqrt(582);
  // const nu3 = Math.sqrt(1 / 582);
  // const Qh = [
  //   [    nu1, - nu2, nu3 * 5],
  //   [    nu1,   nu2, nu3 * 14],
  //   [nu1 * 2,     0, nu3 * 19]
  // ];

  // const Rh = [
  //   [mu1, Math.sqrt(27/2),  2 * Math.sqrt(6)],
  //   [  0,             mu2, Math.sqrt(361/98)],
  //   [  0,               0,               mu3]
  // ];
  // console.log(mat.format(mat.mult(Qh, Rh)));

  // console.log(nu1 * Math.sqrt(27/2), - nu2 * mu2)
})

