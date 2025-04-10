# dev-app-launcher

**dev-app-launcher** is a simple utility application for starting and stopping other applications. It's built with Node.js and designed to streamline local development workflows.

---

## 🚀 Features

- Launch and stop apps with ease
- Ideal for managing dev tools or microservices
- Electron-based for a simple GUI experience

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/) (optional, but recommended)

---

## 🧪 Run in Development Mode

To run the app from VS Code or any other IDE:

```bash
npm start
```

This launches the application in development mode with hot-reload enabled (if supported).

---

## 📦 Build the Executable
To create a Windows executable:

Open a terminal and navigate to the root of the repository.

Run:

```bash
npm run make
```
After the build completes, a folder named out/dev-app-launcher-win32-x64 will be created.

Inside this folder, you'll find the executable:

dev-app-launcher.exe
You can now distribute or run this .exe directly.

## 📁 Project Structure
```bash
dev-app-launcher/
├── src/              # Application source code
├── out/              # Output folder for builds
├── package.json      # npm configuration
├── README.md         # You're reading it!
```

## 📌 Notes
Only Windows is currently supported for the built executable.

Ensure all app dependencies are correctly installed via npm install before building or starting the app.

## 📃 License
MIT License – feel free to use, modify, and distribute.