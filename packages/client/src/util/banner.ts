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

function show_info_banner(text: string) {
  if (typeof text == "object") {
    text = JSON.stringify(text);
  }
  console.error(text);
  Toastify(
    {
      text,
      close: true,
      duration: 5000,
      backgroundColor: "#00a1de",
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
      text,
      close: true,
      duration: 10000,
      backgroundColor: "#009b3a",
    },
  ).showToast();
}

export { show_error_banner, show_info_banner, show_tutorial_banner };