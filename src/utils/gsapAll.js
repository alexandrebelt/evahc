import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


export function configGsap() {
    gsap.registerPlugin(ScrollTrigger);

    // Pausa o ScrollTrigger existente
    setTimeout(() => {
        ScrollTrigger.getAll().forEach(trigger => {
            trigger.refresh();
        });
    }, 1200);

    /*FOOTER*/

    gsap.to(".btn-orcamento", {
        keyframes: {
            "0%": { x: -100 },
            "100%": { x: 0 },
        }, scrollTrigger: {
            trigger: "footer",
            scrub: 1,
            start: "top bottom",
            end: "bottom center",

        }
    })
    gsap.to("#footer", {
        keyframes: {
            "0%": { y: "-100px" },
            "100%": { y: "0px" }
        },
        scrollTrigger: {
            trigger: "#footer",
            scrub: 1,
            start: "top bottom",
            end: "bottom center",
        }
    })
}

export function initGsap() {
    const tl = gsap.timeline()
    gsap.set("#home-banner", {y:0})

    gsap.utils.toArray(".banner-text").forEach((text) => {

      tl.to(text, {
        y: -200,
        scrollTrigger: {
          trigger: "body",
          scrub: true,
          start: "0% 0%",
          end: "100%"
        }
      })
    }),
    gsap.from("#home-banner", {y:0})
      tl.to('#home-banner', {
          y:100,
          scrollTrigger: {
          trigger: "body",
          scrub: true,
          start: "top top",
          end: "+=1000",
        }
      })
    gsap.utils.toArray(".project-cover").forEach((panel, i, array) => {
      tl.to(panel, {
        keyframes: {
          "0%": { scale: 1, },
          "80%": { scale: 0.8, filter: "blur(0px)" },
          "100%": { scale: 0.8, filter: "blur(10px)"},
        },
        scrollTrigger: {
          trigger: panel,
          scrub: 2,
          start: `70% center+=${25 * i}`,
          //end: `bottom+=${1000 * (array.length - i)}`,
          pin: true,
          pinSpacing: false,
        },

      })
    })
    


  }