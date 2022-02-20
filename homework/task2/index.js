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
const ids = [5, 6, 2, 1];

const getUsersByIds = (ids) => {
  toggleLoader();
  const requests = ids.map((id) => fetch(`${USERS_URL}/${id}`));
  Promise.all(requests)
    .then((responses) => {
      const dataResults = responses.map((response) => response.json());
      console.log(dataResults);
      return Promise.all(dataResults);
    })
    .then((users) => {
      users.forEach((user) => {
        const userHtml = createUserElement(user.name);
        dataContainer.append(userHtml);
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleLoader();
    })
}

getUsersByIds(ids);