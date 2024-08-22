import { ResponseDto } from "@/lib/dtos";

type WeatherCondition= {
  text: string;
  icon: string;
}

type CurrentWeather= {
  temp_c: number;
  condition: WeatherCondition;
  wind_kph: number;
  pressure_mb: number;
  precip_mm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
}

type LocationAtt = {
  name: string;
  country: string;
}

export type GetWeatherDetailsResponse = ResponseDto<{
  location: LocationAtt;
  current: CurrentWeather;
}>
