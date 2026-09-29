# Steeve Translate

Google Translate, minus the nonsense. Type in either box to translate, with autoplay, turn-by-turn conversation mode, and custom speeds and voices.

## Features

- Type in either box to translate into the other
- Turn-by-turn conversation mode
- Autoplay translations
- Custom speed and voice per language
- Voice input and dark mode

## How it works

The whole app is [`index.html`](index.html): no build step, no dependencies, no backend.

- Translation uses the same free Google endpoint as the Chrome translate extension.
- Speech uses Google Translate's voice, falling back to the device's built-in voices.
- Voice input uses the browser's speech recognition, so it works in Chrome, Safari and Edge, but not Firefox or Brave.

These Google endpoints are unofficial, so they may be rate limited or change without notice.

## Development

Open `index.html` in a browser, or run it through the Worker locally:

```sh
nvm use
npm install
npm run dev   # http://localhost:8787/translate
```
