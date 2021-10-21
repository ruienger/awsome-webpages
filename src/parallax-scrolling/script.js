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
function setBackgroundPosition(target) {
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

  // 给进入或者退出 viewport 的元素上动画
  const imageInfoObserver = new IntersectionObserver(entries => {
    entries.forEach(setAnimationName)
  })
  // 使用 isInViewPort 标记在 viewport 中的元素，scroll 事件将使用它
  const imageWrappersObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target, intersectionRatio }) => target.isInViewPort = intersectionRatio !== 0)
  })

  imageInfos.forEach(imageInfo => {
    imageInfoObserver.observe(imageInfo)
  })

  imageWrappers.forEach(wrapper => {
    imageWrappersObserver.observe(wrapper)
  })

  window.addEventListener('scroll', () => {
    imageWrappers.forEach(wrapper => {
      if (wrapper.isInViewPort) {
        setBackgroundPosition(wrapper)
      }
    })
  })

  window.oncontextmenu = alertLicense
}