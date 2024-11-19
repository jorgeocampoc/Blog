export const getUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); 
    return user
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  } finally {
  }
};

const badWords = ["perro", "sonso", "mula", "burro", "llama"];
export const verifyBadWords = ( words ) => {
  const verify = badWords.some(elemento => words.includes(elemento));
  if (verify) {
    return true
  } else {
    return false
  }
}
