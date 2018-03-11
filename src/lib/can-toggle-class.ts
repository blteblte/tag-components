import { hasClass, addClass, removeClass } from './dom';

export const canToggleClass = (state, className: string, arrKeys: string[]) => ({
  toggleClass: (index) => {
    arrKeys.forEach(key => {
      state[key].forEach((x, i) => {
        if (i === index) !hasClass(x, className) && addClass(x, className)
        else hasClass(x, className) && removeClass(x, className)
      })
    })
  }
})