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
import bgmFile from './assets/songs/bgm.mp3';

// --- VIDEO IMPORTS ---
import video1 from './assets/videos/video1.mp4';
import video2 from './assets/videos/video2.mp4';
import video3 from './assets/videos/video3.mp4';
import video4 from './assets/videos/video4.mp4';
import video5 from './assets/videos/video5.mp4';

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
    @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10)px; }
    to { opacity: 1; transform: translateY(0); }
  }
  .letter-text {
    animation: fadeIn 3s ease-out forwards;
  }
  .heart-rain {
    position: absolute;
    animation: floatHeart 6s infinite linear;
    color: #ef4b81;
    z-index: 10;
    pointer-events: none;
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

  const playSong = (index) => {
    if (audioRef.current) { audioRef.current.pause(); }
    const newAudio = new Audio(songs[index].file);
    audioRef.current = newAudio;
    setCurrentSongIndex(index);
    newAudio.play().then(() => setIsPlaying(true)).catch(e => console.log("Play blocked", e));
    newAudio.onended = handleNextSong;
  };
  
 const animationStyles = `
  @keyframes twinkle {
    0% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0.3; transform: scale(1); }
  }
  @keyframes floatHeart {
    0% { transform: translateY(0) scale(0); opacity: 0; }
    20% { opacity: 0.8; }
    100% { transform: translateY(-400px) scale(1.5); opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .letter-text {
    animation: fadeIn 4s ease-out forwards;
  }
  .heart-rain {
    position: absolute;
    bottom: 0;
    animation: floatHeart 5s infinite linear;
    color: #ef4b81;
    pointer-events: none;
    z-index: 5;
  }
  .video-container {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 480px;
    width: 100%;
    border-radius: 20px;
    scrollbar-width: none;
  }
  .video-card {
    scroll-snap-align: start;
    min-height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #000;
  }
`;

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

      {/* Floating Hearts */}
      {page !== 'invite' && [...Array(15)].map((_, i) => (
        <div key={`heart-${i}`} style={{ position: 'absolute', left: `${Math.random() * 100}%`, bottom: '-5%', fontSize: `${Math.random() * 20 + 10}px`, animation: `floatHeart ${Math.random() * 5 + 5}s infinite ease-in`, animationDelay: `${Math.random() * 10}s`, opacity: 0, zIndex: 1 }}>❤️</div>
      ))}

      {/* --- INVITE PAGE --- */}
      {page === 'invite' && (
        <div style={cardStyle}>
          <img src={bearGif} style={{ width: '150px', marginBottom: '15px' }} alt="Bear" />
          <h1 style={{ color: '#5c2d3a' }}>KUMUDHAA,</h1>
          <p>Will you be my...? ❤️</p>
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

      {/* --- PROS & CONS PAGE --- */}
      {page === 'proscons' && (
        <div style={{ ...cardStyle, maxWidth: '650px' }}>
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

      {/* --- SUCCESS PAGE --- */}
      {page === 'success' && (
        <div style={cardStyle}>
          <h1 style={{ color: '#5c2d3a' }}>❤️ YAYYYYY!!! ❤️</h1>
          <img src={bearGif} style={{ width: '150px' }} alt="Hug" />
          <h2 style={{ color: '#ef4b81', fontSize: '2.5rem', fontFamily: 'cursive' }}>I love Kumudhaa ❤️</h2>
          <button onClick={() => setPage('gifts')} style={{ backgroundColor: '#ef4b81', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>See your gifts, KUMUDHAA</button>
        </div>
      )}

      {/* --- GIFT SELECTION PAGE --- */}
      {page === 'gifts' && !selectedGift && (
        <div style={{ ...cardStyle, maxWidth: '550px' }}>
          <h1 style={{ color: '#5c2d3a' }}>💝 Your Valentine Gifts 💝</h1>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <div className="gift-card" onClick={() => { setSelectedGift('songs'); playSong(0); }} style={{ cursor: 'pointer', flex: 1, animation: 'giftFloat 3s infinite ease-in-out' }}>
              <img src={gift1} style={{ width: '100%', borderRadius: '15px' }} alt="Songs" />
              <p style={{fontSize: '0.8rem', fontWeight: 'bold', color: '#ef4b81'}}>Our Songs</p>
            </div>
            <div className="gift-card" onClick={() => setSelectedGift('letter')} style={{ cursor: 'pointer', flex: 1, animation: 'giftFloat 3s infinite ease-in-out', animationDelay: '0.5s' }}>
              <img src={gift2} style={{ width: '100%', borderRadius: '15px' }} alt="Letter" />
              <p style={{fontSize: '0.8rem', fontWeight: 'bold', color: '#ef4b81'}}>My Letter</p>
            </div>
            <div className="gift-card" onClick={() => setSelectedGift('gallery')} style={{ cursor: 'pointer', flex: 1, animation: 'giftFloat 3s infinite ease-in-out', animationDelay: '1s' }}>
              <img src={gift3} style={{ width: '100%', borderRadius: '15px' }} alt="Videos" />
              <p style={{fontSize: '0.8rem', fontWeight: 'bold', color: '#ef4b81'}}>Our Videos</p>
            </div>
          </div>
        </div>
      )}

      {/* --- MUSIC GIFT PAGE --- */}
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

      {/* --- LETTER GIFT PAGE --- */}
{page === 'gifts' && selectedGift === 'letter' && (
  <div style={cardStyle}>
    {/* Hidden Audio for Autoplay with Loop enabled */}
    <audio 
      src={bgmFile} 
      autoPlay 
      loop  // <--- This ensures the music restarts automatically
      ref={(el) => {
        if (el) {
          el.volume = 0.35;
          el.play().catch(() => console.log("Interaction needed"));
          audioRef.current = el;
          if (!isPlaying) setIsPlaying(true);
        }
      }} 
    />

    {/* Falling Hearts Layer */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="heart-rain" style={{ 
          left: Math.random() * 95 + '%', 
          animationDelay: Math.random() * 5 + 's',
          fontSize: Math.random() * 10 + 15 + 'px'
        }}>❤️</div>
      ))}
    </div>

    <h2 style={{ color: '#5c2d3a', fontFamily: 'serif' }}>From My Heart ❤️</h2>
    
    <div style={{ 
      border: '1px solid #d1d1d1', 
      padding: '30px', 
      borderRadius: '5px', 
      backgroundColor: '#fdfcf0', 
      boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05), 5px 5px 15px rgba(0,0,0,0.1)',
      overflowY: 'auto', 
      maxHeight: '420px',
      textAlign: 'left',
      position: 'relative',
      zIndex: 2 // Keeps text above hearts
    }}>
      <div style={{ borderBottom: '1px solid #ef4b81', width: '40px', marginBottom: '20px' }}></div>
      
      <div className="letter-text" style={{ 
        color: '#333', 
        fontFamily: 'serif', 
        fontSize: '1.05rem', 
        whiteSpace: 'pre-wrap', 
        fontStyle: 'italic',
        lineHeight: '1.9'
      }}>
        "I know everything is over, but I don’t know why I’m still looking with hope. My brain says, 'You idiot, just quit,' but my heart says, 'She is my KUMUDHAA.' 
        {"\n\n"}
        One message from you makes my day, but every time I check my phone, it still says the message is unread. One stupid mistake and I lost everything. I’m haunted by the silence now, because it’s filled with all the things I wish I could say to you.
        {"\n\n"}
        I don’t know why I’m so obsessed with you. Maybe it’s because you weren’t just a person to me—you were my home, my peace, and my favorite 'everyday.' 
        {"\n\n"}
        People say time heals everything, but time just feels like a reminder of how long it's been since I heard your voice. 
        {"\n\n"}
        Don’t even try to forget me—maybe you can, but I can’t. I’ll carry the memory of us until my last breath, even if I have to carry it alone. You'll always be my KUMUDHAA."
      </div>
    </div>
    
    <button onClick={() => {
        setSelectedGift(null);
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }} style={backButtonStyle}>Back</button>
  </div>
)}
      {/* --- VIDEO GALLERY GIFT PAGE --- */}
 {page === 'gifts' && selectedGift === 'gallery' && (
  <div style={{ ...cardStyle, maxWidth: '400px', padding: '10px' }}>
    <h2 style={{ color: '#5c2d3a', margin: '10px 0' }}>Our Highlights 🎥</h2>
    
    <div className="video-container">
      {[
        { src: video1, label: "My Kumudhaa Forever❤️" },
        { src: video5, label: "Ettamooo for soul ✨" },
        { src: video2, label: "Hello Malik 🫶" },
        { src: video4, label: "Dont even try to Forget 🌸" },
        { src: video3, label: "Full soul and Love ♾️" }
      ].map((vid, idx) => (
        <div key={idx} className="video-card">
          <video 
            controls 
            playsInline 
            preload="metadata"
            style={{ width: '100%', height: '400px', objectFit: 'contain' }}
          >
            <source src={vid.src} type="video/mp4" />
          </video>
          <div style={{ backgroundColor: '#fff', width: '100%', padding: '15px' }}>
            <p style={{ color: '#ef4b81', fontSize: '0.9rem', margin: 0, fontWeight: 'bold' }}>
              {vid.label}
            </p>
          </div>
        </div>
      ))}
    </div>

    <button onClick={() => setSelectedGift(null)} style={backButtonStyle}>Back</button>
  </div>
)}
    </div>
  );
}