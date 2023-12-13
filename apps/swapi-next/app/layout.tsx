import ColorModeSelector from '@swapi-next/components/ColorModeSelector';
import './global.css';
import { Theme } from '@swapi-next/components/theme';
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const metadata = {
  title: 'Welcome to org',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Box>
            <ColorModeSelector />
            {children}
          </Box>
        </Theme>
      </body>
    </html>
  );
}
