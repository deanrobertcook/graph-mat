const vec = {};

vec.sub = function(u, v) {
  assert(u.length == v.length, "Vectors have different lengths");
  let w = [];
  for (let i = 0; i < u.length; i++) {
    w.push(u[i] - v[i]);
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