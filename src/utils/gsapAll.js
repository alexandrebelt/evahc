import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


export function configGsap() {
    gsap.registerPlugin(ScrollTrigger);

    // Pausa o ScrollTrigger existente
    setTimeout(() => {
        ScrollTrigger.getAll().forEach(trigger => {
            trigger.refresh();
        });
    }, 1000);

    /*FOOTER*/

    gsap.to(".btn-orcamento-in", {
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