import { Panel, UIDefinition } from "zle"


/**
 * 主机项
 */
export default class HostItem extends Panel {
  /**
   * $definition是测试体系中唯一访问具体页面布局（语言）的地方
   * 通过简单的DSL语法完成UI定义，描述了该面板出现时必需具备的形状
   */
  static $definition = UIDefinition.root("tr")
    .withDescendant(".ant-table-selection-column", "HostSelect")
    .withDescendant(".ant-checkbox-input", "HostToggle")
    .withDescendant(".ant-table-row-indent", "Host")

  /** 切换状态 */
  async toggle() {
    await this.$click('HostSelect');
  }
  /** 主机IP */
  async hostIP() {
    return await this.$textOf('Host')
  }



}
