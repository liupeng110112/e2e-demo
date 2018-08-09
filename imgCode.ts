const tesseract = require('node-tesseract')
const gm = require('gm')

/**
 * 对图片进行阈值处理(默认55)
 */

function disposeImg(imgPath: string, newPath: string, thresholdValue: number) {
  return new Promise((resolve, reject) => {
    gm(imgPath)
      .resize(400, 150)
      // .noise('laplacian')
      .threshold(40, '%')
      .write(newPath, (err) => {
        if (err) return reject(err);
        resolve(newPath);
      });
  });
}

/**
 * 识别阈值化后图片内容
 */
function recognizeImg(imgPath: string, options = {}) {
  options = Object.assign({
    psm: 7
  }, options);
  // options = Object.assign({l: 'chi_sim'}, options); // 识别中文

  return new Promise((resolve, reject) => {
    tesseract
      .process(imgPath, options, (err, text) => {
        if (err) return reject(err);
        resolve(text.replace(/[\r\n\s]/gm, '')); // 去掉识别结果中的换行回车空格
      });
  });
}

async function recognize(imgPath: string, newPath: string, thresholdValue = 55) {
  try {
    const newImgPath = await disposeImg(imgPath, newPath, thresholdValue)
    const result = await recognizeImg(newImgPath)
    return result
  } catch (err) {
    console.error(`识别失败:${err}`)
  }
}

export default recognize

// recognize('test.png', 'test2.png')

// tesseract.process(process.cwd() + '/test.png', {
//   psm: 5,
//   l: 'eng'
// }, function (err, text) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(111, text.replace(/[\r\n\s]/gm, ''))
//   }
// })