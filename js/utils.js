export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function ensureClass(elem, clazz) {
  if (!elem.classList.contains(clazz)) {
    elem.classList.add(clazz);
  }
}

export function removeClass(elem, clazz) {
  elem.classList.remove(clazz);
}
