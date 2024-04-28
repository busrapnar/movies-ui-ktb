import React, { useEffect } from 'react';

export const RatingNotification: React.FC<{ showNotification: boolean }> = ({ showNotification }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showNotification) {
      timer = setTimeout(() => {
        
        showNotification = false;
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showNotification]);

  return (
    <>
      {showNotification && (
        <div className="bg-accent text-primary p-2 mt-4 rounded-md">
          Thank you for your rating!
        </div>
      )}
    </>
  );
};