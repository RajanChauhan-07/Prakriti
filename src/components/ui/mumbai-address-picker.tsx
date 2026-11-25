"use client";

import * as React from "react";
import type { WardPopulation } from "@/lib/population";
import type { WardWaterQuality } from "@/lib/water-quality";
import type { MumbaiWaterSectorConsumption } from "@/lib/water-sector-consumption";
import type { AirQualityMonthlyObservation } from "@/lib/air-quality";
import type { NoiseMonitoringObservation } from "@/lib/noise-monitoring";
import type { MumbaiElectricitySectorConsumption, MumbaiElectricitySupplySummary } from "@/lib/electricity-consumption";

/* ----------------------------------------------------------------------------
 * Mumbai Address Picker (Purple Sunset Glow Palette)
 *
 * Palette:
 * - Indigo: #540D6E (Island City)
 * - Magenta Bloom: #EE4266 (Western Suburbs)
 * - Golden Pollen: #FFD23F (Eastern Suburbs)
 * -------------------------------------------------------------------------- */

export type Point = [number, number];
export type BBox = [number, number, number, number];

export interface Region {
  id: "western" | "eastern" | "city";
  name: string;
  color: string;
  label: Point;
  bbox: BBox;
}

export interface Ward {
  id: string;
  name: string;
  shortName: string;
  regionId: "western" | "eastern" | "city";
  areas: string;
  pinCodes: string[];
  postalCode: string;
  color: string;
  label: Point;
  bbox: BBox;
  d: string;
}

export interface MumbaiAddress {
  regionId: "western" | "eastern" | "city";
  region: string;
  wardId: string;
  ward: string;
  areas: string;
  postalCode: string;
  formatted: string;
}

export interface MumbaiAddressPickerProps {
  /** Preselect a ward by code (e.g. "H/W" for Bandra West). */
  defaultWardId?: string;
  onChange?: (address: MumbaiAddress | null) => void;
  /** "light" (default) or "dark". */
  theme?: "light" | "dark" | "system";
  /** If true, fills the full viewport. Default true. */
  fullScreen?: boolean;
  className?: string;
  /** Census records fetched by the server from Supabase. */
  population?: WardPopulation[];
  /** Published ward-level drinking-water safety results from Supabase. */
  waterQuality?: WardWaterQuality[];
  /** Historical citywide metered-water sector shares from Supabase. */
  waterSectorConsumption?: MumbaiWaterSectorConsumption[];
  /** Published BMC monitoring-station AQI records. */
  airQuality?: AirQualityMonthlyObservation[];
  /** Published MPCB named-location noise-monitoring records. */
  noiseMonitoring?: NoiseMonitoringObservation[];
  /** Published Mumbai City electricity consumption by consumer category. */
  electricitySectorConsumption?: MumbaiElectricitySectorConsumption[];
  /** Published Mumbai City electricity totals and selected supply indicators. */
  electricitySupplySummaries?: MumbaiElectricitySupplySummary[];
}

type EnvironmentalPillarId =
  | "population"
  | "water"
  | "pollution"
  | "climate"
  | "energy"
  | "ghg"
  | "land";

interface EnvironmentalPillar {
  id: EnvironmentalPillarId;
  label: string;
  unit: string;
  coverage: string;
  description: string;
  parameters: string[];
  subcategories?: { label: string; parameters: string[] }[];
}

/* -- data ------------------------------------------------------------------ */

const MUMBAI_BBOX: BBox = [20, 24.6, 480, 875.4];

export const REGIONS: Region[] = [
  {
    "id": "western",
    "name": "Western Suburbs",
    "color": "#EE4266",
    "label": [
      179,
      281
    ],
    "bbox": [
      20,
      24.6,
      324.5,
      544.5
    ]
  },
  {
    "id": "eastern",
    "name": "Eastern Suburbs",
    "color": "#FFD23F",
    "label": [
      328,
      425
    ],
    "bbox": [
      217.3,
      145,
      480,
      654.5
    ]
  },
  {
    "id": "city",
    "name": "Island City",
    "color": "#540D6E",
    "label": [
      158,
      680
    ],
    "bbox": [
      54.4,
      516.7,
      266.6,
      875.4
    ]
  }
];

