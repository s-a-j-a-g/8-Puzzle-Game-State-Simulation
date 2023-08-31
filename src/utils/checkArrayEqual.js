const checkArrayEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i].length !== array2[i].length) {
      return false;
    }

    for (let j = 0; j < array1[i].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        return false;
      }
    }
  }

  return true;
};

export default checkArrayEqual;
