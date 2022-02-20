const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const createUserElement = (name) => {
  const userElement = document.createElement('li');
  const userElementAnchor = document.createElement('a');
  userElementAnchor.href = '#';
  userElementAnchor.textContent = name;
  userElement.append(userElementAnchor);

  return userElement;
}

const toggleLoader = () => {
  const loaderHtml = document.querySelector('#loader');
  const isHidden = loaderHtml.hasAttribute('hidden');
  if (isHidden) {
    loaderHtml.removeAttribute('hidden');
  } else {
    loaderHtml.setAttribute('hidden', '');
  }
}

const dataContainer = document.querySelector('#data-container');

const getAllUsers = () => {
  toggleLoader();
  const result = fetch(USERS_URL, {
    method: 'GET'
  });

  result
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      return response.json();
    })
    .then((users) => {
      console.log(users);
      users.forEach((user) => {
        const userHtml = createUserElement(user.name);
        dataContainer.append(userHtml);
      })
    })
    .catch((error) => {
      console.log('error', error);
    })
    .finally(() => {
      toggleLoader();
    })
}

getAllUsers();