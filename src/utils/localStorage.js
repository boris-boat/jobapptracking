export const setLocalStorage = (user) => {
  localStorage.setItem("token", JSON.stringify(user));
};
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};
export const removeLocalStorage = () => {
  localStorage.removeItem("token");
};
export const readLocalStorage = () => {
  let user = localStorage.getItem("user");
  return user;
};
