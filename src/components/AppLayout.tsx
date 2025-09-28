import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface AppLayoutProps {
  toggleTheme: () => void;
  currentMode: "light" | "dark";
  children: React.ReactNode;
}

export default function AppLayout({ toggleTheme, currentMode, children }: AppLayoutProps) {
  return (
    <div>
      {/* <header className="flex justify-between p-4 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">App</h1>
        <IconButton onClick={toggleTheme} color="inherit">
          {currentMode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </header> */}
      <main>{children}</main>
    </div>
  );
}