export const WARDS: Ward[] = [
  {
    "id": "A",
    "name": "Ward A",
    "shortName": "Colaba & Fort",
    "regionId": "city",
    "areas": "Colaba, Fort, Churchgate, Nariman Point",
    "pinCodes": [
      "400001",
      "400005",
      "400021",
      "400032",
      "400039"
    ],
    "postalCode": "400001",
    "color": "#540D6E",
    "label": [
      135.7,
      814.3
    ],
    "bbox": [
      81.5,
      750.8,
      179.4,
      875.4
    ],
    "d": "M164.6,751.4L169.2,751.1L179.4,753.1L172.3,781.5L170.7,781.3L173.6,796.2L170.8,796.3L169.1,786.8L166.8,786.3L164,787.7L164.6,791.8L158.4,796.2L157.1,795.3L157.7,796.8L155.5,798.1L156.9,800L159.3,799.1L160.4,801.2L164.9,799.1L159.2,801.9L164.9,813.7L174.6,802.7L174.5,804.6L162.9,816L159.7,815.6L152.4,808.4L151,809.4L152.6,809.9L152.5,812.1L149.7,812.3L146.1,820.2L147.8,820.8L146,820.8L145.6,822.5L141,825.5L144.2,827.8L140.1,832.6L134.4,836.4L130.1,845.2L123.9,838.6L118,845.6L115.6,847.2L113.9,845.8L112.8,849.9L113.9,852L113,855L114.1,855.6L112.9,856.5L116,856.6L113,856.7L112.6,860.4L103.8,872.2L101.7,873.3L98.3,872.6L95.8,875.4L94.2,875.1L86.6,868L83,860.8L81.5,849.8L84.5,838.7L96,823.3L123.5,792.8L127.7,779.5L126.8,768L138.5,764L152.4,752.2L158.8,750.8L164.6,751.4Z"
  },
  {
    "id": "B",
    "name": "Ward B",
    "shortName": "Dongri & Masjid",
    "regionId": "city",
    "areas": "Dongri, Masjid Bunder, Bhendi Bazar",
    "pinCodes": [
      "400003",
      "400009"
    ],
    "postalCode": "400009",
    "color": "#540D6E",
    "label": [
      175.4,
      731
    ],
    "bbox": [
      145.3,
      714.5,
      189,
      754.4
    ],
    "d": "M174.3,718.3L185.2,718.4L182.1,730.7L185.7,732L189,728.9L188.5,731.2L186.2,732.2L185.5,735.4L184.6,735.2L185.3,732.2L182,731.1L178.3,744.1L179.4,753.1L169.2,751.1L158.8,750.8L152.4,752.2L149.7,754.4L145.4,740L146.3,737.2L145.9,721.8L158.1,720.2L161.3,714.5L162.7,716L174.3,718.3Z"
  },
  {
    "id": "C",
    "name": "Ward C",
    "shortName": "Kalbadevi",
    "regionId": "city",
    "areas": "Kalbadevi, Bhuleshwar, Pydhonie",
    "pinCodes": [
      "400002",
      "400003"
    ],
    "postalCode": "400002",
    "color": "#540D6E",
    "label": [
      127,
      746.2
    ],
    "bbox": [
      116.3,
      721.8,
      149.7,
      768
    ],
    "d": "M145.8,722.1L146.3,737.2L145.4,740L149.7,754.4L138.5,764L126.8,768L122.6,758.3L116.3,749.9L119.3,747.2L131,741.6L130.3,738.4L131.5,737.3L130.1,735.9L132.7,730.2L132.9,722.2L145.8,722.1Z"
  },
  {
    "id": "D",
    "name": "Ward D",
    "shortName": "Malabar Hill",
    "regionId": "city",
    "areas": "Malabar Hill, Grant Road, Tardeo, Breach Candy",
    "pinCodes": [
      "400004",
      "400006",
      "400007",
      "400026",
      "400036"
    ],
    "postalCode": "400006",
    "color": "#540D6E",
    "label": [
      92.3,
      736.8
    ],
    "bbox": [
      54.4,
      680,
      132.9,
      773.1
    ],
    "d": "M115.9,705.7L130.6,708.2L128.9,722.1L132.9,722.2L132.7,730.2L130.1,735.9L131.5,737.3L130.3,738.4L131,741.6L119.3,747.2L116.3,749.9L104.9,740.8L97.5,738L91.8,737.5L88.7,741L90.3,741.4L83.6,745.4L78.7,751.2L71.6,754.5L69.4,754.2L68.6,757L63.5,762.7L60.5,772.1L61.7,772L58.4,773.1L56.9,772.2L58.7,762.5L55.5,758.4L54.4,751.2L72.2,720.4L77.5,697.7L86.7,682.4L91.1,684.7L94.5,683.5L95.2,684.7L100,685.2L126,680L115.9,705.7Z"
  },
  {
    "id": "E",
    "name": "Ward E",
    "shortName": "Byculla",
    "regionId": "city",
    "areas": "Byculla, Agripada, Nagpada, Reay Road",
    "pinCodes": [
      "400008",
      "400010",
      "400011",
      "400027",
      "400033"
    ],
    "postalCode": "400008",
    "color": "#540D6E",
    "label": [
      171.3,
      695.7
    ],
    "bbox": [
      115.5,
      661.6,
      200,
      722.3
    ],
    "d": "M179.3,676.7L179,677.7L187.2,680.9L186.7,683.2L199.4,685.7L198.7,688.4L185.6,686.4L185.6,688.9L189.4,689.6L190.1,688.6L200,691.3L198.9,693.2L188.9,691L188.7,692.1L185.3,691.5L185.1,692.6L196.1,694.9L194.9,698.9L186,696.6L186.3,700.1L188.3,703.4L193.4,704.1L193.3,705L188.2,704.7L191.5,706.4L191.8,708.4L189.8,708.3L189.3,710.2L187.5,709.9L187.5,711.7L186.2,711.7L185.2,718.4L174,718.3L162.7,716L161.3,714.5L157.8,720.3L145.2,721.9L128.9,722.1L130.6,708.2L115.5,705.7L126,680L134.7,677.6L148.5,662.4L167.1,662.4L169.8,673.5L179.3,676.7Z"
  },
  {
    "id": "F/N",
    "name": "Ward F/N",
    "shortName": "Matunga & Sion",
    "regionId": "city",
    "areas": "Matunga, Sion, Wadala, Antop Hill",
    "pinCodes": [
      "400019",
      "400022",
      "400031",
      "400037"
    ],
    "postalCode": "400019",
    "color": "#540D6E",
    "label": [
      233.5,
      563.5
    ],
    "bbox": [
      170.4,
      516.7,
      266.6,
      618.3
    ],
    "d": "M233.9,519.8L236.3,522.6L247,524.7L250.2,527.4L253,527.6L254.4,529.5L254,532.6L257.5,552.2L250.2,570.8L248.3,581.6L250.1,586.4L254.2,591.9L263.2,599.9L266.6,617.6L256.4,609.5L253,609.2L249.1,609.9L237.5,616.3L231.4,618.3L230.5,616L229.6,616.3L229,613L221.2,606.4L217.8,601.3L216.2,601.8L216.4,601L200.9,611.8L180.8,605.8L170.4,597.2L226.2,516.7L229.5,519.4L233.9,519.8Z"
  },
  {
    "id": "F/S",
    "name": "Ward F/S",
    "shortName": "Parel & Sewri",
    "regionId": "city",
    "areas": "Parel, Sewri, Naigaon, Lower Parel (E)",
    "pinCodes": [
      "400012",
      "400015"
    ],
    "postalCode": "400012",
    "color": "#540D6E",
    "label": [
      195.6,
      637.9
    ],
    "bbox": [
      148.2,
      597.2,
      231.4,
      684.5
    ],
    "d": "M200.7,611.7L216.4,601L216.2,601.8L217.8,601.3L221.2,606.4L229,613L229.6,616.3L230.5,616L231.4,618.3L212.7,628.6L214.5,628.8L212.4,628.7L212.2,630L214.5,631.2L211.5,630.7L209.1,639.3L211.3,644.7L213.8,645.7L211.5,645.1L212.9,648.5L208.3,650.2L209.1,652L202.2,654.3L211.9,677.2L204,684.5L186.7,680.8L179,677.7L179.2,676.6L169.9,673.6L167.1,662.4L153.2,661.6L148.5,662.5L148.2,659.4L148.4,639.4L151.2,628.1L154.8,620.3L170.4,597.2L180.8,605.8L200.7,611.7Z"
  },
  {
    "id": "G/N",
    "name": "Ward G/N",
    "shortName": "Dadar & Mahim",
    "regionId": "city",
    "areas": "Dharavi, Mahim, Dadar",
    "pinCodes": [
      "400014",
      "400016",
      "400017",
      "400028"
    ],
    "postalCode": "400028",
    "color": "#540D6E",
    "label": [
      173.1,
      566.2
    ],
    "bbox": [
      134.3,
      517.2,
      225.9,
      618.9
    ],
    "d": "M225,517.2L225.9,517.2L155.8,618.9L148.5,614.5L141,600.7L138.3,598.6L134.3,591.7L142.3,585.9L149.1,579L157.9,561.3L159.4,549.3L157.8,536L155.5,529.5L156.2,527.3L160.7,526.2L169.1,520.3L225,517.2Z"
  },
  {
    "id": "G/S",
    "name": "Ward G/S",
    "shortName": "Worli",
    "regionId": "city",
    "areas": "Worli, Prabhadevi, Lower Parel (W)",
    "pinCodes": [
      "400013",
      "400018",
      "400025",
      "400034"
    ],
    "postalCode": "400018",
    "color": "#540D6E",
    "label": [
      119.1,
      626.2
    ],
    "bbox": [
      86.7,
      574.8,
      155.8,
      685.2
    ],
    "d": "M134.3,591.7L138.3,598.6L141,600.7L148.4,614.4L155.8,618.9L152,626L148.9,635.8L148.5,662.5L133.1,678.6L100,685.2L95.2,684.7L94.5,683.5L92.8,684.9L90.2,684.3L86.7,682.4L94.8,668.5L100.3,651L99.2,632.2L111.3,606.4L109.3,599L108.2,581.1L105.3,575.3L106.6,574.8L112.8,581.4L116.2,583.9L117.1,583.4L115.5,585.6L116.3,591.3L120.8,595.3L127.6,595.3L134.3,591.7Z"
  },
  {
    "id": "H/E",
    "name": "Ward H/E",
    "shortName": "Bandra East",
    "regionId": "western",
    "areas": "Bandra East, Khar East, Santacruz East",
    "pinCodes": [
      "400051",
      "400055"
    ],
    "postalCode": "400051",
    "color": "#EE4266",
    "label": [
      208,
      459.4
    ],
    "bbox": [
      166,
      422.1,
      245.3,
      520.2
    ],
    "d": "M207.7,445.6L205.7,450.1L208.8,445.9L214.1,450.9L218.7,449.2L220.4,446.4L223.8,449.1L228.5,449.1L245.3,457.1L243,460.3L234.4,464.4L236.8,472.1L239.4,474.3L237.4,485.8L238.5,491.4L231.2,505.2L217.3,517.2L171.3,520.2L167.1,508.1L166,473.9L167.1,453.7L170.3,431.1L172.5,430.5L178,433.8L182.2,433.4L185.2,434.7L191.6,429.3L200.4,426.1L204.4,422.1L210,425.2L204,434.9L207.4,435.6L208.7,438L207.7,445.6Z"
  },
  {
    "id": "H/W",
    "name": "Ward H/W",
    "shortName": "Bandra West",
    "regionId": "western",
    "areas": "Bandra West, Khar West, Santacruz West",
    "pinCodes": [
      "400050",
      "400052",
      "400054"
    ],
    "postalCode": "400050",
    "color": "#EE4266",
    "label": [
      137.9,
      494.9
    ],
    "bbox": [
      112.4,
      430.8,
      171.3,
      544.5
    ],
    "d": "M170.3,431.1L167.1,453.7L166,473.9L167.1,508.1L171.3,520.2L168.8,520.4L159.6,526.6L158.2,524.1L149.9,523.8L140.8,531.4L139.8,534L126,540.6L124.4,544.5L122.8,541.3L117,543.2L112.4,538.4L112.9,535.8L121.3,521.5L123,514.8L126.7,511.3L127.2,509.1L119.9,502.2L124.9,489.6L123.5,481.8L124.2,478.4L121.6,470L123,466.4L122.2,460.8L126.5,456.3L124.8,450L125.8,449.2L127.8,452.3L132.1,454.9L136.1,452.6L142.3,442.6L146.4,443.7L147.4,440.2L159.7,439.6L160.1,432.7L170.3,431.1Z"
  },
  {
    "id": "K/E",
    "name": "Ward K/E",
    "shortName": "Andheri East",
    "regionId": "western",
    "areas": "Andheri East, Jogeshwari East, Vile Parle East",
    "pinCodes": [
      "400057",
      "400059",
      "400060",
      "400069",
      "400099"
    ],
    "postalCode": "400069",
    "color": "#EE4266",
    "label": [
      230.2,
      381.9
    ],
    "bbox": [
      170.3,
      310.9,
      278.6,
      450.9
    ],
    "d": "M192.8,313.3L202.5,315.3L214.9,314.6L244,322.3L241.9,322.6L242.5,324.4L245.7,323.7L246.7,321.9L249.5,321.7L250.5,319.9L251.8,323.6L266.3,326.1L267.1,324.5L278.6,328.8L273.9,336.6L274.2,338.9L268.9,342.9L265.2,342.6L265.2,345.4L269.1,348.1L271.5,357.9L273.9,359.9L269.5,362.7L267.6,367.8L268.4,373.1L271,377.7L266.4,383.1L270.4,388.5L268.1,394L263.7,396.9L262.7,400.8L255.3,404L252.6,409.6L252.2,412.4L256,413.9L256.6,417L250.6,424.6L252.7,431.3L251.6,435.6L252.6,441.2L246,440.7L245.6,443.8L244.1,444.9L232.1,450.8L228.5,449.1L223.8,449.1L220.4,446.4L218.7,449.2L213,450.7L209,445.9L205.7,450.1L207.7,445.8L208.7,438L207.4,435.6L204,434.9L210,425.2L204.4,422.1L200.4,426.1L191.6,429.3L185.2,434.7L182.2,433.4L178,433.8L172.5,430.5L170.3,431.1L186.5,311L192.3,311.6L192.8,313.3Z"
  },
  {
    "id": "K/W",
    "name": "Ward K/W",
    "shortName": "Andheri West",
    "regionId": "western",
    "areas": "Andheri West, Jogeshwari West, Vile Parle West, Juhu",
    "pinCodes": [
      "400049",
      "400053",
      "400056",
      "400058",
      "400102"
    ],
    "postalCode": "400058",
    "color": "#EE4266",
    "label": [
      117.8,
      350.4
    ],
    "bbox": [
      29.2,
      281.6,
      186.6,
      454.9
    ],
    "d": "M33.2,336L29.3,333.3L29.4,331.4L31.7,329.7L35.4,331.3L36.4,333.5L33.2,336ZM120.9,286.4L123.3,295.2L136.8,287.4L148.5,293.6L162.9,294.4L164.8,296.7L171.5,295.8L178.2,303L177.4,304.1L182.5,306.4L182.9,310.3L186.6,310.9L170.4,431L160.1,432.7L159.7,439.6L147.4,440.2L146.4,443.7L142.3,442.6L136.1,452.6L132.1,454.9L127.8,452.3L125.8,449.2L126.4,446.3L127.6,446.3L131,439.7L133.6,431.5L132.9,417.5L128.2,402.9L125.2,387.1L121.9,375.9L116.7,364.4L102.9,341.7L85.3,321.6L61.9,335L62.6,337.9L57.7,340L55,338.6L50.1,339L46.7,341.9L44.6,341.5L46.5,340.6L45.6,335.6L47.1,330.6L47.6,320.6L45.7,314.2L47.8,308.4L54.2,307.9L64.5,314.4L69.3,312.5L69.5,319.6L76.4,322.1L87.1,296.5L98.5,282.8L104.6,289L114.7,281.6L119.6,283.5L120.9,286.4Z"
  },
  {
    "id": "L",
    "name": "Ward L",
    "shortName": "Kurla",
    "regionId": "eastern",
    "areas": "Kurla, Sakinaka, Chandivali",
    "pinCodes": [
      "400070",
      "400072"
    ],
    "postalCode": "400070",
    "color": "#FFD23F",
    "label": [
      266.7,
      437
    ],
    "bbox": [
      217.3,
      343.5,
      317.8,
      527.4
    ],
    "d": "M317.8,391L315,393.2L310.1,402L298.7,412.1L296.9,418.3L298.2,419L298.7,423.4L292.3,428.4L288.3,426.9L288.1,429.3L286.9,429.7L287.1,441.7L283.1,443.2L285.5,447.1L285.8,452.8L279.8,476.4L279.5,480.8L283.2,481.4L250.5,527.4L247,524.7L236.3,522.6L233.9,519.8L229.5,519.4L226.2,516.7L217.3,517.2L231.2,505.2L238.5,491.4L237.4,485.8L239.4,474.3L236.8,472.1L234.4,464.4L243,460.3L245.3,457.1L232.1,450.8L244.1,444.9L245.6,443.8L246,440.7L252.6,441.2L251.6,435.6L252.7,431.3L250.6,424.6L256.6,417.2L256,413.9L252.2,412.4L252.6,409.6L255.3,404L262.7,400.8L263.7,396.9L268.1,394L270.3,388.9L270.2,387.2L266.6,384.5L266.4,383.1L271,377.7L268.4,373.1L267.6,367.8L269.5,362.7L273.9,359.9L271.5,357.9L269.1,348.1L266,346.6L265.5,344.6L268.9,343.5L282.1,352.2L290,353.9L290.8,362L307.1,369.9L309.8,374.9L310,382.3L314.9,384.7L317.8,391Z"
  },
  {
    "id": "M/E",
    "name": "Ward M/E",
    "shortName": "Govandi & Mankhurd",
    "regionId": "eastern",
    "areas": "Govandi, Mankhurd, Deonar",
    "pinCodes": [
      "400043",
      "400088",
      "400094"
    ],
    "postalCode": "400043",
    "color": "#FFD23F",
    "label": [
      348.5,
      534.3
    ],
    "bbox": [
      285.9,
      463.7,
      436.7,
      649.2
    ],
    "d": "M385,484.7L393.2,496.7L395.3,507.3L396.3,507.9L398.4,508L411.1,502.6L417,495.2L421.2,492.2L428.9,492.5L434.2,496.4L436,499.8L436.7,507L434.3,523.9L434.9,527L432.1,534.6L420.7,548.9L423.7,550.8L419.2,554.8L416.2,565.8L408.4,570.7L386.8,579.5L383.7,575.7L375.5,578.4L373.2,584L369.8,586.5L360.6,598.3L360.9,600.6L346.3,619.4L340.4,629L329,641.5L322.7,644.5L314.9,645.7L309.7,649.2L309.5,628.9L310.8,628.5L311.9,620.3L302,617.7L296.2,614.5L294.3,572.4L285.9,543L289,541.7L289,539.2L290.7,539.8L291.9,536.6L296.9,534.6L297,531.4L320.8,532.2L324.7,510.8L327.7,506.2L317.2,500.5L316.8,499.2L325.8,488.6L343,482L344.4,480.5L347.1,468.9L349.9,465.8L357.7,463.7L365.6,464.9L378.6,474.7L385,484.7Z"
  },
  {
    "id": "M/W",
    "name": "Ward M/W",
    "shortName": "Chembur",
    "regionId": "eastern",
    "areas": "Chembur, Tilak Nagar",
    "pinCodes": [
      "400071",
      "400089"
    ],
    "postalCode": "400071",
    "color": "#FFD23F",
    "label": [
      275.6,
      550
    ],
    "bbox": [
      248.3,
      469,
      327.7,
      654.5
    ],
    "d": "M308.5,470.9L311.5,473.7L316.2,472.9L317,476.5L320.6,476.4L326.3,488.7L316.8,499.2L317.2,500.5L327.7,506.2L324.7,510.8L320.8,532.2L297,531.4L296.9,534.6L291.9,536.6L290.7,539.8L289,539.2L289,541.7L285.9,543L294.3,572.4L296.2,614.5L302,617.7L311.9,620.3L310.8,628.5L309.5,628.9L309.7,649.2L300.5,646.4L290.2,646.4L280,648.4L271.6,654.5L270.4,652.7L269.1,633.1L263.6,600.9L254.2,591.9L250.1,586.4L248.3,581.6L250.2,570.8L256.4,557L257.6,550.8L254,532.6L254.5,529.8L253,527.6L250.5,527.4L288.8,473.8L297.9,473.1L304.8,471L306.1,469L308.5,470.9Z"
  },
  {
    "id": "N",
    "name": "Ward N",
    "shortName": "Ghatkopar",
    "regionId": "eastern",
    "areas": "Ghatkopar, Vidyavihar",
    "pinCodes": [
      "400075",
      "400077",
      "400086"
    ],
    "postalCode": "400075",
    "color": "#FFD23F",
    "label": [
      345.3,
      439.6
    ],
    "bbox": [
      279.5,
      370.9,
      427.3,
      508
    ],
    "d": "M337.4,388.8L334.7,392.3L336.1,395.1L335.7,398.1L344.8,404L357.3,385.1L360.2,384.4L374.9,389.5L376.7,385.1L382.1,379.7L396.8,376.1L404,390.7L407.6,401.1L408,426.6L410.7,436L410.8,445.6L415.3,457.2L419,461.5L422.8,471.2L422.7,479.3L427.1,487.1L427.1,492L421.2,492.2L417,495.2L411.1,502.6L398.4,508L396.3,507.9L395.3,507.3L393.2,496.7L387.4,489.4L380.6,477L368.9,466.9L361,463.8L354.9,464L348.3,467L344.4,480.5L340.1,483.7L329.1,487.9L326.2,488.4L320.6,476.4L317,476.5L316.2,472.9L311.5,473.7L306.1,469L304.8,471L297.9,473.1L289,473.7L283.2,481.4L279.5,480.8L280.3,471.8L285.8,452.8L285.5,447.1L283.1,443.2L287.1,441.7L286.9,429.7L288.1,429.3L288.3,426.9L292.3,428.4L297.8,424.5L299,421.5L296.9,418.3L299,411.7L310.1,402L315,393.2L329.8,385.4L334.1,375.2L341.1,370.9L341.5,384.6L339.5,385.5L337.4,388.8Z"
  },
  {
    "id": "P/N",
    "name": "Ward P/N",
    "shortName": "Malad",
    "regionId": "western",
    "areas": "Malad, Manori, Marve",
    "pinCodes": [
      "400064",
      "400095",
      "400097"
    ],
    "postalCode": "400064",
    "color": "#EE4266",
    "label": [
      150.1,
      211
    ],
    "bbox": [
      28.5,
      125.4,
      300.3,
      322.1
    ],
    "d": "M64.4,127.9L69.9,128L82.7,131.9L88.4,135.6L89.7,139.6L87.2,144.4L83.8,144.8L81.2,152.8L91.4,156.3L93.7,158.9L93,161.4L94.9,164L98.6,164.6L98.2,168.6L109.7,173.3L125.2,172L135.6,179.7L138.1,184.1L140,185L139.4,188.5L142.8,191.7L145.7,185.1L147.9,185.2L154.8,181L169.9,184.7L174.2,191.5L175.5,191.3L175.8,193.7L179.2,193.5L181,194.8L187.8,195L189.2,185.7L194.9,185.8L195.9,192.6L194.7,192.9L194.9,197.1L210,195.3L208.8,198.2L212.1,202.1L217.8,203.6L218.9,203.4L220,198.1L238.6,196.8L247.6,199.5L270.6,200.3L279.5,203.2L289.9,204.7L293.8,207.7L300.1,217L300.3,228.7L298.2,237.4L293,243L282.4,265L274.1,267.9L259.1,263.5L247.5,258L242.3,250.1L241,237.6L224.3,237.9L208,241.3L207.8,238.9L202.8,237.9L201.9,234.2L189.8,236.9L174.8,231L156.2,229L152.6,231.4L140.6,231.9L138.4,238.9L131.8,245.1L130.1,252L98.2,283.1L87.1,296.5L76.4,322.1L69.5,319.6L69.3,312.5L64.5,314.4L54.2,307.9L47.8,308.4L49,301.1L47.4,295.3L43.3,289.6L38.4,286.4L36.8,279.7L32,278.2L36.9,274.2L36.8,272.2L30.7,262.9L32.5,257.6L36.7,257.8L39.3,259.5L42.1,258.9L47.8,251.5L58,246.9L64.6,228.5L63.9,221.1L65,211.5L63.1,204.3L65.7,194.9L65.4,192L57.6,193.3L53.8,198L50.3,198.9L45.9,196.9L37.2,198.6L32.1,195.6L34.3,183.5L35.8,181.7L39.5,181.6L41.5,176.8L40.6,173.2L36.8,169.2L32.9,168L28.5,168.8L29.1,160.1L31.2,156.3L31.8,151.7L29,142.7L30.6,141.3L28.5,138.8L31.5,137.6L30.6,131.7L34.8,127.5L61.8,125.4L64.4,127.9Z"
  },
  {
    "id": "P/S",
    "name": "Ward P/S",
    "shortName": "Goregaon",
    "regionId": "western",
    "areas": "Goregaon",
    "pinCodes": [
      "400062",
      "400063",
      "400104"
    ],
    "postalCode": "400063",
    "color": "#EE4266",
    "label": [
      205.6,
      279.4
    ],
    "bbox": [
      98.5,
      229,
      289.1,
      328.9
    ],
    "d": "M158.8,230L174.8,231L189.8,236.9L201.9,234.2L202.8,237.9L207.8,238.9L208,241.3L224.3,237.9L241,237.6L242.3,250.1L248.9,259L259.1,263.5L274.1,267.9L282.4,265L280.6,273.1L278.1,274L278.1,279.1L275.7,280.9L285,288L283.8,294.8L288.4,302.5L289,307.9L286.4,314.4L284.6,314.2L287.2,320.1L285.6,323.5L278.6,328.9L267.1,324.5L266.3,326.1L251.8,323.6L250.5,319.9L249.5,321.7L246.7,321.9L245.7,323.7L242.5,324.4L241.9,322.6L244,322.3L214.9,314.6L202.5,315.3L192.8,313.4L192,311.5L182.9,310.3L182.5,306.4L177.4,304.1L178.2,303L171.5,295.8L164.8,296.7L162.9,294.4L148.5,293.6L136.8,287.4L123.3,295.2L120.9,286.4L118.2,282.7L114.7,281.6L104.6,289L98.5,282.8L130.1,252L131.8,245.1L138.4,238.9L140.6,231.9L152.6,231.4L156.2,229L158.8,230Z"
  },
  {
    "id": "R/C",
    "name": "Ward R/C",
    "shortName": "Borivali",
    "regionId": "western",
    "areas": "Borivali, Gorai",
    "pinCodes": [
      "400091",
      "400092"
    ],
    "postalCode": "400092",
    "color": "#EE4266",
    "label": [
      140.8,
      107.1
    ],
    "bbox": [
      20,
      36.8,
      324.5,
      180.9
    ],
    "d": "M50.6,44.3L72.9,42.5L75.5,44.9L74.3,46.7L75.3,50.3L77.3,49.7L80.6,50.9L91.3,58.9L105.1,72.3L112.8,77.2L135,81.6L139,76.8L152.6,71.3L173.4,89.2L185.8,97.1L204.7,99.4L206.2,99L206.8,95.6L208.8,94.2L215.9,98.7L218.6,99.1L219.1,96.2L232.5,97.4L249.2,95.1L285.2,71.5L296.7,74.9L302,89.5L319.6,109.1L321.1,117.2L324.5,124.4L322.1,141.5L318.3,145.1L316.5,159.6L322.7,166.1L320,177.7L301.9,180.9L298.6,172.3L289.1,166L289.1,164.3L286.1,164.5L281.6,162.2L281.4,159.5L279.8,159L277.6,160.4L270.2,157L268.8,147.4L259.1,144.1L250.4,151.4L229.3,150.4L217.1,153.7L203.4,154.1L194.7,151.8L189.2,152L178.2,155.8L166.6,153L160,149.1L155,148.5L121,148L81.7,151.3L83.8,144.8L87.2,144.4L89.7,139.6L88.4,135.6L82.7,131.9L69.9,128L65.1,128.2L61.8,125.4L34.8,127.5L30.6,131.7L31.5,137.6L28.5,138.8L30.6,141.5L28.3,142.7L26.2,140L26.2,137L24.4,137.1L23.1,134.2L21,133.2L20,126.9L20.6,124.6L23.4,123.3L29.8,112.6L26.2,99.7L30.9,91.8L30.7,85.3L35.3,69.6L35.2,61.6L32.1,48.1L35.1,47.4L37.9,42.9L37.7,36.8L47.1,40.3L50.6,44.3Z"
  },
  {
    "id": "R/N",
    "name": "Ward R/N",
    "shortName": "Dahisar",
    "regionId": "western",
    "areas": "Dahisar",
    "pinCodes": [
      "400068",
      "400103"
    ],
    "postalCode": "400068",
    "color": "#EE4266",
    "label": [
      223.6,
      58.3
    ],
    "bbox": [
      152.6,
      24.6,
      285.2,
      99.4
    ],
    "d": "M197.8,25.1L202.1,25.6L202.2,28L207.4,29L211.9,32.5L214.9,31.7L215.2,30L219.7,34L223.2,32.7L222.6,37.1L229.2,45L229.8,42.8L231.6,43.7L231.4,46.2L236.5,44.8L245.5,46.5L251.4,54.8L258.5,60.6L265.4,62.8L274.1,70.5L285.2,71.5L249.2,95.1L232.5,97.4L219.1,96.2L218.6,99.1L207.9,94.2L206.2,99L204.7,99.4L184.2,96.5L168.3,85.2L152.6,71.3L160.8,65.6L155.3,58.8L154.4,50.7L157.1,39.9L163.6,32.3L169.6,30.7L176.6,31.9L180,31L188.4,25.2L197.8,25.1Z"
  },
  {
    "id": "R/S",
    "name": "Ward R/S",
    "shortName": "Kandivali",
    "regionId": "western",
    "areas": "Kandivali, Charkop",
    "pinCodes": [
      "400067",
      "400101"
    ],
    "postalCode": "400067",
    "color": "#EE4266",
    "label": [
      200.5,
      184.1
    ],
    "bbox": [
      81.2,
      144.1,
      305.2,
      217
    ],
    "d": "M269.3,151L270.2,157L277.6,160.4L279.8,159L281.4,159.5L281.6,162.2L286.1,164.5L289.1,164.3L289.1,166L299.1,172.9L301.9,180.9L305.2,180.1L305,189.5L303,191.5L300.4,202.4L300.1,217L293.8,207.7L289.9,204.7L279.5,203.2L270.6,200.3L247.6,199.5L241,196.9L227.4,197L220,198.1L218.4,203.7L212.7,202.4L208.8,198.2L210,195.3L194.9,197.1L194.7,192.9L195.9,192.6L194.9,185.8L189.2,185.7L187.8,195L181,194.8L179.2,193.5L175.8,193.7L175.5,191.3L174.2,191.5L169.9,184.7L154.8,181L147.9,185.2L145.7,185.1L142.8,191.7L139.4,188.5L140,185L138.1,184.1L135.6,179.7L125.2,172L111.1,173.4L105.9,172.4L98.2,168.6L98.6,164.6L94.9,164L93,161.4L93.7,158.9L91.4,156.3L81.2,152.8L81.7,151.3L121,148L155,148.5L160,149.1L166.6,153L178.2,155.8L189.2,152L194.7,151.8L203.4,154.1L217.1,153.7L229.3,150.4L250.4,151.4L259.1,144.1L268.8,147.4L269.3,151Z"
  },
  {
    "id": "S",
    "name": "Ward S",
    "shortName": "Bhandup & Powai",
    "regionId": "eastern",
    "areas": "Bhandup, Powai, Kanjurmarg, Vikhroli",
    "pinCodes": [
      "400042",
      "400076",
      "400078",
      "400079",
      "400083"
    ],
    "postalCode": "400078",
    "color": "#FFD23F",
    "label": [
      349.2,
      333.5
    ],
    "bbox": [
      265.2,
      257.4,
      439.6,
      404
    ],
    "d": "M377.4,261.6L383.7,265L389.5,265.9L404.7,272.3L405.9,273.9L405.1,278.7L406.5,280.6L428.4,285.8L423.3,293.4L426.2,295.6L431.5,296L438.5,299.2L439.6,302.5L438.8,304.5L431.7,308.3L427.8,315L428.3,320.4L438.3,331.4L433.2,336.4L438.1,344.8L437,350.7L423.1,371.2L421.2,377.9L416.9,384.9L410.6,383.8L402.3,376.4L399.4,375.9L382.1,379.7L376.7,385.1L374.9,389.5L360.2,384.4L357.3,385.1L344.8,404L335.7,398.1L336.1,395.1L334.7,392.7L339.5,385.5L341.4,385L341.1,370.9L334.1,375.2L329.8,385.4L317.8,391L314.9,384.7L310,382.3L309.8,374.9L307.1,369.9L290.8,362L290,353.9L282.1,352.2L268.9,343.5L265.5,344.6L265.2,342.6L268.9,342.9L274.2,338.9L273.9,336.6L279.2,327.7L285.6,323.5L287.2,320.1L284.6,314.2L287.1,314.3L287.2,313.1L289.3,313L297.3,316.8L299.2,320.4L302.3,317.5L304.1,317.8L304.2,316.1L310.6,316.8L310.5,318.2L313.6,319.7L315.4,318.4L316.3,320.5L324,317.6L328.5,318L328.8,316.3L331.2,314.9L340.7,315.8L341.4,317L351.6,304.7L354.5,293.5L357.3,290.1L360.1,289.4L361.7,287.5L361.2,284L364.6,278.6L364.6,259L370.7,257.5L377.4,261.6Z"
  },
  {
    "id": "T",
    "name": "Ward T",
    "shortName": "Mulund",
    "regionId": "eastern",
    "areas": "Mulund",
    "pinCodes": [
      "400080",
      "400081",
      "400082"
    ],
    "postalCode": "400080",
    "color": "#FFD23F",
    "label": [
      384.6,
      256.8
    ],
    "bbox": [
      275.7,
      145,
      480,
      331.4
    ],
    "d": "M393.9,210.9L394.5,211.8L405.4,210.4L411.9,212.5L412.9,215.1L415.6,217.1L420.2,217.8L424,216.8L426,219L425.8,221L431.6,223.6L434.9,230.9L437.8,231.1L439,229.7L441.2,233.9L443.9,236L453.5,233.2L454.6,237.5L458.5,238.6L460.1,237.4L462.2,231.5L464,231.8L464.1,234.6L466.1,234.9L480,253.7L473.4,274.1L470.8,290.4L464.6,298.3L453.6,317.5L448.2,321.1L438.3,331.4L428.2,320.2L427.8,315L429.3,311L439.6,302.9L438,298.9L431.5,296L426.2,295.6L423.3,293.4L428.4,285.8L406.5,280.6L405.1,278.7L405.9,273.9L404.7,272.3L389.5,265.9L383.7,265L370.2,257.4L364.6,259L364.6,278.6L361.2,284L361.7,287.5L360.1,289.4L357.3,290.1L354.5,293.5L351.6,304.7L341.4,317L340.7,315.8L331.2,314.9L328.8,316.3L328.5,318L324,317.6L316.3,320.5L315.4,318.4L313.6,319.7L310.5,318.2L310.6,316.8L304.2,316.1L304.1,317.8L302.3,317.5L299.2,320.4L297.3,316.8L289.3,313L287.2,313.1L286.4,314.4L289.1,307L288.4,302.5L283.8,294.8L285,288L275.7,280.9L278.1,279.1L278.1,274L280.6,273.1L282.3,264.8L293,243L298.2,237.4L300.3,228.7L300.4,202.4L303,191.5L305,189.5L305.2,180.1L320,177.7L322.7,166.1L329.8,165L333.3,160.3L338.6,146.7L345.1,145L350.1,146.2L358.8,152.7L362,156.8L369.8,157.9L374.2,167.2L380,170.8L379.6,196.9L383.4,201.8L393.9,210.9Z"
  }
];

