# Walla Walla Native Plant Support

A Next.js application that provides AI-powered support for native plant information in the Walla Walla region. This application helps farmers and community members with information about native plants, gardening techniques, and conservation practices.

## Features

- 🤖 AI-powered chat interface for plant-related queries
- 🌿 Comprehensive database of native plants in Walla Walla
- 📱 Responsive design for all devices
- 🌍 Focus on local ecology and conservation
- 📊 Structured plant data with seasonal information

## Tech Stack

- Next.js 13
- Material-UI (MUI)
- OpenAI API
- React
- JavaScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Keysej/walla-walla-native-plant-support.git
cd walla-walla-native-plant-support
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
walla-walla-native-plant-support/
├── public/                 # Static files
│   ├── src/
│   │   ├── app/               # Next.js app directory
│   │   │   ├── api/           # API routes
│   │   │   └── page.js        # Main page
│   │   ├── components/        # React components
│   │   └── styles/            # Global styles
│   ├── .env.local            # Environment variables
│   └── package.json          # Project dependencies
```

## Data Structure

The application uses a structured JSON format for plant data, including:
- Plant species information
- Seasonal characteristics
- Soil requirements
- Wildlife support
- Local resources

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Walla Walla Native Plant Society
- Local conservation organizations
- Community members for their support and input
