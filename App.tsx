import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { AppState, CityData, UserLocation, Category, Place } from './types';
import { fetchCityGuide } from './services/geminiService';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowLeft, X, Star, Navigation, ArrowRight, Info, Sparkles, Copy, Mail, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

// --- Helpers ---

// Curated high-quality Unsplash images for the "212 Luxury" vibe (Optimized Sizes)
const CATEGORY_IMAGES: Record<string, string[]> = {
  'Eat': [
    'https://raw.githubusercontent.com/marcelorm81/assets/f46698e60409ff4dcf2042dc86b31dcac5beff9c/eat.jpg',
  ],
  'Drink': [
    'https://raw.githubusercontent.com/marcelorm81/assets/f46698e60409ff4dcf2042dc86b31dcac5beff9c/drink.jpg',
  ],
  'Dance': [
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574391884720-2bbc37e3ae8e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop',
  ],
  'Culture': [
    'https://raw.githubusercontent.com/marcelorm81/assets/f46698e60409ff4dcf2042dc86b31dcac5beff9c/culture.jpg',
  ],
  'Shop': [
    'https://raw.githubusercontent.com/marcelorm81/assets/f46698e60409ff4dcf2042dc86b31dcac5beff9c/shop.jpg',
  ],
  'Views': [
    'https://raw.githubusercontent.com/marcelorm81/assets/f46698e60409ff4dcf2042dc86b31dcac5beff9c/view.jpg',
  ]
};

// Editorial Content for Category Headers
const CATEGORY_INFO: Record<string, { headline: string, body: string }> = {
  'eat': {
    headline: "Where Flavor Meets High Life",
    body: "Barcelona has its own version of New York’s food culture — bold, stylish, and always on the move. From smashburgers with attitude to rooftops that feel straight out of Midtown, this is where the city’s appetite meets the 212 spirit: fast, elegant, and full of personality."
  },
  'drink': {
    headline: "Cocktails With a City Edge",
    body: "From speakeasies hidden behind walls to rooftops glowing over the skyline, Barcelona’s drinking scene carries the same magnetic pulse as Manhattan nights. Think dim lights, crafted cocktails, and an energy that feels designed for those who move with confidence."
  },
  'dance': {
    headline: "Where the Night Has a Pulse",
    body: "Barcelona after dark becomes its own New York — raw, glossy, electric. Rooftops, warehouses, velvet rooms, and waterfront clubs turn into stages of movement and charisma. This is where the 212 high-life comes alive: loud, seductive, unforgettable."
  },
  'culture': {
    headline: "The City’s Creative Heartbeat",
    body: "Museums, theaters, and cultural hubs that echo the elegance and ambition of New York’s art scene. Barcelona blends modernity with heritage, giving you spaces that feel refined, expressive, and deeply connected to the new 212 world."
  },
  'shop': {
    headline: "Style That Defines the City",
    body: "From the luxury strip of Passeig de Gràcia to the indie fashion corners of Born and Sant Antoni, Barcelona mirrors the fashion DNA of Fifth Avenue, SoHo, and Williamsburg. This is where taste becomes identity — and where the 212 man finds his look."
  },
  'views': {
    headline: "Instant Icons",
    body: "Every great city has landmarks that shape its character. Barcelona’s skyline moments carry the same emotional weight as New York’s: iconic, magnetic, impossible to forget. From mountain views to seaside glow, this is the city at its most cinematic."
  }
};


const getCategoryImage = (categoryTitle: string, index: number = 0) => {
  const images = CATEGORY_IMAGES[categoryTitle] || CATEGORY_IMAGES['Views'];
  return images[index % images.length];
};

const getPlaceImage = (place: Place, categoryTitle: string) => {
  if (place.imageUrl) return place.imageUrl;
  return getCategoryImage(categoryTitle, place.name.length);
};

// --- Components ---

