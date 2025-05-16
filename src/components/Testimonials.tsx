import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  comment: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechVision Inc.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      comment: "Working with Nexus has been transformative for our business. Their team understood our vision and delivered a digital solution that exceeded our expectations. Our online presence has never been stronger.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      position: "Marketing Director",
      company: "Global Solutions",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      comment: "The attention to detail and creativity that Nexus brings to the table is unmatched. They helped us reimagine our brand and implement a digital strategy that has yielded impressive ROI.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Chang",
      position: "COO",
      company: "Innovate Labs",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      comment: "Nexus delivered our project on time and on budget. Their team was responsive, professional, and brought innovative ideas that we hadn't even considered. We're already planning our next project with them.",
      rating: 4,
    },
  ];
  
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };
  
  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    let interval: number | null = null;
    if (autoplay) {
      interval = window.setInterval(() => {
        next();
      }, 5000);
    }
    
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [autoplay, current]);
  
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 100 : -100,
        opacity: 0,
      };
    },
  };
  
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setAutoplay(false);
    next();
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setAutoplay(false);
    prev();
  };
  
  return (
    <section id="testimonials" className="py-20 bg-dark-400 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="What Clients Say"
          title="Testimonials"
          description="Don't just take our word for it. Here's what our clients have to say about working with us."
        />
        
        <div className="mt-16 relative">
          <div className="w-full max-w-4xl mx-auto px-8 md:px-0">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative glass rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-primary-500/30">
                    <img 
                      src={testimonials[current].image} 
                      alt={testimonials[current].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonials[current].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-lg text-gray-300 mb-4 italic">"{testimonials[current].comment}"</p>
                    
                    <h4 className="text-xl font-semibold">{testimonials[current].name}</h4>
                    <p className="text-gray-400">{testimonials[current].position}, {testimonials[current].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                    setAutoplay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-primary-500 w-6' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-dark-300/80 flex items-center justify-center text-white pointer-events-auto hover:bg-primary-500 transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-dark-300/80 flex items-center justify-center text-white pointer-events-auto hover:bg-primary-500 transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark-300 to-transparent"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Testimonials;