# Nutrition Tracker App

![Captura de tela 2025-04-27 165401](https://github.com/user-attachments/assets/2f66d2f6-ec54-4a50-b400-24e7a1876bc7)

### Overview
A comprehensive web application for tracking nutritional information about foods. Works both online (with real-time data from Nutritionix API) and offline (with local database), providing a fast, responsive experience across all devices.

### Features
#### Dual Mode Operation
- **Online Mode**: Real-time data from Nutritionix API
- **Offline Mode**: Comprehensive local database fallback

#### Food Categories
- Fruits (15+ items)
- Vegetables (15+ items)
- Proteins (15+ items)
- Grains (15+ items)
- Dairy (15+ items)
- Snacks (15+ items)

#### Advanced Functionality
- **Sorting**:
  - Name (A-Z/Z-A)
  - Calories (Low-High/High-Low)
- **Filtering**:
  - All items
  - Low Calories (<100)
  - High Calories (≥100)

#### UI/UX Features
- Fully responsive design
- Dark/light mode support
- Real-time status monitoring
- Last update timestamp

### Technologies
#### Frontend
- React (Vite)
- CSS3 (Variables, Grid, Flexbox)
- Responsive Web Design

#### Backend Integration
- Nutritionix API
- Local data fallback system

#### Build Tools
- Vite
- ESLint

---

## 🧩 Project Structure

```
nutrition-tracker/
├── src/
│ ├── App.jsx # Main component
│ ├── List.jsx # List component
│ ├── main.jsx # Entry point
│ ├── index.css # Global styles
│ └── README.md # Documentation
├── public/
│ └── index.html # HTML template
├── package.json # Dependencies
├── vite.config.js # Vite configuration
└── eslint.config.js # ESLint configuration
```

---


### ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nutrition-tracker.git
cd nutrition-tracker
```

2. Install the dependencies:
```bash
npm install
```

3. Set up the environment:
```bash
VITE_NUTRITIONIX_ID=your_app_id
VITE_NUTRITIONIX_KEY=your_app_key
```

4. Start the development server:

```bash
npm run dev
```

#### 🌐 API Setup

1. Create an account on Nutritionix
2. Obtain your API credentials
3. Add them to your ```.env``` file

```javascript
{
  category: [
    {
      id: Number,
      name: String,
      calories: Number
    }
  ]
}
```

🔄 Comportamento do Sistema
1. Attempt API connection
2. Fallback to local data if offline
3. Periodic connection checks (10min interval)

📜 License
  MIT License

🙏Credits
  API Nutritionix, 
  Vite Development Team & 
  React Community
