const getFullUID = async (auth0: any): Promise<string> => {
return await auth0.getAccessTokenSilently(); 
}

const getUserPartOfUID = async (auth0: any): Promise<string> => {
  return (await getFullUID(auth0)).split('..')[0]; 
}
const getUserSeasonPartOfUID = async (auth0: any): Promise<string> => {
  return (await getFullUID(auth0)).split('..')[1]; 
}

export { getFullUID, getUserPartOfUID, getUserSeasonPartOfUID }