type MonitoringSiteMarker = {
  point: Point;
  wardId: string;
  shortLabel: string;
};

type LiveMumbaiWeather = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    rain: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    temperature_2m_mean: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
  };
};

const LIVE_MUMBAI_WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=19.076&longitude=72.8777&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,precipitation_probability_max,uv_index_max&timezone=Asia%2FKolkata&forecast_days=1";

// These are representative anchors on this schematic ward map for the published
// monitoring *areas*. The source reports station/location names, not GPS coordinates.
const AIR_STATION_MARKERS: Record<string, MonitoringSiteMarker> = {
  Byculla: { point: [176, 690], wardId: "E", shortLabel: "Byculla" },
  Ghatkopar: { point: [350, 450], wardId: "N", shortLabel: "Ghatkopar" },
  Govandi: { point: [355, 548], wardId: "M/E", shortLabel: "Govandi" },
  Kandivali: { point: [145, 182], wardId: "R/S", shortLabel: "Kandivali" },
  Sewri: { point: [205, 650], wardId: "F/S", shortLabel: "Sewri" },
};

const NOISE_LOCATION_MARKERS: Record<string, MonitoringSiteMarker> = {
  "Backside of High Court": { point: [151, 783], wardId: "A", shortLabel: "High Court" },
  "Mumbadevi Temple": { point: [130, 746], wardId: "C", shortLabel: "Mumbadevi" },
  "Borivali National Park": { point: [168, 112], wardId: "R/C", shortLabel: "Borivali NP" },
  "Antop Hill": { point: [244, 576], wardId: "F/N", shortLabel: "Antop Hill" },
  "Shivaji Park, Dadar": { point: [166, 565], wardId: "G/N", shortLabel: "Shivaji Park" },
  "Santacruz Airport": { point: [216, 461], wardId: "H/E", shortLabel: "Santacruz" },
  "Ghatkopar (W)": { point: [330, 445], wardId: "N", shortLabel: "Ghatkopar W" },
  "Vashi Naka, Chembur": { point: [280, 571], wardId: "M/W", shortLabel: "Vashi Naka" },
  "Goregaon (E)": { point: [229, 282], wardId: "P/S", shortLabel: "Goregaon E" },
  "Charkop, Kandivali": { point: [122, 187], wardId: "R/S", shortLabel: "Charkop" },
  Sion: { point: [233, 557], wardId: "F/N", shortLabel: "Sion" },
  "Hindu Colony": { point: [190, 557], wardId: "G/N", shortLabel: "Hindu Colony" },
  Matunga: { point: [214, 585], wardId: "F/N", shortLabel: "Matunga" },
  Kamathipura: { point: [158, 694], wardId: "E", shortLabel: "Kamathipura" },
  "Malabar Hills": { point: [86, 715], wardId: "D", shortLabel: "Malabar Hill" },
};

