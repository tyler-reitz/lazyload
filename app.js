const images = document.querySelectorAll(".js-lazy-image"); 
const config = {
  rootMargin: "0px 0px",
  threshold: 1.0
};

let observer

if (!('IntersectionObserver' in window)) {
  Array.from(images).forEach(img => preloadImage(img))
} else {
  observer = new IntersectionObserver(onIntersection, config);
  images.forEach(image => {
    observer.observe(image);
  });
}


function onIntersection(entries) {
  // Loop through entreis
  entries.forEach(entry => {
    // Are we in the viewport
    if (entry.intersectionRatio > 0) {
      console.log("intersectionRatio: ", entry.intersectionRatio);
      // Stop watching and load the image
      observer.unobserve(entry.target);
      preloadImage(entry.target);
    }
  });
}

function preloadImage(resource) {
  fetch(resource.dataset.src).then(src => {
    resource.src = src.url;
  });
}
