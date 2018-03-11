import { hasClass, emitEvent } from '../../lib/dom';
import { canToggleClass } from '../../lib/can-toggle-class';
import { canRoute } from '../../lib/can-route';
import '../../lib/polyfills/array#findIndex';
import '../../lib/polyfills/array#find';
import './wrsts-tab-control.scss'

interface TabControlState {
  target: HTMLElement
  tabs: HTMLElement[]
  contents: HTMLElement[]
  activeIndex: number
}

const tabControl = (target: HTMLElement) => {
  let state: TabControlState = {
      target
    , tabs:     Array.prototype.slice.call(
                  (target.children[0] || {} as any).children
                ) as HTMLElement[]
    , contents: Array.prototype.slice.call(
                  (target.children[1] || {} as any).children
                ) as HTMLElement[]
    , activeIndex: -1
  }
  state.activeIndex = state.tabs.findIndex(t => hasClass(t, 'active'))
  return { ...state
    , ...canToggleClass(state, 'active', ['tabs', 'contents'])
    , ...canRoute(state, 'click', ['tabs'])
  }
}

function bind() {
  Array.prototype.slice.call(
    document.querySelectorAll('wrsts-tab-control')
  ).forEach(target => {

    const control = tabControl(target)

    const handleEventDispatching = (index) => {
      if (control.activeIndex !== index) {
        emitEvent(control.target, 'wrsts:change')
      }
      control.activeIndex = index
    }

    control.tabs.forEach((t, i) => t.addEventListener('click', () => {
      control.toggleClass(i)
      handleEventDispatching(i)
    }))

    control.route((route) => {
      control.toggleClass(route.index)
      handleEventDispatching(route.index)
    })

  })
}

document.addEventListener('DOMContentLoaded', bind)