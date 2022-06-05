//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandom = (min, max) => {
  if (max === undefined || min === undefined) {
    return 'Введите все аргументы функции';
  }
  if (max === min) {
    return 'Диапазоном не может быть одно число';
  }
  if (min > max) {
    return 'Введите корректный диапазон "от...до"';
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
// eslint-disable-next-line no-console
console.log('Проверка первой функции'); console.log('getRandom(1,1):'); console.log(getRandom(1, 1)); console.log('getRandom(2,1):'); console.log(getRandom(2, 1)); console.log('getRandom():'); console.log(getRandom()); console.log('getRandom(2,7):'); console.log(getRandom(2, 7));

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomWithPoint = (min, max, point) => {
  if (max === undefined || point === undefined || min === undefined) {
    return 'Введите все аргументы функции';
  }
  if (max === min) {
    return 'Диапазоном не может быть одно число';
  }
  if (min > max) {
    return 'Введите корректный диапазон "от...до"';
  }
  const randPoint = min + Math.random() * (max - min);
  return randPoint.toFixed(point);
};
// eslint-disable-next-line no-console
console.log('Проверка второй функции'); console.log('getRandomWithPoint(1,1,1):'); console.log(getRandomWithPoint(1, 1, 1)); console.log('getRandomWithPoint(2,1,1):'); console.log(getRandomWithPoint(2, 1, 1)); console.log('getRandomWithPoint():'); console.log(getRandomWithPoint()); console.log('getRandomWithPoint(2,7,2):'); console.log(getRandomWithPoint(2, 7, 2));
