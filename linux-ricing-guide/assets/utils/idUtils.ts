import type { Auth0VueClient } from "@auth0/auth0-vue";

const getUserID = async (auth0: Auth0VueClient): Promise<string> => {
  let counter = 2;
  while(auth0.user.value?.sub == undefined){
    await new Promise(resolve => setTimeout(resolve, counter));
    counter *= 2;

    if(counter > 10000){
      console.error("Timeout waiting for auth0 to load");
      return "";
    }
  }
  const sub = auth0.user.value?.sub
  console.log(sub)
  return sub ?? "";
}

export { getUserID}
