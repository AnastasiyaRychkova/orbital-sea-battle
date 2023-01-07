import { themes } from '@storybook/theming';
import theme from './theme';
import '../src/style/fonts/fonts.css';
import '../src/style/root.css';
import '../src/style/text.css';
import '../src/style/typography.css';
import '../src/style/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: theme,
  },
  backgrounds: {
    default: 'secondary-800',
    values: [
      {
        name: 'primary-300',
        value: '#79CF76'
      },
      {
        name: 'secondary-800',
        value: '#1E2C26',
      },
      {
        name: 'secondary-900',
        value: '#15211C',
      },
      {
        name: 'disable-800',
        value: '#2E3D36',
      },
    ]
  }
}