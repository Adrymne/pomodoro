import { cond, anyPass } from './utils';

describe('cond', () => {
  const subject = cond;
  it('executes the first matching transformer', () => {
    const pairs = [
      [() => false, undefined],
      [x => x > 3, x => x],
      [() => false, undefined]
    ];

    const result = subject(pairs)(5);

    expect(result).toBe(5);
  });

  it('returns undefined if no predicate returns true', () => {
    const pairs = [
      [() => false, undefined],
      [() => false, undefined],
      [() => false, undefined]
    ];

    const result = subject(pairs)('banana');

    expect(result).toBeUndefined();
  });
});

describe('anyPass', () => {
  const subject = anyPass;
  it('returns true if any predicate passses', () => {
    const predicates = [x => x % 2 === 0, x => x > 3, x => x < 10];

    const result = subject(predicates)(13);

    expect(result).toBe(true);
  });

  it('returns false if no predicates pass', () => {
    const predicates = [x => x % 2 === 0, x => x < 3, x => x > 10];

    const result = subject(predicates)(7);

    expect(result).toBe(false);
  });
});
