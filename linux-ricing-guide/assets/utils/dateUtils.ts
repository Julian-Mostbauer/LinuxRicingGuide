export const isHalloween = new Date().getDate() === 31 && new Date().getMonth() === 9;
export const isChristmas = new Date().getDate() === 25 && new Date().getMonth() === 11;
export const isNewYear = new Date().getDate() === 1 && new Date().getMonth() === 0;
export const isSpecialDay = isHalloween || isChristmas || isNewYear;