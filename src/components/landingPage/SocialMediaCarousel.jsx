import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay'; // Importa los estilos de autoplay si es necesario

const SocialMediaCarousel = () => {
  const socialIcons = [
    { icon: 'fab fa-facebook', url: '#', color: 'bg-primary' },
    { icon: 'fab fa-instagram', url: '#', color: 'bg-gradient-danger' },
    { icon: 'fab fa-twitter', url: '#', color: 'bg-info' },
    { icon: 'fab fa-soundcloud', url: '#', color: 'bg-gradient-warning' },
    { icon: 'fab fa-youtube', url: '#', color: 'bg-danger' },
    { icon: 'fab fa-spotify', url: '#', color: 'bg-success' },
    { icon: 'fab fa-tiktok', url: '#', color: 'bg-dark' },
    { icon: 'fab fa-pinterest', url: '#', color: 'bg-gradient-danger' },
  ];

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      loop={true}
     
      autoplay={{
        delay: 3000, // Tiempo en ms entre cada transición
        disableOnInteraction: false, // Habilita autoplay incluso después de interacciones
      }}
      style={{ width: '90%', maxWidth: '1200px', marginTop: '-50px' }}
    >
      {socialIcons.map((social, index) => (
        <SwiperSlide key={index}>
          <div className={`${social.color}`} style={{ textAlign: 'center', height: '100px', padding: '30px', minWidth: '100px' }}>
            <div className="icon">
              <i className={social.icon} style={{ fontSize: '3rem' }} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SocialMediaCarousel;
