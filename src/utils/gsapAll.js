import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function initScrollLetters() {
  // Scrolling Letters Both Direction
  // https://codepen.io/GreenSock/pen/rNjvgjo
  // Fixed example with resizing
  // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010

  let direction = 1; // 1 = forward, -1 = backward scroll

  const roll1 = roll(".banner-text h1", { duration: 18 }),
    scroll = ScrollTrigger.create({
      trigger: document.querySelector('[data-scroll-container]'),
      onUpdate(self) {
        if (self.direction !== direction) {
          direction *= -1;
          gsap.to([roll1], { timeScale: direction, overwrite: true });
        }
      }
    });

  // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
  function roll(targets, vars, reverse) {
    vars = vars || {};
    vars.ease || (vars.ease = "none");
    const tl = gsap.timeline({
      repeat: -1,
      onReverseComplete() {
        this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
      }
    }),
      elements = gsap.utils.toArray(targets),
      clones = elements.map(el => {
        let clone = el.cloneNode(true);
        el.parentNode.appendChild(clone);
        return clone;
      }),
      positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], { position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth) }));
    positionClones();
    elements.forEach((el, i) => tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0));
    window.addEventListener("resize", () => {
      let time = tl.totalTime(); // record the current time
      tl.totalTime(0); // rewind and clear out the timeline
      positionClones(); // reposition
      tl.totalTime(time); // jump back to the proper time
    });
    return tl;
  }

}

export function configGsap() {
  gsap.killTweensOf('.btn-orcamento')
  gsap.registerPlugin(ScrollTrigger);
  // Pausa o ScrollTrigger existente
  setTimeout(() => {
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.refresh();
    });
  }, 1200);

  /*FOOTER*/

  if (window.innerWidth <= 750) {
    gsap.to(".btn-orcamento", {
      keyframes: {
        "0%": { x: 0 },
        "100%": { x: 0 },
      }, scrollTrigger: {
        trigger: "footer",
        scrub: 1,
        start: "top bottom",
        end: "bottom center",
        invalidateOnRefresh: true,

      }
    })
  } else {
    gsap.to(".btn-orcamento", {
      keyframes: {
        "0%": { x: -100 },
        "100%": { x: 0 },
      }, scrollTrigger: {
        trigger: "footer",
        scrub: 1,
        start: "top bottom",
        end: "bottom center",
        invalidateOnRefresh: true,

      }
    })
  }
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
  gsap.set("#home-banner", { y: 0 })



  //gsap.utils.toArray(".banner-text").forEach((text) => {
  //  tl.to(text, {
  //    y: -200,
  //    scrollTrigger: {
  //      trigger: "body",
  //      scrub: tr1ue,
  //      start: "0% 0%",
  //      end: "100%"
  //    }
  //  })
  //}),
  gsap.from("#home-banner", { y: 0 })
  tl.to('#home-banner', {
    y: 100,
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
        "100%": { scale: 0.8, filter: "blur(10px)" },
      },
      scrollTrigger: {
        trigger: panel,
        scrub: 2,
        start: `47% center+=${15 * i}`,
        //end: `bottom+=${1000 * (array.length - i)}`,
        end: "bottom",
        pin: true,
        pinSpacing: false,
      },

    })
  })


  gsap.to(".banner-p-text", {
    y: -100,
    scrollTrigger: {
      trigger: "#home-banner",
      start: "top top",
      end: "+=1000",
      scrub: 1,

    }
  })
  //PROJ SINGLE





}