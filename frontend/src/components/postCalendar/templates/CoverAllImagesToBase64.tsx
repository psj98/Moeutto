const convertAllImagesToBase64 = (proxyURL, cloned) => {
  const pendingImagesPromises = [];
  const pendingPromisesData = [];

  const images = cloned.getElementsByTagName('img');

  for (let i = 0; i < images.length; i += 1) {
    // First we create an empty promise for each image
    const promise = new Promise((resolve, reject) => {
      pendingPromisesData.push({
        index: i,
        resolve,
        reject,
      });
    });
    // We save the promise for later resolve them

    pendingImagesPromises.push(promise);
  }

  for (let i = 0; i < images.length; i += 1) {
    // We fetch the current image
    fetch(`${proxyURL}?url=${images[i].src}`)
      .then(response => response.json())
      .then(data => {
        const pending = pendingPromisesData.find(p => p.index === i);

        images[i].src = data;
        pending.resolve(data);
      })
      .catch(e => {
        const pending = pendingPromisesData.find(p => p.index === i);

        pending.reject(e);
      });
  }

  // This will resolve only when all the promises resolve
  return Promise.all(pendingImagesPromises);
};

export default { convertAllImagesToBase64 };
