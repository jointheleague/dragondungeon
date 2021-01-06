import Toastify from 'toastify-js';

import './banner.scss';

function show_error_banner(text: string) {
  if (typeof text == "object") {
    text = JSON.stringify(text);
  }
  console.error(text);
  Toastify(
    {
      text: text,
      close: true,
      duration: 3000,
      backgroundColor: "#c60c30",
    },
  ).showToast();
}

function show_success_banner(text: string) {
  if (typeof text == "object") {
    text = JSON.stringify(text);
  }
  Toastify(
    {
      text: text,
      close: true,
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  ).showToast();
}

export {show_error_banner, show_success_banner};
