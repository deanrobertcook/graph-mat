const vec = require('./vec');

test('Test subtracting two vectors', () => {
  expect(vec.sub([1, 1, 1], [1, 1, 1])).toStrictEqual([0, 0, 0]);
});

test('Test scaling vector', () => {
  expect(vec.scale(3, [1, 1, 1])).toStrictEqual([3, 3, 3]);
});

test('Test inner product of two vectors', () => {
  expect(vec.innerProduct([1, 1, 1], [1, 1, 1])).toBe(3);
});

test('Test projection', () => {
  expect(vec.proj([1, 1, 1], [2, 2, 2])).toStrictEqual([2, 2, 2]);
  expect(vec.proj([1, 0, 0], [0, 1, 0])).toStrictEqual([0, 0, 0]);
  expect(vec.proj([3, 0], [3, 4])).toStrictEqual([3, 0]);
  expect(vec.proj([0, 3], [3, 4])).toStrictEqual([0, 4]);
});