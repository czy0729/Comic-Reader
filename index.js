function getQuery(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

// 执行的脚本必须提供title, images变量
eval(getQuery('script'))
document.title = title

let _html = ''
images.forEach(item => {
  _html += `<img class="lazy" data-src="${item}" referrerpolicy="no-referrer" width="375" height="667" />`
})
document.querySelector('.container').innerHTML = _html

setTimeout(() => {
  lazyload(document.querySelectorAll('.lazy'))
}, 0)
