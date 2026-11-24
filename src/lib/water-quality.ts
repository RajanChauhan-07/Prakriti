export interface WardWaterQuality {
  wardName: string;
  reportingPeriod: string;
  unsafeSamplePercentage: number;
  dataSource: string;
  sourceUrl: string;
}

interface WaterQualityApiRow {
  reporting_period: string;
  unsafe_sample_percentage: number;
  data_source: string;
  source_url: string;
  administrative_wards: { ward_name: string } | null;
}

/** Retrieves the latest published ward-level drinking-water safety result. */
export async function getWardWaterQuality(): Promise<WardWaterQuality[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) return [];

  const endpoint = new URL("/rest/v1/ward_water_quality", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "reporting_period,unsafe_sample_percentage,data_source,source_url,administrative_wards!inner(ward_name)"
  );
  endpoint.searchParams.set("order", "reporting_period.desc");

  const response = await fetch(endpoint, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    console.error("Unable to load ward water-quality data", response.status);
    return [];
  }

  const rows = (await response.json()) as WaterQualityApiRow[];
  const latestByWard = new Map<string, WardWaterQuality>();

  for (const row of rows) {
    const wardName = row.administrative_wards?.ward_name;
    if (!wardName || latestByWard.has(wardName)) continue;

    latestByWard.set(wardName, {
      wardName,
      reportingPeriod: row.reporting_period,
      unsafeSamplePercentage: row.unsafe_sample_percentage,
      dataSource: row.data_source,
      sourceUrl: row.source_url,
    });
  }

  return [...latestByWard.values()];
}
