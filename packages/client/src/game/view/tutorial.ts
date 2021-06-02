import { show_tutorial_banner } from "util/banner";

const show_tutorial = () => {
  if (window.localStorage.tutorial) {
    console.log('test');
    show_tutorial_banner('Test');
  }
}

export { show_tutorial };