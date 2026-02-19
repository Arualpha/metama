import React, { useState } from 'react';

// Your Data is now inside the code!
const data = {
  "names": { "sender": "Ram", "receiver": "Patootie" },
  "theme": { "primaryColor": "#ff7ab2", "secondaryColor": "#ff4d8d", "accentColor": "#ffc0cb", "fontFamily": "Arial, sans-serif" },
  "content": {
    "title": "Will you be my Valentine?",
    "subtitle": "Choose wisely. (The \"No\" button is... shy.)",
    "yesButtonText": "YES ❤️",
    "noButtonText": "NO 💔",
    "successMessage": "💖 YAYYYYY!!! 💖",
    "successSubtitle": "That's the best decision you've ever made ❤️😘",
    "photosTitle": "Every Moment with You!📸",
    "songsTitle": "Our Love Sounds Like This!🎵",
    "letterTitle": "To the Girl I Love most!❤️"
  },
  "media": {
    "mainBearGif": "https://media.tenor.com/j840j77AnisAAAAi/bubududu-panda.gif",
    "kissBearGif": "https://media.tenor.com/gU_Pb_99U08AAAAi/goma-peach.gif"
  },
  "couplePhotos": [
    { "image": "https://via.placeholder.com/400", "caption": "Our first special moment together" },
    { "image": "https://via.placeholder.com/400", "caption": "Cooking memories together" }
  ],
  "letter": {
    "title": "My Dearest Patootie,",
    "content": [
      "I fell for you in a way I never expected, and now every day feels brighter just because you're in it.",
      "Loving you comes so naturally. It's in your smile, your laugh, and the comfort I feel whenever I'm with you."
    ],
    "signature": "Forever yours,\nRam"
  }
};

export default function App() {
  const [page, setPage] = useState('invite');
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ top: 0, left: 0 });

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPos({ top: y, left: x });
    setNoCount(noCount + 1);
  };

  const yesButtonSize = noCount * 15 + 18;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ backgroundColor: data.theme.accentColor, fontFamily: data.theme.fontFamily }}>
      
      {page === 'invite' && (
        <div className="flex flex-col items-center text-center">
          <img src={data.media.mainBearGif} className="w-64 h-64 mb-6" alt="Cute Bear" />
          <h1 className="text-4xl font-bold mb-2" style={{ color: data.theme.secondaryColor }}>{data.content.title}</h1>
          <p className="mb-8 opacity-75">{data.content.subtitle}</p>
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={() => setPage('success')}
              style={{ fontSize: `${yesButtonSize}px`, backgroundColor: data.theme.secondaryColor }}
              className="px-8 py-4 text-white font-bold rounded-full shadow-xl"
            >
              {data.content.yesButtonText}
            </button>
            <button
              onMouseEnter={moveButton}
              style={{ 
                position: noCount > 0 ? 'fixed' : 'relative',
                top: noCount > 0 ? noButtonPos.top : 'auto',
                left: noCount > 0 ? noButtonPos.left : 'auto',
              }}
              className="px-6 py-2 bg-gray-400 text-white font-bold rounded-full"
            >
              {data.content.noButtonText}
            </button>
          </div>
        </div>
      )}

      {page === 'success' && (
        <div className="text-center animate-fadeIn">
          <img src={data.media.kissBearGif} className="w-60 h-60 mx-auto mb-6" alt="Kisses" />
          <h2 className="text-4xl font-bold mb-4" style={{ color: data.theme.secondaryColor }}>{data.content.successMessage}</h2>
          <p className="text-xl mb-8 italic">{data.content.successSubtitle}</p>
          <button onClick={() => setPage('letter')} className="p-4 bg-white rounded-xl shadow-lg font-bold" style={{ color: data.theme.primaryColor }}>
             Read my Letter 💌
          </button>
        </div>
      )}

      {page === 'letter' && (
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4" style={{ color: data.theme.secondaryColor }}>{data.letter.title}</h2>
          {data.letter.content.map((p, i) => <p key={i} className="mb-4 text-gray-700">{p}</p>)}
          <p className="mt-8 font-bold whitespace-pre-line text-right">{data.letter.signature}</p>
          <button onClick={() => setPage('invite')} className="mt-6 text-sm underline opacity-50">Back to start</button>
        </div>
      )}
    </div>
  );
}