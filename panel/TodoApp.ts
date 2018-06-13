import { Panel, UIDefinition } from "zle";
import TodoList from "./TodoList";

/**
 * Todo应用的入口面板
 * 提供添加待办事项的方法，提供获取待办事项列表的方法
 */
export default class TodoApp extends Panel {
  /**
   * $definition是测试体系中唯一访问具体页面布局（语言）的地方
   * 通过简单的DSL语法完成UI定义，描述了该面板出现时必需具备的形状
   */
  static $definition = UIDefinition.root("section.todoapp").withDescendant(
    "input.new-todo", // 输入新待办事项的input元素的css选择器
    "new todo" // 为该元素绑定一个业务术语，在后续交互时使用
  );

  /** 添加新待办事项 */
  async addTodo(todo: string) {
    await this.$click("new todo");
    await this.$type("new todo", todo);
    await this.$type("new todo", String.fromCharCode(13));
  }

  /** 返回待办事项列表 */
  async list() {
    const list = await this.$waitFor(TodoList);
    return list;
  }
}
