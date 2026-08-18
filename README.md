# Enterprise Design Systems (React Native)

TypeScript React Native port of the Enterprise Design System with the same component surface as the web components package.

## Features

- **Brand:** Enterprise Design Systems
- **Themes:** light / dark via `ThemeProvider` + `useTheme` / `useOptionalTheme`
- **Icons:** 39 built-in icons (`react-native-svg`) from the shared icon registry
- **Tokens:** numeric spacing/radius + semantic color maps (parity with WC `eds-theme-dark`)
- **Tests:** Jest + React Native Testing Library
- **Storybook:** port `6010` (react-native-web)

## Install

```bash
npm install @poluru-labs/enterprise-design-system-react-native react-native-svg
```

## Usage

```tsx
import {
  ThemeProvider,
  Button,
  Icon,
  showToast,
  ToastProvider,
} from '@poluru-labs/enterprise-design-system-react-native';

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <Button icon="plus" onPress={() => showToast({ title: 'Saved', variant: 'success' })}>
          Save
        </Button>
        <Icon name="settings" size="lg" />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Unit tests |
| `npm run build` | Emit `dist/` types + JS |
| `npm run storybook` | Storybook on **6010** |
| `npm run typecheck` | `tsc --noEmit` |
