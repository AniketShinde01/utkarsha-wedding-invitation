import { useEffect, useRef, useState } from "react";
import weddingBg from "@/assets/wedding-bg.jpg";
import ganeshImage from "@/assets/ganesh.png";
import diyaImage from "@/assets/diya.png";
import dividerImage from "@/assets/divider.png";
import { MapPin, Calendar, Clock, Heart, Camera, Images } from "lucide-react";

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
  color: string;
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
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

// Opening Diya Animation
const DiyaOpening = ({ onComplete }: { onComplete: () => void }) => {
  const [isLit, setIsLit] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleLight = () => {
    setIsLit(true);
    setTimeout(() => setShowText(true), 800);
    setTimeout(() => onComplete(), 2500);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-maroon/95 to-black z-50 flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 md:space-y-8">
        {!isLit && (
          <p className="text-gold text-lg md:text-xl animate-pulse">दिवा प्रज्वलित करा</p>
        )}
        
        <div 
          className={`relative cursor-pointer transition-all duration-1000 ${isLit ? 'scale-110' : 'hover:scale-105'}`}
          onClick={handleLight}
        >
          <img 
            src={diyaImage} 
            alt="Diya" 
            className="w-28 h-28 md:w-40 md:h-40 mx-auto object-contain"
          />
          {isLit && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-10 md:w-8 md:h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-sm animate-pulse" 
                   style={{ marginTop: '-30px' }} 
              />
            </div>
          )}
          {isLit && (
            <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping" />
          )}
        </div>

        {!isLit && (
          <p className="text-cream/60 text-xs md:text-sm">टॅप करा</p>
        )}

        {showText && (
          <div className="animate-fade-in-up space-y-3 md:space-y-4">
            <p className="text-2xl md:text-4xl text-gold font-semibold">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="text-cream/80 text-base md:text-lg">शुभ विवाह निमंत्रण</p>
          </div>
        )}
      </div>
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
    color: "from-green-600 to-green-400"
  },
  {
    id: "haldi",
    title: "हळदी समारंभ",
    date: "०६/०२/२०२६",
    time: "सायं. ६ वा. २१ मि.",
    icon: "🌼",
    color: "from-saffron to-yellow-400"
  },
  {
    id: "wedding",
    title: "शुभ विवाह",
    date: "०७/०२/२०२६",
    time: "सायं. ६ वा. २७ मि.",
    icon: "💍",
    color: "from-maroon to-gold"
  }
];

// Our Moments Gallery Placeholder
const OurMomentsGallery = () => {
  const placeholders = [
    { id: 1, label: "आमचे क्षण" },
    { id: 2, label: "आठवणी" },
    { id: 3, label: "प्रेम" },
    { id: 4, label: "सोबत" },
    { id: 5, label: "हास्य" },
    { id: 6, label: "आनंद" },
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-4">
        {placeholders.map((item) => (
          <div 
            key={item.id} 
            className="aspect-square bg-gradient-to-br from-gold/20 to-maroon/20 rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gold/40 hover:border-gold/80 transition-all cursor-pointer group"
          >
            <Camera className="w-8 h-8 md:w-10 md:h-10 text-gold/50 group-hover:text-gold transition-colors" />
            <span className="text-xs md:text-sm text-gold/60 group-hover:text-gold transition-colors">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/60 italic mt-4">
        * कार्यक्रमानंतर फोटो जोडले जातील
      </p>
    </div>
  );
};

const Index = () => {
  const [showInvitation, setShowInvitation] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [revealedSections, setRevealedSections] = useState<Set<number>>(new Set());
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
            <img src={dividerImage} alt="" className="w-32 md:w-48 h-auto mx-auto opacity-60" />
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
              <p className="text-sm md:text-lg text-gold tracking-wide">चि. सौ. का.</p>
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
          <img src={dividerImage} alt="" className="w-48 md:w-64 h-auto mx-auto opacity-50 mt-2 md:mt-4" />
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
          <p className="text-2xl md:text-3xl text-saffron font-semibold">सोहळा</p>
          <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6">
            <span className="text-gold text-3xl md:text-4xl animate-spin-slow">卐</span>
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="text-gold text-3xl md:text-4xl animate-spin-slow" style={{ animationDirection: 'reverse' }}>卐</span>
          </div>
        </div>
      ),
    },
    {
      id: "events-timeline",
      revealStyle: "fade",
      content: (
        <div className="text-center space-y-6 md:space-y-8 w-full">
          <h3 className="text-2xl md:text-3xl text-gold font-bold">शुभ कार्यक्रम</h3>
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-maroon to-gold -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-4 md:space-y-6">
              {eventsTimeline.map((event, index) => (
                <div 
                  key={event.id}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                >
                  {/* Event Card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-block bg-gradient-to-r ${event.color} p-0.5 rounded-2xl`}>
                      <div className="bg-cream rounded-2xl px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <span className="text-2xl md:text-3xl">{event.icon}</span>
                          <h4 className="text-lg md:text-xl font-bold text-maroon">{event.title}</h4>
                        </div>
                        <div className="mt-2 space-y-1 text-sm md:text-base">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <Calendar className="w-4 h-4 text-gold" />
                            <span className="text-gold font-semibold">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <Clock className="w-4 h-4 text-maroon" />
                            <span className="text-maroon">{event.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 md:w-5 md:h-5 bg-gold rounded-full border-4 border-cream shadow-lg my-2 md:my-0" />
                  
                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-transparent via-gold/20 to-transparent p-4 md:p-6 rounded-xl mt-4">
            <p className="text-sm md:text-lg leading-relaxed max-w-xl mx-auto text-muted-foreground italic">
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
            <h3 className="text-xl md:text-2xl text-maroon font-bold">विवाह स्थळ</h3>
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
            onClick={() => window.open('https://maps.google.com/?q=Sinner+Nashik', '_blank')}
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
            <h3 className="text-3xl md:text-4xl text-gold font-bold tracking-wide">निमंत्रक</h3>
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
          <img src={dividerImage} alt="" className="w-32 md:w-48 h-auto mx-auto opacity-50 mt-4 md:mt-6" />
          <p className="text-gold text-base md:text-lg mt-6 md:mt-8">🙏 आपल्या उपस्थितीची प्रतीक्षा 🙏</p>
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
          setRevealedSections(prev => new Set([...prev, index]));
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
        if (sectionCenter > windowHeight * 0.3 && sectionCenter < windowHeight * 0.7) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showInvitation]);

  if (!showInvitation) {
    return <DiyaOpening onComplete={() => setShowInvitation(true)} />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${weddingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
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
              sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      <div className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 ${activeSection > 0 ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center gap-2 text-gold/80 animate-bounce">
          <span className="text-xs md:text-sm font-medium bg-cream/80 px-3 md:px-4 py-1 rounded-full">स्क्रोल करा ↓</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
