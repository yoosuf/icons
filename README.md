# @yoosuf/icons

A comprehensive collection of SVG icons for Vue 3 applications, built with TypeScript and Vite. Each icon is optimized for Vue 3 and supports customization through props.

## Features

- 🎨 Customizable colors and sizes
- 💪 TypeScript support
- 🔧 Tree-shakeable
- 🎯 ESM and UMD builds
- 📦 Small bundle size
- 🎉 Vue 3 compatible

## Installation

```bash
npm install @yoosuf/icons
```

## Usage

```vue
<template>
  <div>
    <ActivityIcon class="icon" :width="24" :height="24" fill="currentColor" />
    <UserIcon class="icon" :width="32" :height="32" fill="#FF5733" />
  </div>
</template>

<script setup lang="ts">
import { ActivityIcon, UserIcon } from '@yoosuf/icons';
</script>

<style scoped>
.icon {
  margin: 0 8px;
}
</style>
```

## Props

Each icon component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | String | '24' | Icon width |
| height | String | '24' | Icon height |
| fill | String | 'currentColor' | Fill color |
| stroke | String | 'none' | Stroke color |
| class | String | '' | CSS class |
| style | String | '' | Inline styles |
| viewBox | String | '0 0 24 24' | SVG viewBox |
| ariaHidden | Boolean | true | Sets aria-hidden attribute |

## Local Development

### Building the Package

1. Clone the repository:
```bash
git clone https://github.com/yoosuf/icons.git
cd icons
```

2. Install dependencies:
```bash
npm install
```

3. Build the package:
```bash
npm run build
```

### Local Testing with npm link

1. In the icons package directory, create a global symlink:
```bash
cd /path/to/icons
npm link
```

2. In your test project, link to the icons package:
```bash
cd /path/to/your-project
npm link @yoosuf/icons
```

3. Import and use the icons in your project:
```vue
<template>
  <ActivityIcon width="32" height="32" fill="#42b883" />
</template>

<script setup lang="ts">
import { ActivityIcon } from '@yoosuf/icons';
</script>
```

4. When making changes to the icons package:
```bash
cd /path/to/icons
npm run build  # Rebuild the package
```
Changes will be immediately reflected in your test project.

5. To unlink when done testing:
```bash
# In your test project
npm unlink @yoosuf/icons

# In the icons package
npm unlink
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Yoosuf]
