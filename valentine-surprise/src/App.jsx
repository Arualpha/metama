import React, { useState, useRef, useEffect } from 'react';

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

// --- VIDEO ASSET ---
// Ensure your video is named 'our-story.mp4' in your public/assets folder
const animatedVideo = '/assets/our-story.mp4'; 

export default function App() {
  // Navigation & UI State
  const [page, setPage] = useState('invite'); 
  const [selectedGift, setSelectedGift] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [proIndex, setProIndex] = useState(0);
  const [hasSeenPros, setHasSeenPros] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  
  // Audio States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const pros = [
    { text: "Your personal photographer for all the cute moments 📸", icon: photoBear },
    { text: "Live singing performances... just for you 🎶 😚", icon: musicBear },
    { text: "I'll cook your fav food like it's my love language 🍳", icon: cookBear },
    { text: "Unlimited back rubs and forehead kisses 💆‍♀️", icon: cuteBear },
    { text: "I'll always be your biggest cheerleader 📣", icon: bearGif },
    { text: "Falling for you more and more every single day ❤️", icon: bearGif }
  ];

  const songs = [
    { id: '01', title: 'Oru Maalai', file: '/assets/Oru-Maalai.mp3', art: ghajiniArt, album: 'Ghajini', duration: '5:37' },
    { id: '02', title: 'Agasatha', file: '/assets/agasatha.mp3', art: cuckooArt, album: 'Cuckoo', duration: '4:59' },
    { id: '03', title: 'Unakagathanae', file: '/assets/unakagathanae.mp3', art: katradhuArt, album: 'Katradhu Tamizh', duration: '4:51' },
    { id: '04', title: 'Aasa Orave', file: '/assets/Aasa-Orave.mp3', art: aasaOraveArt, album: 'Aasa Orave', duration: '5:41' },
    { id: '05', title: 'Kadhal Kanave', file: '/assets/kadhal-kanave.mp3', art: mundasupattiArt, album: 'Mundasupatti', duration: '4:08' }
  ];

  // --- AUDIO LOGIC ---
  const playSong = (index) => {
    if (audioRef.current) audioRef.current.pause();
    const newAudio = new Audio(songs[index].file);
    audioRef.current = newAudio;
    setCurrentSongIndex(index);
    newAudio.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play blocked", e));
    newAudio.onended = handleNextSong;
  };

  const togglePlay = () => {
    if (!audioRef.current) { playSong(currentSongIndex); return; }
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  };

  const handlePrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  const handleNextPro = () => setProIndex((prev) => (prev + 1) % pros.length);
  const handlePrevPro = () => setProIndex((prev) => (prev - 1 + pros.length) % pros.length);

  // Styles
  const wrapperStyle = { height: '100vh', width: '100vw', backgroundColor: '#eb9fb0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, fontFamily: '"Segoe UI", Roboto, sans-serif', position: 'fixed', top: 0, left: 0, overflowY: 'auto' };
  const cardStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '40px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', textAlign: 'center', width: '90%', maxWidth: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' };

  return (
    <div style={wrapperStyle}>
      
      {/* PHASE 1: INVITATION */}
      {page === 'invite' && (
        <div style={cardStyle}>
          <img src={bearGif} style={{ width: '150px', marginBottom: '15px' }} alt="Bear" />
          <h1 style={{ color: '#5c2d3a', fontSize: '2.2rem', margin: '0' }}>PATOOTIEEE,</h1>
          <p style={{ color: '#4a4a4a', fontSize: '1.2rem', margin: '10px 0 25px 0' }}>Will you be my Valentine? 😩 ❤️</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setPage('success')} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>YES ❤️</button>
            {!hasSeenPros ? (
              <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#f3f3f3', color: '#888', padding: '12px 30px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>NO 💔</button>
            ) : (
              <button onClick={() => setPage('success')} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>YES ❤️</button>
            )}
          </div>
          {showModal && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '30px', width: '85%' }}>
                <p style={{ color: '#ef4b81', marginBottom: '20px' }}>Wait! Let me show you the perks first... 😉</p>
                <button onClick={() => { setShowModal(false); setPage('proscons'); setHasSeenPros(true); }} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '10px 30px', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}>Okay</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: PROS & CONS */}
      {page === 'proscons' && (
        <div style={{ ...cardStyle, maxWidth: '650px', paddingTop: '60px' }}>
          <button onClick={() => setPage('invite')} style={{ position: 'absolute', top: '20px', right: '25px', background: 'none', border: 'none', fontSize: '1.8rem', color: '#e0e0e0', cursor: 'pointer' }}>✕</button>
          <h2 style={{ color: '#5c2d3a', marginBottom: '30px' }}>Why You Should Choose me ❤️</h2>
          <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
            <div style={{ flex: 1, border: '2px solid #ffdae1', padding: '20px', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '220px' }}>
              <h3 style={{ color: '#ef4b81', marginTop: 0 }}>❤️ Pros</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff5f7', padding: '15px', borderRadius: '20px' }}>
                <img src={pros[proIndex].icon} style={{ width: '40px' }} alt="icon" />
                <p style={{ fontSize: '0.85rem', textAlign: 'left' }}>{pros[proIndex].text}</p>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button onClick={handlePrevPro} style={{ width: '35px', height: '35px', borderRadius: '50%', border: 'none', backgroundColor: '#ef4b81', color: 'white' }}>◀</button>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>{proIndex + 1} / {pros.length}</span>
                <button onClick={handleNextPro} style={{ width: '35px', height: '35px', borderRadius: '50%', border: 'none', backgroundColor: '#ef4b81', color: 'white' }}>▶</button>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{ color: '#ef4b81', marginTop: 0 }}>❌ Cons</h3>
              <img src={childGif} style={{ width: '80px', borderRadius: '10px', marginBottom: '10px' }} alt="Cons" />
              <p style={{ fontWeight: 'bold' }}>Nothing!!!!</p>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {page === 'success' && (
        <div style={cardStyle}>
          <h1 style={{ color: '#5c2d3a' }}>❤️ YAYYYYY!!! ❤️</h1>
          <img src={bearGif} style={{ width: '150px' }} alt="Hug" />
          <h2 style={{ color: '#ef4b81', fontSize: '2.5rem', fontFamily: 'cursive' }}>I LOVE YOU ❤️</h2>
          <button onClick={() => setPage('gifts')} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '30px', fontWeight: 'bold' }}>See your gifts, Patootie</button>
        </div>
      )}

      {/* GIFT MENU */}
      {page === 'gifts' && !selectedGift && (
        <div style={{ ...cardStyle, maxWidth: '550px' }}>
          <h1 style={{ color: '#5c2d3a', fontSize: '1.8rem', marginBottom: '20px' }}>💝 Your Valentine Gifts 💝</h1>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <div onClick={() => setSelectedGift('songs')} style={{ cursor: 'pointer', flex: 1 }}><img src={gift1} style={{ width: '100%', borderRadius: '15px' }} alt="Music" /></div>
            <div onClick={() => setSelectedGift('letter')} style={{ cursor: 'pointer', flex: 1 }}><img src={gift2} style={{ width: '100%', borderRadius: '15px' }} alt="Letter" /></div>
            <div onClick={() => setSelectedGift('gift3')} style={{ cursor: 'pointer', flex: 1 }}><img src={gift3} style={{ width: '100%', borderRadius: '15px' }} alt="Video" /></div>
          </div>
        </div>
      )}

      {/* GIFT 1: MUSIC PLAYER */}
      {page === 'gifts' && selectedGift === 'songs' && (
        <div style={{ ...cardStyle, maxWidth: '500px', backgroundColor: '#fdf3f5' }}>
          <h2 style={{ color: '#5c2d3a', marginBottom: '20px' }}>Our Love Sounds Like This! 🎵</h2>
          <div style={{ width: '100%', backgroundColor: '#f9e7ea', borderRadius: '30px', padding: '20px', border: '1px solid #f0d0d6', display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={songs[currentSongIndex].art} style={{ width: '110px', height: '110px', borderRadius: '20px' }} alt="Art" />
              <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginTop: '10px' }}>{songs[currentSongIndex].album}</p>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{songs[currentSongIndex].title}</h3>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#e0b0b9', borderRadius: '2px', position: 'relative', marginBottom: '15px' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: '#ef4b81' }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <button onClick={handlePrevSong} style={{ border: 'none', background: '#dceefb', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>◀◀</button>
                <button onClick={togglePlay} style={{ border: 'none', background: '#ef4b81', color: 'white', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer' }}>{isPlaying ? '⏸' : '▶'}</button>
                <button onClick={handleNextSong} style={{ border: 'none', background: '#dceefb', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>▶▶</button>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '25px', padding: '15px', maxHeight: '200px', overflowY: 'auto' }}>
            {songs.map((s, i) => (
              <div key={s.id} onClick={() => playSong(i)} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: '12px', cursor: 'pointer', backgroundColor: currentSongIndex === i ? '#fff0f3' : 'transparent' }}>
                <span style={{ color: currentSongIndex === i ? '#ef4b81' : '#5c2d3a', fontWeight: 'bold' }}>{s.title}</span>
                <span style={{ opacity: 0.4 }}>{s.duration}</span>
              </div>
            ))}
          </div>
          <button onClick={() => {setSelectedGift(null); audioRef.current?.pause(); setIsPlaying(false);}} style={{ marginTop: '15px', background: 'none', color: '#ef4b81', textDecoration: 'underline' }}>Back</button>
        </div>
      )}

      {/* GIFT 2: THE LETTER */}
      {page === 'gifts' && selectedGift === 'letter' && (
        <div style={{ ...cardStyle, maxWidth: '450px' }}>
          <h2 style={{ color: '#5c2d3a' }}>A Message for You ❤️</h2>
          <div onClick={() => setIsLetterOpen(!isLetterOpen)} style={{ width: '100%', height: '150px', backgroundColor: '#f8e8e8', border: '2px dashed #ef4b81', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}>
             <span style={{ fontSize: '3rem' }}>{isLetterOpen ? '📖' : '✉️'}</span>
          </div>
          {isLetterOpen && (
            <div style={{ marginTop: '20px', textAlign: 'left', fontStyle: 'italic', color: '#5c2d3a', padding: '10px', borderLeft: '4px solid #ef4b81' }}>
              <p>"Patootie, you are the most amazing person I've ever met. Every second with you is a gift, and I'm so lucky to call you mine. Happy Valentine's Day!"</p>
              <p style={{ textAlign: 'right', fontWeight: 'bold' }}>- Your Valentine</p>
            </div>
          )}
          <button onClick={() => setSelectedGift(null)} style={{ marginTop: '20px', background: 'none', color: '#ef4b81', textDecoration: 'underline' }}>Back</button>
        </div>
      )}

      {/* GIFT 3: ANIMATED VIDEO REEL */}
      {page === 'gifts' && selectedGift === 'gift3' && (
        <div style={{ ...cardStyle, maxWidth: '500px', backgroundColor: '#fdf3f5' }}>
          <h2 style={{ color: '#5c2d3a', marginBottom: '20px' }}>Our Story in Motion! 🎬</h2>
          <div style={{ width: '100%', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', backgroundColor: 'black' }}>
            <video width="100%" controls autoPlay style={{ borderRadius: '25px' }}>
              <source src={animatedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p style={{ marginTop: '15px', fontStyle: 'italic', fontSize: '0.9rem' }}>"Every frame reminds me of why I love you..."</p>
          <button onClick={() => setSelectedGift(null)} style={{ marginTop: '20px', backgroundColor: '#ef4b81', color: 'white', padding: '10px 30px', border: 'none', borderRadius: '25px', fontWeight: 'bold' }}>Back</button>
        </div>
      )}

    </div>
  );
}