import { Panel, UIDefinition } from "zle"
import HostTable from './HostTable'

/**
 * 批量选择主机
 */
export default class BatchSelectHost extends Panel {
  /**
   * $definition是测试体系中唯一访问具体页面布局（语言）的地方
   * 通过简单的DSL语法完成UI定义，描述了该面板出现时必需具备的形状
   */
  static $definition = UIDefinition.root(".ant-popover pop-page", "BatchHostDModal")
    .withDescendant(".host_search input", "hostSerachInput")
    .withDescendant(".ant-input-suffix", "hostSerachBtn")

  /** 点击搜索 */
  async hostSearch(host: string) {
    await this.$click('hostSerachInput')
    await this.$type('hostSerachInput', host)
    await this.$click('hostSerachBtn')
  }
  async hostTable() {
    const hostTable = await this.$waitFor(HostTable)
    return hostTable
  }

}
