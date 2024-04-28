import React from 'react';

interface Props {
  showNotification: boolean;
}

export const RatingNotification: React.FC<Props> = ({ showNotification }) => (
  <>
    {showNotification && (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-accent  text-primary p-4 rounded shadow-lg">
          Oy gönderildi!
        </div>
      </div>
    )}
  </>
);
