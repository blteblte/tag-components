import { hasClass, addClass, removeClass } from '../../lib/dom';

function bind() {
  Array.prototype.slice.call(
    document.querySelectorAll('wrsts-tab-control')
  ).forEach(target => bindTabControl(target))
}

function bindTabControl(target: HTMLElement) {
  const tabs = Array.prototype.slice.call(
    target.children[0].children
  ) as HTMLElement[]

  const contents = Array.prototype.slice.call(
    target.children[1].children
  ) as HTMLElement[]

  tabs.forEach((tab, clickIndex) => {
    tab.addEventListener('click', () => {
      tabs.forEach((x, i) => {
        if (i === clickIndex) !hasClass(x, 'active') && addClass(x, 'active')
        else hasClass(x, 'active') && removeClass(x, 'active')
      })
      contents.forEach((x, i) => {
        if (i === clickIndex) !hasClass(x, 'active') && addClass(x, 'active')
        else hasClass(x, 'active') && removeClass(x, 'active')
      })
    })
  })
}


import './wrsts-tab-control.scss'
document.addEventListener('DOMContentLoaded', bind)