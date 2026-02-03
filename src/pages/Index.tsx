import { useEffect, useRef, useState } from "react";
import weddingBg from "@/assets/wedding-bg.jpg";
import ganeshImage from "@/assets/ganesh.png";
import dividerImage from "@/assets/divider.png";
import templeDoors from "@/assets/temple-doors.png"; // NEW: door image
import shivaParvatiImage from "@/assets/shiva-parvati-temple.jpeg";
import bellImage from "@/assets/bell-removebg-preview.png"; // NEW: bell image trigger
import bellSound from "@/assets/bell-sound.mp3"; 
import doorOpenSound from "@/assets/open-door-sound.mp3";
import backgroundSound from "@/assets/sarvopari_pari_premi.mp3";
import mehendiCeremony from "@/assets/mehendi-ceremony.jpg";
import haldiCeremony from "@/assets/haldi-ceremony.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import Pic1 from "@/assets/engagement8.jpg";
import Pic2 from "@/assets/engagement7.jpg";
import Pic3 from "@/assets/engagement6.jpg";
import Pic4 from "@/assets/engagement5.jpg";
import Pic5 from "@/assets/engagement4.jpg";
import Pic6 from "@/assets/engagement3.jpg";
import Pic7 from "@/assets/engagement2.jpg";
import Pic8 from "@/assets/engagement1.jpg";



import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  Camera,
  Images,
  Volume2,
  VolumeX,
} from "lucide-react";

interface ScrollSection {
  id: string;
  content: React.ReactNode;
  revealStyle?: "fade" | "scale" | "slide" | "flip";
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  icon: string;
  borderColor: string;
  imagePlaceholder: string;
  imageStr: string;
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-gold/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

// Temple Door Opening Animation with Shiva-Parvati
const TempleOpening = ({ onComplete }: { onComplete: () => void }) => {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);

  const bellAudioRef = useRef<HTMLAudioElement>(null);
  const doorAudioRef = useRef<HTMLAudioElement>(null);

  const DOOR_OPEN_DURATION_MS = 8000;

