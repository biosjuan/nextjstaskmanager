'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Toaster position='top-center' reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}

export default LayoutProvider;
