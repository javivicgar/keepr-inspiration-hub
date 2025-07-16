
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        InfoWindow: any;
        Size: any;
        LatLng: any;
        event: any;
      };
    };
  }
}

export {};
