// Получаем данные от сервера
const URL_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://26.javascript.pages.academy/keksobooking';

export const getData = (onSuccess, onError) => {
  fetch(URL_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err.message);
    });
};

export const sendData = (onSuccess, onError, body) => {
  fetch(URL_SEND, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};
