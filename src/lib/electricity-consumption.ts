export interface MumbaiElectricitySectorConsumption {
  serviceArea: string;
  reportingPeriod: string;
  sector: string;
  consumerCount: number;
  connectedLoadMw: number;
  annualConsumptionMu: number;
  averageMonthlyConsumptionMu: number;
  dataSource: string;
  sourceUrl: string;
}

export interface MumbaiElectricitySupplySummary {
  serviceArea: string;
  reportingPeriod: string;
  consumerCount: number;
  connectedLoadMw: number;
  annualConsumptionMu: number;
  averageMonthlyConsumptionMu: number;
  maximumDemandMw: number | null;
  rooftopSolarCapacityMw: number | null;
  dataSource: string;
  sourceUrl: string;
}

interface ElectricitySectorApiRow {
  service_area: string;
  reporting_period: string;
  sector: string;
  consumer_count: number;
  connected_load_mw: number;
  annual_consumption_mu: number;
  average_monthly_consumption_mu: number;
  data_source: string;
  source_url: string;
}

interface ElectricitySummaryApiRow extends Omit<ElectricitySectorApiRow, "sector"> {
  maximum_demand_mw: number | null;
  rooftop_solar_capacity_mw: number | null;
}

/** Retrieves published BMC electricity consumption for Mumbai City (BEST service area). */
export async function getMumbaiElectricityData(): Promise<{
  sectors: MumbaiElectricitySectorConsumption[];
  summaries: MumbaiElectricitySupplySummary[];
}> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) return { sectors: [], summaries: [] };

  const headers = {
    apikey: publishableKey,
    Authorization: `Bearer ${publishableKey}`,
  };
  const sectorsEndpoint = new URL("/rest/v1/mumbai_electricity_sector_consumption", supabaseUrl);
  sectorsEndpoint.searchParams.set("select", "service_area,reporting_period,sector,consumer_count,connected_load_mw,annual_consumption_mu,average_monthly_consumption_mu,data_source,source_url");
  sectorsEndpoint.searchParams.set("order", "reporting_period.asc,annual_consumption_mu.desc");
  const summariesEndpoint = new URL("/rest/v1/mumbai_electricity_supply_summary", supabaseUrl);
  summariesEndpoint.searchParams.set("select", "service_area,reporting_period,consumer_count,connected_load_mw,annual_consumption_mu,average_monthly_consumption_mu,maximum_demand_mw,rooftop_solar_capacity_mw,data_source,source_url");
  summariesEndpoint.searchParams.set("order", "reporting_period.asc");

  const [sectorsResponse, summariesResponse] = await Promise.all([
    fetch(sectorsEndpoint, { headers, cache: "force-cache" }),
    fetch(summariesEndpoint, { headers, cache: "force-cache" }),
  ]);

  if (!sectorsResponse.ok || !summariesResponse.ok) {
    console.error("Unable to load Mumbai electricity data", sectorsResponse.status, summariesResponse.status);
    return { sectors: [], summaries: [] };
  }

  const sectors = ((await sectorsResponse.json()) as ElectricitySectorApiRow[]).map((row) => ({
    serviceArea: row.service_area,
    reportingPeriod: row.reporting_period,
    sector: row.sector,
    consumerCount: row.consumer_count,
    connectedLoadMw: row.connected_load_mw,
    annualConsumptionMu: row.annual_consumption_mu,
    averageMonthlyConsumptionMu: row.average_monthly_consumption_mu,
    dataSource: row.data_source,
    sourceUrl: row.source_url,
  }));
  const summaries = ((await summariesResponse.json()) as ElectricitySummaryApiRow[]).map((row) => ({
    serviceArea: row.service_area,
    reportingPeriod: row.reporting_period,
    consumerCount: row.consumer_count,
    connectedLoadMw: row.connected_load_mw,
    annualConsumptionMu: row.annual_consumption_mu,
    averageMonthlyConsumptionMu: row.average_monthly_consumption_mu,
    maximumDemandMw: row.maximum_demand_mw,
    rooftopSolarCapacityMw: row.rooftop_solar_capacity_mw,
    dataSource: row.data_source,
    sourceUrl: row.source_url,
  }));

  return { sectors, summaries };
}
