#!/bin/bash

echo "📌 יוצרים את תיקיית הפרויקט ומתקינים את התלויות..."
npm install electron zustand axios react-router-dom tailwindcss postcss autoprefixer

npx tailwindcss init -p

echo "📌 מגדירים את Tailwind ב- CSS..."
cat <<EOT > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOT

echo "📌 יוצרים תיקיות וקובצי קוד..."
mkdir -p src/services src/components src/store



# יצירת קובץ API
cat <<EOT > src/services/api.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchDevices = async () => {
  const response = await axios.get(\`\${API_URL}/devices\`);
  return response.data;
};
EOT

# עדכון `package.json` להוספת סקריפטים
echo "📌 מעדכנים את package.json..."
jq '.scripts += {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "electron": "electron ."
}' package.json > temp.json && mv temp.json package.json

echo "✅ הפרויקט נוצר בהצלחה!"
echo "🚀 להרצת ה-Client, השתמש בפקודה:"
echo "npm start"