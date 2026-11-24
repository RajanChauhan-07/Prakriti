export interface WardPopulation {
  wardName: string;
  censusYear: number;
  totalPopulation: number | null;
  householdCount: number | null;
  malePopulation: number | null;
  femalePopulation: number | null;
  populationAge0To6: number | null;
  literatePopulation: number | null;
  illiteratePopulation: number | null;
  slumPopulation: number | null;
  nonSlumPopulation: number | null;
  dataSource: string | null;
}

interface CensusApiRow {
  ward_id: number;
  census_year: number;
  total_population: number | null;
  household_count: number | null;
  male_population: number | null;
  female_population: number | null;
  population_age_0_6: number | null;
  literate_population: number | null;
  illiterate_population: number | null;
  slum_population: number | null;
  non_slum_population: number | null;
  data_source: string | null;
  administrative_wards: { ward_name: string } | null;
}

/** Retrieves the latest census summary without exposing configuration to the browser. */
export async function getWardPopulation(): Promise<WardPopulation[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) return [];

  const endpoint = new URL("/rest/v1/ward_census_data", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "ward_id,census_year,total_population,household_count,male_population,female_population,population_age_0_6,literate_population,illiterate_population,slum_population,non_slum_population,data_source,administrative_wards!inner(ward_name)"
  );
  endpoint.searchParams.set("order", "census_year.desc");

  const response = await fetch(endpoint, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    console.error("Unable to load ward population data", response.status);
    return [];
  }

  const rows = (await response.json()) as CensusApiRow[];
  const latestByWard = new Map<string, WardPopulation>();

  for (const row of rows) {
    const wardName = row.administrative_wards?.ward_name;
    if (!wardName || latestByWard.has(wardName)) continue;

    latestByWard.set(wardName, {
      wardName,
      censusYear: row.census_year,
      totalPopulation: row.total_population,
      householdCount: row.household_count,
      malePopulation: row.male_population,
      femalePopulation: row.female_population,
      populationAge0To6: row.population_age_0_6,
      literatePopulation: row.literate_population,
      illiteratePopulation: row.illiterate_population,
      slumPopulation: row.slum_population,
      nonSlumPopulation: row.non_slum_population,
      dataSource: row.data_source,
    });
  }

  return [...latestByWard.values()];
}
