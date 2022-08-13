<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="registration.show_alert"
    :class="registration.alert_variant"
  >
    {{ registration.alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        as="input"
        :rules="required"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </vee-field>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <ErrorMessage class="text-red-600" name="tos" />
      <label class="inline-block">Accept terms of service</label>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="registration.in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { auth, usersColection } from "../utils/firebase";
import { mapWritableState } from "pinia";
import useUserStore from "../stores/user";

export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:30|alphaSpaces",
        email: "email",
        age: "minValue:18|maxValue:80",
        password: "required|min:4|max:100",
        confirm_password: "passwordMismatch:@password",
        country: "required",
        tos: "tos",
      },
      registration: {
        in_submission: false,
        show_alert: false,
        alert_variant: "bg-blue-500",
        alert_msg: "Please wait while your account is being created",
      },
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["isLogged"]),
  },
  methods: {
    async register(value) {
      this.registration.show_alert = true;
      this.registration.in_submission = true;
      this.registration.alert_variant = "bg-blue-500";
      this.registration.alert_msg =
        "Please wait while your account is being created";

      let userCredentials;
      try {
        userCredentials = await auth.createUserWithEmailAndPassword(
          value.email,
          value.password
        );
      } catch (error) {
        this.registration.in_submission = false;
        this.registration.alert_variant = "bg-red-500";
        this.registration.alert_msg = "An unexpected error ocurred. Try again";
        return;
      }

      try {
        await usersColection.add({
          name: value.name,
          email: value.email,
          age: value.age,
          country: value.country,
        });
      } catch (error) {
        this.registration.in_submission = false;
        this.registration.alert_variant = "bg-red-500";
        this.registration.alert_msg = "An unexpected error ocurred. Try again";
        return;
      }

      this.isLogged = true;

      this.registration.alert_variant = "bg-green-500";
      this.registration.alert_msg = "Account created successfully";
      console.log(userCredentials);
    },
  },
};
</script>
