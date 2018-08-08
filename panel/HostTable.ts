import { Panel, UIDefinition } from "zle"
import HostItem from './HostItem'


/**
 * 批量选择主机
 */
export default class HostTable extends Panel {
  /**
   * $definition是测试体系中唯一访问具体页面布局（语言）的地方
   * 通过简单的DSL语法完成UI定义，描述了该面板出现时必需具备的形状
   */
  static $definition = UIDefinition.root(".host_table table", "HostTable")
    .withDescendant(".ant-table-thead .ant-checkbox-input", "toggleAllCheckbox")

  /** 切换状态 */
  async toggleAll() {
    await this.$click('toggleAllCheckbox');
  }
  /**返回主机列表 */
  hostList() {
    return this.$$(HostItem)
  }

}
