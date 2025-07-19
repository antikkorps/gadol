// src/utils/animations.ts

declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
  }
}

// Système de fallback pour les éléments si GSAP n'est pas disponible
export const setupFallback = () => {
  console.log("Activation du fallback - affichage du contenu")

  // Fallback immédiat pour le Hero
  const heroElements = document.querySelectorAll("#hero-title, #hero-subtitle, #hero-cta")
  heroElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.opacity = "1"
      element.style.transform = "none"
    }
  })

  // Fallback pour tous les autres éléments
  setTimeout(() => {
    const elements = document.querySelectorAll(".gsap-ready")
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.opacity = "1"
        element.style.transform = "none"
      }
    })
  }, 100)
}

// Fonction d'initialisation globale des animations
export const initAnimations = () => {
  console.log("Tentative d'initialisation des animations")

  // Vérifier si GSAP est disponible
  if (typeof window === "undefined" || !window.gsap) {
    console.log("GSAP non disponible, utilisation du fallback")
    setupFallback()
    return
  }

  const gsap = window.gsap
  const ScrollTrigger = window.ScrollTrigger

  // Enregistrer ScrollTrigger si disponible
  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger)
  }

  console.log("GSAP initialisé, démarrage des animations")

  try {
    // Animations du Hero (immédiates)
    console.log("Animation du Hero...")
    const heroTimeline = gsap.timeline()
    heroTimeline
      .fromTo(
        "#hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.2
      )
      .fromTo(
        "#hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.4
      )
      .fromTo(
        "#hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.6
      )

    // Animations simples sans ScrollTrigger pour les tests
    console.log("Animation des Features...")
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1, // Délai pour voir l'animation
      }
    )

    console.log("Animation des sections...")
    gsap.fromTo(
      "#problem-section",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.5,
      }
    )

    gsap.fromTo(
      "#solution-section",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.7,
      }
    )

    gsap.fromTo(
      "#video-player",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "back.out(1.7)",
        delay: 2,
      }
    )

    gsap.fromTo(
      "#cta-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 2.5,
      }
    )

    gsap.fromTo(
      "#cta-subtitle",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 2.7,
      }
    )

    gsap.fromTo(
      "#cta-stats",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 2.9,
      }
    )

    gsap.fromTo(
      "#cta-form",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 3.1,
      }
    )

    gsap.fromTo(
      "#trust-indicators",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 3.3,
      }
    )

    // Effets de hover
    setupHoverEffects()
  } catch (error) {
    console.error("Erreur lors de l'initialisation des animations:", error)
    setupFallback()
  }
}

// Configuration des effets de hover
const setupHoverEffects = () => {
  const gsap = window.gsap

  console.log("Configuration des effets de hover...")

  // Effet de hover pour les boutons
  const buttons = document.querySelectorAll('#cta-form button[type="submit"]')
  console.log("Boutons trouvés:", buttons.length)
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      })
    })

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      })
    })
  })

  // Effet de hover pour tous les boutons du Hero
  const heroButtons = document.querySelectorAll('#hero-cta button[type="submit"]')
  console.log("Boutons Hero trouvés:", heroButtons.length)
  heroButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      })
    })

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      })
    })
  })

  // Effet de hover pour les cartes
  const featureCards = document.querySelectorAll(".feature-card")
  console.log("Cartes Features trouvées:", featureCards.length)
  featureCards.forEach((card, index) => {
    console.log(`Configuration de la carte ${index + 1}`)

    const icon = card.querySelector(".w-16.h-16")
    const title = card.querySelector("h3")
    const indicator = card.querySelector(".mt-6.w-12.h-1")
    const cardContent = card.querySelector(".bg-gray-800\\/50")

    card.addEventListener("mouseenter", () => {
      console.log(`Hover sur carte ${index + 1}`)

      // Animation de la carte
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      })

      // Animation de l'icône
      if (icon) {
        gsap.to(icon, {
          rotation: 6,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }

      // Changement de couleur du titre
      if (title) {
        gsap.to(title, {
          color: "#60A5FA", // blue-400
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }

      // Animation de l'indicateur
      if (indicator) {
        gsap.to(indicator, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }

      // Changement de bordure
      if (cardContent) {
        gsap.to(cardContent, {
          borderColor: "rgba(59, 130, 246, 0.5)", // blue-500/50
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }
    })

    card.addEventListener("mouseleave", () => {
      console.log(`Sortie hover carte ${index + 1}`)

      // Retour à la position normale de la carte
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      })

      // Retour à la position normale de l'icône
      if (icon) {
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }

      // Retour à la couleur normale du titre
      if (title) {
        gsap.to(title, {
          color: "#FFFFFF", // white
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }

      // Retour de l'indicateur
      if (indicator) {
        gsap.to(indicator, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }

      // Retour de la bordure
      if (cardContent) {
        gsap.to(cardContent, {
          borderColor: "rgba(55, 65, 81, 0.5)", // gray-700/50
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        })
      }
    })
  })
}
