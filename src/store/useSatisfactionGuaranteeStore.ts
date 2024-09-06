import { create } from "zustand";

type CsvRow = {
	id: string;
	data: string[];
};

type CsvData = {
	headers: string[];
	rows: CsvRow[];
};

interface CsvState {
	csvData: CsvData;
	setCsvData: (data: CsvData) => void;
	resetCsvData: () => void;
}

const initialCsvData: CsvData = { headers: [], rows: [] };

export const useSatisfactionGuaranteeStore = create<CsvState>((set) => ({
	csvData: initialCsvData,
	setCsvData: (data) => set({ csvData: data }),
	resetCsvData: () => set({ csvData: initialCsvData }),
}));
