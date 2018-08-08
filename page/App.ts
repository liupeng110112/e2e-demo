import { Page, chain } from "zle"
import BatchSelectHost from '../panel/BatchSelectHost'
import installPage from '../panel/Page'
import HostItem from '../panel/HostItem'


/**
 * 模块安装-批量选择主机
 */
export default class Host extends Page {
  static $url = "http://10.1.50.69:7500/omp/#/mod-package/install/1ffb279e3a844924b5b9047341a061bb/Platform/2.0.0.0"; // 页面跳转的地址
  static $initialPanels = [BatchSelectHost]; // 页面初始化时需检查的面板

  openModal() {
    return chain(async () => {
      const app = await this.$context.waitFor(installPage)
      await app.openHostModal()
      return this

    })
  }
  /**主机查找 */
  hostSearch(
    host: string,
    callback: (hostList: Array<HostItem>) => Promise<void>
  ) {
    return chain(async () => {
      const app = await this.$context.waitFor(BatchSelectHost)
      await app.hostSearch(host)
      const hostTable = await app.hostTable()
      let searchHostList = new Array<HostItem>()
      for await (let item of hostTable.hostList()) {
        if ((await item.hostIP()).includes(host)) {
          searchHostList.push(item)
        }
      }
      await callback(searchHostList)
      return this
    })
  }
  /**主机选择 */
  toggleAllHost(
    callback: () => Promise<void>
  ) {
    return chain(async () => {
      const app = await this.$context.waitFor(BatchSelectHost)
      const hostTable = await app.hostTable()
      await hostTable.toggleAll()
      await callback()
      return this
    })
  }
  // get(
  //   port: string,
  //   callback: (text: string) => Promise<void>
  // ) {
  //   return chain(async () => {
  //     const app = await this.$context.waitFor(AppDev)
  //     const text = await app.inputPort(port)
  //     await callback(text)
  //     return this
  //   })
  // }


}
