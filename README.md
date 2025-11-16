# Housing Units Booking Conditions (الطرح الثاني)

A modern React web application for displaying and filtering housing unit booking information with detailed pricing, location, and booking conditions.

## 🚀 Live Demo

**Deployed on Netlify:** https://housing-units-app.netlify.app

## 📋 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Tab Navigation**: Switch between all projects, specific projects (ظلال, ديارنا), other projects, and general conditions
- **Advanced Filtering**: 
  - Search by project name, city, or district
  - Filter by project and city
  - Price range filtering (per square meter and total unit price)
- **Sorting**: Click column headers to sort, or use the sort dropdown with ascending/descending options
- **RTL Support**: Full right-to-left (RTL) support for Arabic content
- **Conditions Display**: Expandable section with general booking conditions and special notes
- **Accessible**: High contrast mode and reduced motion support

## 🛠️ Tech Stack

- **React 18**: UI library
- **CSS3**: Styling with CSS variables and media queries
- **Create React App**: Build tooling
- **Netlify**: Deployment platform

## 📁 Project Structure

```
src/
├── components/
│   ├── HousingTable.js       # Main table component with filtering and sorting
│   ├── HousingTable.css      # Table styles
│   ├── Conditions.js         # Conditions display component
│   └── Conditions.css        # Conditions styles
├── data/
│   └── housingData.js        # Housing data array
├── App.js                    # Main app component
├── App.css                   # Global styles
└── index.js                  # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OmarElsiry/reg_data.git
cd housing-units-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Build for production:
```bash
npm run build
```

### Deploy to Netlify:
```bash
netlify deploy --prod --dir=build
```

## 📊 Data Structure

Each housing unit entry contains:
- `project`: Project name
- `city`: City location
- `district`: District (if applicable)
- `price`: Price per square meter (ج.م)
- `deposit`: Booking deposit amount
- `areaRange`: Range of unit areas in m²
- `unitPrice`: Total unit price range

## 🎨 Customization

### Colors
Edit the CSS variables in `src/App.css`:
```css
:root {
  --primary: #3498db;
  --primary-dark: #2980b9;
  --secondary: #2c3e50;
  /* ... more variables */
}
```

### Data
Update housing data in `src/data/housingData.js`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by Omar Elsiry

## 🔗 Repository

https://github.com/OmarElsiry/reg_data
