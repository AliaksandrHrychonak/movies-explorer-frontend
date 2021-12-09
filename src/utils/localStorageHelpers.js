export const getItemLocal = (key) => {
  return localStorage.getItem(key)
}

export const setItemLocal = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const removeItemLocal = (key) => {
  return localStorage.removeItem(key)
}

export const clearItemsLocal = () => {
  return localStorage.clear()
}

export const parseData = (data) => {
  return JSON.parse(data)
}
