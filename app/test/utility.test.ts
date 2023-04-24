import { notEmpty, getName } from '../src/utility/common';
import { User } from '../src/collections/interfaces';

describe('common.notEmpty', () => {
  test('it should return false with parameter that is not a string', () => {
    expect(notEmpty(1)).toEqual(false);
  });
  test('it should return false with parameter that is an empty string', () => {
    expect(notEmpty('')).toEqual(false);
  });
  test('it should return true with parameter that is a valid string', () => {
    expect(notEmpty('s')).toEqual(true);
  });
});

describe('common.getName', () => {
  test('it should return name and surname with a space in between', () => {
    const user: User = {
      first_name: 'abc',
      last_name: 'def',
      email: 'a',
      password: 'b',
    };
    expect(getName(user).length).toEqual(7);
  });
  test('it should return name with no spaces', () => {
    const user: User = {
      first_name: 'abc',
      last_name: undefined,
      email: 'a',
      password: 'b',
    };
    expect(getName(user).length).toEqual(3);
  });
});
