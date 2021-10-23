const twice = (f, v) => f(f(v));
const add3 = (v) => v + 3;
console.log(`twice(add3, 7) `, twice(add3, 7));

const filter = (predicate, xs) => xs.filter(predicate);
const is = (type) => (x) => Object(x) instanceof type;
console.log(
  `filter(is(Number), [0, '1', 2, null]); `,
  filter(is(Number), [0, "1", 2, null])
);

const withCounter = (fn) => {
  let counter = 0;
  return (...args) => {
    console.log(`counter is ${++counter}`);
    return fn(...args);
  };
};

const add = (x, y) => x + y;
const counterSum = withCounter(add);
console.log(`counterSum(2,3) `, counterSum(2, 3));
console.log(`counterSum(2,1) `, counterSum(2, 1));
