export function useLocalStorage() {
  function set(key, value) {
    localStorage.setItem(key, value);
  }

  function get(key) {
    return localStorage.getItem(key);
  }

  return { get, set };
}
