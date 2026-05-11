const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getData = () =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/data`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (e) {
          reject(new Error('Не удалось загрузить данные'));
        }
      } else {
        reject(new Error('Не удалось загрузить данные'));
      }
    });
    xhr.addEventListener('error', () => {
      reject(new Error('Не удалось загрузить данные'));
    });
    xhr.send();
  });

const sendData = (formData) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${BASE_URL}/`);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.response);
          if (data.error) {
            reject(new Error('Не удалось отправить данные'));
          } else {
            resolve(data);
          }
        } catch (e) {
          reject(new Error('Не удалось отправить данные'));
        }
      } else {
        reject(new Error('Не удалось отправить данные'));
      }
    });
    xhr.addEventListener('error', () => {
      reject(new Error('Не удалось отправить данные'));
    });
    xhr.send(formData);
  });

export { getData, sendData };
