import { MumbaiAddressPicker } from "@/components/ui/mumbai-address-picker";
import { getWardPopulation } from "@/lib/population";
import { getWardWaterQuality } from "@/lib/water-quality";
import { getMumbaiWaterSectorConsumption } from "@/lib/water-sector-consumption";

export default async function Home() {
  const [population, waterQuality, waterSectorConsumption] = await Promise.all([
    getWardPopulation(),
    getWardWaterQuality(),
    getMumbaiWaterSectorConsumption(),
  ]);

  return (
    <main className="w-full h-screen overflow-hidden bg-[#eaedf2] text-slate-900 font-sans antialiased">
      <MumbaiAddressPicker
        population={population}
        waterQuality={waterQuality}
        waterSectorConsumption={waterSectorConsumption}
        theme="light"
        fullScreen={true}
      />
    </main>
  );
}