const REGION_BY_ID = new Map(REGIONS.map((r) => [r.id, r]));
const WARD_BY_ID = new Map(WARDS.map((w) => [w.id, w]));
const WARDS_BY_REGION = new Map<string, Ward[]>();
for (const r of REGIONS) {
  WARDS_BY_REGION.set(
    r.id,
    WARDS.filter((w) => w.regionId === r.id)
  );
}

const DATABASE_WARD_NAMES: Record<string, string> = {
  "F/N": "Ward F North",
  "F/S": "Ward F South",
  "G/N": "Ward G North",
  "G/S": "Ward G South",
  "H/E": "Ward H East",
  "H/W": "Ward H West",
  "K/E": "Ward K East",
  "K/W": "Ward K West",
  "M/E": "Ward M East",
  "M/W": "Ward M West",
  "P/N": "Ward P North",
  "P/S": "Ward P South",
  "R/C": "Ward R Central",
  "R/N": "Ward R North",
  "R/S": "Ward R South",
};

const ENVIRONMENTAL_PILLARS: EnvironmentalPillar[] = [
  {
    id: "population",
    label: "Population",
    unit: "people / households",
    coverage: "24 Mumbai wards • Census 2011",
    description: "Ward-level census characteristics. Values below come directly from the connected census records.",
    parameters: ["Total population", "Population density", "Population growth rate", "Household count", "Average household size", "Daytime population", "Population distribution"],
  },
  {
    id: "water",
    label: "Water resources",
    unit: "% unsafe drinking-water samples",
    coverage: "24 Mumbai wards • 2022–23 to 2024–25",
    description: "Published BMC ward-level percentage of drinking-water samples classified as unfit/unsafe. Other water parameters remain unreported.",
    parameters: ["Total water production", "Water supplied", "Per-capita availability", "Domestic, commercial, industrial & institutional consumption", "Groundwater availability & extraction", "Groundwater quality", "Surface-water availability & quality", "Wastewater generated, treated & discharged", "Sewage treatment capacity", "Water losses / non-revenue water", "Water bodies, health & encroachment", "Rainwater harvesting", "Waterlogging hotspots", "Water stress index"],
  },
  {
    id: "pollution",
    label: "Pollution",
    unit: "source-reported unit",
    coverage: "BMC and MPCB monitoring sites",
    description: "Air and noise readings are shown by their published monitoring location and period, never estimated as ward averages.",
    parameters: [],
    subcategories: [
      { label: "Air", parameters: ["PM2.5", "PM10", "NO₂", "SO₂", "CO", "O₃", "NH₃", "AQI", "Industrial, vehicular & construction sources", "Pollution hotspots", "Seasonal variation"] },
      { label: "Noise", parameters: ["Average noise level", "Daytime, nighttime & peak dB(A)", "Traffic, industrial & construction noise", "Commercial & residential exposure", "Limit exceedance", "Noise hotspots", "Citizen complaints"] },
    ],
  },
  {
    id: "climate",
    label: "Temperature & climate",
    unit: "°C / mm / %",
    coverage: "Mumbai-wide live model estimate",
    description: "Live temperature, humidity and rainfall are shown as a Mumbai-wide weather-model estimate, not as ward averages.",
    parameters: ["Average, maximum & minimum temperature", "Land-surface & air temperature", "Urban heat island intensity", "Heatwave frequency & duration", "Relative humidity", "Rainfall", "Solar radiation", "Temperature anomalies", "Heat hotspots", "Heat exposure & vulnerability"],
  },
  {
    id: "energy",
    label: "Electricity & energy",
    unit: "MU / MW",
    coverage: "Mumbai City (BEST) • FY 2024-25",
    description: "Published BEST service-area consumption, load and selected supply indicators. These are citywide utility values, not ward averages.",
    parameters: ["Total, domestic, commercial, industrial & institutional consumption", "Street-lighting consumption", "Peak & average demand", "Per-capita consumption", "Supply availability", "Outage frequency & duration", "Renewable share", "Solar capacity & generation", "Fossil-fuel dependence", "Transmission & distribution losses", "Energy access", "Electricity emissions", "Energy-efficiency measures"],
  },
];

const populationFormatter = new Intl.NumberFormat("en-IN");

function formatPopulation(value: number | null | undefined) {
  return value == null ? "Population unavailable" : populationFormatter.format(value);
}

function formatPercentage(value: number | null | undefined) {
  return value == null ? "Not reported" : `${value.toFixed(1)}%`;
}

