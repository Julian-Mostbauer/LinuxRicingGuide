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
    } else {
        setStorageItem(key, JSON.stringify([value]));
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

const arrIncludes = (key, value) => {
    const current = getStorageItem(key);
    if (current) {
        const arr = JSON.parse(current);
        return arr.includes(value);
    }
    return false;
}

// Keys
const LocalStorage = {
    DistroUpvotes: {
        add: (value) => appendToArrStorageItem('distro-upvotes', value),
        remove: (value) => removeFromArrStorageItem('distro-upvotes', value),
        has: (value) => arrIncludes('distro-upvotes', value),
        get: () => getStorageItem('distro-upvotes')
    },
    DistroDownvotes: {
        add: (value) => appendToArrStorageItem('distro-downvotes', value),
        remove: (value) => removeFromArrStorageItem('distro-downvotes', value),
        has: (value) => arrIncludes('distro-downvotes', value),
        get: () => getStorageItem('distro-downvotes')
    },
    SearchFileCache: {
        set: (value) => setStorageItem('search-file-cache', value),
        get: () => getStorageItem('search-file-cache'),
    }
}

export default LocalStorage
