const getStorageItem = (key) => {
  return localStorage.getItem(key);
}

const setStorageItem = (key, value) => {
    localStorage.setItem(key, value);
}

const removeStorageItem = (key) => {
    localStorage.removeItem(key);
}

const appendToArrStorageItem = (key, value) => {
    const current = getStorageItem(key);
    if (current) {
        const arr = JSON.parse(current);
        arr.push(value);
        setStorageItem(key, JSON.stringify(arr));
    }
}

const removeFromArrStorageItem = (key, value) => {
    const current = getStorageItem(key);
    if (current) {
        const arr = JSON.parse(current);
        const newArr = arr.filter((item) => item !== value);
        setStorageItem(key, JSON.stringify(newArr));
    }
}

// Keys
const STORAGE = {
    DISTRO_UPVOTES: {
        add: (value) => appendToArrStorageItem('distro-upvotes', value),
        remove: (value) => removeFromArrStorageItem('distro-upvotes', value),
        get: () => getStorageItem('distro-upvotes')
    },
    DISTRO_DOWNVOTES: {
        add: (value) => appendToArrStorageItem('distro-downvotes', value),
        remove: (value) => removeFromArrStorageItem('distro-downvotes', value),
        get: () => getStorageItem('distro-downvotes')
    }
}

export default STORAGE
