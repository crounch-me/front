import { validateEmail } from './form-validation';

describe('Form Validation', () => {
  describe('validateEmail', () => {
    it('Should return false when email is not valid.', () => {
      const invalidEmail = 'hello';
      const result = validateEmail(invalidEmail);
      expect(result).toBe(false);
    });

    it('Should return true if email is valid.', () => {
      const validEmail = 'admin@crounch.me';
      const result = validateEmail(validEmail);
      expect(result).toBe(true);
    });
  });
});
