import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputFile } from "./CsvUpload";
import Inquiry from "./Inquiry";

function SatisfactionGuarantee() {
	return (
		<div className="w-full p-4">
			<Tabs defaultValue="csv-upload" className="max-w-5xl mx-auto">
				<TabsList className="justify-start">
					<TabsTrigger value="csv-upload">CSVアップロード</TabsTrigger>
					<TabsTrigger value="inquiry">お問い合わせ登録</TabsTrigger>
				</TabsList>
				<TabsContent value="csv-upload" className="mt-4">
					<InputFile />
				</TabsContent>
				<TabsContent value="inquiry" className="mt-4">
					<Inquiry />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default SatisfactionGuarantee;
