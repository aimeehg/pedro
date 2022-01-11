// Importing the Required Modules
const fs = require('fs');
const readline = require('readline');
const mat = [];

// Creating a readable stream from file
// readline module reads line by line
// but from a readable stream only.
const file = readline.createInterface({
  input: fs.createReadStream('data.txt'),
  terminal: false,
});

// Printing the content of file line by
//  line to console by listening on the
// line event which will triggered
// whenever a new line is read from
// the stream
file
  .on('line', (line) => {
    const array = line.split(' ');
    mat.push(array.map((e) => parseInt(e)));
  })
  .on('close', () => {
    matrixRotation(mat, 40);
  });

function ringMove(matrix, superIndex, increments, m, n) {
  let aux = matrix[superIndex + 1][superIndex];
  let next = matrix[superIndex][superIndex];
  let i = superIndex;
  let j = superIndex;
  let limitM = m - increments;
  let limitN = n - increments;
  limitM = superIndex < limitM ? limitM : limitM + increments;
  limitN = superIndex < limitN ? limitN : limitN + increments;
  for (i = superIndex; i < limitM; i++) {
    aux = matrix[i + 1][superIndex];
    matrix[i + 1][superIndex] = next;
    next = aux;
  }
  for (j = superIndex; j < limitN; j++) {
    aux = matrix[i][j + 1];
    matrix[i][j + 1] = next;
    next = aux;
  }
  for (i = i; i > superIndex; i--) {
    aux = matrix[i - 1][j];
    matrix[i - 1][j] = next;
    next = aux;
  }
  for (j = j; j > superIndex; j--) {
    aux = matrix[superIndex][j - 1];
    matrix[superIndex][j - 1] = next;
    next = aux;
  }
}

function matrixRotation(matrix, r) {
  // Write your code here
  const m = matrix.length;
  const n = matrix[0].length;
  const total = m * n;
  let m2 = m;
  let n2 = n;
  let superIndex = 0;
  let increments = 1;
  const minor = m > n ? m : n;
  for (let x = 0; x < Math.floor(minor / 2); x++) {
    const ringSum = 2 * m2 + 2 * n2 - 4;
    for (let y = 0; y < r % ringSum; y++) {
      ringMove(matrix, superIndex, increments, m2, n2);
    }
    superIndex++;
    increments++;
    m2 -= 2;
    n2 -= 2;
  }

  matrix.forEach((row) => {
    let result = row.reduce((prev, next) => prev + `${next} `, '');
    console.log(result);
  });
}
