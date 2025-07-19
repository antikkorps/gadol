import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export interface AnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  toggleActions?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
}

export class GSAPAnimations {
  static fadeInUp(
    selector: string, 
    options: AnimationOptions = {}
  ) {
    const defaults = {
      trigger: selector,
      start: "top 80%",
      toggleActions: "play none none reverse",
      duration: 0.8,
      ease: "power3.out"
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(selector, 
      {
        opacity: 0,
        y: 50,
        scale: selector.includes('card') ? 0.95 : 1
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: config.duration,
        delay: config.delay,
        stagger: config.stagger,
        ease: config.ease,
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start,
          end: config.end,
          toggleActions: config.toggleActions,
          scrub: config.scrub
        }
      }
    );
  }

  static fadeInStagger(
    selector: string,
    options: AnimationOptions = {}
  ) {
    const defaults = {
      trigger: selector,
      start: "top 80%",
      toggleActions: "play none none reverse",
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    };
    
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(selector,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease,
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start,
          end: config.end,
          toggleActions: config.toggleActions,
          scrub: config.scrub
        }
      }
    );
  }

  static cardTilt3D(cardSelector: string) {
    const cards = document.querySelectorAll<HTMLElement>(cardSelector);
    
    cards.forEach(card => {
      const cardContent = card.querySelector<HTMLElement>(".showcase-card-content");
      if (!cardContent) return;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        
        const rotateX = gsap.utils.mapRange(0, height, -10, 10, y);
        const rotateY = gsap.utils.mapRange(0, width, 10, -10, x);

        gsap.to(cardContent, {
          duration: 0.3,
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(cardContent, {
          duration: 0.8,
          rotationX: 0,
          rotationY: 0,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }

  static initScrollAnimations() {
    // Refresh ScrollTrigger after all animations are set
    ScrollTrigger.refresh();
  }
}