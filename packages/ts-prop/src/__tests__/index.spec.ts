import prop from '..';

type Button = 'primary' | 'info';

test('literalType', () => {
  expect(prop.literalType<Button>(prop.string.def('primary'))).toEqual({
    type: String,
    default: 'primary',
  });
});

test('func', () => {
  expect(prop.func<() => void>()).toEqual({ type: Function });
});

test('emit', () => {
  expect({ click: prop.emit<() => void>() }).toEqual({ click: Function });
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
