import { prop, literalType, defineEmit } from '..';

test('literalType', () => {
  expect(literalType<'primary' | 'info' | 0 | true>().def('primary')).toEqual({
    type: [String, Boolean, Number],
    default: 'primary',
  });
});

test('func', () => {
  expect(prop.function<() => void>()).toEqual({ type: Function });
});

test('emit', () => {
  expect({ click: defineEmit<() => void>() }).toEqual({ click: Function });
});

test('array', () => {
  expect(prop.array<{ icon: string }>().isRequired).toEqual({
    type: Array,
    required: true,
  });
});

test('stringNumber', () => {
  expect(prop.stringNumber.isRequired).toEqual({
    type: [String, Number],
    required: true,
  });
});

test('number', () => {
  expect(prop.number).toEqual({ type: Number });
  expect(prop.number.def(7).isRequired).toEqual({
    type: Number,
    required: true,
    default: 7,
  });
  const validator = (value: number) => value > 0;
  expect(prop.number.valid(validator)).toEqual({
    type: Number,
    validator,
  });
});
