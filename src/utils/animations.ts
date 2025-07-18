// src/utils/animations.ts

interface GSAPInstance {
  registerPlugin: (plugin: any) => void
  fromTo: (target: string | Element, fromVars: any, toVars: any) => any
  to: (target: string | Element, vars: any) => any
  set: (target: string | Element, vars: any) => void
  timeline: (vars?: any) => any
}

interface ScrollTriggerInstance {
  create: (vars: any) => any
}

declare global {
  interface Window {
    gsap: GSAPInstance
    ScrollTrigger: ScrollTriggerInstance
  }
}

// Vérifier si GSAP est disponible
const isGSAPAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gsap !== "undefined"
}

// Initialiser GSAP et ScrollTrigger
const initGSAP = (): {
  gsap: GSAPInstance
  ScrollTrigger: ScrollTriggerInstance
} | null => {
  if (!isGSAPAvailable()) {
    return null
  }

  const gsap = window.gsap
  const ScrollTrigger = window.ScrollTrigger

  gsap.registerPlugin(ScrollTrigger)

  return { gsap, ScrollTrigger }
}

// Animation de fade-in avec translation Y
export const fadeInUp = (selector: string, delay: number = 0, duration: number = 1) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap, ScrollTrigger } = gsapInstance

  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
      },
    }
  )
}

// Animation de fade-in avec translation X (gauche)
export const fadeInLeft = (selector: string, delay: number = 0, duration: number = 1) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap, ScrollTrigger } = gsapInstance

  gsap.fromTo(
    selector,
    {
      opacity: 0,
      x: -100,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
      },
    }
  )
}

// Animation de fade-in avec translation X (droite)
export const fadeInRight = (
  selector: string,
  delay: number = 0,
  duration: number = 1
) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap, ScrollTrigger } = gsapInstance

  gsap.fromTo(
    selector,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
      },
    }
  )
}

// Animation de scale avec fade-in
export const scaleIn = (selector: string, delay: number = 0, duration: number = 1.2) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap, ScrollTrigger } = gsapInstance

  gsap.fromTo(
    selector,
    {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
      },
    }
  )
}

// Animation de stagger pour les cartes
export const staggerCards = (selector: string, staggerDelay: number = 0.2) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap, ScrollTrigger } = gsapInstance

  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 80,
      scale: 0.8,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: staggerDelay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
      },
    }
  )
}

// Animation de timeline pour les éléments séquentiels
export const createTimeline = (
  trigger: string,
  elements: Array<{
    selector: string
    animation: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn"
    delay?: number
  }>
) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap, ScrollTrigger } = gsapInstance

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 80%",
    },
  })

  elements.forEach((element, index) => {
    const delay = element.delay || index * 0.3

    switch (element.animation) {
      case "fadeInUp":
        tl.fromTo(
          element.selector,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          `-=${0.5 - delay}`
        )
        break
      case "fadeInLeft":
        tl.fromTo(
          element.selector,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          `-=${0.5 - delay}`
        )
        break
      case "fadeInRight":
        tl.fromTo(
          element.selector,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          `-=${0.5 - delay}`
        )
        break
      case "scaleIn":
        tl.fromTo(
          element.selector,
          { opacity: 0, scale: 0.8, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
          `-=${0.5 - delay}`
        )
        break
    }
  })

  return tl
}

// Animation du header au scroll
export const headerScrollEffect = () => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { ScrollTrigger } = gsapInstance

  ScrollTrigger.create({
    trigger: "body",
    start: "100px top",
    onToggle: (self: any) => {
      const header = document.getElementById("header")
      if (header) {
        if (self.isActive) {
          header.classList.add("bg-neutral-900/95", "shadow-lg")
          header.classList.remove("bg-neutral-900/80")
        } else {
          header.classList.add("bg-neutral-900/80")
          header.classList.remove("bg-neutral-900/95", "shadow-lg")
        }
      }
    },
  })
}

// Animation de hover pour les boutons
export const buttonHoverEffect = (selector: string) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap } = gsapInstance
  const button = document.querySelector(selector)

  if (button) {
    button.addEventListener("mouseenter", () => {
      gsap.to(button as Element, {
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      })
    })

    button.addEventListener("mouseleave", () => {
      gsap.to(button as Element, {
        scale: 1,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      })
    })
  }
}

// Animation de hover pour les cartes
export const cardHoverEffect = (selector: string) => {
  const gsapInstance = initGSAP()
  if (!gsapInstance) return

  const { gsap } = gsapInstance

  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const cardElement = card.querySelector(".bg-gray-800\\/50")
      if (cardElement) {
        gsap.to(cardElement as Element, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    })

    card.addEventListener("mouseleave", () => {
      const cardElement = card.querySelector(".bg-gray-800\\/50")
      if (cardElement) {
        gsap.to(cardElement as Element, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    })
  })
}

// Fallback pour afficher le contenu si GSAP ne se charge pas
export const setupFallback = () => {
  setTimeout(() => {
    const elements = document.querySelectorAll(".gsap-ready")
    elements.forEach((el: Element) => {
      const element = el as HTMLElement
      if (element.style.opacity === "0" || element.style.opacity === "") {
        element.style.opacity = "1"
        element.style.transform = "translateY(0) scale(1)"
      }
    })
  }, 2000)
}
