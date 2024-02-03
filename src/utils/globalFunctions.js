import axios from 'axios';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';


export const loadTags = () => {
  axios.get('https://evahc.com.br/wp-json/wp/v2/tags?_embed')
    .then((response) => {
      response.data.forEach((tag) => {
        this.tags[tag.id] = tag.name
      })
    })
}



gsap.registerPlugin(ScrollTrigger);

let scrollInstance;

export function initScroll() {
  if (scrollInstance) {
    scrollInstance.destroy(); // Destrua a instância anterior
  }

  scrollInstance = new LocomotiveScroll({
    el: document.querySelector("#app"),
    smooth: true
  });

  // Opções de configuração do ScrollTrigger
  ScrollTrigger.defaults({
    // ... configurações padrão do ScrollTrigger
  });
}