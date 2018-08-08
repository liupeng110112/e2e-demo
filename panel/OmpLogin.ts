import { Panel, UIDefinition } from "zle"
import fs from 'fs'
import tesseract from 'node-tesseract'



/**
 * omp登录页
 */
export default class OmpLogin extends Panel {
  /**
   * $definition是测试体系中唯一访问具体页面布局（语言）的地方
   * 通过简单的DSL语法完成UI定义，描述了该面板出现时必需具备的形状
   */
  static $definition = UIDefinition.root("body")
    .withDescendant("#username", "username")
    .withDescendant("#passwd", "passwd")
    .withDescendant(".bp-confirm", "code")

  /** 点击搜索 */
  async hostSearch(host: string) {
    await this.$click('hostSerachInput')
    await this.$type('hostSerachInput', host)
    const code = await this.$getElementHandleByName('code')
    const base64 = await this.$context.page.evaluate(
      el => el.src,
      code
    )
    const base64Data = base64.replace(/^data:image\/png;base64,/, "")
    const binaryData = new Buffer(base64Data, 'base64').toString('binary')
    await fs.writeFile(__dirname + '../code.png', binaryData, 'binary', err => console.log(err))
    let codeNum
    await tesseract.process(process.cwd() + './code.png', {}, (err, text) => {
      if (err) {
        console.error(err);
      } else {
        codeNum = text
      }
    })
    await this.$type('code', codeNum)
    await this.$click('hostSerachBtn')
  }


}
