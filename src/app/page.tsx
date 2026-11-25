import { MumbaiAddressPicker } from "@/components/ui/mumbai-address-picker";
import { getWardPopulation } from "@/lib/population";
import { getWardWaterQuality } from "@/lib/water-quality";
import { getMumbaiWaterSectorConsumption } from "@/lib/water-sector-consumption";
import { getAirQualityMonthlyObservations } from "@/lib/air-quality";
import { getNoiseMonitoringObservations } from "@/lib/noise-monitoring";
import { getMumbaiElectricityData } from "@/lib/electricity-consumption";

export default async function Home() {
  const [population, waterQuality, waterSectorConsumption, airQuality, noiseMonitoring, electricityData] = await Promise.all([
    getWardPopulation(),
    getWardWaterQuality(),
    getMumbaiWaterSectorConsumption(),
    getAirQualityMonthlyObservations(),
    getNoiseMonitoringObservations(),
    getMumbaiElectricityData(),
  ]);

  return (
    <main className="w-full h-screen overflow-hidden bg-[#eaedf2] text-slate-900 font-sans antialiased">
      <MumbaiAddressPicker
        population={population}
        waterQuality={waterQuality}
        waterSectorConsumption={waterSectorConsumption}
        airQuality={airQuality}
        noiseMonitoring={noiseMonitoring}
        electricitySectorConsumption={electricityData.sectors}
        electricitySupplySummaries={electricityData.summaries}
        theme="light"
        fullScreen={true}
      />
    </main>
  );
}
