function geolocationSupport() {
  return "geolocation" in navigator;
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 100000,
};

function getCurrentPosition(options = defaultOptions) {
  if (!geolocationSupport()) {
    throw new Error("There is no geolocation support in your browser");
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => {
        reject("We were not able to get your current location");
      },
      options
    );
  });
}

export async function getLatLon(options = defaultOptions) {
  try {
    const {
      coords: { latitude: lat, longitude: lon },
    } = await getCurrentPosition(options);
    return {
      lat,
      lon,
      isError: false,
    };
  } catch (error) {
    return {
      lat: null,
      lon: null,
      isError: true,
    };
  }
}