  const handleOpen = async () => {
    setBellRinging(true);

    // ✅ Play Bell Sound
    if (bellAudioRef.current) {
      bellAudioRef.current.currentTime = 0;
      bellAudioRef.current.play().catch(() => {});
    }

    // Stop bell shake + start door opening
    setTimeout(() => {
      setBellRinging(false);
      setDoorsOpen(true);

      // ✅ Play Door creak sound
      if (doorAudioRef.current) {
        doorAudioRef.current.currentTime = 0;
        doorAudioRef.current.play().catch(() => {});
      }
    }, 800);

    // Reveal content after door opens partially
    setTimeout(() => {
      setShowContent(true);
    }, 2000);
  };

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showContent, onComplete]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-maroon z-50 flex items-center justify-center overflow-hidden">
      {/* ✅ Sounds */}
      <audio ref={bellAudioRef} preload="auto" src={bellSound} />
      <audio ref={doorAudioRef} preload="auto" src={doorOpenSound} />

      {/* Temple Background */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${weddingBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Shiva-Parvati reveal */}
        <img
          src={shivaParvatiImage}
          alt="Lord Shiva and Parvati"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[90%] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-[2500ms] ease-out
          ${showContent ? "scale-100 opacity-100 blur-0" : "scale-90 opacity-0 blur-md"}`}
        />

        {/* Light Beam */}
        <div
          className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
            doorsOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,215,0,0.35), rgba(0,0,0,0.85))",
          }}
        />
      </div>

      {/* Doors */}
      <div
        className="absolute inset-0 w-full h-full flex"
        style={{ perspective: "2500px" }}
      >
        {/* seam */}
        <div
          className={`absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-black/40 z-20 transition-opacity duration-700 ${
            doorsOpen ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Left Door */}
        <div
          className="w-1/2 h-full origin-left will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transition: `transform ${DOOR_OPEN_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            transform: doorsOpen ? "rotateY(-120deg)" : "rotateY(0deg)",
            backgroundImage: `url(${templeDoors})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200% 100%",
            backgroundPosition: "left center",
            boxShadow: doorsOpen
              ? "inset 0 0 50px rgba(0,0,0,0.8)"
              : "inset 0 0 120px rgba(0,0,0,0.65)",
          }}
        />

        {/* Right Door */}
        <div
          className="w-1/2 h-full origin-right will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transition: `transform ${DOOR_OPEN_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            transform: doorsOpen ? "rotateY(120deg)" : "rotateY(0deg)",
            backgroundImage: `url(${templeDoors})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200% 100%",
            backgroundPosition: "right center",
            boxShadow: doorsOpen
              ? "inset 0 0 50px rgba(0,0,0,0.8)"
              : "inset 0 0 120px rgba(0,0,0,0.65)",
          }}
        />
      </div>

      {/* Bell Trigger */}
      {!doorsOpen && (
        <button
          onClick={handleOpen}
          className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 z-40 focus:outline-none"
          aria-label="Open the doors"
        >
          <img
            src={bellImage}
            alt="Bell"
            className={`h-20 md:h-24 drop-shadow-xl transition-transform duration-300
            ${
              bellRinging
                ? "animate-[shake_0.3s_infinite]"
                : "animate-bounce-subtle hover:scale-110"
            }`}
          />
        </button>
      )}

      {/* Text */}
      {showContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
          <div className="text-center space-y-6 bg-black/60 backdrop-blur-md rounded-3xl p-10 mx-4 border border-gold/40 animate-scale-in">
            <p className="text-4xl md:text-6xl text-gold font-bold animate-glow">
              ॥ ॐ नमः शिवाय ॥
            </p>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
            <p className="text-cream text-xl md:text-2xl">शुभ विवाह निमंत्रण</p>
          </div>
        </div>
      )}

      {/* Shake keyframes */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-3px) rotate(-3deg); }
            50% { transform: translateX(3px) rotate(3deg); }
            75% { transform: translateX(-3px) rotate(-3deg); }
            100% { transform: translateX(0) rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
};


// Events Timeline data - chronological order
const eventsTimeline: EventItem[] = [
  {
    id: "mehandi",
    title: "मेहंदी समारंभ",
    date: "०५/०२/२०२६",
    time: "सायं. ६ वा.",
    icon: "🌿",
    borderColor: "border-green-500",
    imagePlaceholder: "मेहंदी फोटो",
    imageStr: mehendiCeremony,

  },
  {
    id: "haldi",
    title: "हळदी समारंभ",
    date: "०६/०२/२०२६",
    time: "सायं. ६ वा. २१ मि.",
    icon: "🌼",
    borderColor: "border-saffron",
    imagePlaceholder: "हळदी फोटो",
    imageStr: haldiCeremony,
  },
  {
    id: "wedding",
    title: "शुभ विवाह",
    date: "०७/०२/२०२६",
    time: "सायं. ६ वा. २७ मि.",
    icon: "💍",
    borderColor: "border-maroon",
    imagePlaceholder: "विवाह फोटो",
    imageStr: weddingCeremony,
  },
];

// Single Event Card with Image and Animation
const EventCard = ({ event, index }: { event: EventItem; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center gap-4 w-full max-w-sm mx-auto transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Event Image Placeholder with hover animation */}
      <img src={event.imageStr} alt="" 
              className={`w-full aspect-[4/3] bg-gradient-to-br from-gold/20 to-maroon/20 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed ${event.borderColor}/50 group hover:scale-105 transition-transform duration-300 cursor-pointer`}
              />
      {/* <div
        className={`w-full aspect-[4/3] bg-gradient-to-br from-gold/20 to-maroon/20 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed ${event.borderColor}/50 group hover:scale-105 transition-transform duration-300 cursor-pointer`}
      >
        <Camera className="w-12 h-12 text-gold/50 group-hover:text-gold transition-colors duration-300 group-hover:scale-110" />
        <img src={event.imageStr} alt="" className="w-12 h-12 text-gold/50 group-hover:text-gold transition-colors duration-300 group-hover:scale-110" />
        <span className="text-sm text-gold/60 group-hover:text-gold transition-colors duration-300">
          {event.imagePlaceholder}
        </span>
      </div> */}

      {/* Event Details Card with bounce animation */}
      <div
        className={`${event.borderColor} border-2 rounded-2xl bg-cream/95 shadow-lg p-4 w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl animate-bounce-subtle">{event.icon}</span>
          <h4 className="text-lg md:text-xl font-bold text-maroon">
            {event.title}
          </h4>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="text-gold font-semibold">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-maroon" />
            <span className="text-maroon">{event.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Our Moments Gallery Placeholder
const OurMomentsGallery = () => {
  const placeholders = [
    { id: 1, label: "आमचे क्षण", imageUrl: Pic1 },
    { id: 2, label: "आठवणी", imageUrl: Pic2  },
    { id: 3, label: "प्रेम", imageUrl: Pic3  },
    { id: 4, label: "सोबत", imageUrl: Pic4  },
    { id: 5, label: "हास्य", imageUrl: Pic5  },
    { id: 6, label: "आनंद", imageUrl: Pic6  },

    // { id: 7, label: "आनंद", imageUrl: Pic7  },
    // { id: 8, label: "आनंद", imageUrl: Pic8  },
  ];

  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 bg-maroon/10 border-2 border-maroon rounded-2xl px-4 md:px-6 py-2 md:py-3">
        <Images className="w-5 h-5 md:w-6 md:h-6 text-maroon" />
        <h3 className="text-xl md:text-2xl text-maroon font-bold">आमचे क्षण</h3>
      </div>
      <p className="text-sm md:text-base text-muted-foreground">
        या प्रवासातील सुंदर क्षण
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 mt-4">
        {placeholders.map((item) => (
         
         <div className="w-full h-[220px] rounded-xl overflow-hidden border-2 border-dashed border-gold/40 hover:border-gold/80 transition-all">
            <img
              src={item.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/60 italic mt-4">
        * कार्यक्रमानंतर फोटो जोडले जातील
      </p>
    </div>
  );
};

// Background Music Component
const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Auto-play might be blocked
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Try to auto-play when component mounts
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Auto-play blocked, user needs to click
          });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Using a royalty-free Indian classical music - sitar melody */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={backgroundSound}
      />
      <button
        onClick={toggleMusic}
        className="fixed top-4 left-4 z-50 bg-cream/90 backdrop-blur-sm p-3 rounded-full shadow-lg border-2 border-gold/50 hover:scale-110 transition-transform"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-maroon" />
        ) : (
          <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-maroon" />
        )}
      </button>
    </>
  );
};

