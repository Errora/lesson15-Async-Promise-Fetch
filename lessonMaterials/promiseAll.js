// Promise.all возвращает промис fulfilled, когда все промисы внутри будут выполнены успешно и rejected или хотя бы один будет выполнен неуспешно
// при этом после первого промиса rejected остальные учитываться не будут и управление перейдет в блок catch
// Promise.all([
//   new Promise(),
//   new Promise(),
//   new Promise(),
// ])

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const todosIds = [43, 10, 5, 100, 101];
const dataContainer = document.querySelector('#data-container');

const createTodoElement = (text) => {
  const todoElement = document.createElement('li');
  const todoElementAnchor = document.createElement('a');
  todoElementAnchor.href = '#';
  todoElementAnchor.textContent = text;
  todoElement.append(todoElementAnchor);

  return todoElement;
}

const getTodosByIds = (ids) => {
  const requests = ids.map((id) => fetch(`${TODOS_URL}/${id}`));
  Promise.all(requests)
    .then((responses) => {
      console.log(responses);
      const dataResults = responses.map((response) => response.json());
      console.log(dataResults);
      return Promise.all(dataResults);
    })
    .then((todos) => {
      console.log('todos', todos);
      todos.forEach((todo) => {
        const todoHtml = createTodoElement(todo.title);
        dataContainer.append(todoHtml);
      })
    })
    .catch((error) => {
      console.log(error);
    })
};

getTodosByIds(todosIds);