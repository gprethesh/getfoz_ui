# GetFoz UI

GetFoz UI is a web application that allows users to trade opinions. This repository contains the front-end code for the application.

## Prerequisites

- Node.js v18
- npm (comes with Node.js)

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gprethesh/getfoz_ui.git
   cd getfoz_ui
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env` file to your project root and update the variables as needed. Here's an example of what it might contain:
   ```env
   VITE_APP_API_URL=https://your-api-url.com
   VITE_APP_WAX_CHAIN=your-chain-id
   VITE_APP_GETFOZ=your-getfoz-value
   VITE_APP_EXPLORE_URL=https://your-explorer-url.com
   ```

4. **Build the Project:**
   ```bash
   npm run build
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

   The application should now be running at [http://localhost:3000](http://localhost:3000) (or the port specified in your configuration).

## Deployment

For deployment, you can follow the steps defined in the `Makefile`, or configure your preferred deployment method.
