import prop from '..';

test('func', () => {
  expect(prop.func<() => void>()).toEqual({ type: Function });
});

test('emit', () => {
  expect({ click: prop.emit<() => void>() }).toEqual({ click: Function });
});

test('array', () => {
  expect(prop.array<{ icon: string }>().required).toEqual({
    type: Array,
    required: true,
  });
});

test('stringNumber', () => {
  expect(prop.stringNumber.required).toEqual({
    type: [String, Number],
    required: true,
  });
});

test('number', () => {
  expect(prop.number.type).toEqual({ type: Number });
  expect(prop.number.default(7).required).toEqual({
    type: Number,
    required: true,
    default: 7,
  });

  const validator = (value: number) => value > 0;

  expect(prop.number.validator(validator).type).toEqual({
    type: Number,
    validator,
  });
});
