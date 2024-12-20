import Link from "next/link";
import Image from "next/image";
import plus from "@/public/plus.svg";

export default function MenuEmptyState() {
  return (
    <div className="flex flex-col items-center h-40 py-6 px-4 text-center bg-bgSecondary border rounded-lg">
      <h1 className="text-textPrimary font-semibold">Menu jest puste</h1>
      <p className="text-textTertiary text-sm font-normal">
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <Link
        href="/menu"
        className="primary-button mt-6 mx-3.5 w-48 h-10 bg-buttonPrimaryBg border rounded-lg flex items-center justify-center gap-2 hover:bg-purple-600"
      >
        <Image src={plus} alt="Dodaj pozycję menu" />
        <span className="text-sm font-semibold text-white">
          Dodaj pozycję menu
        </span>
      </Link>
    </div>
  );
}
