const emotions = ['화난', '행복한', '졸린', '배고픈', '신난'];
const fonts = ['고딕체', '명조체', '바탕체', '굴림체', '수트체'];

export const generateRandomNickname = () => {
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  const font = fonts[Math.floor(Math.random() * fonts.length)];
  return `${emotion} ${font}`;
};
