export interface AirQualityMonthlyObservation {
  stationName: string;
  reportingMonth: string;
  aqi: number;
  dataSource: string;
  sourceUrl: string;
}

interface AirQualityApiRow {
  station_name: string;
  reporting_month: string;
  aqi: number;
  data_source: string;
  source_url: string;
}

/** Retrieves published monthly AQI measurements from BMC monitoring stations. */
export async function getAirQualityMonthlyObservations(): Promise<AirQualityMonthlyObservation[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) return [];

  const endpoint = new URL("/rest/v1/air_quality_monthly_observations", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "station_name,reporting_month,aqi,data_source,source_url"
  );
  endpoint.searchParams.set("order", "reporting_month.asc,station_name.asc");

  const response = await fetch(endpoint, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    console.error("Unable to load air-quality observations", response.status);
    return [];
  }

  return ((await response.json()) as AirQualityApiRow[]).map((row) => ({
    stationName: row.station_name,
    reportingMonth: row.reporting_month,
    aqi: row.aqi,
    dataSource: row.data_source,
    sourceUrl: row.source_url,
  }));
}
