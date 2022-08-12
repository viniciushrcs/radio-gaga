import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  max,
  min,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
} from "@vee-validate/rules";

export default {
  install(app): void {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("password_login", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alphaSpaces", alphaSpaces);
    defineRule("email", email);
    defineRule("minValue", minValue);
    defineRule("maxValue", maxValue);
    defineRule("passwordMismatch", confirmed);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alphaSpaces: `The field ${ctx.field} may only contain alphabetical characteres`,
          email: `The field ${ctx.field} must be a valid email`,
          minValue: `The field ${ctx.field} is too low`,
          maxValue: `The field ${ctx.field} is too high`,
          passwordMismatch: `The passwords don't match`,
          tos: `You must accept the Terms of Service`,
          password_login: "Type your password to login",
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is not valid`;

        return message;
      },
    });
  },
};
