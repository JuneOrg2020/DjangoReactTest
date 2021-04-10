export const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getStorage = (key) => localStorage.getItem(key);
export const removeStorage = (key) => localStorage.removeItem(key);

export const locationTo = (link) => {
  window.location.href = link;
};

export const getJwtHeader = () => {
  const value = getStorage('jwt');
  if (value === null) {
    return 'JWT null';
  }
  return `JWT ${value}`;
};

const commonErrorCallback = (err) => {
  console.log(err);
};

export const commonFetch = (fetchOpt) => {
  fetch(fetchOpt.uri, {
    method: fetchOpt.method || 'POST',
    headers: fetchOpt.headers || {
      'Content-Type': 'application/json',
      'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
      Authorization: getJwtHeader(),
    },
    body: fetchOpt.method === 'GET' ? null : JSON.stringify(fetchOpt.body),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error();
      }
      return res.json();
    })
    .then(fetchOpt.successCallback)
    .catch(fetchOpt.errorCallback || commonErrorCallback);
};