const DynamicCitySuffix = () => {
  const [text, setText] = useState("BCN");

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => (prev === "BCN" ? "NYC" : "BCN"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-brand-gold relative inline-block w-[3ch] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute left-0 top-0"
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0">BCN</span> {/* Spacer to keep layout stable */}
    </span>
  );
};

const IntroSequence = ({ onComplete }: { onComplete: (location: UserLocation | null) => void }) => {
  const [phase, setPhase] = useState<'STATIC' | 'CYCLING' | 'LOCKED'>('STATIC');
  const [displayText, setDisplayText] = useState("MY CITY");
  const [isActivating, setIsActivating] = useState(false);
  
  const cities = ["SAO PAULO", "BUENOS AIRES", "MILAN", "STOCKHOLM", "MEXICO CITY", "TOKYO", "BERLIN", "MUMBAI", "SYDNEY", "CAPE TOWN"];
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('CYCLING');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'CYCLING') return;
    const interval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % cities.length);
      setDisplayText(cities[cityIndex]);
    }, 150);
    return () => clearInterval(interval);
  }, [phase, cityIndex, cities]);

  const handleActivateLocation = () => {
    setIsActivating(true);
    setTimeout(() => {
      setPhase('LOCKED');
      setDisplayText("BARCELONA");
      setTimeout(() => {
        onComplete({ latitude: 41.3851, longitude: 2.1734 });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-brand-black flex flex-col items-center justify-center z-50 p-6 text-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
          <source src="https://raw.githubusercontent.com/marcelorm81/assets/fe5f13658f4c459d1a145b19d9d9f3004af7358f/NYC_nosound_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
           <h1 className="text-[120px] md:text-[200px] leading-none font-sans font-bold text-white tracking-tighter mix-blend-overlay opacity-90 text-center w-full">212</h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 1 }}
           className="mt-1 w-full max-w-4xl mx-auto px-4"
        >
           <div className="grid grid-cols-2 gap-x-2 w-full items-baseline">
              <div className="flex justify-end w-full">
                <span className="text-2xl md:text-5xl font-sans font-bold text-white/80 tracking-[-0.06em] whitespace-nowrap text-right">NY IS</span>
              </div>
              <div className="flex justify-start w-full relative">
                <AnimatePresence mode='wait'>
                  <motion.span 
                    key={displayText}
                    initial={phase === 'STATIC' ? { opacity: 0 } : { opacity: 0.8, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={phase === 'STATIC' ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: phase === 'STATIC' ? 1 : 0.1 }}
                    className={`block text-2xl md:text-5xl font-sans font-bold uppercase tracking-[-0.06em] whitespace-nowrap text-left ${phase !== 'STATIC' && displayText !== 'MY CITY' ? 'text-brand-gold' : 'text-white'}`}
                  >
                    {displayText}
                  </motion.span>
                </AnimatePresence>
              </div>
           </div>
        </motion.div>

        <div className="absolute bottom-20 w-full flex flex-col items-center min-h-[100px]">
            {phase === 'CYCLING' && !isActivating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                 <p className="text-gray-400 text-xs font-sans tracking-[0.3em] uppercase mb-6 animate-pulse">Detecting Location...</p>
                 <button 
                    onClick={handleActivateLocation}
                    className="px-6 py-3 border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm"
                 >
                    ACTIVATE LOCATION
                 </button>
              </motion.div>
            )}

            {isActivating && phase !== 'LOCKED' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                 <div className="w-8 h-8 border-t-2 border-brand-gold rounded-full animate-spin mb-4"></div>
                 <p className="text-brand-gold text-xs font-sans tracking-[0.3em] uppercase">Syncing</p>
               </motion.div>
            )}

            {phase === 'LOCKED' && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                 <div className="w-12 h-1 bg-brand-gold rounded-full mb-4 shadow-[0_0_20px_#D4AF37]"></div>
                 <p className="text-white text-sm font-sans font-bold tracking-[0.3em] uppercase">Location Acquired</p>
               </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

const LoadingScreen = ({ onComplete, isDataReady }: { onComplete: () => void, isDataReady: boolean }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const backgrounds = [
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?q=80&w=800&auto=format&fit=crop',
  ];

  const messages = ["Mapping your Barcelona-NYC twins...", "Curating spots with 212 energy...", "Polishing your city guide..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgrounds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (isDataReady) {
            if (prev >= 100) {
                clearInterval(interval);
                setTimeout(onComplete, 800); 
                return 100;
            }
            return prev + 1;
        }
        if (prev >= 85) return 85;
        return prev + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete, isDataReady]);

  useEffect(() => {
    if (progress < 40) setMessageIndex(0);
    else if (progress < 80) setMessageIndex(1);
    else setMessageIndex(2);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-brand-black flex flex-col z-50 overflow-hidden">
        <AnimatePresence mode='sync'>
            <motion.div
                key={bgIndex}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 0.6, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 z-0"
            >
                <img src={backgrounds[bgIndex]} alt="NYC Vibe" className="w-full h-full object-cover" />
            </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
                 <div className="flex items-baseline gap-4">
                     <span className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tighter">{Math.round(progress)}%</span>
                     <div className="h-[1px] w-12 bg-white/30 self-center"></div>
                     <AnimatePresence mode="wait">
                        <motion.span
                            key={messageIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-white/80 text-xs md:text-sm font-sans uppercase tracking-[0.2em] max-w-[200px] md:max-w-none"
                        >
                            {messages[messageIndex]}
                        </motion.span>
                     </AnimatePresence>
                 </div>
                 <div className="w-full max-w-md h-[1px] bg-white/10 mt-4 overflow-hidden">
                    <motion.div className="h-full bg-brand-gold" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
                 </div>
            </div>
            <div className="hidden md:block">
                 <span className="text-white/30 text-[10px] font-sans tracking-[0.5em] uppercase">212 City Guide</span>
            </div>
        </div>
    </div>
  );
};

// --- Reusable Category Card (Used in Carousel) ---
const CategoryCard = ({ category, index, onClick, parallaxOffset = 0 }: { category: Category, index: number, onClick: () => void, parallaxOffset?: number }) => {
  const imgSrc = getCategoryImage(category.title, index);
  const hiddenPleasures = 4;

  // Use parallaxOffset to shift the image inside the container
  // range -1 to 1 mostly
  const panX = parallaxOffset * 20; // 20% shift

  return (
    <div 
      onClick={onClick}
      className="relative w-full h-full overflow-hidden bg-brand-dark rounded-xl shadow-2xl group cursor-pointer"
    >
      {/* Image with Pan Effect */}
      <div 
        className="absolute inset-0 w-[120%] h-full left-[-10%]"
        style={{ transform: `translateX(${panX}%)` }} 
      >
        <img 
            src={imgSrc} 
            alt={category.title} 
            className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            onError={(e) => {
                const fallback = CATEGORY_IMAGES['Views'][0]; 
                if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                }
            }}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
      
      {/* Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
           <span className="text-[10px] font-sans font-medium text-white/80 tracking-wide">{category.places.length} places</span>
        </div>
        <div className="group/crown relative bg-black/40 backdrop-blur-md h-7 rounded-full border border-white/10 flex items-center shadow-lg transition-all duration-500 w-auto px-2 hover:px-3 overflow-hidden">
           <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 1 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full skew-x-12 z-0 pointer-events-none" />
           <div className="relative z-10 flex items-center">
             <div className="flex items-center justify-center w-5 h-5 flex-shrink-0 mr-1">
               <img src="https://raw.githubusercontent.com/marcelorm81/assets/e328d4d45f227187b309e5cbdd5f9c6068b5870e/icon.png" alt="Hidden" className="w-4 h-4 object-contain" />
             </div>
             <span className="text-[10px] font-sans font-bold text-brand-gold tracking-wide group-hover/crown:hidden">{hiddenPleasures}</span>
             <span className="hidden group-hover/crown:inline-block text-[10px] font-sans font-bold text-brand-gold tracking-wide whitespace-nowrap pl-1">Hidden Pleasures</span>
           </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6">
        <h3 className="text-3xl font-sans font-bold text-white mb-1 tracking-tight">{category.title}</h3>
        <div className="w-8 h-[1px] bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-2"></div>
        <div className="flex items-center text-[10px] text-white/60 font-sans uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <span>Discover</span>
          <ArrowRight size={12} className="ml-2" />
        </div>
      </div>
    </div>
  );
};

// --- GSAP Infinite 3D Carousel ---

const Carousel = ({ categories, onSelect }: { categories: Category[], onSelect: (cat: Category) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // State for drag
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useRef(0); // Smooth float index
  const startX = useRef(0);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationFrame = useRef<number>(0);

  // Constants
  const cardWidth = 320; // approximate visual width logic
  const spacing = 0.8; // normalized spacing
  const count = categories.length;

  // Initialize
  useLayoutEffect(() => {
    // Initial Position
    updateCards();
    return () => {
        if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [categories]);

  // Main Loop
  const updateCards = useCallback(() => {
    if (!cardsRef.current.length) return;
    
    // Normalize progress to positive modulus
    const normProgress = ((progress.current % count) + count) % count;

    cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Calculate distance from current focus (handling wrap-around)
        let diff = (i - normProgress);
        if (diff > count / 2) diff -= count;
        if (diff < -count / 2) diff += count;

        // Cover Flow Logic
        // Center (0) is flat. Sides are rotated.
        const absDiff = Math.abs(diff);
        
        // Z-Depth
        const z = -absDiff * 400; // Push back
        
        // X-Position: Center is 0. 
        // Side items are pushed out but compressed near center
        // We want a curve.
        const xOffset = diff * 50; // Percent spacing
        
        // Rotation
        // max 60 degrees. 
        // Smooth transition near 0.
        let rotateY = diff * -45;
        if (rotateY > 60) rotateY = 60;
        if (rotateY < -60) rotateY = -60;

        // Scale & Opacity
        const scale = 1 - Math.min(absDiff * 0.1, 0.4);
        const opacity = 1 - Math.min(absDiff * 0.3, 0.6);
        const zIndex = 100 - Math.round(absDiff * 10);

        // Apply
        gsap.set(card, {
            xPercent: -50 + (xOffset * 1.5), // Centering logic handled here
            yPercent: -50,
            z: z,
            rotateY: rotateY,
            scale: scale,
            opacity: opacity,
            zIndex: zIndex,
            transformOrigin: "center center"
        });

        // Update Parallax inside card (custom property we read in CategoryCard if we passed refs down, 
        // but here we are rendering CategoryCard children. We need to pass the pan value via props if we want react re-renders
        // OR we query selector inner image.
        // For performance, let's query the inner div for pan.
        const innerImgDiv = card.querySelector('.absolute.inset-0.w-\\[120\\%\\]') as HTMLElement;
        if (innerImgDiv) {
            // Pan direction opposes rotation for depth feel
            const panX = -Math.max(Math.min(diff * 15, 20), -20);
            gsap.set(innerImgDiv, { xPercent: panX });
        }
    });

    // Inertia decay if not dragging
    if (!isDragging.current && Math.abs(velocity.current) > 0.001) {
        // Friction loop just in case gsap tween isn't running
        // This handles small drifting if not completely stopped
    }
  }, [count]);

  // Event Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      lastX.current = e.clientX;
      lastTime.current = Date.now();
      velocity.current = 0;
      
      // Kill tweens
      gsap.killTweensOf(progress);

      window.addEventListener('pointermove', handleGlobalMove);
      window.addEventListener('pointerup', handleGlobalUp);
  };

  const handleGlobalMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      const dt = Date.now() - lastTime.current;
      
      // Convert pixel delta to index delta
      // sensitivity: 300px per item
      const indexDelta = dx / 300; 
      progress.current -= indexDelta;
      
      // Calculate velocity
      if (dt > 0) {
        const v = indexDelta / dt;
        // smooth
        velocity.current = velocity.current * 0.8 + v * 0.2;
      }

      lastX.current = e.clientX;
      lastTime.current = Date.now();
      
      requestAnimationFrame(updateCards);
  };

  const handleGlobalUp = () => {
      isDragging.current = false;
      window.removeEventListener('pointermove', handleGlobalMove);
      window.removeEventListener('pointerup', handleGlobalUp);
      
      // Inertia Throw Logic
      const inertiaFactor = 300; // Throw distance factor
      // Note: velocity is negative of drag direction because we subtract indexDelta
      // Let's rely on computed velocity
      // projected delta
      const projectedDelta = -velocity.current * inertiaFactor;
      
      let target = progress.current + projectedDelta;
      // Snap
      target = Math.round(target);

      gsap.to(progress, {
          current: target,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
             updateCards();
          },
          onComplete: () => {
              // Normalize
              const norm = ((target % count) + count) % count;
              progress.current = norm;
              setCurrentIndex(Math.round(norm));
              updateCards();
          }
      });
  };

  // Click to navigate or select
  const handleCardClick = (index: number) => {
      // Find where this index is relative to current progress
      const normProgress = ((progress.current % count) + count) % count;
      let diff = index - normProgress;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;

      if (Math.abs(diff) < 0.1) {
          // It's centered, select it
          onSelect(categories[index]);
      } else {
          // Scroll to it
          const target = progress.current + diff;
          gsap.to(progress, {
              current: target,
              duration: 0.6,
              ease: "power2.out",
              onUpdate: updateCards
          });
      }
  };

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-[60vh] perspective-1000 overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
    >
        {/* Center Guide (Invisible) */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0" />

        {categories.map((cat, i) => (
            <div
                key={cat.id}
                ref={el => { cardsRef.current[i] = el; }}
                className="absolute top-1/2 left-1/2 w-[280px] md:w-[340px] aspect-[3/4] preserve-3d will-change-transform"
                onClick={(e) => { e.stopPropagation(); handleCardClick(i); }}
            >
                <CategoryCard 
                   category={cat} 
                   index={i} 
                   onClick={() => {}} 
                   parallaxOffset={0} // Handled by GSAP directly now
                />
                 {/* Reflection */}
                 <div className="absolute -bottom-[20px] left-0 right-0 h-[30px] bg-gradient-to-b from-white/10 to-transparent transform scale-y-[-1] opacity-40 mask-image-gradient pointer-events-none"></div>
            </div>
        ))}
    </div>
  );
};

const PlaceModal = ({ place, categoryTitle, onClose, onCheckIn }: { place: Place, categoryTitle: string, onClose: () => void, onCheckIn: () => void }) => {
  const imgSrc = getPlaceImage(place, categoryTitle);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll({ container: scrollRef });
  const bgBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(12px)"]);
  const bgBrightness = useTransform(scrollY, [0, 400], [1, 0.4]);
  const bgScale = useTransform(scrollY, [0, 400], [1, 1.1]);

  const handleDirections = () => {
    const query = encodeURIComponent(`${place.name} ${place.location} Barcelona`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black"
    >
      <motion.div 
        style={{ filter: bgBlur, scale: bgScale, opacity: bgBrightness }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <img 
            src={imgSrc} 
            alt={place.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
                const fallback = getCategoryImage(categoryTitle);
                if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                }
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
      </motion.div>

      <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-end">
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors border border-white/20"
        >
          <X size={20} />
        </button>
      </div>

      <div 
        ref={scrollRef} 
        className="absolute inset-0 z-10 overflow-y-auto no-scrollbar scroll-smooth"
      >
        <div className="h-[45vh] md:h-[50vh] w-full pointer-events-none"></div>

        <div className="bg-gradient-to-b from-black/80 via-brand-black to-brand-black min-h-[60vh] backdrop-blur-xl rounded-t-[2.5rem] relative pt-8 pb-32 px-6 md:px-12 shadow-[0_-10px_60px_rgba(0,0,0,0.5)] border-t border-white/10">
           <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8"></div>
           <div className="max-w-3xl mx-auto">
              <div className="flex flex-col gap-2 mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-brand-gold text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">NYC Twin</span>
                    <span className="text-sm font-bold text-white uppercase tracking-wider">{place.nycEquivalent}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-sans font-bold text-white leading-none tracking-tight">{place.name}</h2>
                  <p className="text-xl md:text-2xl font-serif italic text-white/70 mt-2">"{place.vibe}"</p>
              </div>
              <div className="h-[1px] w-full bg-white/10 mb-8"></div>
              <div className="space-y-10">
                 <div className="prose prose-invert">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center"><Info size={14} className="mr-2 text-brand-gold" /> The Experience</h3>
                    <p className="text-gray-200 font-sans text-base md:text-lg leading-relaxed font-light">{place.fullDescription || place.description}</p>
                 </div>
                 <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4 flex items-center relative z-10"><Sparkles size={14} className="mr-2" /> The NYC Connection</h3>
                    <div className="text-white font-sans text-base md:text-lg leading-relaxed relative z-10 whitespace-pre-line">{place.nycConnectionText}</div>
                 </div>
                 <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center"><Star size={14} className="mr-2 text-brand-gold" /> Curiosities & Must Try</h3>
                    <div className="text-gray-300 font-sans text-sm md:text-base leading-relaxed whitespace-pre-line">{place.mustTry}</div>
                 </div>
                  <div className="flex items-center text-gray-500 text-xs font-sans uppercase tracking-wider pt-6 border-t border-white/5">
                    <MapPin size={14} className="mr-2 text-white" />
                    {place.location}
                  </div>
              </div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-brand-black/90 backdrop-blur-xl border-t border-white/10 flex gap-3 z-50">
         <button onClick={handleDirections} className="flex-1 py-4 border border-white/20 text-white font-sans uppercase text-[10px] md:text-xs font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center justify-center rounded-lg group">
            <Navigation size={16} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
            Directions
         </button>
         <button onClick={onCheckIn} className="flex-[2] py-4 bg-brand-gold text-black font-sans uppercase text-[10px] md:text-xs font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:bg-white transition-all transform active:scale-[0.98] rounded-lg">
            Check In & Unlock
         </button>
       </div>
    </motion.div>
  );
};

// --- Reward Modal (Existing) ---
interface Reward {
    text: string;
    type: 'CODE' | 'CONTENT';
}

const RewardReveal = ({ onClose }: { onClose: () => void }) => {
  const [code, setCode] = useState("....");
  const [copied, setCopied] = useState(false);
  const rewardsList: Reward[] = [
    { text: "Be the first to experience the new 212 fragrance.", type: 'CODE' },
    { text: "Try the 212 fragrance before anyone else.", type: 'CODE' },
    { text: "Enjoy an exclusive launch discount.", type: 'CODE' },
    { text: "Receive an exclusive 212 gift with your purchase.", type: 'CODE' },
    { text: "Unlock exclusive content", type: 'CONTENT' }
  ];
  const rewardRef = useRef(rewardsList[Math.floor(Math.random() * rewardsList.length)]);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTimeout(() => setCode(result), 500);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-6 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative w-full max-w-sm bg-gradient-to-b from-brand-dark to-black rounded-3xl border border-brand-gold/20 p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(212,175,55,0.15)]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20} /></button>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="mb-8 mt-4">
           <img src="https://raw.githubusercontent.com/marcelorm81/assets/e328d4d45f227187b309e5cbdd5f9c6068b5870e/icon.png" alt="Crown" className="w-24 h-24 object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]" />
        </motion.div>
        <h3 className="text-brand-gold font-sans font-bold uppercase tracking-[0.2em] text-sm mb-2">Pleasure Unlocked</h3>
        <h2 className="text-white font-serif text-2xl md:text-3xl italic mb-6 leading-tight">{rewardRef.current.text}</h2>
        {rewardRef.current.type === 'CODE' ? (
            <>
                <p className="text-gray-400 text-xs font-sans mb-6 max-w-[240px]">Use this unique code at checkout on carolinaherrera.com to redeem your exclusive benefit.</p>
                <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 w-full flex items-center justify-between mb-8 group hover:border-brand-gold/50 transition-colors cursor-pointer" onClick={handleCopy}>
                    <span className="text-2xl font-mono font-bold text-white tracking-[0.5em] pl-2">{code}</span>
                    <div className="p-2 bg-white/10 rounded-full text-white/70 group-hover:text-white group-hover:bg-brand-gold group-hover:text-black transition-all">{copied ? <Sparkles size={16} /> : <Copy size={16} />}</div>
                </div>
                <button className="w-full py-4 bg-brand-gold text-black font-sans font-bold uppercase tracking-[0.15em] text-xs rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(212,175,55,0.3)]"><Mail size={16} /> Send me the code</button>
            </>
        ) : (
             <>
                 <p className="text-gray-400 text-xs font-sans mb-8 max-w-[240px]">Immerse yourself in the world of 212. Watch the exclusive campaign film now.</p>
                 <button className="w-full py-4 bg-brand-gold text-black font-sans font-bold uppercase tracking-[0.15em] text-xs rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(212,175,55,0.3)]"><Play size={16} fill="currentColor" /> Play Film</button>
             </>
        )}
      </motion.div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [data, setData] = useState<CityData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showReward, setShowReward] = useState<boolean>(false);

  useEffect(() => {
    if (appState === AppState.LOADING) {
       const loadData = async () => {
           const lat = 41.3851; 
           const lng = 2.1734;
           const cityData = await fetchCityGuide(lat, lng);
           setData(cityData);
       };
       loadData();
    }
  }, [appState]);

  const handleIntroComplete = async (location: UserLocation | null) => {
    setAppState(AppState.LOADING);
  };
  const handleLoadingComplete = () => {
    setAppState(AppState.DASHBOARD);
  }
  const handleCheckIn = () => {
    setShowReward(true);
  };

  if (appState === AppState.INTRO) return <IntroSequence onComplete={handleIntroComplete} />;
  if (appState === AppState.LOADING) return <LoadingScreen onComplete={handleLoadingComplete} isDataReady={!!data} />;

  return (
    <div className="h-screen bg-brand-black text-white font-sans overflow-hidden flex flex-col">
      <AnimatePresence>
        {!selectedCategory && (
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-shrink-0 px-6 pt-10 pb-6 md:pt-16 md:pb-10 max-w-7xl mx-auto flex flex-col items-center text-center z-10 relative pointer-events-none"
            >
                <div className="mb-6 pointer-events-auto">
                     <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-brand-gold border border-brand-gold/40 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full">212 city guide</span>
                </div>
                
                <h1 className="text-6xl md:text-[8rem] font-sans font-bold text-white mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl">
                  NYC IS <br className="md:hidden" /> <span className="text-brand-gold">BCN</span>
                </h1>
                
                <div className="max-w-md md:max-w-xl mx-auto px-4 md:px-0 pointer-events-auto">
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed font-sans font-medium tracking-wide drop-shadow-md">
                    Barcelona becomes your Mediterranean Manhattan — bold, sleek, and always moving. Discover the city’s 212 twins, unlock high-life rewards, and step deeper into the new golden age of 212.
                  </p>
                </div>
            </motion.header>
        )}
      </AnimatePresence>

      <main className="flex-grow relative flex flex-col justify-center w-full max-w-[1920px] mx-auto">
        <AnimatePresence mode='wait'>
            {!selectedCategory && data && (
                <motion.div 
                    key="carousel"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <Carousel categories={data.categories} onSelect={setSelectedCategory} />
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {selectedCategory && data && (
                <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-brand-black flex flex-col h-full"
                >
                     <div className="px-6 py-6 md:px-12 md:py-8 border-b border-white/10 bg-brand-black/90 backdrop-blur-md z-20 flex-shrink-0">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <button onClick={() => setSelectedCategory(null)} className="flex items-center text-white/50 hover:text-white transition-colors group">
                                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-xs uppercase tracking-widest hidden md:inline">Back</span>
                                </button>
                                <div className="text-center">
                                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight uppercase flex items-center justify-center gap-4">
                                        {selectedCategory.title} <DynamicCitySuffix />
                                    </h2>
                                    <p className="text-brand-gold text-[10px] uppercase tracking-[0.2em] mt-2">{selectedCategory.places.length} Places Found</p>
                                </div>
                                <div className="w-8"></div>
                            </div>
                            
                            {/* NEW: Category Description Block */}
                            {CATEGORY_INFO[selectedCategory.id.toLowerCase()] && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="max-w-2xl mx-auto text-center"
                                >
                                    <h3 className="text-brand-gold font-sans font-bold uppercase tracking-[0.15em] text-xs md:text-sm mb-3">
                                        {CATEGORY_INFO[selectedCategory.id.toLowerCase()].headline}
                                    </h3>
                                    <p className="text-white/70 font-sans text-xs md:text-sm leading-relaxed font-light">
                                        {CATEGORY_INFO[selectedCategory.id.toLowerCase()].body}
                                    </p>
                                </motion.div>
                            )}

                            <div className="overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                                <div className="flex items-center justify-start md:justify-center gap-2 min-w-max">
                                    {data.categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${selectedCategory.id === cat.id ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-transparent hover:text-white hover:bg-white/5'}`}
                                        >
                                            {cat.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                     </div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={selectedCategory.id}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex-1 overflow-x-auto overflow-y-hidden flex items-center gap-4 md:gap-8 p-6 md:p-12 no-scrollbar snap-x snap-mandatory h-full"
                    >
                        {selectedCategory.places.map((place, idx) => {
                            const placeImgSrc = getPlaceImage(place, selectedCategory.title);
                            return (
                                <motion.div 
                                    key={`${selectedCategory.id}-${idx}`}
                                    onClick={() => setSelectedPlace(place)}
                                    className="relative flex-shrink-0 w-[85vw] md:w-[25vw] h-[60vh] md:h-[65vh] bg-brand-dark cursor-pointer snap-center group overflow-hidden border border-white/5"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img 
                                        src={placeImgSrc}
                                        alt={place.name} 
                                        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
                                        onError={(e) => {
                                            const fallback = getCategoryImage(selectedCategory.title, idx);
                                            if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                                    <div className="absolute top-4 left-4"><span className="text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/20 px-2 py-1 bg-black/30 backdrop-blur-sm">0{idx + 1}</span></div>
                                    <div className="absolute top-4 right-4"><div className="bg-brand-gold text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">NYC: {place.nycEquivalent}</div></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                                        <h3 className="text-3xl font-sans font-bold text-white mb-2 leading-none">{place.name}</h3>
                                        <p className="text-gray-300 text-sm font-serif italic opacity-80">"{place.vibe}"</p>
                                        <div className="h-[1px] w-0 bg-brand-gold mt-4 group-hover:w-full transition-all duration-700"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                         <div className="w-4 flex-shrink-0"></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>{selectedPlace && selectedCategory && <PlaceModal place={selectedPlace} categoryTitle={selectedCategory.title} onClose={() => setSelectedPlace(null)} onCheckIn={handleCheckIn} />}</AnimatePresence>
        <AnimatePresence>{showReward && <RewardReveal onClose={() => setShowReward(false)} />}</AnimatePresence>
      </main>
    </div>
  );
};

export default App;