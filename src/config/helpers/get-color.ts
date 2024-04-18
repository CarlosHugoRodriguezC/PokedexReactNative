import ImageColors from 'react-native-image-colors';

export interface ColorImage {
  background: string;
  accent: string;
}

export const getColorFromImage = async (image: string): Promise<ColorImage> => {
  const fallbackColor = 'grey';
  const fallbackColorAccent = 'white';
  const colors = await ImageColors.getColors(image, {
    fallback: fallbackColor,
  });

  switch (colors.platform) {
    case 'android':
      return {
        background: colors.dominant ?? fallbackColor,
        accent: colors.average ?? fallbackColorAccent,
      };
    case 'ios':
      return {
        background: colors.background ?? fallbackColor,
        accent: colors.primary ?? fallbackColorAccent,
      };
    default:
      return {
        background: fallbackColor,
        accent: fallbackColorAccent,
      };
  }
};
