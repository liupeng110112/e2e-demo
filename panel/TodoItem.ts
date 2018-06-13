import { Panel, UIDefinition } from "zle";

/** 待办事项列表中一个具体的待办事项 */
export default class TodoItem extends Panel {
  static $definition = UIDefinition.root("li")
    .withDescendant("input.toggle", "toggle")
    .withDescendant("button.destroy", "destroy")
    .withDescendant("label", "title");

  /** 切换当前待办事项完成状态，从“待办”->“完成”，或“完成”->“代办” */
  async toggle() {
    await this.$click("toggle");
  }

  /** 删除当前待办事项 */
  async destroy() {
    await this.$click("destroy");
  }

  /** 获取当前待办事项的标题 */
  async title() {
    return await this.$textOf("title");
  }

  /** 获取当前待办事项已完成的状态 */
  async hasComplete() {
    const className = await this.$context.page.evaluate(
      el => el.className,
      this.$elementHandle
    );
    return (className as string).includes("completed");
  }
}
