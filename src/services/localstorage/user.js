export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }

  return null;
}

export const setUser = (payload) => {
  localStorage.setItem('user',JSON.stringify(payload));
};

export const logout = () => {
  localStorage.removeItem('user');
};