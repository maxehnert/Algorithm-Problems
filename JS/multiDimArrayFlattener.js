const arr =  [[[0, {a:'a'}], [1]], [[2], [3, false], ['123', ['456', 789]]], [[4], [5, ['wer', 'c']]]];

const masterFlatter = (arr) => {
  let flatArr = [];

  const flatten = (arr) => {
    return arr.map(v => {
      return Array.isArray(v) ? flatten(v) : flatArr.push(v);
    });
  };

  flatten(arr);

  console.log(flatArr);
  return flatArr;
};

masterFlatter(arr);
