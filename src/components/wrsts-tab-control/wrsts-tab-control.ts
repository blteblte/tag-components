import { hasClass, addClass, removeClass, emitEvent } from '../../lib/dom';
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
                  target.children[0].children
                ) as HTMLElement[]
    , contents: Array.prototype.slice.call(
                  target.children[1].children
                ) as HTMLElement[]
    , activeIndex: -1
  }
  state.activeIndex = state.tabs.findIndex(t => hasClass(t, 'active'))
  return { ...state
    , ...canToggleClass(state, 'active', ['tabs', 'contents'])
    , ...canRoute(state, 'click', ['tabs'])
  }
}

const canToggleClass = (state, className: string, arrKeys: string[]) => ({
  toggleClass: (index) => {
    arrKeys.forEach(key => {
      state[key].forEach((x, i) => {
        if (i === index) !hasClass(x, className) && addClass(x, className)
        else hasClass(x, className) && removeClass(x, className)
      })
    })
  }
})

interface RouteCallback {
  routeHash: string
  key: string
  target: HTMLElement
  index: number
}

const canRoute = (state, eventName: string, arrKeys: string[]) => ({

  route: (callback: (route: RouteCallback) => any) => {
    arrKeys.forEach(key => {
      const routes: RouteCallback[] = []
      state[key].forEach((x, i) => {
        const routeHash = x.getAttribute('route')
        if (routeHash !== null) {
          routes.push({ key, routeHash, target: x, index: i })
          x.addEventListener(eventName, () => { window.location.href = `#/${routeHash}` })
        }
      })
      if (routes.length) {
        /*  */
        const initialRouteHash = (window.location.hash || '').replace('#/', '').toLowerCase()
        if (initialRouteHash !== '') {
          const route = routes.find(x => x.routeHash.toLowerCase() ===  initialRouteHash)
          if(route) { callback(route) }
        }
        /*  */
        window.addEventListener('hashchange', () => {
          const routeHash = (window.location.hash || '').replace('#/', '')
          const route = routes.find(x => x.routeHash.toLowerCase() === routeHash.toLowerCase())
          if (route) { callback(route) }
        })

      }
    })
  }

})

document.addEventListener('DOMContentLoaded', () => {

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

})