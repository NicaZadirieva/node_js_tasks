function getItemsDeletedBy3(arr) {
  return arr.filter((num) => num % 3 === 0).length;
}

module.exports = { getItemsDeletedBy3 };
