import { MumbaiAddressPicker } from "@/components/ui/mumbai-address-picker";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-[#eaedf2] text-slate-900 font-sans antialiased">
      <MumbaiAddressPicker theme="light" fullScreen={true} />
    </main>
  );
}
