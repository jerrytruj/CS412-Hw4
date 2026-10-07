// cube
const positions = new Float32Array([
  -1, -1, -1,  // 0
   1, -1, -1,  // 1
   1,  1, -1,  // 2
  -1,  1, -1,  // 3
  -1, -1,  1,  // 4
   1, -1,  1,  // 5
   1,  1,  1,  // 6
  -1,  1,  1   // 7
]);

const colors = new Float32Array([
  0.75,0.77,0.80,  0.75,0.77,0.80,  0.75,0.77,0.80,  0.75,0.77,0.80,
  0.75,0.77,0.80,  0.75,0.77,0.80,  0.75,0.77,0.80,  0.75,0.77,0.80
]);

const indices = new Uint16Array([
  // Front
  4, 5, 6,   4, 6, 7,
  // Back
  1, 0, 3,   1, 3, 2,
  // Top
  3, 7, 6,   3, 6, 2,
  // Bottom
  0, 1, 5,   0, 5, 4,
  // Right
  1, 2, 6,   1, 6, 5,
  // Left
  0, 4, 7,   0, 7, 3,
]);

function generateSphere(r, vSteps, uSteps) {
  const positions = [];
  const colors = [];
  const indices = [];

  for (let i = 0; i <= vSteps; i++) {
    const v = i * Math.PI / vSteps;
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);

    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const sinu = Math.sin(u);
      const cosu = Math.cos(u);

      const x = cosu * sinv;
      const y = cosv;
      const z = sinu * sinv;

      positions.push(r * x, r * y, r * z);
      colors.push(0.75, 0.77, 0.80);
    }
  }

  const cols = uSteps + 1;
  for (let i = 0; i < vSteps; i++) {
    for (let j = 0; j < uSteps; j++) {
      const k1 = (i * cols) + j;
      const k2 = k1 + cols;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}

function generateCylinder(r, height, uSteps) {
  const positions = [];
  const colors = [];
  const indices = [];
  const halfHeight = height / 2;

  const ringHeights = [-halfHeight, halfHeight];

  for (let ring = 0; ring < 2; ring++) {
    const y = ringHeights[ring];

    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const x = r * Math.cos(u);
      const z = r * Math.sin(u);

      positions.push(x, y, z);
      colors.push(0.35, 0.38, 0.42);
    }
  }

  const cols = uSteps + 1;
  for (let j = 0; j < uSteps; j++) {
    const k1 = j;
    const k2 = k1 + cols;
    indices.push(k1, k2, k1 + 1);
    indices.push(k2, k2 + 1, k1 + 1);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}