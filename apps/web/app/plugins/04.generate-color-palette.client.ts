import { getPaletteFromColor } from '../utils/tailwindHelper';
import type { Shade } from '../utils/tailwindHelper/types';

export default defineNuxtPlugin({
  name: 'generate-color-palette-client',
  async setup() {
    const { fetchSettings } = useInitialSetup();
    await fetchSettings();

    const { getSetting: getPrimaryColor } = useSiteSettings('primaryColor');
    const { getSetting: getSecondaryColor } = useSiteSettings('secondaryColor');
    const { getSetting: getHeaderBackgroundColor } = useSiteSettings('headerBackgroundColor');

    const primaryColor = getPrimaryColor() || '#062633';
    const secondaryColor = getSecondaryColor() || '#31687d';
    const headerColor = getHeaderBackgroundColor() || primaryColor || '#062633';

    const buildPalette = (colorType: string, baseColor: string): Array<Shade & { type: string }> => {
      return getPaletteFromColor(colorType, baseColor).map((item: Shade) => ({
        ...item,
        type: colorType,
      }));
    };

    const colors = [
      ...buildPalette('primary', primaryColor),
      ...buildPalette('secondary', secondaryColor),
      ...buildPalette('header', headerColor),
    ];

    const styleString = colors.reduce((acc: string, { type, weight, rgb }: Shade & { type: string }) => {
      return acc + `--colors-2-${type}-${weight}: ${rgb};`;
    }, '');

    useHead({
      style: [
        {
          innerHTML: `:root { ${styleString} }`,
        },
      ],
    });
  },
});
