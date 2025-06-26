import './globals.css'; // Make sure you import your CSS here
import Navbar from '@/components/Navbar'; // Adjust the path based on your folder structure

export const metadata = {
  title: 'Sentiment Analyzer',
  description: 'Analyze movie reviews using AI-powered logic',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* ✅ Add Navbar here */}
        {children}
      </body>
    </html>
  );
}
