import items from "./items"
import axios from 'axios'

export function fetchData() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(items);
    }, 2000);
  });
}

export function userLogin(user) {
  return axios
    .post('/auth/login', user)
}

export function userSignup(user) {
  return axios
    .post('/auth/signup', user)
}

export function getRequest(url, token) {
  const header = token ? {
        headers: { "Authorization": "bearer " + token }
      } : null;
  return axios
    .get(url, header)
}

export function postRequest(url, data, token) {
  const header = token ? {
        headers: { "Authorization": "bearer " + token }
      } : null;
  return axios
    .post(url, data, header)
}

export function putRequest(url, data, token) {
  const header = token ? {
        headers: { "Authorization": "bearer " + token }
      } : null;
  return axios
    .put(url, data, header)
}

export function postImage(imgFile) {
  const formData = new FormData()
  formData.append("file", imgFile);
  formData.append("tags", `codeinfuse, medium, gist`);
  formData.append("upload_preset", "akkvjzge"); // Replace the preset name with your own
  formData.append("api_key", "381412313275544"); // Replace API key with your own Cloudinary key
  formData.append("timestamp", (Date.now() / 1000) | 0);
  // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
  return axios
    .post(
      "https://api.cloudinary.com/v1_1/lchen139/upload",
      formData,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" }
      }
    )
}