function formatMonitoringDate(value: string | undefined) {
  if (!value) return "Not supplied";
  return new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function formatElectricity(value: number | null | undefined, unit: "MU" | "MW") {
  if (value == null) return "Not reported";
  return `${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })} ${unit}`;
}

function formatLiveWeatherTime(value: string | undefined) {
  if (!value) return "Updating";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(new Date(`${value}:00+05:30`));
}

function weatherDescription(code: number | undefined) {
  if (code == null) return "Weather update";
  if ([0].includes(code)) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Cloudy";
}

function findWardsByPostalCode(prefix: string): Ward[] {
  if (!prefix) return [];
  return WARDS.filter((w) =>
    w.pinCodes.some((pin) => pin.startsWith(prefix))
  );
}

/* -- helpers --------------------------------------------------------------- */

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type View = { s: number; tx: number; ty: number };

function unionBBox(items: { bbox: BBox }[]): BBox {
  return items.reduce<BBox>(
    (a, { bbox: b }) => [
      Math.min(a[0], b[0]),
      Math.min(a[1], b[1]),
      Math.max(a[2], b[2]),
      Math.max(a[3], b[3]),
    ],
    [Infinity, Infinity, -Infinity, -Infinity]
  );
}

function computeView(bbox: BBox, containerW: number, containerH: number, padding = 1.25, maxScale = 5): View {
  if (!containerW || !containerH) return { s: 1, tx: 0, ty: 0 };
  const w = (bbox[2] - bbox[0]) * padding;
  const h = (bbox[3] - bbox[1]) * padding;
  const s = Math.min(containerW / w, containerH / h, maxScale);
  const cx0 = (bbox[0] + bbox[2]) / 2;
  const cy0 = (bbox[1] + bbox[3]) / 2;
  return {
    s: Number(s.toFixed(3)),
    tx: Number((containerW / 2 - cx0 * s).toFixed(1)),
    ty: Number((containerH / 2 - cy0 * s).toFixed(1)),
  };
}

function useElementSize<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [size, setSize] = React.useState({ width: 1100, height: 750 });
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setSize({ width: Math.round(width), height: Math.round(height) });
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

const CSS = `
.nap {
  --nap-bg: #f8fafc;
  --nap-canvas: #eaedf2;
  --nap-fg: #0f172a;
  --nap-muted: #f1f5f9;
  --nap-muted-fg: #64748b;
  --nap-border: #d8dde5;
  --nap-ring: #0f172a;
  width: 100%;
  box-sizing: border-box;
  background: var(--nap-bg);
  color: var(--nap-fg);
  font-size: 14px;
  line-height: 1.4;
  font-family: inherit;
}

.nap-fullscreen {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.nap-boxed {
  overflow: hidden;
  border: 1px solid var(--nap-border);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
}

.nap[data-theme=dark] {
  --nap-bg: #0c0d10;
  --nap-canvas: #090a0d;
  --nap-fg: #f4f4f5;
  --nap-muted: #18191e;
  --nap-muted-fg: #8e909a;
  --nap-border: #22242a;
  --nap-ring: #d4d4d8;
}

.nap *, .nap *::before, .nap *::after { box-sizing: border-box; }
.nap button, .nap input { font: inherit; color: inherit; margin: 0; }
.nap button { background: none; border: 0; padding: 0; cursor: pointer; text-align: left; }
.nap h3, .nap p { margin: 0; }
.nap :focus-visible { outline: 2px solid var(--nap-ring); outline-offset: 1px; }

.nap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 24px;
  height: 56px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--nap-border);
  background: var(--nap-bg);
  z-index: 20;
}
.nap-crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.nap .nap-crumb {
  border-radius: 6px;
  padding: 4px 8px;
  color: var(--nap-muted-fg);
  font-weight: 500;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.15s;
}
.nap .nap-crumb:hover { color: var(--nap-fg); background: var(--nap-muted); }
.nap .nap-crumb[aria-current] { color: var(--nap-fg); font-weight: 600; }
.nap-chev { width: 15px; height: 15px; flex-shrink: 0; color: var(--nap-muted-fg); opacity: 0.6; }

.nap-layerbar {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
  padding: 3px;
  scrollbar-width: none;
}
.nap-layerbar::-webkit-scrollbar { display: none; }
.nap .nap-layer {
  flex: 0 0 auto;
  border: 1px solid transparent;
  border-radius: 999px;
  color: var(--nap-muted-fg);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.nap .nap-layer:hover { background: var(--nap-muted); color: var(--nap-fg); }
.nap .nap-layer[aria-pressed=true] { background: var(--nap-fg); color: var(--nap-bg); border-color: var(--nap-fg); }

.nap-inline {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nap-label { color: var(--nap-muted-fg); font-size: 13.5px; font-weight: 500; }
.nap .nap-input {
  height: 36px;
  border: 1px solid var(--nap-border);
  border-radius: 6px;
  background: #ffffff;
  padding: 0 12px;
  outline: none;
  min-width: 0;
  font-size: 13.5px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.nap[data-theme=dark] .nap-input {
  background: #121318;
}
.nap .nap-input::placeholder { color: var(--nap-muted-fg); opacity: 0.6; }
.nap .nap-input:focus-visible { border-color: var(--nap-fg); box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.1); }
.nap .nap-postal { width: 110px; font-variant-numeric: tabular-nums; letter-spacing: 0.05em; font-weight: 500; }

.nap-body {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

.nap-map {
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background-color: var(--nap-canvas);
  background-image: radial-gradient(circle at 45% 45%, #f6f8fb 0%, #eaedf2 60%, #e1e5ea 100%);
}
.nap[data-theme=dark] .nap-map {
  background-color: var(--nap-canvas);
  background-image: radial-gradient(circle at 45% 45%, #14161d 0%, #0c0d10 60%, #08080a 100%);
}

.nap-svg {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-select: none;
}

.nap-map-group {
  filter: drop-shadow(0 12px 28px rgba(15, 23, 42, 0.14));
}
.nap[data-theme=dark] .nap-map-group {
  filter: drop-shadow(0 14px 32px rgba(0, 0, 0, 0.45));
}

.nap-zoom {
  transition: transform 650ms cubic-bezier(0.2, 0.8, 0.24, 1);
}
.nap-region {
  cursor: pointer;
  transition: fill-opacity 0.25s, stroke-width 0.25s, stroke 0.25s;
}

.nap-readout {
  pointer-events: none;
  position: absolute;
  left: 24px;
  top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  z-index: 10;
}
.nap-chip {
  display: flex;
  align-items: baseline;
  gap: 8px;
  border: 1px solid var(--nap-border);
  border-radius: 8px;
  padding: 6px 14px;
  background: rgba(248, 250, 252, 0.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}
.nap[data-theme=dark] .nap-chip {
  background: rgba(12, 13, 16, 0.88);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
.nap-chip-main { font-weight: 600; font-size: 13.5px; color: var(--nap-fg); }
.nap-chip-sub { font-size: 12px; color: var(--nap-muted-fg); }

.nap-legend {
  pointer-events: none;
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 10;
  min-width: 156px;
  padding: 10px 12px;
  border: 1px solid var(--nap-border);
  border-radius: 8px;
  background: rgba(248, 250, 252, 0.94);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
}
.nap[data-theme=dark] .nap-legend { background: rgba(12, 13, 16, 0.88); }
.nap-legend-title { display: block; font-size: 11.5px; font-weight: 700; color: var(--nap-fg); }
.nap-legend-range { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 6px; font-size: 11px; color: var(--nap-muted-fg); font-variant-numeric: tabular-nums; }
.nap-legend-scale { height: 7px; border-radius: 999px; margin-top: 7px; background: linear-gradient(90deg, hsl(205 72% 82%), hsl(205 72% 38%)); }
.nap-water-legend-scale { background: linear-gradient(90deg, hsl(150 68% 48%), hsl(5 68% 53%)); }

.nap-inset {
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: 104px;
  padding: 8px;
  border: 1px solid var(--nap-border);
  border-radius: 10px;
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 6px 22px rgba(15, 23, 42, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 10;
}
.nap[data-theme=dark] .nap-inset {
  background: rgba(12, 13, 16, 0.92);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
.nap-inset:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 26px rgba(15, 23, 42, 0.15);
}
.nap-inset svg {
  display: block;
  width: 100%;
  height: auto;
}

.nap-list {
  width: 22rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--nap-bg);
  border-left: 1px solid var(--nap-border);
  z-index: 10;
}

.nap-list-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--nap-border);
}
.nap-list-head h3 { font-size: 14.5px; font-weight: 600; color: var(--nap-fg); }
.nap-list-head .nap-sub { font-size: 12.5px; color: var(--nap-muted-fg); }

.nap-data-context {
  padding: 14px 20px;
  border-bottom: 1px solid var(--nap-border);
  background: color-mix(in srgb, var(--nap-muted) 55%, transparent);
}
.nap-data-kicker { display: block; margin-bottom: 4px; color: var(--nap-muted-fg); font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.nap-data-title { margin: 0; color: var(--nap-fg); font-size: 14px; font-weight: 650; }
.nap-data-copy { margin: 5px 0 0; color: var(--nap-muted-fg); font-size: 12px; line-height: 1.45; }
.nap-data-meta { display: flex; flex-wrap: wrap; gap: 5px 10px; margin-top: 8px; color: var(--nap-muted-fg); font-size: 11.5px; }
.nap-data-meta strong { color: var(--nap-fg); font-weight: 600; }
.nap-empty-state { padding: 24px 20px; color: var(--nap-muted-fg); font-size: 13px; line-height: 1.55; }
.nap-empty-state strong { display: block; margin-bottom: 6px; color: var(--nap-fg); font-size: 14px; }
.nap-parameter-tabs { display: flex; gap: 6px; margin-top: 10px; }
.nap-parameter-tab { border: 1px solid var(--nap-border); border-radius: 999px; padding: 4px 9px; background: transparent; color: var(--nap-muted-fg); font: inherit; font-size: 11.5px; cursor: pointer; }
.nap-parameter-tab[aria-pressed=true] { border-color: var(--nap-fg); background: var(--nap-fg); color: var(--nap-bg); }
.nap-parameter-list { list-style: none; margin: 0; padding: 8px; flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; }
.nap-parameter { padding: 10px 12px; border: 1px solid var(--nap-border); border-radius: 8px; background: color-mix(in srgb, var(--nap-muted) 45%, transparent); }
.nap-parameter-name { display: block; color: var(--nap-fg); font-size: 12.5px; font-weight: 600; }
.nap-parameter-status { display: block; margin-top: 3px; color: var(--nap-muted-fg); font-size: 11.5px; }
.nap-population-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; padding: 10px 12px; border-bottom: 1px solid var(--nap-border); }
.nap-population-fact { padding: 8px; border: 1px solid var(--nap-border); border-radius: 7px; background: color-mix(in srgb, var(--nap-muted) 35%, transparent); }
.nap-population-fact span { display: block; color: var(--nap-muted-fg); font-size: 10.5px; line-height: 1.25; }
.nap-population-fact strong { display: block; margin-top: 3px; color: var(--nap-fg); font-size: 12px; font-variant-numeric: tabular-nums; }
.nap-citywide-card { padding: 12px 16px; border-bottom: 1px solid var(--nap-border); background: color-mix(in srgb, var(--nap-muted) 32%, transparent); }
.nap-citywide-title { margin: 0; color: var(--nap-fg); font-size: 12.5px; font-weight: 700; }
.nap-citywide-copy { margin: 3px 0 9px; color: var(--nap-muted-fg); font-size: 11px; line-height: 1.4; }
.nap-sector-row + .nap-sector-row { margin-top: 7px; }
.nap-sector-label { display: flex; justify-content: space-between; gap: 8px; color: var(--nap-fg); font-size: 11.5px; }
.nap-sector-label span:last-child { color: var(--nap-muted-fg); font-variant-numeric: tabular-nums; }
.nap-sector-track { height: 6px; overflow: hidden; margin-top: 4px; border-radius: 999px; background: var(--nap-border); }
.nap-sector-fill { height: 100%; border-radius: inherit; }
.nap-citywide-note { margin: 9px 0 0; color: var(--nap-muted-fg); font-size: 10.5px; line-height: 1.4; }

.nap-ul {
  list-style: none;
  margin: 0;
  padding: 8px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nap .nap-item {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 10px 14px;
  transition: background 0.15s;
}
.nap .nap-item:hover { background: var(--nap-muted); }
.nap .nap-item[aria-selected=true] { background: var(--nap-muted); font-weight: 500; }
.nap-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.nap-names { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.nap-name { font-weight: 500; font-size: 13.5px; color: var(--nap-fg); }
.nap-sub { font-size: 12px; color: var(--nap-muted-fg); }
.nap-num { flex-shrink: 0; font-size: 12.5px; color: var(--nap-muted-fg); font-variant-numeric: tabular-nums; }
.nap-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; flex-shrink: 0; }
.nap-population { font-size: 11.5px; color: var(--nap-muted-fg); font-variant-numeric: tabular-nums; }

.nap-map-text {
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
  font-family: inherit;
}
.nap-monitoring-marker { cursor: pointer; outline: none; }
.nap-monitoring-marker-ring { fill: rgba(255, 255, 255, 0.72); stroke: rgba(15, 23, 42, 0.45); stroke-width: 1.5; }
.nap-monitoring-marker-core { stroke: #ffffff; stroke-width: 2; filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.35)); }
.nap-monitoring-marker[data-kind=air] .nap-monitoring-marker-core { fill: #0369a1; }
.nap-monitoring-marker[data-kind=noise] .nap-monitoring-marker-core { fill: #0369a1; }
.nap-monitoring-marker:hover .nap-monitoring-marker-ring,
.nap-monitoring-marker:focus-visible .nap-monitoring-marker-ring { stroke: #0f172a; stroke-width: 2.5; }
.nap-monitoring-marker-label {
  pointer-events: none;
  font-family: inherit;
  font-size: 8px;
  font-weight: 700;
  fill: #0f172a;
  stroke: rgba(255, 255, 255, 0.92);
  stroke-width: 2.6;
  paint-order: stroke fill;
}
.nap-monitoring-key {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 7px;
  max-width: min(305px, calc(100% - 150px));
  padding: 8px 10px;
  border: 1px solid var(--nap-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--nap-bg) 92%, transparent);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  color: var(--nap-muted-fg);
  font-size: 11px;
  line-height: 1.35;
}
.nap-monitoring-key-dot { width: 9px; height: 9px; border: 2px solid #ffffff; border-radius: 50%; flex: 0 0 auto; box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.35); }
.nap-monitoring-key[data-kind=air] .nap-monitoring-key-dot { background: #0369a1; }
.nap-monitoring-key[data-kind=noise] .nap-monitoring-key-dot { background: #0369a1; }

@media (max-width: 768px) {
  .nap-header { padding: 0 12px; gap: 8px; }
  .nap-layerbar { order: 3; position: absolute; top: 56px; left: 0; right: 0; padding: 8px 12px; border-bottom: 1px solid var(--nap-border); background: var(--nap-bg); z-index: 30; }
  .nap-body { margin-top: 42px; }
  .nap-inline .nap-label { display: none; }
  .nap-body {
    flex-direction: column;
  }
  .nap-list {
    width: 100%;
    height: 45vh;
    border-left: 0;
    border-top: 1px solid var(--nap-border);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nap-zoom, .nap-region { transition: none !important; }
}
`;

/* -- component ------------------------------------------------------------- */

export function MumbaiAddressPicker({
  defaultWardId,
  onChange,
  theme = "light",
  fullScreen = true,
  className,
  population = [],
  waterQuality = [],
  waterSectorConsumption = [],
  airQuality = [],
  noiseMonitoring = [],
  electricitySectorConsumption = [],
  electricitySupplySummaries = [],
}: MumbaiAddressPickerProps) {
  const initialWard = defaultWardId ? WARD_BY_ID.get(defaultWardId) : undefined;
  const initialRegion = initialWard ? REGION_BY_ID.get(initialWard.regionId) : undefined;

  const [regionId, setRegionId] = React.useState<"western" | "eastern" | "city" | null>(
    initialRegion?.id ?? null
  );
  const [wardId, setWardId] = React.useState<string | null>(initialWard?.id ?? null);
  const [hoveredWardId, setHoveredWardId] = React.useState<string | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = React.useState<string | null>(null);
  const [postal, setPostal] = React.useState(initialWard?.postalCode ?? "");
  const [searching, setSearching] = React.useState(false);
  const [pillarId, setPillarId] = React.useState<EnvironmentalPillarId>("population");
  const [pollutionCategoryIndex, setPollutionCategoryIndex] = React.useState(0);
  const [liveMumbaiWeather, setLiveMumbaiWeather] = React.useState<LiveMumbaiWeather | null>(null);
  const [liveWeatherError, setLiveWeatherError] = React.useState(false);
  const [mapContainerRef, mapSize] = useElementSize<HTMLDivElement>();

  const region = regionId ? REGION_BY_ID.get(regionId) ?? null : null;
  const ward = wardId ? WARD_BY_ID.get(wardId) ?? null : null;
  const hovered = hoveredWardId ? WARD_BY_ID.get(hoveredWardId) ?? null : null;
  const populationByWardName = React.useMemo(
    () => new Map(population.map((record) => [record.wardName, record])),
    [population]
  );
  const populationForWard = React.useCallback(
    (candidate: Ward) => populationByWardName.get(DATABASE_WARD_NAMES[candidate.id] ?? candidate.name),
    [populationByWardName]
  );
  const waterQualityByWardName = React.useMemo(
    () => new Map(waterQuality.map((record) => [record.wardName, record])),
    [waterQuality]
  );
  const waterQualityForWard = React.useCallback(
    (candidate: Ward) => waterQualityByWardName.get(DATABASE_WARD_NAMES[candidate.id] ?? candidate.name),
    [waterQualityByWardName]
  );
  const totalPopulation = React.useMemo(
    () => population.reduce((total, record) => total + (record.totalPopulation ?? 0), 0),
    [population]
  );
  const populationRange = React.useMemo(() => {
    const values = population
      .map((record) => record.totalPopulation)
      .filter((value): value is number => value != null);
    return values.length ? { min: Math.min(...values), max: Math.max(...values) } : null;
  }, [population]);
  const waterQualityRange = React.useMemo(() => {
    const values = waterQuality.map((record) => record.unsafeSamplePercentage);
    return values.length ? { min: Math.min(...values), max: Math.max(...values) } : null;
  }, [waterQuality]);
  const activePillar = ENVIRONMENTAL_PILLARS.find((pillar) => pillar.id === pillarId) ?? ENVIRONMENTAL_PILLARS[0];
  const isPopulationLayer = pillarId === "population";
  const isWaterLayer = pillarId === "water";
  const isPollutionLayer = pillarId === "pollution";
  const isClimateLayer = pillarId === "climate";
  const isEnergyLayer = pillarId === "energy";
  const activePollutionCategory = activePillar.subcategories?.[pollutionCategoryIndex];
  const isAirPollution = isPollutionLayer && activePollutionCategory?.label === "Air";
  const isNoisePollution = isPollutionLayer && activePollutionCategory?.label === "Noise";
  const activeParameters = activePillar.subcategories?.[pollutionCategoryIndex]?.parameters ?? activePillar.parameters;
  const populationYear = population[0]?.censusYear;
  const sourceLabel = population[0]?.dataSource?.split("|")[0]?.trim() ?? "Source not supplied";
  const waterReportingPeriod = waterQuality[0]?.reportingPeriod;
  const waterSourceLabel = waterQuality[0]?.dataSource ?? "Source not supplied";
  const airLatestMonth = airQuality.at(-1)?.reportingMonth;
  const latestAirObservations = airQuality.filter((record) => record.reportingMonth === airLatestMonth).slice().sort((a, b) => a.stationName.localeCompare(b.stationName));
  const noiseLatestDate = noiseMonitoring.at(-1)?.monitoringDate;
  const latestNoiseObservations = noiseMonitoring.filter((record) => record.monitoringDate === noiseLatestDate).slice().sort((a, b) => a.locationName.localeCompare(b.locationName));
  const activeMonitoringMarkers = isAirPollution
    ? latestAirObservations.flatMap((record) => {
        const site = AIR_STATION_MARKERS[record.stationName];
        return site
          ? [{
              ...site,
              id: record.stationName,
              kind: "air" as const,
              metric: `AQI ${record.aqi}`,
              tooltip: `BMC air-quality monitoring station: ${record.stationName}. Monthly AQI: ${record.aqi}. Pin marks the published monitoring area, not an exact sensor GPS coordinate.`,
            }]
          : [];
      })
    : isNoisePollution
      ? latestNoiseObservations.flatMap((record) => {
          const site = NOISE_LOCATION_MARKERS[record.locationName];
          return site
            ? [{
                ...site,
                id: record.locationName,
                kind: "noise" as const,
                metric: `Day ${record.dayLeq} / Night ${record.nightLeq} dB(A)`,
                tooltip: `MPCB noise-monitoring location: ${record.locationName}. Day L_eq: ${record.dayLeq} dB(A); night L_eq: ${record.nightLeq} dB(A). Pin marks the published monitoring area, not an exact instrument GPS coordinate.`,
              }]
            : [];
        })
      : [];
  const pollutionMapReadout = isAirPollution
    ? `${activeMonitoringMarkers.length} BMC station readings shown as site data`
    : isNoisePollution
      ? `${activeMonitoringMarkers.length} MPCB location readings shown as site data`
      : undefined;
  const climateMapReadout = "Live Mumbai-wide weather estimate shown in the side panel";
  const pollutionUnit = isAirPollution ? "AQI" : isNoisePollution ? "dB(A) L_eq" : activePillar.unit;
  const pollutionCoverage = isAirPollution ? `${latestAirObservations.length} BMC stations` : isNoisePollution ? `${latestNoiseObservations.length} MPCB locations` : activePillar.coverage;
  const pollutionPeriod = isAirPollution ? airLatestMonth : isNoisePollution ? noiseLatestDate : undefined;
  const pollutionSource = isAirPollution ? airQuality[0]?.dataSource : isNoisePollution ? noiseMonitoring[0]?.dataSource : undefined;
  const electricitySummary = electricitySupplySummaries.at(-1);
  const electricityMaxSectorConsumption = Math.max(...electricitySectorConsumption.map((record) => record.annualConsumptionMu), 1);
  const energyMapReadout = electricitySummary
    ? `${formatElectricity(electricitySummary.annualConsumptionMu, "MU")} citywide electricity use shown in the side panel`
    : "No verified citywide electricity data loaded";

  React.useEffect(() => {
    if (!isClimateLayer) return;

    const controller = new AbortController();
    const refreshWeather = async () => {
      try {
        const response = await fetch(LIVE_MUMBAI_WEATHER_URL, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`Open-Meteo returned ${response.status}`);
        const data = (await response.json()) as LiveMumbaiWeather;
        setLiveMumbaiWeather(data);
        setLiveWeatherError(false);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setLiveWeatherError(true);
      }
    };

    void refreshWeather();
    const refreshTimer = window.setInterval(refreshWeather, 15 * 60 * 1000);
    return () => {
      controller.abort();
      window.clearInterval(refreshTimer);
    };
  }, [isClimateLayer]);

  const matches = React.useMemo(
    () =>
      searching
        ? findWardsByPostalCode(postal).sort((a, b) => a.postalCode.localeCompare(b.postalCode))
        : [],
    [searching, postal]
  );
  const matchSet = React.useMemo(() => new Set(matches.map((w) => w.id)), [matches]);

  // Dynamically compute view based on container dimensions
  const view = React.useMemo<View>(() => {
    if (matches.length > 0) {
      return computeView(unionBBox(matches), mapSize.width, mapSize.height, 1.25);
    }
    if (ward) {
      return computeView(ward.bbox, mapSize.width, mapSize.height, 1.45, 4.5);
    }
    if (region) {
      return computeView(region.bbox, mapSize.width, mapSize.height, 1.28);
    }
    return computeView(MUMBAI_BBOX, mapSize.width, mapSize.height, 1.18);
  }, [matches, ward, region, mapSize.width, mapSize.height]);

  React.useEffect(() => setHoveredWardId(null), [view]);

  const selectWard = React.useCallback((w: Ward) => {
    setRegionId(w.regionId);
    setWardId(w.id);
    setSearching(false);
    setPostal(w.postalCode);
  }, []);

  const selectRegion = React.useCallback(
    (id: "western" | "eastern" | "city") => {
      setRegionId(id);
      setHoveredRegionId(null);
      setSearching(false);
      if (ward && ward.regionId !== id) {
        setWardId(null);
        setPostal("");
      }
    },
    [ward]
  );

  const showAll = () => {
    setRegionId(null);
    setWardId(null);
    setSearching(false);
    setPostal("");
  };

  const handlePostal = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 6);
    setPostal(digits);
    if (!digits) {
      setSearching(false);
      return;
    }
    const found = findWardsByPostalCode(digits);
    if (digits.length >= 3 && found.length === 1) {
      setRegionId(found[0].regionId);
      setWardId(found[0].id);
      setSearching(false);
    } else {
      setSearching(true);
    }
  };

  const handleMapClick = (w: Ward) => {
    if (matches.length || (region && region.id === w.regionId)) {
      selectWard(w);
    } else {
      selectRegion(w.regionId);
    }
  };

  // Callback on change
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(() => {
    if (!ward || !region) {
      onChangeRef.current?.(null);
      return;
    }
    onChangeRef.current?.({
      regionId: region.id,
      region: region.name,
      wardId: ward.id,
      ward: ward.name,
      areas: ward.areas,
      postalCode: ward.postalCode,
      formatted: `${ward.shortName}, Ward ${ward.id}, ${region.name}, Mumbai - ${ward.postalCode}, Maharashtra, India`,
    });
  }, [ward, region]);

  // A single blue-grey map base keeps every layer visually consistent. Data layers
  // use only a lighter-to-darker blue intensity scale; station pins carry their own meaning.
  const fillFor = (w: Ward) => {
    const isSelected = w.id === wardId;
    const isHovered = w.id === hoveredWardId;
    const baseFill = "#7ea6c4";
    const wardPopulation = populationForWard(w)?.totalPopulation;
    const wardWaterQuality = waterQualityForWard(w)?.unsafeSamplePercentage;

    if (isPopulationLayer && populationRange && wardPopulation != null) {
      const span = Math.max(populationRange.max - populationRange.min, 1);
      const ratio = (wardPopulation - populationRange.min) / span;
      return {
        fill: `hsl(205 72% ${82 - ratio * 44}%)`,
        fillOpacity: isSelected || isHovered ? 1 : 0.9,
        stroke: isSelected ? "#0f172a" : "#ffffff",
        strokeWidth: isSelected ? 3 : isHovered ? 2 : 1.2,
      };
    }

    if (isWaterLayer && waterQualityRange && wardWaterQuality != null) {
      const span = Math.max(waterQualityRange.max - waterQualityRange.min, 0.1);
      const ratio = (wardWaterQuality - waterQualityRange.min) / span;
      return {
        fill: `hsl(205 72% ${82 - ratio * 44}%)`,
        fillOpacity: isSelected || isHovered ? 1 : 0.9,
        stroke: isSelected ? "#0f172a" : "#ffffff",
        strokeWidth: isSelected ? 3 : isHovered ? 2 : 1.2,
      };
    }

    if (matches.length > 0) {
      const isMatch = matchSet.has(w.id);
      return {
        fill: baseFill,
        fillOpacity: isMatch ? (isHovered || isSelected ? 1 : 0.9) : 0.22,
        stroke: isSelected ? "#0f172a" : "#ffffff",
        strokeWidth: isSelected ? 2.5 : 1,
      };
    }

    if (!region) {
      const hr = hovered?.regionId ?? hoveredRegionId;
      const isTarget = hr ? w.regionId === hr : false;
      return {
        fill: baseFill,
        fillOpacity: isSelected ? 1 : isHovered ? 0.98 : isTarget ? 0.95 : 0.88,
        stroke: isSelected ? "#0f172a" : "#ffffff",
        strokeWidth: isSelected ? 3 : 1.2,
      };
    }

    // When a region is selected, other wards stay visible but subdued.
    if (w.regionId !== region.id) {
      return {
        fill: baseFill,
        fillOpacity: isHovered ? 0.6 : 0.32,
        stroke: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
        strokeWidth: isHovered ? 1.8 : 1.1,
      };
    }

    return {
      fill: baseFill,
      fillOpacity: isSelected ? 1 : isHovered ? 0.98 : 0.9,
      stroke: isSelected ? "#0f172a" : "#ffffff",
      strokeWidth: isSelected ? 3 : 1.3,
    };
  };

  const isZoomed = Boolean(region || ward || matches.length > 0);
  const displayedWard = hovered ?? ward;
  const displayedPopulation = displayedWard ? populationForWard(displayedWard) : undefined;
  const displayedWaterQuality = displayedWard ? waterQualityForWard(displayedWard) : undefined;
  const populationFacts = displayedPopulation
    ? [
        ["Total population", formatPopulation(displayedPopulation.totalPopulation)],
        ["Households", formatPopulation(displayedPopulation.householdCount)],
        ["Average household size", displayedPopulation.totalPopulation != null && displayedPopulation.householdCount ? (displayedPopulation.totalPopulation / displayedPopulation.householdCount).toFixed(2) : "Not supplied"],
        ["Male population", formatPopulation(displayedPopulation.malePopulation)],
        ["Female population", formatPopulation(displayedPopulation.femalePopulation)],
        ["Age 0–6", formatPopulation(displayedPopulation.populationAge0To6)],
        ["Literate population", formatPopulation(displayedPopulation.literatePopulation)],
        ["Illiterate population", formatPopulation(displayedPopulation.illiteratePopulation)],
        ["Slum population", formatPopulation(displayedPopulation.slumPopulation)],
        ["Non-slum population", formatPopulation(displayedPopulation.nonSlumPopulation)],
      ]
    : [];
  const waterFacts = displayedWaterQuality
    ? [
        ["Unsafe water samples", formatPercentage(displayedWaterQuality.unsafeSamplePercentage)],
        ["Reporting period", displayedWaterQuality.reportingPeriod],
      ]
    : [];
  const regionPopulation = region
    ? (WARDS_BY_REGION.get(region.id) ?? []).reduce(
        (total, candidate) => total + (populationForWard(candidate)?.totalPopulation ?? 0),
        0
      )
    : 0;

  return (
    <div
      className={cx("nap", fullScreen ? "nap-fullscreen" : "nap-boxed", className)}
      data-theme={theme}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        if (searching) setSearching(false);
        else if (region) showAll();
      }}
    >
      <style>{CSS}</style>

      {/* Header */}
      <div className="nap-header">
        <nav aria-label="Location" className="nap-crumbs">
          <button
            type="button"
            className="nap-crumb"
            aria-current={!region ? "location" : undefined}
            onClick={showAll}
          >
            Mumbai
          </button>
          {region && (
            <>
              <svg className="nap-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <button
                type="button"
                className="nap-crumb"
                aria-current={!ward ? "location" : undefined}
                onClick={() => setWardId(null)}
              >
                {region.name}
              </button>
            </>
          )}
          {ward && (
            <>
              <svg className="nap-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="nap-crumb" aria-current="location">
                {ward.shortName}
              </span>
            </>
          )}
        </nav>

        <div className="nap-layerbar" aria-label="Environmental data layers">
          {ENVIRONMENTAL_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              className="nap-layer"
              aria-pressed={pillar.id === pillarId}
              onClick={() => setPillarId(pillar.id)}
              title={pillar.description}
            >
              {pillar.label}
            </button>
          ))}
        </div>

        <label className="nap-inline">
          <span className="nap-label">Postal code</span>
          <input
            className="nap-input nap-postal"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="400001"
            value={postal}
            onChange={(e) => handlePostal(e.target.value)}
          />
        </label>
      </div>

      {/* Body: Map + Sidebar */}
      <div className="nap-body">
        {/* Free, open map container */}
        <div ref={mapContainerRef} className="nap-map">
          {/* Top-left chip */}
          <div className="nap-readout">
            <div className="nap-chip">
              {hovered ? (
                <>
                  <span className="nap-chip-main">{hovered.shortName}</span>
                  <span className="nap-chip-sub">
                    {isPopulationLayer
                      ? `Ward ${hovered.id} • ${formatPopulation(displayedPopulation?.totalPopulation)} residents (${displayedPopulation?.censusYear ?? "—"})`
                      : isWaterLayer
                        ? `Ward ${hovered.id} • ${formatPercentage(displayedWaterQuality?.unsafeSamplePercentage)} unsafe samples (${displayedWaterQuality?.reportingPeriod ?? "not reported"})`
                        : isPollutionLayer
                          ? pollutionMapReadout
                          : isClimateLayer
                            ? climateMapReadout
                            : isEnergyLayer
                              ? energyMapReadout
                              : `Ward ${hovered.id} • ${activePillar.label} records unavailable`}
                  </span>
                </>
              ) : ward ? (
                <>
                  <span className="nap-chip-main">{ward.shortName}</span>
                  <span className="nap-chip-sub">
                    {isPopulationLayer
                      ? `Ward ${ward.id} • ${formatPopulation(displayedPopulation?.totalPopulation)} residents (${displayedPopulation?.censusYear ?? "—"})`
                      : isWaterLayer
                        ? `Ward ${ward.id} • ${formatPercentage(displayedWaterQuality?.unsafeSamplePercentage)} unsafe samples (${displayedWaterQuality?.reportingPeriod ?? "not reported"})`
                        : isPollutionLayer
                          ? pollutionMapReadout
                          : isClimateLayer
                            ? climateMapReadout
                            : isEnergyLayer
                              ? energyMapReadout
                              : `Ward ${ward.id} • ${activePillar.label} records unavailable`}
                  </span>
                </>
              ) : region ? (
                <>
                  <span className="nap-chip-main">{region.name}</span>
                  <span className="nap-chip-sub">
                    {isPopulationLayer
                      ? `${WARDS_BY_REGION.get(region.id)?.length} wards • ${formatPopulation(regionPopulation)} residents`
                      : isWaterLayer
                        ? `${WARDS_BY_REGION.get(region.id)?.length} wards • published water-safety results`
                        : isPollutionLayer
                          ? pollutionMapReadout
                          : isClimateLayer
                            ? climateMapReadout
                            : isEnergyLayer
                              ? energyMapReadout
                              : `${WARDS_BY_REGION.get(region.id)?.length} wards • no verified ${activePillar.label.toLowerCase()} records`}
                  </span>
                </>
              ) : (
                <>
                  <span className="nap-chip-main">Mumbai</span>
                  <span className="nap-chip-sub">
                    {isPopulationLayer
                      ? `24 wards • ${formatPopulation(totalPopulation)} residents (${populationYear ?? "census"})`
                      : isWaterLayer
                        ? `24 wards • published water-safety results (${waterReportingPeriod ?? "latest period"})`
                        : isPollutionLayer
                          ? pollutionMapReadout
                          : isClimateLayer
                            ? climateMapReadout
                            : isEnergyLayer
                              ? energyMapReadout
                              : `24 wards • no verified ${activePillar.label.toLowerCase()} records`}
                  </span>
                </>
              )}
            </div>
          </div>

          {activeMonitoringMarkers.length > 0 && (
            <div className="nap-monitoring-key" data-kind={activeMonitoringMarkers[0].kind}>
              <span className="nap-monitoring-key-dot" aria-hidden="true" />
              <span>
                {activeMonitoringMarkers.length} published {isAirPollution ? "air-monitoring stations" : "noise-monitoring locations"}. Pins show the reported area, not GPS.
              </span>
            </div>
          )}

          <svg
            viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
            role="img"
            aria-label={activeMonitoringMarkers.length > 0 ? `Map of Mumbai wards with ${isAirPollution ? "air-quality stations" : "noise-monitoring locations"}` : "Map of Mumbai wards"}
            className="nap-svg"
            onMouseLeave={() => setHoveredWardId(null)}
          >
            <g
              className="nap-map-group nap-zoom"
              style={{
                transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`,
                transformOrigin: "0 0",
              }}
            >
              {/* Ward polygons */}
              {WARDS.map((w) => {
                const style = fillFor(w);
                return (
                  <path
                    key={w.id}
                    d={w.d}
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                    className="nap-region"
                    style={{
                      fill: style.fill,
                      fillOpacity: style.fillOpacity,
                      stroke: style.stroke,
                      strokeWidth: style.strokeWidth,
                    }}
                    onMouseEnter={() => setHoveredWardId(w.id)}
                    onClick={() => handleMapClick(w)}
                  />
                );
              })}

              {/* Published station/location areas. These are not GPS positions. */}
              {activeMonitoringMarkers.map((marker) => (
                <g
                  key={`${marker.kind}-${marker.id}`}
                  className="nap-monitoring-marker"
                  data-kind={marker.kind}
                  aria-label={`${marker.tooltip} Select the surrounding ward.`}
                  role="button"
                  tabIndex={0}
                  transform={`translate(${marker.point[0]}, ${marker.point[1]})`}
                  onClick={() => {
                    const markerWard = WARD_BY_ID.get(marker.wardId);
                    if (markerWard) selectWard(markerWard);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    const markerWard = WARD_BY_ID.get(marker.wardId);
                    if (markerWard) selectWard(markerWard);
                  }}
                >
                  <title>{marker.tooltip} Click to zoom to the surrounding ward.</title>
                  <circle className="nap-monitoring-marker-ring" r="8" />
                  <circle className="nap-monitoring-marker-core" r="5" />
                  <text className="nap-monitoring-marker-label" x="10" y="-10">
                    {marker.shortLabel}
                  </text>
                </g>
              ))}

              {/* OVERVIEW LABELS */}
              {!isZoomed && (
                <>
                  <text
                    x={REGIONS[0].label[0]}
                    y={REGIONS[0].label[1]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#102a43"
                    stroke="rgba(255, 255, 255, 0.82)"
                    strokeWidth="2.5"
                    paintOrder="stroke fill"
                    fontSize="18"
                    fontWeight="700"
                    className="nap-map-text"
                  >
                    Western Suburbs
                  </text>

                  <text
                    x={REGIONS[1].label[0]}
                    y={REGIONS[1].label[1]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#102a43"
                    stroke="rgba(255, 255, 255, 0.82)"
                    strokeWidth="2"
                    paintOrder="stroke fill"
                    fontSize="18"
                    fontWeight="800"
                    className="nap-map-text"
                  >
                    Eastern Suburbs
                  </text>

                  <text
                    x={REGIONS[2].label[0]}
                    y={REGIONS[2].label[1]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#102a43"
                    stroke="rgba(255, 255, 255, 0.82)"
                    strokeWidth="2.5"
                    paintOrder="stroke fill"
                    fontSize="18"
                    fontWeight="700"
                    className="nap-map-text"
                  >
                    Island City
                  </text>
                </>
              )}

              {/* ZOOMED LABELS */}
              {isZoomed &&
                (region ? WARDS_BY_REGION.get(region.id) || [] : WARDS).map((w) => {
                  return (
                    <g key={w.id} transform={`translate(${w.label[0]}, ${w.label[1]})`} pointerEvents="none">
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#102a43"
                        stroke="rgba(255, 255, 255, 0.82)"
                        strokeWidth="2.2"
                        paintOrder="stroke fill"
                        fontSize={view.s > 2.5 ? "10.5" : "9"}
                        fontWeight="700"
                        className="nap-map-text"
                      >
                        {w.shortName.split(" ")[0]}
                      </text>
                    </g>
                  );
                })}
            </g>
          </svg>

          {/* Bottom-left Mini Inset Map */}
          {isZoomed && (
            <div
              className="nap-inset"
              title="Click to reset overview"
              onClick={showAll}
            >
              <svg viewBox="0 0 500 900">
                {WARDS.map((w) => {
                  const isActive = region && w.regionId === region.id;
                  return (
                    <path
                      key={w.id}
                      d={w.d}
                      fill={isActive ? "#4e86ad" : "#b8d0e3"}
                      fillOpacity={isActive ? 0.95 : 0.65}
                      stroke={isActive ? "#0f172a" : "#ffffff"}
                      strokeWidth={isActive ? 1.5 : 0.5}
                    />
                  );
                })}
              </svg>
            </div>
          )}

          <div className="nap-legend" aria-live="polite">
            <span className="nap-legend-title">{activePillar.label} layer</span>
            {isPopulationLayer && populationRange ? (
              <>
                <div className="nap-legend-scale" />
                <div className="nap-legend-range">
                  <span>{formatPopulation(populationRange.min)}</span>
                  <span>{formatPopulation(populationRange.max)} people</span>
                </div>
              </>
            ) : isWaterLayer && waterQualityRange ? (
              <>
                <div className="nap-legend-scale nap-water-legend-scale" />
                <div className="nap-legend-range">
                  <span>{formatPercentage(waterQualityRange.min)} unsafe</span>
                  <span>{formatPercentage(waterQualityRange.max)} unsafe</span>
                </div>
              </>
            ) : isPollutionLayer && activeMonitoringMarkers.length > 0 ? (
              <span className="nap-data-copy">
                {activeMonitoringMarkers.length} {isAirPollution ? "BMC stations" : "MPCB locations"} shown as pins
              </span>
            ) : isClimateLayer ? (
              <span className="nap-data-copy">Live Mumbai-wide weather estimate</span>
            ) : isEnergyLayer && electricitySummary ? (
              <span className="nap-data-copy">Mumbai City (BEST) citywide data</span>
            ) : (
              <span className="nap-data-copy">No verified records loaded</span>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="nap-list">
          <div className="nap-data-context">
            <span className="nap-data-kicker">Environmental evidence</span>
            <p className="nap-data-title">{isPollutionLayer ? `${activePillar.label} · ${activePollutionCategory?.label ?? ""}` : activePillar.label}</p>
            <p className="nap-data-copy">{activePillar.description}</p>
            <div className="nap-data-meta">
              <span><strong>Unit:</strong> {isPollutionLayer ? pollutionUnit : activePillar.unit}</span>
              <span><strong>Coverage:</strong> {isPollutionLayer ? pollutionCoverage : activePillar.coverage}</span>
              {isPopulationLayer && <span><strong>Period:</strong> {populationYear ?? "Not supplied"}</span>}
              {isPopulationLayer && <span><strong>Source:</strong> {sourceLabel}</span>}
              {isWaterLayer && <span><strong>Period:</strong> {waterReportingPeriod ?? "Not supplied"}</span>}
              {isWaterLayer && <span><strong>Source:</strong> {waterSourceLabel}</span>}
              {isPollutionLayer && <span><strong>Period:</strong> {formatMonitoringDate(pollutionPeriod)}</span>}
              {isPollutionLayer && pollutionSource && <span><strong>Source:</strong> {pollutionSource}</span>}
              {isClimateLayer && <span><strong>Source:</strong> Open-Meteo live weather model</span>}
              {isEnergyLayer && <span><strong>Period:</strong> {electricitySummary?.reportingPeriod ?? "Not supplied"}</span>}
              {isEnergyLayer && <span><strong>Source:</strong> {electricitySummary?.dataSource ?? "Not supplied"}</span>}
            </div>
            {activePillar.subcategories && (
              <div className="nap-parameter-tabs" aria-label="Pollution categories">
                {activePillar.subcategories.map((category, index) => (
                  <button
                    key={category.label}
                    type="button"
                    className="nap-parameter-tab"
                    aria-pressed={pollutionCategoryIndex === index}
                    onClick={() => setPollutionCategoryIndex(index)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isPopulationLayer && populationFacts.length > 0 && (
            <div className="nap-population-facts" aria-label="Selected ward population details">
              {populationFacts.map(([label, value]) => (
                <div className="nap-population-fact" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          )}

          {isWaterLayer && waterFacts.length > 0 && (
            <div className="nap-population-facts" aria-label="Selected ward water quality details">
              {waterFacts.map(([label, value]) => (
                <div className="nap-population-fact" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          )}

          {isWaterLayer && waterSectorConsumption.length > 0 && (
            <section className="nap-citywide-card" aria-label="Historical Mumbai water consumption by sector">
              <p className="nap-citywide-title">Mumbai-wide metered-water split</p>
              <p className="nap-citywide-copy">Historical context from 2006 — not current and not ward-level.</p>
              {waterSectorConsumption
                .slice()
                .sort((a, b) => ["domestic", "commercial", "industrial"].indexOf(a.sector) - ["domestic", "commercial", "industrial"].indexOf(b.sector))
                .map((record) => (
                  <div className="nap-sector-row" key={record.sector}>
                    <div className="nap-sector-label">
                      <span>{record.sector[0].toUpperCase() + record.sector.slice(1)}</span>
                      <span>{formatPercentage(record.meteredConsumptionSharePercentage)} consumption · {formatPercentage(record.meteredConnectionSharePercentage)} connections</span>
                    </div>
                    <div className="nap-sector-track" aria-hidden="true">
                      <div
                        className="nap-sector-fill"
                        style={{
                          width: `${record.meteredConsumptionSharePercentage}%`,
                          backgroundColor: record.sector === "domestic" ? "#0f766e" : record.sector === "commercial" ? "#d97706" : "#7c3aed",
                        }}
                      />
                    </div>
                  </div>
                ))}
              <p className="nap-citywide-note">Bars show historical metered-consumption share. The source&apos;s final 4% label is ambiguous; it is shown as industrial because industrial is the third connection category named in the same source.</p>
            </section>
          )}

          {isEnergyLayer && electricitySummary ? (
            <>
              <section className="nap-citywide-card" aria-label="Mumbai City electricity summary">
                <p className="nap-citywide-title">Mumbai City electricity summary</p>
                <p className="nap-citywide-copy">BEST service area, FY 2024-25 — citywide utility data, not ward averages.</p>
                <div className="nap-population-facts" style={{ padding: 0, borderBottom: 0 }}>
                  <div className="nap-population-fact"><span>Annual consumption</span><strong>{formatElectricity(electricitySummary.annualConsumptionMu, "MU")}</strong></div>
                  <div className="nap-population-fact"><span>Average monthly use</span><strong>{formatElectricity(electricitySummary.averageMonthlyConsumptionMu, "MU")}</strong></div>
                  <div className="nap-population-fact"><span>Maximum demand</span><strong>{formatElectricity(electricitySummary.maximumDemandMw, "MW")}</strong></div>
                  <div className="nap-population-fact"><span>Rooftop solar capacity</span><strong>{formatElectricity(electricitySummary.rooftopSolarCapacityMw, "MW")}</strong></div>
                </div>
              </section>
              <div className="nap-list-head">
                <h3>Annual use by consumer category</h3>
                <span className="nap-sub">Million Units (MU)</span>
              </div>
              <ul className="nap-ul">
                {electricitySectorConsumption.map((record) => (
                  <li className="nap-parameter" key={record.sector}>
                    <div className="nap-sector-label">
                      <span>{record.sector.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</span>
                      <span>{formatElectricity(record.annualConsumptionMu, "MU")}</span>
                    </div>
                    <div className="nap-sector-track" aria-hidden="true">
                      <div className="nap-sector-fill" style={{ width: `${(record.annualConsumptionMu / electricityMaxSectorConsumption) * 100}%`, backgroundColor: "#0369a1" }} />
                    </div>
                    <span className="nap-parameter-status">{record.consumerCount.toLocaleString("en-IN")} consumers · {formatElectricity(record.connectedLoadMw, "MW")} connected load · {formatElectricity(record.averageMonthlyConsumptionMu, "MU")}/month</span>
                  </li>
                ))}
              </ul>
              <p className="nap-empty-state"><strong>Citywide utility evidence</strong>These BEST service-area totals are published for Mumbai City. They do not describe an individual ward’s electricity use.</p>
            </>
          ) : isClimateLayer ? (
            <>
              <section className="nap-citywide-card" aria-label="Live Mumbai weather estimate">
                <p className="nap-citywide-title">Live Mumbai weather</p>
                <p className="nap-citywide-copy">Citywide model estimate from Open-Meteo — not a ward measurement or a weather-station observation.</p>
                {liveMumbaiWeather ? (
                  <>
                    <div className="nap-population-facts" style={{ padding: 0, borderBottom: 0 }}>
                      <div className="nap-population-fact"><span>Temperature</span><strong>{liveMumbaiWeather.current.temperature_2m.toFixed(1)}°C</strong></div>
                      <div className="nap-population-fact"><span>Feels like</span><strong>{liveMumbaiWeather.current.apparent_temperature.toFixed(1)}°C</strong></div>
                      <div className="nap-population-fact"><span>Humidity</span><strong>{liveMumbaiWeather.current.relative_humidity_2m}%</strong></div>
                      <div className="nap-population-fact"><span>Current rain</span><strong>{liveMumbaiWeather.current.rain.toFixed(1)} mm</strong></div>
                      <div className="nap-population-fact"><span>Today max / min</span><strong>{liveMumbaiWeather.daily.temperature_2m_max[0]?.toFixed(1)}° / {liveMumbaiWeather.daily.temperature_2m_min[0]?.toFixed(1)}°</strong></div>
                      <div className="nap-population-fact"><span>Today&apos;s rainfall</span><strong>{liveMumbaiWeather.daily.precipitation_sum[0]?.toFixed(1)} mm</strong></div>
                    </div>
                    <p className="nap-citywide-note">{weatherDescription(liveMumbaiWeather.current.weather_code)} · Wind {liveMumbaiWeather.current.wind_speed_10m.toFixed(1)} km/h · Rain chance {liveMumbaiWeather.daily.precipitation_probability_max[0] ?? "—"}% · UV max {liveMumbaiWeather.daily.uv_index_max[0]?.toFixed(1) ?? "—"} · Updated {formatLiveWeatherTime(liveMumbaiWeather.current.time)}</p>
                  </>
                ) : (
                  <p className="nap-citywide-note">{liveWeatherError ? "The live weather source could not be reached. Please try again shortly." : "Loading the latest Open-Meteo weather estimate…"}</p>
                )}
              </section>
            </>
          ) : isAirPollution ? (
            <>
              <div className="nap-list-head">
                <h3>BMC air-quality stations</h3>
                <span className="nap-sub">{formatMonitoringDate(airLatestMonth)}</span>
              </div>
              <ul className="nap-ul">
                {latestAirObservations.map((record) => (
                  <li className="nap-item" key={record.stationName}>
                    <span className="nap-dot" style={{ backgroundColor: "#0369a1" }} />
                    <div className="nap-names">
                      <span className="nap-name">{record.stationName}</span>
                      <span className="nap-sub">Monthly average AQI · monitoring station</span>
                    </div>
                    <span className="nap-num">AQI {record.aqi}</span>
                  </li>
                ))}
              </ul>
              <p className="nap-empty-state"><strong>Station-based evidence</strong>These readings describe their named BMC stations, not every ward around them.</p>
            </>
          ) : isNoisePollution ? (
            <>
              <div className="nap-list-head">
                <h3>MPCB noise-monitoring locations</h3>
                <span className="nap-sub">{formatMonitoringDate(noiseLatestDate)}</span>
              </div>
              <ul className="nap-ul">
                {latestNoiseObservations.map((record) => (
                  <li className="nap-item" key={record.locationName}>
                    <span className="nap-dot" style={{ backgroundColor: "#0369a1" }} />
                    <div className="nap-names">
                      <span className="nap-name">{record.locationName}</span>
                      <span className="nap-sub">24-hour monitoring location · L_eq dB(A)</span>
                    </div>
                    <div className="nap-meta">
                      <span className="nap-num">Day {record.dayLeq.toFixed(1)}</span>
                      <span className="nap-population">Night {record.nightLeq.toFixed(1)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="nap-empty-state"><strong>Site-based evidence</strong>Day and night levels are published for named MPCB monitoring locations, not estimated ward averages.</p>
            </>
          ) : isWaterLayer ? (
            <>
              <div className="nap-list-head">
                <h3>Published water-safety results</h3>
                <span className="nap-sub">{waterReportingPeriod ?? "Latest period"}</span>
              </div>
              <ul className="nap-ul">
                {WARDS.map((w) => (
                  <li
                    key={w.id}
                    className="nap-item"
                    aria-selected={ward?.id === w.id}
                    onClick={() => selectWard(w)}
                    onMouseEnter={() => setHoveredWardId(w.id)}
                  >
                    <span className="nap-dot" style={{ backgroundColor: w.color }} />
                    <div className="nap-names">
                      <span className="nap-name">{w.shortName}</span>
                      <span className="nap-sub">% of samples classified unsafe</span>
                    </div>
                    <span className="nap-num">{formatPercentage(waterQualityForWard(w)?.unsafeSamplePercentage)}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : !isPopulationLayer ? (
            <ul className="nap-parameter-list" aria-label={`${activePillar.label} parameter catalogue`}>
              {activeParameters.map((parameter) => (
                <li className="nap-parameter" key={parameter}>
                  <span className="nap-parameter-name">{parameter}</span>
                  <span className="nap-parameter-status">No verified ward-level record loaded</span>
                </li>
              ))}
              <li className="nap-empty-state">
                <strong>Ready for measured records</strong>
                Prakriti will show each value only after it has a unit, period, source, and ward coverage. It will not estimate missing values.
              </li>
            </ul>
          ) : matches.length > 0 ? (
            <>
              <div className="nap-list-head">
                <h3>Matching Wards</h3>
                <span className="nap-sub">{matches.length} found</span>
              </div>
              <ul className="nap-ul">
                {matches.map((w) => (
                  <li
                    key={w.id}
                    className="nap-item"
                    aria-selected={ward?.id === w.id}
                    onClick={() => selectWard(w)}
                    onMouseEnter={() => setHoveredWardId(w.id)}
                  >
                    <span className="nap-dot" style={{ backgroundColor: w.color }} />
                    <div className="nap-names">
                      <span className="nap-name">{w.shortName}</span>
                      <span className="nap-sub">Ward {w.id}</span>
                    </div>
                    <div className="nap-meta">
                      <span className="nap-num">{w.postalCode}</span>
                      <span className="nap-population">{formatPopulation(populationForWard(w)?.totalPopulation)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : region ? (
            <>
              <div className="nap-list-head">
                <h3>{region.name}</h3>
                <span className="nap-sub">{formatPopulation(regionPopulation)} residents</span>
              </div>
              <ul className="nap-ul">
                {(WARDS_BY_REGION.get(region.id) || []).map((w) => (
                  <li
                    key={w.id}
                    className="nap-item"
                    aria-selected={ward?.id === w.id}
                    onClick={() => selectWard(w)}
                    onMouseEnter={() => setHoveredWardId(w.id)}
                  >
                    <div className="nap-names">
                      <span className="nap-name">{w.shortName}</span>
                      <span className="nap-sub">Ward {w.id}</span>
                    </div>
                    <div className="nap-meta">
                      <span className="nap-num">{w.postalCode}</span>
                      <span className="nap-population">{formatPopulation(populationForWard(w)?.totalPopulation)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="nap-list-head">
                <h3>Choose a region</h3>
              </div>
              <ul className="nap-ul">
                {REGIONS.map((r) => (
                  <li
                    key={r.id}
                    className="nap-item"
                    onClick={() => selectRegion(r.id)}
                    onMouseEnter={() => setHoveredRegionId(r.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                  >
                    <span className="nap-dot" style={{ backgroundColor: r.color }} />
                    <div className="nap-names">
                      <span className="nap-name">{r.name}</span>
                    </div>
                    <span className="nap-num">
                      {WARDS_BY_REGION.get(r.id)?.length} wards
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
