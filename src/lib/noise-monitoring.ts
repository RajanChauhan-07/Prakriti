export interface NoiseMonitoringObservation {
  locationName: string;
  monitoringDate: string;
  dayLeq: number;
  dayLmin: number;
  dayLmax: number;
  dayL10: number;
  dayL50: number;
  dayL90: number;
  nightLeq: number;
  nightLmin: number;
  nightLmax: number;
  nightL10: number;
  nightL50: number;
  nightL90: number;
  dataSource: string;
  sourceUrl: string;
}

interface NoiseMonitoringApiRow {
  location_name: string;
  monitoring_date: string;
  day_leq: number;
  day_lmin: number;
  day_lmax: number;
  day_l10: number;
  day_l50: number;
  day_l90: number;
  night_leq: number;
  night_lmin: number;
  night_lmax: number;
  night_l10: number;
  night_l50: number;
  night_l90: number;
  data_source: string;
  source_url: string;
}

/** Retrieves published MPCB ambient-noise measurements for named Mumbai locations. */
export async function getNoiseMonitoringObservations(): Promise<NoiseMonitoringObservation[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) return [];

  const endpoint = new URL("/rest/v1/noise_monitoring_observations", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "location_name,monitoring_date,day_leq,day_lmin,day_lmax,day_l10,day_l50,day_l90,night_leq,night_lmin,night_lmax,night_l10,night_l50,night_l90,data_source,source_url"
  );
  endpoint.searchParams.set("order", "monitoring_date.asc,location_name.asc");

  const response = await fetch(endpoint, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    console.error("Unable to load noise-monitoring observations", response.status);
    return [];
  }

  return ((await response.json()) as NoiseMonitoringApiRow[]).map((row) => ({
    locationName: row.location_name,
    monitoringDate: row.monitoring_date,
    dayLeq: row.day_leq,
    dayLmin: row.day_lmin,
    dayLmax: row.day_lmax,
    dayL10: row.day_l10,
    dayL50: row.day_l50,
    dayL90: row.day_l90,
    nightLeq: row.night_leq,
    nightLmin: row.night_lmin,
    nightLmax: row.night_lmax,
    nightL10: row.night_l10,
    nightL50: row.night_l50,
    nightL90: row.night_l90,
    dataSource: row.data_source,
    sourceUrl: row.source_url,
  }));
}
