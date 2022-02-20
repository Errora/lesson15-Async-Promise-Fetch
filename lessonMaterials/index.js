// Синхронный код

// const numberOfElements = 50;
// console.log('Начало цикла');
// for (let i = 0; i < numberOfElements; i++) {
//   console.log('i = ', i);
// }
// console.log('Конец цикла');

// Асинхронный код
//
// const developer = {
//   name: 'Maxim',
//   isJSDev: true,
// };
//
// // setTimeout вызовет функцию колбэк один раз через указанное время
//
// setTimeout(() => {
//   console.log('setTimeout');
// }, 3000)
//
// console.log(developer);
//
// // setInterval будет вызывать функцию колбэк каждый раз через указанный интервал времени
//
// setInterval(() => {
//   console.log('setInterval');
// }, 1000)

// // Статусы промиса:
// // pending
// // fulfilled
// // rejected
//
//
// const developer = {
//   name: 'Maxim',
//   isJSDev: true,
// };
//
// const promise = new Promise((resolve, reject) => {
//   if (developer.isJSDev) {
//     setTimeout(() => {
//       resolve(`${developer.name} является js разработчиком`);
//     }, 3000)
//   } else {
//     reject(`${developer.name} не является js разработчиком`)
//   }
// });
//
// console.log(promise);
//
// // Далее промис необходимо обработать с помощью трех методов:
// // then - выполняется, когда выполняется resolve
// // catch - обрабатывает ошибку, если промис выполнился с reject
// // finally - вызывается в последнюю очередь вне зависимости от того, как отработал промис: с resolve или с reject
//
// promise
//   .then((successMessage) => {
//     console.log('successMessage', successMessage);
//   })
//   .catch((error)  => {
//     console.log('error', error);
//   })
//   .finally(() => {
//     console.log('finally');
//   })

// fetch - это специальная функция, с помощью которой можно получать данные по url

// fetch(url);

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const createTodoElement = (text) => {
  const todoElement = document.createElement('li');
  const todoElementAnchor = document.createElement('a');
  todoElementAnchor.href = '#';
  todoElementAnchor.textContent = text;
  todoElement.append(todoElementAnchor);

  return todoElement;
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

const getAllTodos = () => {
  toggleLoader();
  const result = fetch(TODOS_URL, {
    method: 'GET'
  });
  console.log('result ', result);

  result
    .then((response) => {
      console.log('response', response);
      // throw сразу перейдет к блоку catch
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      return response.json();  // так же можно декодировать в другие форматы, например, в .text()
    })
    .then((todos) => {
      console.log(todos);
      todos.forEach((todo) => {
        const todoHtml = createTodoElement(todo.title);
        dataContainer.append(todoHtml);
      })
    })
    .catch((error) => {
      console.log('error', error);
    })
    .finally(() => {
      toggleLoader();
    })
}

getAllTodos();
