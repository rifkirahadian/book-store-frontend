export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }
  

  return null;
}

export const setUser = (payload) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user',JSON.stringify(payload));
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};