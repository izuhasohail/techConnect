import React, { useEffect } from 'react';

const BookingConfirmed = () => {
  useEffect(() => {
    const createConfetti = () => {
      const colors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7',
        '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
        '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
      ];
      const confettiCount = 200;

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-10px';
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear infinite`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.willChange = 'transform';
        confetti.className = 'confetti';
        document.body.appendChild(confetti);

        // Remove confetti after animation to prevent DOM bloat
        setTimeout(() => confetti.remove(), 8000);
      }
    };

    createConfetti();
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            color: '#4CAF50',
            fontSize: '2.5rem',
            marginBottom: '1rem',
            animation: 'pop-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          Booking Confirmed!
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#333',
            marginBottom: '2rem',
            opacity: 0,
            animation: 'fade-in 0.5s ease-out 0.5s forwards',
          }}
        >
          Your booking has been confirmed. Get ready for an amazing experience!
        </p>
      </div>
      <style>
        {`
          @keyframes pop-in {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes fade-in {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes confetti-fall {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default BookingConfirmed;
