import * as assert from "assert";
import { context } from "zle";
import Host from "../page/App";

test("添加一个待办事项", async () => {
  const host = await context.waitFor(Host)
  await host.openModal().hostSearch('10.1', async (searchHostList) => {
    assert.equal(searchHostList.length, 1)
  })
});

// test("添加多个待办事项", async () => {
//   const todomvc = await context.waitFor(TodoMVC);
//   await todomvc
//     .addTodo("烧鱼") // 添加一个待办事项
//     .addTodo("烧饭") // 添加另一个待办事项
//     .addTodo("读书") // 添加再一个待办事项
//     .getTodoContains("烧", async todos => {
//       assert.equal(todos.length, 2);
//     }) // 检查是否成功添加
//     .getTodoContains("读", async todos => {
//       assert.equal(todos.length, 1);
//     }) // 检查是否成功添加
//     .$done();
// });

// test("改变一个待办事项的完成状态", async () => {
//   const todomvc = await context.waitFor(TodoMVC);
//   await todomvc
//     .addTodo("读书") // 添加一个待办事项
//     .getTodoContains("读", async todos => {
//       await todos[0].toggle(); // 改变刚添加的待办事项的完成状态
//       assert.equal(await todos[0].hasComplete(), true); // 检查是否已完成
//     })
//     .$done();
// });

// test("改变当前列表所有待办事项的完成状态", async () => {
//   const todomvc = await context.waitFor(TodoMVC);
//   await todomvc
//     .addTodo("烧鱼") // 添加一个待办事项
//     .addTodo("烧饭") // 添加另一个待办事项
//     .addTodo("读书") // 添加再一个待办事项
//     .toggleAllTodos() // 切换所有待办事项的完成状态
//     .getTodoContains("", async todos => {
//       for (let todo of todos) {
//         assert.equal(await todo.hasComplete(), true); // 检查每个代办事项是否已完成
//       }
//     })
//     .$done();
// });

// test("删除待办事项", async () => {
//   const todomvc = await context.waitFor(TodoMVC);
//   await todomvc
//     .addTodo("烧鱼") // 添加一个待办事项
//     .addTodo("烧饭") // 添加另一个待办事项
//     .getTodoContains("鱼", async todos => {
//       await todos[0].toggle(); // 改变“烧鱼”待办事项的完成状态，只有已完成的待办事项才能被删除
//       await todos[0].destroy(); // 删除该待办事项
//     })
//     .getTodoContains("烧", async todos => {
//       assert.equal(todos.length, 1); // 可以看到，当前列表只剩下一条待办事项
//       assert.equal(await todos[0].title(), "烧饭"); // 检查刚被删除的待办事项是“烧鱼”
//     })
//     .$done();
// });
