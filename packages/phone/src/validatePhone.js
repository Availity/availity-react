import { addMethod, number, string } from 'yup';
import { AsYouType } from 'libphonenumber-js';

export default function validatePhone(msg, strict = false, country = 'US') {
  return this.test({
    name: 'validatePhone',
    exclusive: true,
    message: msg || 'This field is invalid.',
    async test(phoneValue) {
      if (!phoneValue) return true;

      const asYouType = new AsYouType(country);
      asYouType.input(phoneValue);
      if (strict) {
        return asYouType.getNumber() && asYouType.getNumber().isValid();
      }
      return asYouType.getNumber() && asYouType.getNumber().isPossible();
    },
  });
}

addMethod(string, 'validatePhone', validatePhone);
addMethod(number, 'validatePhone', validatePhone);
