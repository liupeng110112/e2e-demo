import { Panel, UIDefinition } from "zle";
import TodoItem from "./TodoItem";

/**
 * Todo应用当前的待办事项列表
 * 提供切换所有待办事项完成状态的方法 `toggleAll()`
 * 提供访问所有待办事项的方法 `items()`
 */
export default class TodoList extends Panel {
  static $definition = UIDefinition.root("section.main")
    .withDescendant("input.toggle-all", "toggle all")
    .withDescendant("ul.todo-list", "todo list");

  /** 切换所有待办事项完成状态 */
  async toggleAll() {
    await this.$click("toggle all");
  }

  /** 返回所有待办事项 */
  items() {
    return this.$$(TodoItem);
  }
}
