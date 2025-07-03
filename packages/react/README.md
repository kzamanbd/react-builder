# DnD Page Builder

A powerful drag-and-drop page builder for React applications. This package provides a comprehensive set of components, hooks, and utilities for building customizable page editors with a block-based approach.

## Features

- 🧩 **Block-Based Architecture**: Build pages using pre-defined or custom blocks
- 🖱️ **Drag and Drop Interface**: Intuitive drag-and-drop functionality using React DND
- 🔄 **Undo/Redo Support**: Built-in history management with Redux Undo
- 📱 **Responsive Design**: Create responsive layouts that work across devices
- 🎨 **Customizable UI**: Extensive styling options with Tailwind CSS
- 🧰 **Extensible API**: Easily extend with custom blocks and functionality
- 🔌 **Plugin System**: Support for third-party plugins and extensions
- 📦 **Tree-Shakable**: Import only what you need

## Installation

```bash
# Using npm
npm install @dndbuilder.com/react

# Using yarn
yarn add @dndbuilder.com/react

# Using pnpm
pnpm add @dndbuilder.com/react
```

## Quick Start

```jsx
import React from "react";
import { Editor, BuilderProvider } from "@dndbuilder.com/react";
import { store } from "@dndbuilder.com/react";
import "@dndbuilder.com/react/dist/style.css";

function App() {
  // Optional: Initial content for the editor
  const [initialContent, setInitialContent] = useState({});

  return (
    <BuilderProvider store={store}>
      <Editor 
        content={initialContent}
        builderConfig={editorConfig} 
      />
    </BuilderProvider>
  );
}

export default App;
```

## Saving Content

To save content, you can use the `useContent` hook to access the editor state.

```jsx
import { useContent } from "@dndbuilder.com/react";
function MyComponent() {
  const { content, saveContent } = useContent();

  const handleSave = () => {
    // Save content to your backend or local storage
    console.log("Saving content:", content);
    saveContent();
  };

  return <button onClick={handleSave}>Save Content</button>;
}
```

## Rendering Content

To render content on the frontend, use the `RenderContent` component.

```jsx
import { RenderContent } from "@dndbuilder.com/react/components/server";
async function MyPage() {
  const content = await fetchContent(); // Fetch content from your backend
  return <RenderContent content={content} />;
}
```

## Custom Block

The page builder allows you to create custom blocks or override existing block configurations.

### Creating a Custom Block

To create a custom block, you need to:

1. Create a component for your block
2. Define the block configuration using `createBlockConfig` utility
3. Include the block in your editor configuration

```jsx
// 1. Create your block component (card.block.tsx)
import { BlockProps } from "@dndbuilder.com/react";
import { FC } from "react";
import { CardSettingsType } from "../types";

export const CardBlock: FC<BlockProps<CardSettingsType>> = ({ settings, meta }) => {
  return (
    <div className="my-custom-card">
      <h3>{settings.title}</h3>
      <p>{settings.description}</p>
    </div>
  );
};

export default CardBlock;

// 2. Define your block configuration (card.config.ts)
import { BlockGroup } from "@dndbuilder.com/react";
import { createBlockConfig } from "@dndbuilder.com/react/utils";
import { lazy } from "react";
import { FiSquare } from "react-icons/fi";
import { CardSettingsType } from "./types";

const CardConfig = createBlockConfig<CardSettingsType>({
  type: "card", // Custom block type
  label: "Card",
  icon: FiSquare,
  component: lazy(() => import("./components/card.block")),
  isVisible: () => true,
  group: "Custom", // Group under Custom blocks
  settings: {},
  style: ({ settings, breakpoints }) => {
    return {};
  },
  controls: [
    {
      label: "Style",
      component: lazy(() => import("./components/card-style.control")),
    },
    {
      label: "Content",
      component: lazy(() => import("./components/card-content.control")),
    },
  ],
});

export default CardConfig;

// 3. Include the block in your editor configuration (editor.config.ts)
import CardConfig from "../components/blocks/card/card.config";

export const editorConfig = {
  blocks: [
    CardConfig,
    // Other blocks...
  ],
  // Other configuration options...
};
```

### Overriding an Existing Block

You can override the configuration of an existing block by extending the existing block configuration:

```jsx
import { BlockType } from "@dndbuilder.com/react";
import { createBlockConfig } from "@dndbuilder.com/react/utils";
import { lazy } from "react";

// Create a custom component for the existing block type
const CustomHeadingBlock = ({ settings, meta }) => {
  return (
    <h2 className="my-custom-heading-style">
      {settings.text}
    </h2>
  );
};

// Override the Heading block configuration
const CustomHeadingConfig = createBlockConfig({
  type: BlockType.HEADING, // Use the existing block type
  component: lazy(() => import("./components/custom-heading.block")),
  // Override other properties as needed
  controls: [
    {
      label: "Custom Style",
      component: lazy(() => import("./components/custom-heading-style.control")),
    },
  ],
});

// Include the overridden block in your editor configuration
export const editorConfig = {
  blocks: [
    CustomHeadingConfig,
    // Other blocks...
  ],
};

// Use the custom configuration when rendering content
function PreviewPage() {
  const content = fetchContent();
  return <RenderContent content={content} builderConfig={editorConfig} />;
}
```

You can override any property of an existing block, including:

- `component`: The component used in the editor
- `previewComponent`: The component used for preview
- `settings`: Default settings for the block
- `controls`: Controls for the block settings
- `style`: Function to generate CSS styles for the block

The custom configuration is deep-merged with the existing configuration, so you only need to specify the properties you want to override.
