import { useEffect, useRef, useState } from "react";
import weddingBg from "@/assets/wedding-bg.jpg";
import ganeshImage from "@/assets/ganesh.png";

interface ScrollSection {
  id: string;
  content: React.ReactNode;
  delay?: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const sections: ScrollSection[] = [
    {
      id: "ganesh",
      content: (
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={ganeshImage}
            alt="श्री गणेशाय नमः"
            className="w-48 h-auto rounded-xl shadow-gold animate-float"
          />
          <p className="text-2xl text-gold font-semibold text-shadow-gold">
            ॥ श्री गणेशाय नमः ॥
          </p>
        </div>
      ),
    },
    {
      id: "bride-groom",
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
          <div className="space-y-2">
            <p className="text-lg text-gold">चि. सौ. का.</p>
            <h2 className="text-5xl md:text-6xl font-bold text-maroon">उत्कर्षा</h2>
            <div className="text-sm text-muted-foreground space-y-1 max-w-xs">
              <p>कै. परशराम गेणू एरंडे यांची नात,</p>
              <p>सौ.सुनिता व श्री. सुभाष परशराम एरंडे</p>
              <p>रा.सिन्नर यांची ज्येष्ठ कन्या,</p>
              <p>श्री. प्रल्हाद आणि सुहास भाऊसाहेब वाळे</p>
              <p>रा. मंगळापूर (संगमनेर) यांची भाची</p>
            </div>
          </div>

          <div className="text-4xl text-gold">❧</div>

          <div className="space-y-2">
            <p className="text-lg text-gold">चि.</p>
            <h2 className="text-5xl md:text-6xl font-bold text-maroon">जयेश</h2>
            <div className="text-sm text-muted-foreground space-y-1 max-w-xs">
              <p>सौ. चंचला व अॅड. श्री. ज्ञानेश पोपटराव गोडके</p>
              <p>ह. रा.कल्याण, यांचे ज्येष्ठ चिरंजीव,</p>
              <p>श्री. रविंद्र श्यामराव कुंभाडे ह.रा.कल्याण ,</p>
              <p>रा. नांदुर्डी (निफाड) यांचे भाचे</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "shubh-vivah",
      content: (
        <div className="text-center space-y-4">
          <p className="text-xl text-gold">यांचा</p>
          <h1 className="text-5xl md:text-7xl font-bold text-maroon text-shadow-gold">
            शुभविवाह
          </h1>
          <p className="text-2xl text-saffron">सोहळा</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-gold text-3xl">卐</span>
            <span className="text-gold text-3xl">卐</span>
          </div>
        </div>
      ),
    },
    {
      id: "date-time",
      content: (
        <div className="text-center space-y-6 px-4">
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            शनिवार, दि. <span className="text-gold font-bold">०७/०२/२०२६</span>{" "}
            रोजी सायं. ६ वा. २७ मि. या शुभमुहूर्तावर करण्याचे योजिले आहे.
          </p>
          <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto text-muted-foreground">
            तरी या मंगल प्रसंगी आपण सहकुटुंब, सहपरिवार व मित्रमंडळी सह उपस्थित
            राहून शुभाशीर्वाद द्यावेत हि नम्र विनंती.
          </p>
        </div>
      ),
    },
    {
      id: "haldi",
      content: (
        <div className="text-center space-y-4">
          <div className="inline-block bg-gold/20 border-2 border-gold rounded-full px-6 py-2">
            <h3 className="text-2xl text-gold font-semibold">ढळढी समारंभ</h3>
          </div>
          <div className="space-y-2 text-lg">
            <p>
              शुक्रवार, दिनांक{" "}
              <span className="text-gold font-bold">०६/०२/२०२६</span>
            </p>
            <p>रोजी सायं. ६ वा. २१ मि.</p>
          </div>
        </div>
      ),
    },
    {
      id: "venue",
      content: (
        <div className="text-center space-y-4">
          <div className="inline-block bg-maroon/10 border-2 border-maroon rounded-full px-6 py-2">
            <h3 className="text-2xl text-maroon font-semibold">विवाह स्थळ</h3>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl md:text-3xl font-bold text-gold">
              गोविंद गोपाल, लॉन्स
            </h4>
            <p className="text-lg text-muted-foreground">
              भैरवनाथ सोसायटी, नायगाव रोड
            </p>
            <p className="text-xl font-semibold text-maroon">
              सिन्नर, जि. नाशिक
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "nimantrak",
      content: (
        <div className="text-center space-y-4">
          <div className="inline-block border-b-2 border-gold pb-2">
            <h3 className="text-3xl text-gold font-bold">निमंत्रक</h3>
          </div>
          <div className="space-y-2 text-lg">
            <p>श्री. संजय परशराम एरंडे, श्री. बाळासाहेब परशराम एरंडे</p>
            <p>श्री. सुभाष परशराम एरंडे, कु. समाधान सुभाष एरंडे</p>
          </div>
          <div className="mt-6 pt-4 border-t-2 border-gold/30">
            <p className="text-xl md:text-2xl font-bold text-maroon">
              समस्त एरंडे परिवार आणि आप्तेष्ट
            </p>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
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

        // Apply opacity and transform
        const opacity = Math.pow(visibility, 1.5);
        const translateY = (1 - visibility) * 50;
        const scale = 0.8 + visibility * 0.2;

        section.style.opacity = `${opacity}`;
        section.style.transform = `translateY(${translateY}px) scale(${scale})`;

        // Update active section
        if (sectionCenter > windowHeight * 0.3 && sectionCenter < windowHeight * 0.7) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Overlay */}
      <div className="fixed inset-0 bg-cream/30 pointer-events-none" />

      {/* Progress indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === index
                ? "bg-gold scale-150 shadow-gold"
                : "bg-gold/40"
            }`}
          />
        ))}
      </div>

      {/* Sections */}
      <div className="relative z-10">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="min-h-screen flex items-center justify-center px-4 py-20 transition-all duration-300 ease-out"
            style={{
              opacity: 0,
              transform: "translateY(50px) scale(0.8)",
            }}
          >
            <div className="bg-cream/80 backdrop-blur-sm rounded-2xl shadow-gold p-8 md:p-12 max-w-3xl w-full border-2 border-gold/30">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-gold/70">
          <span className="text-sm">स्क्रोल करा</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Index;
