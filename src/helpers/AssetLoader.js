import {assets} from './Assets';

var images = {};
var imagesLoaded = 0;

const getAllImages = () => {
  for (var prop in assets) {
    let asset = assets[prop];
  
    if (asset.type === 'image') images[asset.name] = asset; 
  }
};

const loadAllImages = () => {
  for (var prop in images) {
    let image = images[prop];
  
    image.image = loadImage(image);
  }
};

const loadImage = (image) => {
  let imageAux = new Image();

  imageAux.onload = () => {
    console.log('loaded ' + image.name);
    imagesLoaded++;
  };
  imageAux.onerror = (e) => {
    console.error('error loading ' + image.name);
    imagesLoaded--;
  };
  imageAux.src = image.resource;

  return imageAux;
};

const getImageByName = (name) => {
  return images[name];
}

getAllImages();
loadAllImages();

export {images, getImageByName};