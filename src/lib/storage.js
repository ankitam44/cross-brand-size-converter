const KEY = "sizeconverter:savedSize";

// All calls are try/catch-guarded: localStorage can throw (private browsing, blocked
// site data) and the app must still work without a saved size in that case.

export function saveMySize(brand, size) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ brand, size }));
    return true;
  } catch {
    return false;
  }
}

export function loadMySize() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearMySize() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // no-op: nothing to clear if storage isn't available
  }
}
