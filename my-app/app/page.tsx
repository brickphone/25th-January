'use client'

// File: pages/index.js
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import FallingBeam from '@/components/FallingBeam';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  // State for anniversary date and time difference
  const [timeDifference, setTimeDifference] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // State for memory modal
  const [showMemory, setShowMemory] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);
  
  // Ref for timeline section
  const timelineRef = useRef(null);
  

  const startDate = new Date('2025-01-25'); 
  
  // Replace the memories array with simplified version
  const memories = [
    { description: 'Our first date at the park' },
    { description: 'The concert where we danced all night' },
    { description: 'Our trip to the beach' },
    { description: 'When we cooked dinner together for the first time' },
    { description: 'The day we moved in together' }
  ];
  
  // Update timeline events without images
  const timelineEvents = [
    { 
      title: 'How We Met', 
      date: 'February 24, 2024', 
      description: 'I saw you across the room and knew I had to talk to you.'
    },
    { 
      title: 'First Date', 
      date: 'March 10, 2024', 
      description: 'Coffee and a walk in the park. I was so nervous, but you made it easy.'
    },
    { 
      title: 'First Kiss', 
      date: 'March 24, 2024', 
      description: "Under the stars at the viewpoint. A moment I will never forget."
    },
    { 
      title: 'Made It Official', 
      date: 'April 15, 2024', 
      description: "When you asked \"Are we a thing?\" and I could not say yes fast enough."
    },
    { 
      title: 'First Trip Together', 
      date: 'June 10, 2024', 
      description: 'That weekend getaway where we got lost and found the best hidden restaurant.'
    }
  ];
  
  // Calculate time difference function
  const calculateTimeDifference = () => {
    const now = new Date();
    // Calculate time elapsed since the start date (positive value)
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    
    // Calculate months (approximate)
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    
    // Calculate remaining days after removing months
    const remainingTime = diffTime - (diffMonths * 1000 * 60 * 60 * 24 * 30.44);
    const diffDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    
    // Calculate remaining hours after removing days
    const remainingTimeAfterDays = remainingTime - (diffDays * 1000 * 60 * 60 * 24);
    const diffHours = Math.floor(remainingTimeAfterDays / (1000 * 60 * 60));
    
    // Calculate remaining minutes after removing hours
    const remainingTimeAfterHours = remainingTimeAfterDays - (diffHours * 1000 * 60 * 60);
    const diffMinutes = Math.floor(remainingTimeAfterHours / (1000 * 60));
    
    // Calculate remaining seconds after removing minutes
    const remainingTimeAfterMinutes = remainingTimeAfterHours - (diffMinutes * 1000 * 60);
    const diffSeconds = Math.floor(remainingTimeAfterMinutes / 1000);
    
    setTimeDifference({
      months: diffMonths,
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      seconds: diffSeconds
    });
  };
  
  // Update the timeline animation
  const initializeTimeline = () => {
    if (typeof window !== 'undefined' && timelineRef.current) {
      gsap.utils.toArray<HTMLElement>('.timeline-event').forEach((event) => {
        gsap.fromTo(
          event,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: event,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        const hearts = event.querySelectorAll<HTMLElement>('.heart');
        hearts.forEach((heart: HTMLElement) => {
          gsap.to(heart, {
            y: -20,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: 'power1.out',
            delay: Math.random() * 2
          });
        });
      });
    }
  };
  
  // Show a random memory
  const showRandomMemory = () => {
    const randomIndex = Math.floor(Math.random() * memories.length);
    setCurrentMemory(randomIndex);
    setShowMemory(true);
  };
  
  // Initialize counter and timeline on component mount
  useEffect(() => {
    calculateTimeDifference();
    const interval = setInterval(calculateTimeDifference, 1000);
    
    // Initialize GSAP timeline
    initializeTimeline();
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Head>
        <title>Our Special Journey Together</title>
        <meta name="description" content="A celebration of our love story" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* FallingBeam as background */}
      <div className="fixed inset-0 z-0">
        <FallingBeam 
          beamCount={100} 
          backgroundColor="black" 
          text=""
        />
      </div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-10">Grattis på månadsdagen!</h1>
          
          {/* Counter - moved outside of box */}
          <div className="mb-10">
            <p className="text-lg mb-4 text-white">Vi har varit tillsammans i:</p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.months}</div>
                <div className="text-white">Månader</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.days}</div>
                <div className="text-white">Dagar</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.hours}</div>
                <div className="text-white">Timmar</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.seconds}</div>
                <div className="text-white">Sekunder</div>
              </div>
            </div>
          </div>
          
          {/* Memory Button */}
          <button 
            onClick={showRandomMemory} 
            className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            Click For A Memory
          </button>
        </section>
        
        {/* Timeline Section */}
        <section ref={timelineRef} className="min-h-screen pb-20">
          <h2 className="text-4xl font-bold text-center text-white pt-10 mb-12">Our Love Story</h2>
          
          <div className="relative max-w-3xl mx-auto px-4">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white opacity-50"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`timeline-event relative mb-16 ${index % 2 === 0 ? 'left-event' : 'right-event'}`}
              >
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="bg-black bg-opacity-70 rounded-lg shadow-lg p-6 w-full z-10 border border-white border-opacity-30">
                    <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                    <p className="text-white opacity-80 mb-2">{event.date}</p>
                    <p className="text-white">{event.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                </div>
                
                {/* Floating hearts */}
                <div className="heart absolute text-white opacity-70" style={{ left: `${30 + Math.random() * 40}%`, bottom: `${60 + Math.random() * 30}%` }}>❤️</div>
                <div className="heart absolute text-white opacity-70" style={{ right: `${30 + Math.random() * 40}%`, bottom: `${70 + Math.random() * 20}%` }}>❤️</div>
              </div>
            ))}
          </div>
          
          {/* Final message */}
          <div className="text-center mt-20 px-4">
            <h3 className="text-3xl font-bold text-white mb-4">Here&apos;s to many more beautiful memories together!</h3>
            <p className="text-lg max-w-2xl mx-auto text-white">I love you more each day, and I can&apos;t wait to see what the future holds for us. Thank you for being my partner, my best friend, and my favorite person.</p>
          </div>
        </section>
      </main>
      
      {/* Memory Modal */}
      {showMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={() => setShowMemory(false)}>
          <div className="bg-black rounded-lg max-w-lg w-full overflow-hidden border border-white border-opacity-30" onClick={e => e.stopPropagation()}>
            <div className="p-4">
              <p className="text-lg text-center text-white">{memories[currentMemory].description}</p>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => setCurrentMemory(prev => (prev === 0 ? memories.length - 1 : prev - 1))}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentMemory(prev => (prev === memories.length - 1 ? 0 : prev + 1))}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}