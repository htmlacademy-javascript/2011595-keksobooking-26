// const getRandomPositiveInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
//   const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//
//   return Math.floor(result);
// };
//
// const getRandomPositiveFloat = (a, b, digits = 1) => {
//   const lower = Math.min(Math.abs(a), Math.abs(b));
//   const upper = Math.max(Math.abs(a), Math.abs(b));
//   const result = Math.random() * (upper - lower) + lower;
//
//   return Number(result.toFixed(digits));
// };
//
// const getRandomElements = (array) => {
//   const randomInt = getRandomPositiveInteger(1, array.length);
//   const elements = [];
//
//   while (elements.length < randomInt) {
//     const index = getRandomPositiveInteger(0, array.length - 1);
//     const element = array[index];
//
//     if (!elements.includes(element)) {
//       elements.push(element);
//     }
//   }
//
//   return elements;
// };
//
// const getRandomArrayElement = (elements) =>
//   elements[getRandomPositiveInteger(0, elements.length - 1)];
//
// export {
//   getRandomPositiveInteger,
//   getRandomPositiveFloat,
//   getRandomElements,
//   getRandomArrayElement,
// };
