import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  const renderThemeChander = () => {
    if (!mounted) {
      return null;
    }
    const currentTheme = theme === 'system' ? systemTheme : theme;
        if (currentTheme === 'synthwave' ||
        currentTheme === 'dark' ||
        currentTheme === 'halloween' ||
        currentTheme === 'forest' ||
        currentTheme === 'aqua' ||
        currentTheme === 'luxury' ||
        currentTheme === 'dracula' ||
        currentTheme === 'black' ||
        currentTheme === 'business' ||
        currentTheme === 'coffee' ||
        currentTheme === 'night') {
            return (
                  <div className="dropdown dropdown-hover">
                      <SunIcon className="w-7 h-7"/>
                      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li role="button" onClick={() => setTheme('retro')}><a>Retro</a></li>
                          <li role="button" onClick={() => setTheme('cupcake')}><a>Cupcake</a></li>
                          <li role="button" onClick={() => setTheme('bumblebee')}><a>Bumblebee</a></li>
                          <li role="button" onClick={() => setTheme('emerald')}><a>Emerald</a></li>
                          <li role="button" onClick={() => setTheme('corporate')}><a>Corporate</a></li>
                          <li role="button" onClick={() => setTheme('cyberpunk')}><a>Cyberpunk</a></li>
                          <li role="button" onClick={() => setTheme('valentine')}><a>Valentine</a></li>
                          <li role="button" onClick={() => setTheme('garden')}><a>Garden</a></li>
                          <li role="button" onClick={() => setTheme('lofi')}><a>Lofi</a></li>
                          <li role="button" onClick={() => setTheme('pastel')}><a>Pastel</a></li>
                          <li role="button" onClick={() => setTheme('fantasy')}><a>Fantasy</a></li>
                          <li role="button" onClick={() => setTheme('wireframe')}><a>Wireframe</a></li>
                          <li role="button" onClick={() => setTheme('cmyk')}><a>Cmyk</a></li>
                          <li role="button" onClick={() => setTheme('autumn')}><a>Autumn</a></li>
                          <li role="button" onClick={() => setTheme('acid')}><a>Acid</a></li>
                          <li role="button" onClick={() => setTheme('lemonade')}><a>Lemonade</a></li>
                          <li role="button" onClick={() => setTheme('winter')}><a>Winter</a></li>
                      </ul>
                  </div>
            );
          } else {
            return (
              <div className="dropdown dropdown-hover">
                      <MoonIcon className="w-7 h-7"/>
                      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li role="button" onClick={() => setTheme('synthwave')}><a>Synthwave</a></li>
                          <li role="button" onClick={() => setTheme('dark')}><a>Dark</a></li>
                          <li role="button" onClick={() => setTheme('halloween')}><a>Halloween</a></li>
                          <li role="button" onClick={() => setTheme('forest')}><a>Forest</a></li>
                          <li role="button" onClick={() => setTheme('aqua')}><a>Aqua</a></li>
                          <li role="button" onClick={() => setTheme('luxury')}><a>Luxury</a></li>
                          <li role="button" onClick={() => setTheme('dracula')}><a>Dracula</a></li>
                          <li role="button" onClick={() => setTheme('black')}><a>Black</a></li>
                          <li role="button" onClick={() => setTheme('business')}><a>Business</a></li>
                          <li role="button" onClick={() => setTheme('coffee')}><a>Coffee</a></li>
                          <li role="button" onClick={() => setTheme('night')}><a>Night</a></li>
      
                      </ul>
                  </div>
            );
          }
    
  };
  return <>{renderThemeChander()}</>;
};

export default ModeToggle;
