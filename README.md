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
├── .webpack/         # Webpack build artifacts (auto-generated)
├── node_modules/     # Installed dependencies from npm
├── src/              # Application source code
├── out/              # Output folder for builds
├── package.json      # npm configuration
├── README.md         # You're reading it!
```

## ➕ Adding Applications
You can add applications for the launcher to manage in a couple of ways:

- If no apps are configured, you’ll see the message:
*Looks like you have no applications configured* along with a button labeled Add Application.

- Alternatively, click the cogs icon in the top right, then select Add Application.

## 🛠 Add Application Workflow
1. Click "Select Project"
This opens a file picker. Navigate to the .csproj file of the application you want to add and select it.

2. Configuration Fields
Once a project is selected, some fields will auto-populate:

- App Name
    - A friendly name for display purposes. You can change this to whatever you like.

- Executable
    - The expected output file name (e.g., my.project.exe).
    - This is usually auto-filled and shouldn’t be changed unless your project produces an executable with a custom name.

- Port
    - The port the application runs on. Required if you're not using a launch profile.

- SSL (checkbox)
    - Enable if the app runs with HTTPS.

- Launch Profile (optional)
    - Use this if you prefer launching via a defined Visual Studio or launchSettings.json profile instead of specifying a port.
    - *Note: This feature works but is still under development and may be unstable.*

- App Type
    - Tells the launcher how to handle the app. Supported types:
        - Azure Function
        - Console
        - API
        - UI
        - API with Swagger
    - If you select "API with Swagger", a link to the Swagger page will be shown when the app is running.

- URL (auto-populated)
    - If applicable (e.g., for Swagger-enabled APIs), this will auto-fill with the path to the Swagger UI or file.
    - You can edit this manually if your app uses a non-standard path.

## 📌 Notes
Only Windows is currently supported for the built executable.

Ensure all app dependencies are correctly installed via npm install before building or starting the app.

## 📃 License
MIT License – feel free to use, modify, and distribute.