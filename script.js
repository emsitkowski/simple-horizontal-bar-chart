(function () {
  try {
    const elStatbarsWrapper = document.querySelectorAll(".statbars__wrapper");
    const elBars = document.getElementsByClassName("statbars__bar");
    const elBarsLabels = document.getElementsByClassName("statbars__bar-label");

    // add transition-delay, opacity and color to every stat bar
    for (let i = 0; i < elBars.length; i++) {
      const bar = elBars[i];
      bar.style.transitionDelay = `0.${i}s`;
      bar.style.opacity = `0.${9 - i}`;
      bar.style.background = elStatbarsWrapper[0].getAttribute("data-chart-color");
    }
    const animate = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < elBars.length; i++) {
            const bar = elBars[i];
            bar.style.width = bar.getAttribute("data-percent") + "%";
          }

          for (let i = 0; i < elBarsLabels.length; i++) {
            const label = elBarsLabels[i];
            label.style.opacity = 1;
            label.style.color = label.parentElement.parentElement.getAttribute("data-labels-color");
          }
        }
      });
    };

    const animateObserver = new IntersectionObserver(animate);

    elStatbarsWrapper.forEach((target) => {
      animateObserver.observe(target);
    });
  } catch (error) {
    console.error(error);

    // show all bars in failed to animate
    const elBars = document.getElementsByClassName("statbars__bar");
    elBars[0].style.width = "86%";
    elBars[1].style.width = "66%";
    elBars[2].style.width = "46%";
  }
})();
