export interface MumbaiWaterSectorConsumption {
  sector: "domestic" | "commercial" | "industrial";
  referenceYear: number;
  meteredConsumptionSharePercentage: number;
  meteredConnectionSharePercentage: number;
  isHistorical: boolean;
  dataNote: string;
  dataSource: string;
  sourceUrl: string;
}

interface WaterSectorApiRow {
  sector: MumbaiWaterSectorConsumption["sector"];
  reference_year: number;
  metered_consumption_share_percentage: number;
  metered_connection_share_percentage: number;
  is_historical: boolean;
  data_note: string;
  data_source: string;
  source_url: string;
}

/** Retrieves the published Mumbai-wide historical sector split for metered water. */
export async function getMumbaiWaterSectorConsumption(): Promise<MumbaiWaterSectorConsumption[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) return [];

  const endpoint = new URL("/rest/v1/mumbai_water_sector_consumption", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "sector,reference_year,metered_consumption_share_percentage,metered_connection_share_percentage,is_historical,data_note,data_source,source_url"
  );
  endpoint.searchParams.set("order", "sector.asc");

  const response = await fetch(endpoint, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    console.error("Unable to load Mumbai water sector data", response.status);
    return [];
  }

  return ((await response.json()) as WaterSectorApiRow[]).map((row) => ({
    sector: row.sector,
    referenceYear: row.reference_year,
    meteredConsumptionSharePercentage: row.metered_consumption_share_percentage,
    meteredConnectionSharePercentage: row.metered_connection_share_percentage,
    isHistorical: row.is_historical,
    dataNote: row.data_note,
    dataSource: row.data_source,
    sourceUrl: row.source_url,
  }));
}
