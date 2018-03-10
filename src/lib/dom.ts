export function removeClass($element, className) {
  if (!$element) { return }
  var currentClassName = $element.className
  var newClassName = currentClassName.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)') ,'')
  /* update DOM only if new className differs */
  if (newClassName !== currentClassName) {
    $element.className = newClassName
  }
}

export function addClass($element, className) {
  if (!$element) { return }
  $element.className += ($element.className !== '' ? ' ' : '') + className
}

export function hasClass($element, className) {
  return ($element.className || '').toLowerCase().indexOf(className.toLowerCase()) > -1
}

export function emitEvent(element, eventName) {
  if ('createEvent' in document) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent(eventName, false, true);
      element.dispatchEvent(evt);
  }
  else
      element.fireEvent(`on${eventName}`);
}