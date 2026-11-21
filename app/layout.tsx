import './globals.css';

export const metadata = {
  title: 'النصر — نظام إدارة المكتب',
  description: 'نظام إدارة مكتب محاماة وقضايا الائتمان',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
