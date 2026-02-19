import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

// --- MAIN ASSETS ---
import bearGif from './assets/rose-bear.gif';
import childGif from './assets/child.gif'; 
import photoBear from './assets/photo-bear.gif';
import musicBear from './assets/music-bear.gif';
import cookBear from './assets/cook-bear.gif';
import cuteBear from './assets/cute-bear.gif';
import gift1 from './assets/gift/gift1.jpg'; 
import gift2 from './assets/gift/gift2.jpg'; 
import gift3 from './assets/gift/gift3.jpg'; 

// --- ALBUM COVERS ---
import aasaOraveArt from './assets/album-covers/aasa_orave.jpg';
import cuckooArt from './assets/album-covers/cuckoo.jpg';
import ghajiniArt from './assets/album-covers/ghajini.jpg';
import katradhuArt from './assets/album-covers/katradhu-tamizh.jpg';
import mundasupattiArt from './assets/album-covers/mundasupatti.jpg';
import unVizhigalilArt from './assets/album-covers/Un-Vizhigalil.jpg'; 
import railinOligalArt from './assets/album-covers/Railin Oligal.jpg'; 

// --- AUDIO IMPORTS ---
import oruMaalaiFile from './assets/songs/Oru-Maalai.mp3';
import agasathaFile from './assets/songs/agasatha.mp3';
import unakagathanaeFile from './assets/songs/unakagathanae.mp3';
import aasaOraveFile from './assets/songs/Aasa-Orave.mp3';
import kadhalKanaveFile from './assets/songs/kadhal-kanave.mp3';
import unVizhigalilFile from './assets/songs/Un-Vizhigalil.mp3';
import railinOligalFile from './assets/songs/Railin Oligal.mp3';

// --- PHOTO GALLERY ---
import photo1 from './assets/couple_photo/couple_photo_1.jpg';
import photo2 from './assets/couple_photo/couple_photo_2.jpg';
import photo3 from './assets/couple_photo/couple_photo_3.jpg';
import photo4 from './assets/couple_photo/couple_photo_4.jpg';
import photo5 from './assets/couple_photo/couple_photo_5.jpg';
import photo6 from './assets/couple_photo/couple_photo_6.jpg';

const animationStyles = `
  @keyframes twinkle {
    0% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0.3; transform: scale(1); }
  }
  @keyframes floatHeart {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
  }
  @keyframes shootingStar {
    0% { transform: translateX(0) translateY(0) rotate(-45deg) scale(0); opacity: 0; }
    10% { opacity: 1; scale(1); }
    20% { transform: translateX(-1000px) translateY(1000px) rotate(-45deg) scale(1); opacity: 0; }
    100% { transform: translateX(-1000px) translateY(1000px) rotate(-45deg) scale(0); opacity: 0; }
  }
  @keyframes giftFloat {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  .gift-card:hover {
    transform: scale(1.05) rotate(2deg) !important;
    transition: all 0.3s ease;
  }
`;

