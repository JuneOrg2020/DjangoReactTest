import { getJwtHeader } from './common';
import { actions } from '../reducers/inputDataReducer';

export const inputSearch = (searchWord) => (
  fetch('/api/info/search/info/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
      Authorization: getJwtHeader(),
    },
    body: JSON.stringify({
      searchWord,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error();
      }
      return res.json();
    })
    .then((json) => json)
    .catch((err) => {
      console.log(err);
    })
);
