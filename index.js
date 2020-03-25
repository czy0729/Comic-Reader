function getQuery(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}

// script 执行的脚本必须提供String: title, Array<String>: images变量
eval(getQuery('script'))
document.title = title

let _html = ''

images.forEach((item, index) => {
  _html += `<img class="lazy lazy-${index}" data-src="${item}" referrerpolicy="no-referrer" width="375" height="667" />`
})
document.querySelector('.container').innerHTML = _html

setTimeout(() => {
  lazyload(document.querySelectorAll('.lazy-0'))
  setTimeout(() => {
    lazyload(document.querySelectorAll('.lazy'))
  }, 1000)
}, 0)
