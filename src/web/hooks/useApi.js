const { default: config } = require("@/web/config.js")
const { default: axios } = require("axios")

/*By using get headers() from axios, I ran into some problems with the headers not being set correctly. (maybe due to cache or something)
  So I decided to use a hook to create the axios instance and set the headers manually.
*/
const useApi = () => {
  const api = axios.create({
    baseURL: config.api.baseURL,
    headers: {
      Authorization:
        typeof localStorage !== "undefined"
          ? localStorage.getItem(config.security.jwt.storageKey)
          : null,
    },
  })

  return api
}

export default useApi
