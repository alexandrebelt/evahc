import { TweenMax, Elastic, Power4 } from 'gsap'

export function initMagnets(){
    var magnets = document.querySelectorAll('.magnetic-small')
    var strength = 20
    var textStrength = 5


    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', function (event) {
            var magnetButton = event.currentTarget
            var bounding = magnetButton.getBoundingClientRect()
            var magneticText = magnet.querySelectorAll(".btn-text-small")

            TweenMax.to(magnetButton, 1, {
                x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
                y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
                ease: Power4.easeOut
            })
            if (magneticText) {

                TweenMax.to(magneticText, 1, {
                    x: (((event.clientX - bounding.left) / magneticText.offsetWidth) - 0.5) * textStrength,
                    y: (((event.clientY - bounding.top) / magneticText.offsetHeight) - 0.5) * textStrength,
                    ease: Power4.easeOut
                })
            }
        });
        magnet.addEventListener('mouseout', function (event) {
            TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Elastic.easeOut })
            TweenMax.to(magnet.querySelector(".btn-text-small"), 1, { x: 0, y: 0, ease: Elastic.easeOut })
        });
    });
}