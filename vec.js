const vec = {};

//subtract vectors in order given, e.g. v1 - v2 - v3 = sub(v1, v2, v3);
vec.sub = function(...vs) {
  const u = vs[0];
  if (vs.length == 1) {
    return u;
  }
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
  const ip = this.innerProduct(u, u);
  if (ip == 0) {
    return u;
  }
  return this.scale(1 / Math.sqrt(ip), u);
}

vec.innerProduct = function(u, v) {
  console.log(u, v)
  assert(u.length == v.length, "Vectors have different lengths");
  let sum = 0;
  for (let i = 0; i < u.length; i++) {
    sum += u[i] * v[i];
  }
  return sum;
}

//projection of v onto u
vec.proj = function(u, v) {
  const uu = this.innerProduct(u, u);
  if (uu == 0) {
    // u is the zero vector! I think this is okay:
    // https://math.stackexchange.com/questions/1486897/projecton-of-a-zero-vector-onto-itself-yields
    return u; 
  }
  const uv = this.innerProduct(u, v);
  return this.scale(uv / uu, u);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = vec;