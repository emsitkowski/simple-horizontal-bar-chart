# Simple horizontal bar chart

https://github.com/emsitkowski/simple-horizontal-bar-chart/assets/40630259/8d7b02fe-81b8-4f45-8256-1e9ded083d46

This is a very simple, animated horizontal bar chart implementation with no dependencies.

## Key features

- No dependencies, less than 1kb size
- Ability to easily set, customize and display bar chart
- Each bar is automatically color graded, based on the initial color
- Chart animates when it enters the viewport (it's using IntersectionObserver)

## Getting started

Download code package or simply copy HTML, CSS and JavaScript to your own project

### HTML

```html
<div class="statbars__wrapper" data-chart-color="green" data-labels-color="#fff">
  <div class="statbars__bar" data-percent="100">
    <div class="statbars__bar-label">label 1 – 100%</div>
      </div>
  <div class="statbars__bar" data-percent="90">
    <div class="statbars__bar-label">label 2 – 90%</div>
      </div>
  <div class="statbars__bar" data-percent="80">
    <div class="statbars__bar-label">label 3 – 80%</div>
      </div>
  <div class="statbars__bar" data-percent="70">
    <div class="statbars__bar-label">label 4 – 70%</div>
      </div>
  <div class="statbars__bar" data-percent="60">
    <div class="statbars__bar-label">label 5 – 60%</div>
      </div>
  <div class="statbars__bar" data-percent="50">
    <div class="statbars__bar-label">label 6 – 50%</div>
      </div>
  <div class="statbars__bar" data-percent="40">
    <div class="statbars__bar-label">label 7 – 40%</div>
  </div>
</div>
```

### CSS

```css
.statbars__wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 64px;
}
.statbars__wrapper .statbars__bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  border-radius: 8px;
  width: 0%; /* sets initial chart width to 0 */
  transition: 1s cubic-bezier(0.6, 0.2, 0.4, 1);
}
.statbars__wrapper .statbars__bar-label {
  position: relative;
  margin-right: 16px;
  color: rgba(255, 255, 255, 0);
  line-height: 100%;
  opacity: 0; /* sets initial label opacity to 0 */
  transition: 0.8s cubic-bezier(0.65, 0.05, 0.36, 1);
}
```

### JS

```javascript
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

```

## Customize
### Chart and labels color
You can set your custom chart and labels color with **data-chart-color** / **data-labels-color** attribute in HTML. You can use any valid CSS color format: hex, rgb etc.

### Bars value
In order to set each individual bar value, simply set your custom percent value with **data-percent** attribute in HTML.

### Custom labels
You can set custom labels inside HTML.


### Adjust animation
Transition is defined in CSS. You can adjust it using **transition** property for both bars and labels.
