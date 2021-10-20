let orgNum = null

window.onload = () => {
  const numWindow = document.getElementById('num-window')
  // 初始化 scroller-window 数组
  const windows = Array.from(document.getElementsByClassName('scroller-window'))
  // 初始化 scroller 数组与 orgNum 数组
  const orgNum = new Array(windows.length).fill(0)
  const scrollers = []

  // 为 scroller-window 元素添加 scroller 并添加事件
  windows.forEach((window, i) => {
    const scroller = getSingleScroller()
    scroller.addEventListener('transitionend', ({ target }) => {
      reposition(target, orgNum[i])
    })
    scrollers.push(scroller)
 
    window.replaceChildren(scroller)
  })

  setInterval(() => {
    numWindow.innerText = ''
    scrollers.forEach((scroller, i) => {
      const tarNum = genRandomNum()
      scroller.style.transform = getFastestTranslation(orgNum[i], tarNum)
      numWindow.innerText += tarNum
      orgNum[i] = tarNum
    })
  }, 4000)

  function genRandomNum() {
    return Math.floor(Math.random() * 10)
  }
}

/** 每个数字的高度占比 */
const step = 5

/**
 * 获取由 start 最快滚动到 end 的 css-tanslateY 属性
 * @param {Number} start 开始数字
 * @param {Number} end 结束数字
 * @returns translateY 字符
 */
function getFastestTranslation(start, end) {
  let direction = 1; // -1 -> scroll up | 1 -> scroll down
  let steps = 0;
  let startTansition = getNormalTranslation(start)

  if (start > end) {
    // start - end 为 start 向 end 递减的次数
    setDirectionAndSteps(Math.abs(start - end), Math.abs(10 - start + end));
  } else if (start < end) {
    // end - start 为 start 向 end 递减的次数
    setDirectionAndSteps(Math.abs(10 - end + start), Math.abs(end - start));
  }

  startTansition += direction * steps * step

  /**
   * 比较上下方向，设置最短步数
   * @param {*} dstep 向下滚动的步数
   * @param {*} ustep 向上滚动的步数
   */
  function setDirectionAndSteps(dstep, ustep) {
    const isUpperFaster = dstep > ustep
    direction = isUpperFaster ? -1 : 1
    steps = isUpperFaster ? ustep : dstep
  }

  return `translateY(${startTansition}%)`;
}

/**
 * 获取正常滚动(非最快滚动)到 num 处需要的 css-translateY 值
 * @param {Number} num 目标数字
 * @returns 百分比
 */
function getNormalTranslation(num) {
  // 每个 p 元素占比为 5%, 第一个 0 在 25% 处出现
  return -(25 + num * 5)
}

/**
 * 将 translate 后不在预期位置的元素移动到预期位置
 * @param {Node | Element} node 
 * @param {Number} num 
 */
function reposition({ style }, num) {
  const { transitionDuration } = style
  const normalTranslation = `translateY(${getNormalTranslation(num)}%)`
  if (style.transform !== normalTranslation) {
    style.transitionDuration = '0s'
    style.transform = normalTranslation
    requestAnimationFrame(requestAnimationFrame.bind(null, () => {
      style.transitionDuration = transitionDuration
    }))
  }
}

/**
 * 获取 Scroller 的 dom 元素
 * @returns scroller滚动器dom
 */
function getSingleScroller() {
  const scroller = document.createElement('div')
  scroller.classList.add('single-scroller')
  scroller.style.transitionDuration = '0s'
  scroller.style.transform = `translateY(${getNormalTranslation(0)}%)`
  scroller.innerHTML = `<p>${[5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4].join(`</p><p>`)}</p>`
  requestAnimationFrame(requestAnimationFrame.bind(null, () => {
    scroller.style.transitionDuration = '0.6s'
  }))
  return scroller
}