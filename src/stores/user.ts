import { defineStore } from "pinia";
import { auth, usersColection } from "../utils/firebase";

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
      await auth.createUserWithEmailAndPassword(user.email, user.password);
      await usersColection.add({
        name: user.name,
        email: user.email,
        age: user.age,
        country: user.country,
      });

      this.isLogged = true;
    },
  },
});
