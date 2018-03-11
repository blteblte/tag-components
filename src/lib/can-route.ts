
export interface RouteCallback {
  routeHash: string
  key: string
  target: HTMLElement
  index: number
}

export const canRoute = (state, eventName: string, arrKeys: string[]) => ({

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