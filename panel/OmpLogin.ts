import { Panel, UIDefinition } from "zle"
const base64ToImage = require('base64-to-image')
// import recognize from '../imgCode'

const tesseract = require('node-tesseract')
const gm = require('gm')

/**
 * 对图片进行阈值处理(默认55)
 */

function disposeImg(imgPath: string, newPath: string) {
  return new Promise((resolve, reject) => {
    gm(imgPath)
      .resize(400, 150)
      // .noise('laplacian')
      .threshold(40, '%')
      .write(newPath, (err: any) => {
        if (err) return reject(err);
        resolve(newPath);
      });
  });
}

/**
 * 识别阈值化后图片内容
 */
function recognizeImg(imgPath: any, options?: object) {
  options = Object.assign({
    psm: 7
  }, options);
  // options = Object.assign({l: 'chi_sim'}, options); // 识别中文

  return new Promise((resolve, reject) => {
    tesseract
      .process(imgPath, options, (err: any, text: any) => {
        if (err) return reject(err);
        resolve(text.replace(/[\r\n\s]/gm, '')); // 去掉识别结果中的换行回车空格
      });
  });
}

/**去除非数字的字符集 */

function trimCharacter(code: string) {
  return code.replace(/[^\d]+/gm, '').substr(0, 4)
}


async function recognize(imgPath: string, newPath: string) {
  try {
    const newImgPath = await disposeImg(imgPath, newPath)
    const result = await recognizeImg(newImgPath)
    return result
  } catch (err) {
    return err
  }
}

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
    .withDescendant("#code", "code")
    .withDescendant(".bp-confirm", "imgCode")
    .withDescendant(".login-form-button", "login")

  /** 点击搜索 */
  async login(
    username: string,
    pwd: string
  ) {
    await this.$click('username')
    await this.$type('username', username)
    await this.$click('passwd')
    await this.$type('passwd', pwd)
    const code = await this.$getElementHandleByName('imgCode')
    const base64 = await this.$context.page.evaluate(
      el => el.src,
      code
    )
    const cwd = process.cwd()
    await base64ToImage(base64, cwd + '/', {
      fileName: 'code',
      type: 'png'
    })
    const codeNum = await recognize(cwd + "/code.png", cwd + "/code2.png")

    await this.$click('code')
    await this.$type('code', trimCharacter(codeNum))
    await this.$click('login')
  }


}
