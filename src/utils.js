const searchParams = (history, [key, value], remove = false) => {
  let searchQuery = urlParams(history.location.search);
  searchQuery.set(key, value);
  if (remove) {
    searchQuery.delete(remove);
  }
  return `?${searchQuery.toString()}`;
};

const displayTotal = num => new Intl.NumberFormat('ru-RU', {style: 'decimal'}).format(num);
const urlParams = args => new URLSearchParams(args);

export {
  displayTotal,
  searchParams,
  urlParams
};
