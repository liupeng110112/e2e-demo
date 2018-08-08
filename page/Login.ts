import { Page, chain } from 'zle'
import OmpLogin from '../panel/OmpLogin'

export default class Login extends Page {
  static $url = "http://10.1.60.125:7500/omp/#/login"; // 页面跳转的地址
  static $initialPanels = [OmpLogin]; // 页面初始化时需检查的面板 
}