export function convertKelvinToCelsius(kelvin) {
  const celsius = (kelvin - 273.15).toFixed(0)
  return `${celsius >= 0 ? '+' : ''}${celsius}`
}