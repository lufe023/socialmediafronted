import React, { useState, useEffect } from 'react';

const WhatsAppChatBubble = () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 3000); // Se cierra después de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    setShowText(false);
  };

  return (
    <div 
      style={{ 
        ...styles.whatsappChat, 
        width: showText ? '270px' : '49px', // Ajusta el ancho según el estado
        overflow: 'hidden',
      }} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <a href="https://wa.me/message/YMFN5X4CFQF2K1" target="_blank" rel="noopener noreferrer" style={styles.link}>
        <i alt="WhatsApp Chat" className="fab fa-whatsapp" style={styles.icon}></i>
        {showText && <span style={styles.text}>Chatear con un representante</span>}
        &nbsp;
      </a>
    </div>
  );
};

const styles = {
  whatsappChat: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    transition: 'width 0.3s ease', // Transición suave del ancho
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  text: {
    marginLeft: '10px',
    fontSize: '16px',
    color: '#333',
    whiteSpace: 'nowrap',
    opacity: 1, // El texto será visible cuando showText sea true
    transition: 'opacity 0.3s ease', // Transición suave de la opacidad
  },
  icon: {
    fontSize: '30px',
    color: '#25D366',
    transition: 'none', // Asegura que el ícono no cambie de tamaño ni color
  },
};

export default WhatsAppChatBubble;
