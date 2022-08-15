<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="log_in.show_alert"
    :class="log_in.alert_variant"
  >
    {{ log_in.alert_msg }}
  </div>
  <!-- Login Form -->
  <vee-form :validation-schema="login_schema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password_login"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password_login" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="log_in.in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "../stores/user";

export default {
  name: "LoginForm",
  data() {
    return {
      login_schema: {
        password_login: "password_login",
        email: "email",
      },
      log_in: {
        in_submission: false,
        show_alert: false,
        alert_variant: "bg-blue-500",
        alert_msg: "Logging in",
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.log_in.show_alert = true;
      this.log_in.in_submission = true;
      this.log_in.alert_variant = "bg-blue-500";
      this.log_in.alert_msg = "Please wait while we are logging you in";

      try {
        console.log(values);
        await this.authenticate({
          email: values.email,
          password: values.password_login,
        });
      } catch (error) {
        this.log_in.in_submission = false;
        this.log_in.alert_variant = "bg-red-500";
        this.log_in.alert_msg = "Invalid email or password";
        return;
      }

      this.log_in.alert_variant = "bg-green-500";
      this.log_in.alert_msg = "Sucess! You are logged";
      console.log(values);
    },
  },
};
</script>
