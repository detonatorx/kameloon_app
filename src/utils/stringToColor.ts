export function stringToColor(str: string | undefined) {
  if (!str) {
    return 'red';
  }

  // Преобразуем строку в хеш
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Генерация цвета
  let color = '#' + ((hash >> 16) & 0xFFFFFF).toString(16).padStart(6, '0');

  // Проверка на слишком светлый или слишком темный цвет
  const isLight = (hex) => {
    const rgb = parseInt(hex.slice(1), 16); // Преобразуем hex в число
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    // Вычисляем яркость по формуле:
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness > 200; // Светлый цвет
  };

  // Генерируем новый цвет, если он слишком светлый или темный
  if (isLight(color)) {
    color = '#' + ((hash >> 8) & 0xFFFFFF).toString(16).padStart(6, '0'); // Изменение цвета, если слишком светлый
  }

  return color;
}
