export interface WeatherStationDailyObservation {
  stationName: string;
  reportDate: string;
  maximumTemperatureC: number;
  minimumTemperatureC: number;
  dailyMidpointTemperatureC: number;
  rainfallMm: number;
  humidityAt0830Percent: number | null;
  humidityAt1730Percent: number | null;
  dataSource: string;
  sourceUrl: string;
}

interface WeatherStationDailyObservationApiRow {
  station_name: string;
  report_date: string;
  maximum_temperature_c: number;
  minimum_temperature_c: number;
  daily_midpoint_temperature_c: number;
  rainfall_mm: number;
  humidity_at_0830_percent: number | null;
  humidity_at_1730_percent: number | null;
  data_source: string;
  source_url: string;
}

/** Retrieves published daily weather observations from named Mumbai IMD stations. */
export async function getWeatherStationDailyObservations(): Promise<WeatherStationDailyObservation[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) return [];

  const endpoint = new URL("/rest/v1/weather_station_daily_observations", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "station_name,report_date,maximum_temperature_c,minimum_temperature_c,daily_midpoint_temperature_c,rainfall_mm,humidity_at_0830_percent,humidity_at_1730_percent,data_source,source_url"
  );
  endpoint.searchParams.set("order", "report_date.asc,station_name.asc");

  const response = await fetch(endpoint, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    console.error("Unable to load weather-station observations", response.status);
    return [];
  }

  return ((await response.json()) as WeatherStationDailyObservationApiRow[]).map((row) => ({
    stationName: row.station_name,
    reportDate: row.report_date,
    maximumTemperatureC: row.maximum_temperature_c,
    minimumTemperatureC: row.minimum_temperature_c,
    dailyMidpointTemperatureC: row.daily_midpoint_temperature_c,
    rainfallMm: row.rainfall_mm,
    humidityAt0830Percent: row.humidity_at_0830_percent,
    humidityAt1730Percent: row.humidity_at_1730_percent,
    dataSource: row.data_source,
    sourceUrl: row.source_url,
  }));
}
