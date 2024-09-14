export function generateCaseEmailTemplate(lat: number, lng: number, genre: string, age: number): string {
  const mapImageUrl = generateMapboxStaticImageURL(lat, lng);
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caso de Mpox</title>
  <style>
  .container {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .header {
    background-color: #d34949;
    color: #ffffff;
    padding: 20px;
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 24px;
  }
  .content {
    padding: 20px;
  }
  .content p {
    margin: 10px 0;
  }
  .map-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Detalles nuevo caso de Mpox</h1>
    </div>
    <div class="content">
      <p>Se ha registrado un nuevo caso de viruela:</p>
      <ul>
        <li><strong>Género:</strong> ${genre}</li>
        <li><strong>Edad:</strong> ${age}</li>
        <li><strong>Latitud:</strong> ${lat}</li>
        <li><strong>Longitud:</strong> ${lng}</li>
      </ul>
      <div>
        <p><strong>Aviso:</strong> Por favor, tome las precauciones necesarias al acercarse a esta ubicación.</p>
      </div>
      <img src="${mapImageUrl}" class="map-image" alt="Ubicación del caso">
    </div>
  </div>
</body>
</html>
  `
}

export const generateMapboxStaticImageURL = (lat: number, lng: number): string => {
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  const zoom = 13;
  const width = 800;
  const height = 500;

  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}