# 2026 Life Plan & Execution System

A React-based interactive workbook designed for high-performance personal planning. This application bridges the gap between high-level vision and daily execution, featuring a persistent local storage system, mobile-first execution mode, and gamified progress tracking.

![App Architecture](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/12e33a287dd8b8ab0e6e6a931e43616c/9a284b90-c670-4953-a150-5eacd78d1864/24836009.png)

## 🚀 Key Features

*   **5-Step Planning Framework:**
    *   **Vision:** North Star goals, 12 Power Goals (with progressive disclosure), and High-Impact projects.
    *   **Audit:** Time & Energy logging with color-coded analysis (Red/Yellow/Green).
    *   **Systems:** Daily routines, Pomodoro tracking, and 3x daily reviews.
    *   **Leverage:** The 4 C's (Code, Content, Capital, Collaboration).
    *   **Scorecard:** Friend inventory audit and North Star Metrics.
*   **Execution Mode (Mobile-First):** A simplified, distraction-free interface designed for daily check-ins on mobile devices.
*   **Gamification:** Real-time circular progress tracking and module-specific completion bars.
*   **Data Persistence:** Auto-saves all inputs to browser `localStorage` so data is never lost.
*   **Export:** Built-in "Print to PDF" functionality for hard-copy backups.

## 🛠️ Technology Stack

*   **Core:** React (Functional Components, Hooks)
*   **Styling:** Tailwind CSS (Utility-first styling)
*   **Icons:** Lucide React
*   **Testing:** Jest & React Testing Library

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/life-plan-2026.git
    cd life-plan-2026
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: Ensure you have `lucide-react` and `@testing-library/jest-dom` installed.*

3.  **Run the application:**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🧪 Testing

The application includes a robust test suite covering rendering, logic, and persistence.

**Run tests:**
```bash
npm test
```

**What is tested?**
*   **Default Rendering:** Verifies critical UI elements (Header, Inputs) load correctly.
*   **Progressive Disclosure:** Ensures the "Show All 12 Goals" toggle works.
*   **Execution Mode:** Tests the switch between Desktop Planning and Mobile Execution views.
*   **Persistence:** Verifies that clicking "Save" actually writes data to `localStorage`.
*   **Progress Logic:** Checks if the progress percentage updates dynamically when data is entered.

## 📂 Project Structure

```
src/
├── App.js           # Main application logic and UI components
├── App.test.js      # Jest test suite
├── index.css        # Tailwind directives (@tailwind base/components/utilities)
└── index.js         # React entry point
```

## 🎨 UI & UX Decisions

*   **Progressive Disclosure:** The 12 Power Goals grid is collapsed by default to reduce cognitive load during the initial user experience.
*   **Mobile-First Execution:** The "Execution Mode" strips away planning forms to focus solely on *today's* tasks (MINS, Morning Attack, Reviews).
*   **Visual Feedback:** Save actions trigger a toast notification; progress is visualized with circular and linear bars.

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
