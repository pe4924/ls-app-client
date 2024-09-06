import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { parse } from "csv-parse/browser/esm/sync";
import { v4 as uuidv4 } from "uuid";
import { useSatisfactionGuaranteeStore } from "@/store/useSatisfactionGuaranteeStore";

function truncateLink(text: string): string {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, (url) => {
		if (url.length > 30) {
			return `${url.substring(0, 30)}...`;
		}
		return url;
	});
}

export function InputFile() {
	const { csvData, setCsvData, resetCsvData } = useSatisfactionGuaranteeStore();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const text = e.target?.result as string;
				const records = parse(text, {
					skip_empty_lines: true,
				});
				const headers = records[0];
				const rows = records.slice(1).map((row: string[]) => ({
					id: uuidv4(),
					data: row,
				}));
				setCsvData({ headers, rows });
			};
			reader.readAsText(file, "Shift_JIS");
		}
	};

	return (
		<div className="w-full p-4">
			<div className="w-full max-w-5xl mx-auto">
				<div className="mb-4 flex items-center gap-4">
					<div className="flex-grow">
						<Label htmlFor="csvFile" className="block text-left mb-2">
							CSVファイルを選択してください
						</Label>
						<div className="flex items-center gap-4">
							<Input
								id="csvFile"
								type="file"
								accept=".csv"
								onChange={handleFileUpload}
								className="w-1/2"
							/>
							<Button onClick={resetCsvData}>リセット</Button>
						</div>
					</div>
				</div>
				{csvData.rows.length > 0 && (
					<>
						<div className="mt-4">
							<ScrollArea className="h-[500px] w-full rounded-md border">
								<div className="w-max">
									<Table>
										<TableHeader>
											<TableRow>
												{csvData.headers.map((header) => (
													<TableHead
														key={`header-${header}`}
														className="whitespace-nowrap text-left"
													>
														{header}
													</TableHead>
												))}
											</TableRow>
										</TableHeader>
										<TableBody>
											{csvData.rows.map((row) => (
												<TableRow key={row.id}>
													{row.data.map((cell, cellIndex) => (
														<TableCell
															key={`${row.id}-${csvData.headers[cellIndex]}`}
															className="whitespace-nowrap text-left"
														>
															{truncateLink(cell)}
														</TableCell>
													))}
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
