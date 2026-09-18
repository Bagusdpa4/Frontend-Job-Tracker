export function getTodayWIB() {
  const now = new Date();
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return wib.toISOString().slice(0, 10);
}

const BULAN_MAP: Record<string, string> = {
  Januari: "01",
  Februari: "02",
  Maret: "03",
  April: "04",
  Mei: "05",
  Juni: "06",
  Juli: "07",
  Agustus: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Desember: "12",
};

// Parse "Kamis, 17 September 2026" -> "2026-09-17"
export function parseIndonesianDate(dateStr?: string): string {
  if (!dateStr) return "";
  const match = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (!match) return "";
  const [, tanggal, bulanNama, tahun] = match;
  const bulan = BULAN_MAP[bulanNama];
  if (!bulan) return "";
  return `${tahun}-${bulan}-${tanggal.padStart(2, "0")}`;
}
