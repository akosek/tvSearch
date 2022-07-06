export const getShowsByKey = (key) => {
  return fetch(
    `https://api.tvmaze.com/search/shows?q=${key}`
  ).then((response) => response.json());
};

// export const getShowById = (id) => {
//   return fetch(`https://api.tvmaze.com/search/shows/${id}`).then((response) =>
//     response.json()
//   );
// };

export const getShowById = (id) => {
  return fetch(`http://api.tvmaze.com/shows/${id}?embed=cast`).then((resp) =>
    resp.json()
  );
};
