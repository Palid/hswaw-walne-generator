import type { Member } from '$lib/model/Member';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateVotingCards(members: Member[]) {
	const totalPagesExp = '{total_pages_count_string}';

	const candidating = members.filter((x) => x.candidating);

	const nicknamesToRender = candidating;

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

	doc.setFontSize(10);
	doc.text(
		`Warszawa, ${new Date().toLocaleDateString()}`,
		doc.internal.pageSize.getWidth() * 0.95,
		7,
		{
			align: 'right'
		}
	);

	const votingRows = nicknamesToRender.map((member) => [member.nickname, ' ', ' ', ' ']);

	doc.setFont('NotoSansLight', 'normal'); // set font
	doc.setFontSize(5);

	autoTable(doc, {
		pageBreak: undefined,
		theme: 'plain',
		head: [[' ', ' ', ' ', ' ', ' ']],
		body: [[]],
		styles: {
			fontSize: 5
		},
		headStyles: {
			lineWidth: 0
		},
		didDrawCell: function (data) {
			if (data.row.index === 0 && data.row.section === 'body') {
				autoTable(doc, {
					horizontalPageBreak: false,
					pageBreak: 'avoid',
					rowPageBreak: 'avoid',
					startY: data.cell.y + 2,
					margin: { left: data.cell.x + 2 },
					tableWidth: data.cell.width - 4,
					body: [...votingRows].slice(0, 20)
				});
			}
		}
	});

	doc.setFont('NotoSansRegular', 'normal'); // set font

	doc.setFontSize(12);
	doc.putTotalPages(totalPagesExp);

	doc.save('voting-cards.pdf');
}
