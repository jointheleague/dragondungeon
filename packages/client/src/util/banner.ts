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

export { show_error_banner };