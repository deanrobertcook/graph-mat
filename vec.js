const vec = {};

//subtract vectors in order given, e.g. v1 - v2 - v3 = sub(v1, v2, v3);
vec.sub = function(...vs) {
  const u = vs[0];
  let w = [];
  for (let i = 0; i < u.length; i++) {
    let sum = u[i];
    for (let j = 1; j < vs.length; j++) {
      assert(u.length == vs[j].length, "Vectors have different lengths");    
      sum -= vs[j][i];
    }
    w.push(sum);
  }
  return w;
}

vec.scale = function(s, u) {
  let v = [];
  for (let i = 0; i < u.length; i++) {
    v.push(s * u[i]);
  }
  return v;
}

vec.norm = function(u) {
  return this.scale(1 / Math.sqrt(this.innerProduct(u, u)), u);
}

vec.innerProduct = function(u, v) {
  assert(u.length == v.length, "Vectors have different lengths");
  let sum = 0;
  for (let i = 0; i < u.length; i++) {
    sum += u[i] * v[i];
  }
  return sum;
}

//projection of v onto u
vec.proj = function(u, v) {
  const uv = this.innerProduct(u, v);
  const uu = this.innerProduct(u, u);
  return this.scale(uv / uu, u);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = vec;