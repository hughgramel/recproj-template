# Recording & Speedrun Project Template (`recproj-template`)

A React 19 + TypeScript + Tailwind CSS v4 template pre-configured for live coding recordings, video demos, and component speedruns.

## Key Features

- **Keystroke Auto-Save**: Configured in `.vscode/settings.json` to automatically save changes after 100ms so the browser updates continuously while you type.
- **No Intrusive Error Popups**: Vite's dev server error overlay is disabled (`server.hmr.overlay: false`) and styled away, preventing large error modals from flashing over your recording mid-keystroke.
- **Resilient UI Error Boundary**: Wrapped in `<RecordingErrorBoundary>`, preserving the last rendered view during temporary syntax/render errors and seamlessly recovering on the next keystroke/update.
- **Tailwind CSS v4 & Emmet Pre-Configured**: VS Code suggestions for Tailwind classes inside strings and JSX Emmet expansions are enabled out of the box.
- **Centered Layout**: A clean white canvas with your component centered horizontally and vertically in the viewport.

## Getting Started

```bash
npm install
npm run dev
```

Or using the `recproj` helper:

```bash
recproj my-component
```
