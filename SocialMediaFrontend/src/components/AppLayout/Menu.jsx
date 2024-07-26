import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Cargar el archivo JSON
    fetch('/path/to/Menu.json')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error loading menu:', error));
  }, []);

  const renderMenuItems = (items) => {
    return items.map(item => (
      <li key={item.link}>
        <Link to={item.link}>
          <i className={`icon-${item.icon}`} /> {item.title}
        </Link>
        {item.children.length > 0 && (
          <ul>
            {renderMenuItems(item.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav>
      <ul>
        {renderMenuItems(menuItems)}
      </ul>
    </nav>
  );
};

export default Menu;