expect.extend({
  matrixIsEqualTo(A, B, eps = Number.EPSILON) {
    //TODO - handle .not case
    //https://jestjs.io/docs/expect#custom-matchers-api
    
    let pass = true;
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A[0].length; j++) {
        if (!numbersEqual(A[i][j], B[i][j], eps)) {
          pass = false
        }
      }  
    }

    return {
      pass: pass,
      message: () => `Matrices not equal`,
    };
  },
});

function numbersEqual(a, b, eps = Number.EPSILON) {
  const MIN_NORM = Math.pow(2, -1022); //See Java Double.MIN_NORMAL
  const absA = Math.abs(a);
  const absB = Math.abs(b);
  const diff = (Math.abs(a) - Math.abs(b));
  if (a == b) { //handle infinities and obvious cases
    return true
  } else if (a == 0 || b == 0 || (absA + absB < MIN_NORM)) { // a or b is zero or both are extremely close to it
    return diff < (eps * MIN_NORM)
  } else { // use relative error
    return diff / Math.min((absA + absB), Number.MAX_VALUE) < eps;
  }
}