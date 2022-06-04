//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandom = (min, max) => {
  if (max === undefined || min === undefined) {
    return 'Введите все аргументы функции';
  }
  if (min===max) {
    return 'Диапазоном не может быть одно число';
  }
  if (min>max) {
    return 'Введите корректный диапазон "от...до"';
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
// eslint-disable-next-line no-console
console.log('Проверка первой функции'); console.log('getRandom(1,1):'); console.log(getRandom(1,1)); console.log('getRandom(2,1):'); console.log(getRandom(2,1)); console.log('getRandom():'); console.log(getRandom()); console.log('getRandom(2,7):'); console.log(getRandom(2,7));

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomWithDot = (min, max, dot) => {
  if (max === undefined || dot === undefined || min === undefined) {
    return 'Введите все аргументы функции';
  }
  if (min===max) {
    return 'Диапазоном не может быть одно число';
  }
  if (min>max) {
    return 'Введите корректный диапазон "от...до"';
  }
  const randDot = min + Math.random() * (max - min);
  return randDot.toFixed(dot);
};
// eslint-disable-next-line no-console
console.log('Проверка второй функции'); console.log('getRandomWithDot(1,1,1):'); console.log(getRandomWithDot(1,1,1)); console.log('getRandomWithDot(2,1,1):'); console.log(getRandomWithDot(2,1,1)); console.log('getRandomWithDot():'); console.log(getRandomWithDot()); console.log('getRandomWithDot(2,7,2):'); console.log(getRandomWithDot(2,7,2));
