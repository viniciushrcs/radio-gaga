import { defineStore } from "pinia";
import { auth, usersColection } from "../utils/firebase";

interface LoginData {
  email: string;
  password: string;
}
interface User {
  password: string;
  name: string;
  email: string;
  age: number;
  country: string;
}

export default defineStore("user", {
  state: () => ({
    isLogged: false,
  }),
  actions: {
    async register(user: User) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      await usersColection.doc(userCredentials.user?.uid).set({
        name: user.name,
        email: user.email,
        age: user.age,
        country: user.country,
      });

      await userCredentials.user?.updateProfile({
        displayName: user.name,
      });

      this.isLogged = true;
    },
    async authenticate(loginData: LoginData) {
      await auth.signInWithEmailAndPassword(
        loginData.email,
        loginData.password
      );

      this.isLogged = true;
    },
  },
});
