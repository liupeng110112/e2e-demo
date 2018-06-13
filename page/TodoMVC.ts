import { Page, chain } from "zle";
import TodoApp from "../panel/TodoApp";
import TodoItem from "../panel/TodoItem";

/**
 * 封装一个TodoMVC的页面
 * 默认测试React开发的应用
 * 也可以替换成其他框架的TodoMVC
 */
export default class TodoMVC extends Page {
  static $url = "http://todomvc.com/examples/react/"; // 页面跳转的地址
  static $initialPanels = [TodoApp]; // 页面初始化时需检查的面板

  /** 添加一个待办事项，可链式调用 */
  addTodo(todo: string) {
    return chain(async () => {
      const app = await this.$context.waitFor(TodoApp);
      await app.addTodo(todo);
      return this;
    });
  }

  /** 切换所有当前列表待办事项的完成状态，可链式调用 */
  toggleAllTodos() {
    return chain(async () => {
      const app = await this.$context.waitFor(TodoApp);
      const list = await app.list();
      await list.toggleAll();
      return this;
    });
  }

  /** 获取所有标题匹配给定模式的待办事项，可链式调用 */
  getTodoContains(
    pattern: string,
    cb: (todos: Array<TodoItem>) => Promise<void>
  ) {
    return chain(async () => {
      const todos = new Array<TodoItem>();
      const app = await this.$context.waitFor(TodoApp);
      const list = await app.list();
      for await (let item of list.items()) {
        if ((await item.title()).includes(pattern)) {
          todos.push(item);
        }
      }
      await cb(todos);
      return this;
    });
  }
}
