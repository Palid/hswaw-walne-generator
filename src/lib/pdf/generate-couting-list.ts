import type { Member } from '$lib/model/Member';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateSecretVotingList(members: Member[]) {
	const totalPagesExp = '{total_pages_count_string}';

	const candidatingMembers = members.filter((x) => x.candidating);

	const votingMembers = members.filter((x) => x.voting);

	const fakeInserts = votingMembers.map(() => '');
	const tableBody = candidatingMembers.map((member) => [member.nickname, ...fakeInserts]);

	const doc = new jsPDF({
		orientation: 'landscape'
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(jsPDF as any).autoTableSetDefaults({
		bodyStyles: {
			lineColor: 0,
			lineWidth: 0.05
		},
		styles: {
			font: 'NotoSansLight'
		},
		columnStyles: {
			lineColor: [255, 255, 255],
			lineWidth: 1
		},
		headStyles: {
			textColor: 0,
			lineColor: 0,
			lineWidth: 0.05,
			fillColor: undefined
		}
	});

	doc.addFont('/Noto_Sans/NotoSans-Light.ttf', 'NotoSansLight', 'normal');
	doc.addFont('/Noto_Sans/NotoSans-Regular.ttf', 'NotoSansRegular', 'normal');

	doc.setFont('NotoSansRegular', 'normal'); // set font
	doc.setFontSize(17);
	doc.text(
		'Walne zgromadzenie stowarzyszenia „Warszawski Hackerspace”',
		doc.internal.pageSize.getWidth() * 0.5,
		doc.internal.pageSize.getHeight() * 0.05,
		{
			align: 'center'
		}
	);
	doc.setFontSize(12);
	doc.text(
		'Podliczanie głosów',
		doc.internal.pageSize.getWidth() * 0.5,
		doc.internal.pageSize.getHeight() * 0.08,
		{
			align: 'center'
		}
	);

	doc.setFontSize(10);
	doc.text(
		`Warszawa, ${new Date().toLocaleDateString()}`,
		doc.internal.pageSize.getWidth() * 0.95,
		7,
		{
			align: 'right'
		}
	);

	doc.setFont('NotoSansLight', 'normal'); // set font
	autoTable(doc, {
		startY: doc.internal.pageSize.getHeight() * 0.125 - 15 / 2,
		pageBreak: 'auto',
		body: tableBody,
		didDrawPage() {
			const str = `Strona ${doc.getNumberOfPages()} z ${totalPagesExp}`;

			const pageSize = doc.internal.pageSize;
			const pageHeight = pageSize.getHeight();
			doc.setFont('NotoSansRegular', 'normal');
			doc.setFontSize(10);
			doc.text(str, 5, pageHeight - 5);
		}
	});

	doc.setFont('NotoSansRegular', 'normal'); // set font

	doc.setFontSize(12);
	doc.putTotalPages(totalPagesExp);

	doc.save('members-list.pdf');
}