export default function App() {
  const [page, setPage] = useState('invite'); 
  const [selectedGift, setSelectedGift] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [proIndex, setProIndex] = useState(0);
  const [hasSeenPros, setHasSeenPros] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4b81', '#ffffff', '#ffdae1']
    });
  };

  const songs = [
    { id: '01', title: 'Un-Vizhigalil', file: unVizhigalilFile, art: unVizhigalilArt, album: 'Un-Vizhigalil', duration: '4:03' },
    { id: '02', title: 'Railin Oligal', file: railinOligalFile, art: railinOligalArt, album: 'Blue Star', duration: '3:50' },
    { id: '03', title: 'Oru Maalai', file: oruMaalaiFile, art: ghajiniArt, album: 'Ghajini', duration: '5:37' },
    { id: '04', title: 'Agasatha', file: agasathaFile, art: cuckooArt, album: 'Cuckoo', duration: '4:59' },
    { id: '05', title: 'Unakagathanae', file: unakagathanaeFile, art: katradhuArt, album: 'Katradhu Tamizh', duration: '4:51' },
    { id: '06', title: 'Aasa Orave', file: aasaOraveFile, art: aasaOraveArt, album: 'Aasa Orave', duration: '5:41' },
    { id: '07', title: 'Kadhal Kanave', file: kadhalKanaveFile, art: mundasupattiArt, album: 'Mundasupatti', duration: '4:08' }
  ];

  const pros = [
    { text: "Your personal photographer for all the cute moments 📸", icon: photoBear },
    { text: "Live singing performances... just for you 🎶 😚", icon: musicBear },
    { text: "I'll cook your fav food like it's my love language 🍳", icon: cookBear },
    { text: "Unlimited back rubs and forehead kisses 💆‍♀️", icon: cuteBear },
    { text: "I'll always be your biggest cheerleader 📣", icon: bearGif },
    { text: "Falling for you more and more every single day ❤️", icon: bearGif }
  ];

  const photos = [
    { img: photo1, caption: "Our first special moment together" },
    { img: photo2, caption: "When you made me smile like this" },
    { img: photo3, caption: "Our favorite music moments" },
    { img: photo4, caption: "Your comforting presence" },
    { img: photo5, caption: "A memory I'll cherish forever" },
    { img: photo6, caption: "You, me, and pure happiness" }
  ];

  const playSong = (index) => {
    if (audioRef.current) { audioRef.current.pause(); }
    const newAudio = new Audio(songs[index].file);
    audioRef.current = newAudio;
    setCurrentSongIndex(index);
    newAudio.play().then(() => setIsPlaying(true)).catch(e => console.log("Play blocked", e));
    newAudio.onended = handleNextSong;
  };

  const togglePlay = () => {
    if (!audioRef.current) { playSong(currentSongIndex); return; }
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const handleNextSong = () => playSong((currentSongIndex + 1) % songs.length);
  const handlePrevSong = () => playSong((currentSongIndex - 1 + songs.length) % songs.length);
  const handleNextPro = () => setProIndex((prev) => (prev + 1) % pros.length);
  const handlePrevPro = () => setProIndex((prev) => (prev - 1 + pros.length) % pros.length);

  const wrapperStyle = { 
    height: '100vh', width: '100vw', background: 'linear-gradient(to bottom, #050510 0%, #101025 100%)', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, 
    fontFamily: '"Segoe UI", Roboto, sans-serif', position: 'fixed', top: 0, left: 0, overflow: 'hidden' 
  };

  const cardStyle = { 
    backgroundColor: 'white', padding: '30px', borderRadius: '40px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', 
    textAlign: 'center', width: '90%', maxWidth: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 20
  };
  
  const backButtonStyle = {
    marginTop: '20px', backgroundColor: '#ef4b81', color: 'white', padding: '10px 25px', 
    border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer'
  };

  return (
    <div style={wrapperStyle}>
      <style>{animationStyles}</style>

      {/* Twinkling Stars */}
      {[...Array(50)].map((_, i) => (
        <div key={`star-${i}`} style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '2px', height: '2px', backgroundColor: 'white', borderRadius: '50%', animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`, opacity: Math.random() }} />
      ))}

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <div key={`shooting-${i}`} style={{ position: 'absolute', top: `${Math.random() * 50}%`, left: `${Math.random() * 100}%`, width: '150px', height: '2px', background: 'linear-gradient(to right, white, transparent)', transform: 'rotate(-45deg)', animation: `shootingStar ${Math.random() * 5 + 10}s infinite linear`, animationDelay: `${Math.random() * 10}s`, opacity: 0 }} />
      ))}

      {/* Floating Hearts */}
      {page !== 'invite' && [...Array(15)].map((_, i) => (
        <div key={`heart-${i}`} style={{ position: 'absolute', left: `${Math.random() * 100}%`, bottom: '-5%', fontSize: `${Math.random() * 20 + 10}px`, animation: `floatHeart ${Math.random() * 5 + 5}s infinite ease-in`, animationDelay: `${Math.random() * 10}s`, opacity: 0, zIndex: 1 }}>❤️</div>
      ))}

      {/* --- CONTENT PAGES --- */}
      {page === 'invite' && (
        <div style={cardStyle}>
          <img src={bearGif} style={{ width: '150px', marginBottom: '15px' }} alt="Bear" />
          <h1 style={{ color: '#5c2d3a' }}>KUMUDHAA,</h1>
          <p>Will you be my Valentine? ❤️</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => { setPage('success'); fireConfetti(); }} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>YES ❤️</button>
            <button onClick={() => hasSeenPros ? (setPage('success'), fireConfetti()) : setShowModal(true)} style={{ backgroundColor: '#f3f3f3', padding: '12px 30px', border: 'none', borderRadius: '25px', cursor: 'pointer', color: '#888' }}>NO 💔</button>
          </div>
          {showModal && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '30px', width: '85%' }}>
                <p style={{ color: '#ef4b81', marginBottom: '20px' }}>Wait! Let me show you the perks first... 😉</p>
                <button onClick={() => { setShowModal(false); setPage('proscons'); setHasSeenPros(true); }} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '10px 30px', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}>Okay</button>
              </div>
            </div>
          )}
        </div>
      )}

      {page === 'proscons' && (
        <div style={{ ...cardStyle, maxWidth: '650px', paddingTop: '60px' }}>
          <button onClick={() => setPage('invite')} style={{ position: 'absolute', top: '20px', right: '25px', background: 'none', border: 'none', fontSize: '1.8rem', color: '#e0e0e0', cursor: 'pointer' }}>✕</button>
          <h2 style={{ color: '#5c2d3a', marginBottom: '30px' }}>Why You Should Choose me ❤️</h2>
          <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
            <div style={{ flex: 1, border: '2px solid #ffdae1', padding: '20px', borderRadius: '30px', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ color: '#ef4b81', marginTop: 0 }}>❤️ Pros</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff5f7', padding: '10px', borderRadius: '15px' }}>
                <img src={pros[proIndex].icon} style={{ width: '30px' }} alt="pro" />
                <p style={{ fontSize: '0.8rem', textAlign: 'left' }}>{pros[proIndex].text}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={handlePrevPro} style={{ background: '#ef4b81', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px' }}>◀</button>
                <button onClick={handleNextPro} style={{ background: '#ef4b81', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px' }}>▶</button>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{ color: '#ef4b81', marginTop: 0 }}>❌ Cons</h3>
              <img src={childGif} style={{ width: '60px', marginBottom: '10px' }} alt="cons" />
              <p style={{ fontWeight: 'bold' }}>Nothing!!!!</p>
            </div>
          </div>
          <button onClick={() => setPage('invite')} style={backButtonStyle}>Back</button>
        </div>
      )}

      {page === 'success' && (
        <div style={cardStyle}>
          <h1 style={{ color: '#5c2d3a' }}>❤️ YAYYYYY!!! ❤️</h1>
          <img src={bearGif} style={{ width: '150px' }} alt="Hug" />
          <h2 style={{ color: '#ef4b81', fontSize: '2.5rem', fontFamily: 'cursive' }}>I LOVE YOU ❤️</h2>
          <button onClick={() => setPage('gifts')} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>See your gifts, KUMUDHAA</button>
        </div>
      )}

      {page === 'gifts' && !selectedGift && (
        <div style={{ ...cardStyle, maxWidth: '550px' }}>
          <h1 style={{ color: '#5c2d3a' }}>💝 Your Valentine Gifts 💝</h1>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            {/* GIFT 1 */}
            <div 
              className="gift-card"
              onClick={() => { setSelectedGift('songs'); playSong(0); }} 
              style={{ cursor: 'pointer', flex: 1, animation: 'giftFloat 3s infinite ease-in-out' }}
            >
              <img src={gift1} style={{ width: '100%', borderRadius: '15px' }} alt="Gift 1" />
            </div>
            {/* GIFT 2 */}
            <div 
              className="gift-card"
              onClick={() => setSelectedGift('letter')} 
              style={{ cursor: 'pointer', flex: 1, animation: 'giftFloat 3s infinite ease-in-out', animationDelay: '0.5s' }}
            >
              <img src={gift2} style={{ width: '100%', borderRadius: '15px' }} alt="Gift 2" />
            </div>
            {/* GIFT 3 */}
            <div 
              className="gift-card"
              onClick={() => setSelectedGift('gallery')} 
              style={{ cursor: 'pointer', flex: 1, animation: 'giftFloat 3s infinite ease-in-out', animationDelay: '1s' }}
            >
              <img src={gift3} style={{ width: '100%', borderRadius: '15px' }} alt="Gift 3" />
            </div>
          </div>
        </div>
      )}

      {page === 'gifts' && selectedGift === 'songs' && (
        <div style={{ ...cardStyle, maxWidth: '500px', backgroundColor: '#fdf3f5' }}>
          <h2 style={{ color: '#5c2d3a' }}>Our Love Sounds Like This! 🎵</h2>
          <div style={{ width: '100%', backgroundColor: '#f9e7ea', borderRadius: '30px', padding: '20px', display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
            <img src={songs[currentSongIndex].art} style={{ width: '110px', height: '110px', borderRadius: '20px' }} alt="Art" />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0', fontSize: '1.1rem' }}>{songs[currentSongIndex].title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>{songs[currentSongIndex].album}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
                <button onClick={handlePrevSong} style={{ border: 'none', background: '#dceefb', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>◀</button>
                <button onClick={togglePlay} style={{ border: 'none', background: '#ef4b81', color: 'white', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer' }}>{isPlaying ? '⏸' : '▶'}</button>
                <button onClick={handleNextSong} style={{ border: 'none', background: '#dceefb', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>▶</button>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '25px', padding: '15px', maxHeight: '180px', overflowY: 'auto', textAlign: 'left' }}>
            {songs.map((s, i) => (
              <div key={s.id} onClick={() => playSong(i)} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: '12px', cursor: 'pointer', backgroundColor: currentSongIndex === i ? '#fff0f3' : 'transparent', marginBottom: '5px' }}>
                <span style={{ color: currentSongIndex === i ? '#ef4b81' : '#5c2d3a', fontWeight: currentSongIndex === i ? 'bold' : '500' }}>{s.title}</span>
                <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>{s.duration}</span>
              </div>
            ))}
          </div>
          <button onClick={() => {setSelectedGift(null); audioRef.current?.pause(); setIsPlaying(false);}} style={backButtonStyle}>Back</button>
        </div>
      )}

      {page === 'gifts' && selectedGift === 'letter' && (
        <div style={cardStyle}>
          <h2 style={{ color: '#5c2d3a' }}>A Message for You ❤️</h2>
          <div style={{ border: '2px dashed #ef4b81', padding: '20px', borderRadius: '20px', backgroundColor: '#fff5f7', overflowY: 'auto', maxHeight: '300px' }}>
            <p>"Every moment with you feels like a dream come true. You're my heart, my soul, and my favorite person. Happy Valentine's Day, KUMUDHAA!"</p>
          </div>
          <button onClick={() => setSelectedGift(null)} style={backButtonStyle}>Back</button>
        </div>
      )}

      {page === 'gifts' && selectedGift === 'gallery' && (
        <div style={{ ...cardStyle, maxWidth: '600px' }}>
          <h2 style={{ color: '#5c2d3a' }}>Our Precious Moments 📸</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
            {photos.map((p, i) => (
              <div key={i}>
                <img src={p.img} style={{ width: '100%', borderRadius: '15px' }} alt="Memory" />
                <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '5px' }}>{p.caption}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setSelectedGift(null)} style={backButtonStyle}>Back</button>
        </div>
      )}
    </div>
  );
}