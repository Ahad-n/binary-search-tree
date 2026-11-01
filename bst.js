import { merge_sort } from "./merge_sort.js";

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function Tree(arr) {
  arr = merge_sort(arr);

  // remove duplicates
  arr = arr.filter((el, i, arr) => el !== arr[i + 1]);

  const buildTreeRecur = function (arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = buildTreeRecur(arr, start, mid - 1);
    root.right = buildTreeRecur(arr, mid + 1, arr.length - 1);

    return root;
  };

  const buildTree = function (arr) {
    return buildTreeRecur(arr, 0, arr.length - 1);
  };

  let root = buildTree(arr);
  const includes = function (value) {
    if (!root) return false;
    if (value === root.value) return true;
    if (value < root.value) return includes(root.left);
    else return includes(root.right);
  };

  const insert = function (value) {
    let current = root;
    while (true) {
      // skip if value is dubpicated
      if (value === current.value) return;

      // search left
      if (value < current.value) {
        if (!current.left) {
          current.left = new Node(value);
          return;
        } else current = current.left;
      }

      // search right
      else {
        if (!current.right) {
          current.right = new Node(value);
          return;
        } else current = current.right;
      }
    }
  };

  function deleteParent(node) {
    // has right and left children
    let current;
    const left = node.left;
    const right = node.right;
    if (left && right) {
      current = node.left;
      let parent = node;
      while (current.right) {
        parent = current;
        current = current.right;
      }
      current.value = node.value;
      parent.left = current.left;
    }

    // has only one child
    else if (left) {
      node.value = left.value;
      node.left = left.left;
      node.right = right.right;
    } else if (right) {
      node.value = right.value;
      node.left = right.left;
      node.right = right.right;
    }

    // has no children
    return;
  }

  const deleteItem = function (value) {
    let current = root;

    // if root node is to be deleted
    if (root.value === value) {
      if (root.right || root.right) {
        deleteParent(root);
        return value;
      }
      root.value = null;
      return value;
    }

    while (current) {
      let left = current.left;
      let right = current.right;

      if (value < current.value) {
        if (value === left.value) {
          // has children
          if (left.left || right.right) deleteParent(left);
          else current.left = null;
          return;
        } else current = left;
      } else {
        if (value === right.value) {
          // has children;
          if (right.left || right.right) deleteParent(right);
          else current.right = null;
          return;
        } else current = right;
      }

      // node not found
      return;
    }
  };

  const levelOrderForEach = function (callback = null) {
    if (!callback) throw new Error("Callback function requried.");

    let current = root;
    const queue = [];
    const values = [];

    while (current) {
      values.push(current.value);

      let left = current.left;
      let right = current.right;

      if (left) queue.push(left);
      if (right) queue.push(right);
      if (queue.length) current = queue.shift();
    }

    if (values.length) values.forEach(callback);
    return;
  };

  function inOrderArr(node) {
    let left = node.left;
    let right = node.right;
    let leftArr = [];
    let rightArr = [];

    if (!(left || right)) {
      return new Array().push(node.value);
    } else if (left) leftArr = inOrderArr(left);
    else if (right) rightArr = inOrderArr(right);

    return [...leftArr, node.value, ...rightArr];
  }

  const inOrderForEach = function (callback = null) {
    if (!callback) throw new Error("Callback function requried.");

    const arr = inOrderArr(root);
    arr.forEach(callback);
  };

  const depth = function (value) {
    let current = root;
    let height = 0;

    while (current) {
      height++;
      let left = current.left;
      let right = current.right;

      if (current.value === value) {
        return height;
      } else if (value < current.value && left) current = left;
      else if (right) current = right;
    }

    return;
  };

  function findHeight(node) {
    let left = node.left;
    let right = node.right;
    let leftHieght = 0;
    let rightHeight = 0;

    if (!(left || right)) return 0;
    if (left) leftHieght = findHeight(left) + 1;
    if (right) rightHeight = findHeight(right) + 1;

    return leftHieght > rightHeight ? leftHieght : rightHeight;
  }

  const height = function (value) {
    // find the node
    let current = root;

    while (current) {
      height++;
      let left = current.left;
      let right = current.right;

      if (current.value === value) {
        break;
      } else if (value < current.value && left) current = left;
      else if (right) current = right;
    }

    if (current === root) return;

    // find height of node
    return findHeight(current);
  };

  const rebalance = function () {
    root = buildTree(inOrderArr(root));
  };

  return {
    buildTree,
    includes,
    insert,
    deleteItem,
    levelOrderForEach,
    inOrderForEach,
    height,
    depth,
    rebalance,
  };
}

// export function
export { Tree };