const Index = () => {
  const [showInvitation, setShowInvitation] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [revealedSections, setRevealedSections] = useState<Set<number>>(
    new Set(),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const sections: ScrollSection[] = [
    {
      id: "ganesh",
      revealStyle: "scale",
      content: (
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl animate-pulse" />
            <img
              src={ganeshImage}
              alt="श्री गणेशाय नमः"
              className="w-36 md:w-52 h-auto rounded-xl shadow-2xl relative z-10 border-4 border-gold/50"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-xl md:text-3xl text-gold font-bold">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <img
              src={dividerImage}
              alt=""
              className="w-32 md:w-48 h-auto mx-auto opacity-60"
            />
          </div>
        </div>
      ),
    },
    {
      id: "bride-groom",
      revealStyle: "slide",
      content: (
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
          <div className="flex flex-col items-center justify-center gap-6 md:gap-12">
            {/* Bride */}
            <div className="space-y-2 md:space-y-3 group">
              <p className="text-sm md:text-lg text-gold tracking-wide">
                चि. सौ. का.
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-maroon group-hover:text-gold transition-colors duration-500">
                उत्कर्षा
              </h2>
              <div className="text-xs md:text-sm text-muted-foreground space-y-0.5 md:space-y-1 max-w-xs leading-relaxed px-2">
                <p>कै. परशराम गेणू एरंडे यांची नात,</p>
                <p>सौ.सुनिता व श्री. सुभाष परशराम एरंडे</p>
                <p>रा.सिन्नर यांची ज्येष्ठ कन्या,</p>
                <p>श्री. प्रल्हाद आणि सुहास भाऊसाहेब वाळे</p>
                <p>रा. मंगळापूर (संगमनेर) यांची भाची</p>
              </div>
            </div>

            {/* Heart divider */}
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-maroon fill-maroon animate-pulse" />
              <div className="w-px h-8 md:h-12 bg-gradient-to-b from-gold via-maroon to-gold" />
            </div>

            {/* Groom */}
            <div className="space-y-2 md:space-y-3 group">
              <p className="text-sm md:text-lg text-gold tracking-wide">चि.</p>
              <h2 className="text-4xl md:text-6xl font-bold text-maroon group-hover:text-gold transition-colors duration-500">
                जयेश
              </h2>
              <div className="text-xs md:text-sm text-muted-foreground space-y-0.5 md:space-y-1 max-w-xs leading-relaxed px-2">
                <p>सौ. चंचला व अॅड. श्री. ज्ञानेश पोपटराव गोडके</p>
                <p>ह. रा.कल्याण, यांचे ज्येष्ठ चिरंजीव,</p>
                <p>श्री. रविंद्र श्यामराव कुंभाडे ह.रा.कल्याण ,</p>
                <p>रा. नांदुर्डी (निफाड) यांचे भाचे</p>
              </div>
            </div>
          </div>
          <img
            src={dividerImage}
            alt=""
            className="w-48 md:w-64 h-auto mx-auto opacity-50 mt-2 md:mt-4"
          />
        </div>
      ),
    },
    {
      id: "shubh-vivah",
      revealStyle: "flip",
      content: (
        <div className="text-center space-y-4 md:space-y-6">
          <p className="text-lg md:text-xl text-gold tracking-widest">यांचा</p>
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-maroon via-gold to-maroon animate-shimmer">
            शुभविवाह
          </h1>
          <p className="text-2xl md:text-3xl text-saffron font-semibold">
            सोहळा
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6">
            <span className="text-gold text-3xl md:text-4xl animate-spin-slow">
              卐
            </span>
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span
              className="text-gold text-3xl md:text-4xl animate-spin-slow"
              style={{ animationDirection: "reverse" }}
            >
              卐
            </span>
          </div>
        </div>
      ),
    },
    // Individual event sections - Mehandi
    {
      id: "event-mehandi",
      revealStyle: "fade",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl text-gold font-bold mb-6">
            शुभ कार्यक्रम
          </h3>
          <EventCard event={eventsTimeline[0]} index={0} />
        </div>
      ),
    },
    // Individual event sections - Haldi
    {
      id: "event-haldi",
      revealStyle: "fade",
      content: <EventCard event={eventsTimeline[1]} index={1} />,
    },
    // Individual event sections - Wedding
    {
      id: "event-wedding",
      revealStyle: "fade",
      content: (
        <div className="space-y-6">
          <EventCard event={eventsTimeline[2]} index={2} />
          <div className="bg-gradient-to-r from-transparent via-gold/20 to-transparent p-4 md:p-6 rounded-xl mt-4">
            <p className="text-sm md:text-base leading-relaxed max-w-xl mx-auto text-muted-foreground italic text-center">
              तरी या मंगल प्रसंगी आपण सहकुटुंब, सहपरिवार व मित्रमंडळी सह उपस्थित
              राहून शुभाशीर्वाद द्यावेत हि नम्र विनंती.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "venue",
      revealStyle: "slide",
      content: (
        <div className="text-center space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 bg-maroon/10 border-2 border-maroon rounded-2xl px-4 md:px-6 py-2 md:py-3">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-maroon" />
            <h3 className="text-xl md:text-2xl text-maroon font-bold">
              विवाह स्थळ
            </h3>
          </div>
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-saffron to-gold">
              गोविंद गोपाल, लॉन्स
            </h4>
            <p className="text-base md:text-lg text-muted-foreground">
              भैरवनाथ सोसायटी, नायगाव रोड
            </p>
            <p className="text-xl md:text-2xl font-bold text-maroon">
              सिन्नर, जि. नाशिक
            </p>
          </div>
          <button
            onClick={() =>
              window.open("https://maps.app.goo.gl/6zvnKw7mpCXdPGhJ8", "_blank")
            }
            className="inline-flex items-center gap-2 bg-gradient-to-r from-maroon to-gold text-cream px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg text-sm md:text-base"
          >
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            Google Maps वर पहा
          </button>
        </div>
      ),
    },
    {
      id: "nimantrak",
      revealStyle: "fade",
      content: (
        <div className="text-center space-y-4 md:space-y-6">
          <div className="inline-block border-b-4 border-gold pb-2 mb-2 md:mb-4">
            <h3 className="text-3xl md:text-4xl text-gold font-bold tracking-wide">
              निमंत्रक
            </h3>
          </div>
          <div className="space-y-2 md:space-y-3 text-sm md:text-lg leading-relaxed px-2">
            <p>श्री. संजय परशराम एरंडे, श्री. बाळासाहेब परशराम एरंडे</p>
            <p>श्री. सुभाष परशराम एरंडे, कु. समाधान सुभाष एरंडे</p>
          </div>
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t-2 border-gold/30">
            <p className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-maroon via-gold to-maroon">
              समस्त एरंडे परिवार आणि आप्तेष्ट
            </p>
          </div>
          <img
            src={dividerImage}
            alt=""
            className="w-32 md:w-48 h-auto mx-auto opacity-50 mt-4 md:mt-6"
          />
          <p className="text-gold text-base md:text-lg mt-6 md:mt-8">
            🙏 आपल्या उपस्थितीची प्रतीक्षा 🙏
          </p>
        </div>
      ),
    },
    {
      id: "our-moments",
      revealStyle: "scale",
      content: <OurMomentsGallery />,
    },
  ];

  useEffect(() => {
    if (!showInvitation) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const windowHeight = window.innerHeight;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const sectionCenter = sectionTop + sectionHeight / 2;

        // Calculate visibility based on section position
        const distanceFromCenter = Math.abs(sectionCenter - windowHeight / 2);
        const maxDistance = windowHeight / 2 + sectionHeight / 2;
        const visibility = Math.max(0, 1 - distanceFromCenter / maxDistance);

        // Mark section as revealed once visible
        if (visibility > 0.3) {
          setRevealedSections((prev) => new Set([...prev, index]));
        }

        // Apply different reveal styles
        const revealStyle = sections[index].revealStyle || "fade";
        const opacity = Math.pow(visibility, 1.2);

        let transform = "";
        switch (revealStyle) {
          case "scale":
            const scale = 0.7 + visibility * 0.3;
            transform = `scale(${scale})`;
            break;
          case "slide":
            const translateX = (1 - visibility) * 80;
            transform = `translateX(${index % 2 === 0 ? -translateX : translateX}px)`;
            break;
          case "flip":
            const rotateY = (1 - visibility) * 90;
            transform = `perspective(1000px) rotateY(${rotateY}deg)`;
            break;
          default:
            const translateY = (1 - visibility) * 50;
            transform = `translateY(${translateY}px)`;
        }

        section.style.opacity = `${opacity}`;
        section.style.transform = transform;

        // Update active section
        if (
          sectionCenter > windowHeight * 0.3 &&
          sectionCenter < windowHeight * 0.7
        ) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showInvitation]);

  if (!showInvitation) {
    return <TempleOpening onComplete={() => setShowInvitation(true)} />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${weddingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Music */}
      <BackgroundMusic />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream/40 pointer-events-none" />

      {/* Progress indicator - hidden on very small screens */}
      <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => {
              sectionsRef.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 border md:border-2 ${
              activeSection === index
                ? "bg-gold border-gold scale-150 shadow-lg shadow-gold/50"
                : revealedSections.has(index)
                  ? "bg-gold/50 border-gold/50"
                  : "bg-transparent border-gold/30"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Sections */}
      <div className="relative z-10">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="min-h-screen flex items-center justify-center px-3 md:px-4 py-12 md:py-20 transition-all duration-700 ease-out"
            style={{
              opacity: 0,
              transform: "translateY(50px)",
            }}
          >
            <div className="bg-cream/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-5 md:p-12 max-w-3xl w-full border border-gold/40 md:border-2 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-10 h-10 md:w-16 md:h-16 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-gold/60 rounded-tl-2xl md:rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-10 h-10 md:w-16 md:h-16 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-gold/60 rounded-tr-2xl md:rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 md:w-16 md:h-16 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-gold/60 rounded-bl-2xl md:rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 md:w-16 md:h-16 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-gold/60 rounded-br-2xl md:rounded-br-3xl" />

              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint - only show initially */}
      <div
        className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 ${activeSection > 0 ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex flex-col items-center gap-2 text-gold/80 animate-bounce">
          <span className="text-xs md:text-sm font-medium bg-cream/80 px-3 md:px-4 py-1 rounded-full">
            स्क्रोल करा ↓
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
