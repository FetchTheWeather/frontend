export type WeatherData = {
    id: string;
    weatherStationId: string;

    temperatureCelsius: number;
    airPressureHpa: number;
    humidityPercent: number;
    windSpeedKph: number;

    isRaining: boolean;
    rainfallMm: number;

    timestamp:string;
}