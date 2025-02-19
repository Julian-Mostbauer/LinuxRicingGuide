const distroData = {
  'arch-linux': {
    
  }
}

const getDistroData = (distroName) => {
  return distroData[distroName];
}

export default getDistroData;