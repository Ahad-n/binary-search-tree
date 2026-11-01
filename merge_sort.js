function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let len1 = arr1.length;
  let len2 = arr2.length;
  let merged = [];

  while (i < len1 && j < len2) {
    const el1 = arr1[i];
    const el2 = arr2[j];

    if (el1 < el2) {
      merged.push(el1);
      i++;
    } else {
      merged.push(el2);
      j++;
    }
  }

  // remove sorted elements
  arr1 = arr1.toSpliced(0, i);
  arr2 = arr2.toSpliced(0, j);

  return [...merged, ...arr1, ...arr2];
}
const merge_sort = function (arr) {
  const len = arr.length;
  const half = Math.trunc(len / 2);

  if (len <= 1) {
    return arr;
  }

  const right = arr.toSpliced(0, half);
  const left = arr.toSpliced(half);

  return merge(merge_sort(left), merge_sort(right));
};

export { merge_sort };
