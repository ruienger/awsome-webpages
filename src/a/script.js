/**
 * 为 target 设置动画，仅播放进入视野的元素的动画
 * @param {{ target: Node | Element, isIntersecting: boolean }} entry 
 */
function setAnimationName({ target, isIntersecting }) {
  target.style.animationName = isIntersecting ? `fadeIn` : ``
}

/**
 * 为 target 设置背景滚动，随着鼠标滚轮方向滚动
 * @param {{ target: Node | Element }} entry 
 */
function setBackgroundPosition({ target }) {
  target.style.backgroundPosition = `center calc(50% + ${0.1 * target.getBoundingClientRect().top}px)`
}

/**
 * 弹一个提示框
 * @returns {true}
 */
function alertLicense() {
  alert('图片禁止商用哦😃')
  return true
}

window.onload = () => {
  const imageInfos = Array.from(document.getElementsByClassName('image-info'))
  const imageWrappers = Array.from(document.getElementsByClassName('image-wrapper'))
  let wrappersInViewPort = []

  // 给在 viewport 内的元素上动画
  const imageInfoObserver = new IntersectionObserver(entries => {
    entries.forEach(setAnimationName)
  })
  // 赋值进入 viewport 的元素并，scroll 事件将使用它们
  const imageWrappersObserver = new IntersectionObserver(entries => {
    wrappersInViewPort = entries
  })

  imageInfos.forEach(imageInfo => {
    imageInfoObserver.observe(imageInfo)
  })

  imageWrappers.forEach(wrapper => {
    imageWrappersObserver.observe(wrapper)
  })

  window.addEventListener('scroll', () => {
    wrappersInViewPort.forEach(setBackgroundPosition)
  })

  window.oncontextmenu = alertLicense
}