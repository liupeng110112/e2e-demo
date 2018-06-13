import { initialize, context } from "zle";

/** 在每个测试用例结束时清理已创建的所有待办事项 */
teardown(async () => {
  await context.page.evaluate(() => {
    localStorage.clear();
  });
});

/** ZLE框架提供的初始化方法 */
initialize({
  executablePath: process.env.ZLE_EXECUTABLE_PATH, // 通过环境变量指定Chromium浏览器的位置
  headless: false, // 启动浏览器测试时，需要图形化界面，方便观看调试
  args: ["--window-size=1920,1080"] // 指定浏览器窗口大小
});

/** 在每个测试用例开始时设置渲染区域大小以及注册请求拦截钩子 */
setup(async () => {
  await context.page.setViewport({ width: 1920, height: 1080 }); // 设置浏览器渲染区域大小
  await context.page.setRequestInterception(true); // 启用请求拦截
  // TodoMVC官方的例子中，会加载一些资源，对某些资源做屏蔽
  context.page.on("request", e => {
    // 由于总所周知的原因，无法访问该类网址
    if (e.url().startsWith("https://www.google-analytics.com/")) {
      e.abort(); // 一旦发现请求该类网址，就直接拦截，加快页面加载速度
    } else {
      e.continue(); // 否则继续请求
    }
  });
});
