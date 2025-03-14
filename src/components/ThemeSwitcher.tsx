
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  // Get the current theme icon
  const getCurrentThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5 text-amber-500" />;
      case 'dark':
        return <Moon className="h-5 w-5 text-indigo-400" />;
      case 'cyber':
        return <Palette className="h-5 w-5 text-cyan-400" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full w-10 h-10">
          {getCurrentThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-2">
        <DropdownMenuItem 
          onClick={() => setTheme('light')} 
          className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 ${theme === 'light' ? 'bg-accent' : ''}`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')} 
          className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 ${theme === 'dark' ? 'bg-accent' : ''}`}
        >
          <Moon className="h-4 w-4 text-indigo-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('cyber')} 
          className={`flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 ${theme === 'cyber' ? 'bg-accent' : ''}`}
        >
          <Palette className="h-4 w-4 text-cyan-400" />
          <span>Cybermorphism</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
