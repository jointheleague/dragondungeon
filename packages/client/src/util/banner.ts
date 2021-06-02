import Toastify from 'toastify-js';

import './banner.scss';

function show_error_banner(text: string) {
  if (typeof text == "object") {
    text = JSON.stringify(text);
  }
  console.error(text);
  Toastify(
    {
      text: `Error: ${text}`,
      close: true,
      duration: 3000,
      backgroundColor: "#c60c30",
    },
  ).showToast();
}

function show_tutorial_banner(text: string) {
  if (typeof text == "object") {
    text = JSON.stringify(text);
  }
  console.error(text);
  Toastify(
    {
      text: `Error: ${text}`,
      close: true,
      duration: 3000,
      backgroundColor: "#00a1de",
    },
  ).showToast();
}

export { show_error_banner, show_tutorial_banner };