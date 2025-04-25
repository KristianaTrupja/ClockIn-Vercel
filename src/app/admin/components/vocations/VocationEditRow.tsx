import { Button } from "@/components/ui/button";

type Props = {
  index: number;
  editedData: { date: string; holidays: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: "date" | "holidays") => void;
  onSave: () => void;
};

export default function VocationEditRow({ index, editedData, onChange, onSave }: Props) {
  return (
    <tr className="border-t border-[#d1d1d1] font-semibold text-lg bg-[#E3F0FF]">
      <td className="px-4 py-2 bg-[#244B77] text-white font-semibold rounded-sm text-xl">
        {index + 1}.
      </td>
      <td className="px-4 py-2 rounded-sm">
        <input
          value={editedData.date}
          onChange={(e) => onChange(e, "date")}
          className="border px-2 py-1 rounded w-full bg-white"
        />
      </td>
      <td className="px-4 py-2 rounded-sm">
        <input
          value={editedData.holidays}
          onChange={(e) => onChange(e, "holidays")}
          className="border px-2 py-1 rounded w-full bg-white"
        />
      </td>
      <td className="px-4 py-2 rounded-sm">
        <Button size="sm" onClick={onSave}>
          Ruaj
        </Button>
      </td>
      <td />
    </tr>
  );
}
