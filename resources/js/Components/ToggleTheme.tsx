import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center">
      <button
        className="flex items-center focus:outline-none"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {
          theme === 'light'
            ?
            <IconSun />
            :
            <IconMoon />
        }
      </button>
    </div>
  );
};

export default ToggleTheme;
