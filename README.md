# IcoMoon Asset Updater


Automate your IcoMoon icon font workflow!

This CLI tool helps you update, extract, and integrate [IcoMoon](https://icomoon.io/) icon fonts into your web projects with a single command.

- 🚀 Opens the IcoMoon app for you
- 📦 Extracts and copies font files and selection.json
- 🛡️ Generates a SCSS partial
- 🧹 Cleans up temporary files

Keywords: icomoon, icon font, automation, cli, scss, webfonts, asset pipeline

---

## Features

- Cross-platform (Mac, Linux, Windows)
- No dependencies (uses Node.js built-ins and ANSI colors)
- Friendly CLI with clear instructions and color output

---

## Usage

1. **Clone this repository:**
   ```sh
   git clone https://github.com/yourusername/icomoon-asset-updater.git
   cd icomoon-asset-updater
   ```

2. **Place the script in your project root** (or use as-is).

3. **Add to your `package.json` scripts:**
   ```json
   "scripts": {
     "icomoon": "node update-icomoon.js"
   }
   ```

4. **Run the tool:**
   ```sh
   npm run icomoon
   ```

5. **Follow the CLI instructions:**
   - Open IcoMoon, edit/generate your font, and download the zip as `icomoon.zip` to your project root.
   - The script will extract, copy, and update your assets.

---

## Requirements

- Node.js (v14+ recommended)
- [unzip](https://linux.die.net/man/1/unzip) command available in your system

---

## How it works

- Opens the IcoMoon app in your browser (optional)
- Waits for you to download and place the zip file
- Extracts font files and selection.json
- Generates a SCSS partial
- Cleans up temporary files

---

## License

MIT

---

## Credits

Created by [Fernanda Leite](https://github.com/nandaleite).
