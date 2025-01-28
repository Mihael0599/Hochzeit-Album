function getImgTemplate(url, index) {
    return `<img onclick = "openOverlay(${index})" class="gallery-image" src="${url}" alt="Hochgeladenes Bild">`
  }