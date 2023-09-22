import type { Member } from '$lib/stores/members-store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateVotingCards(members: Member[], renderAllMembers = false) {
	const totalPagesExp = '{total_pages_count_string}';

	const candidating = members.filter((x) => x.candidating);
	const votingAmount = members.filter((x) => x.voting).length;

	const nicknamesToRender = candidating;

	const doc = new jsPDF({
		orientation: 'landscape'
	});
	(jsPDF as any).autoTableSetDefaults({
		bodyStyles: {
			lineColor: 0,
			lineWidth: 0.05
		},
		styles: {
			font: 'NotoSansLight'
		},
		columnStyles: {
			lineColor: [255, 255, 255] as any,
			lineWidth: 1 as any
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

	const votingRows = nicknamesToRender.map((member, index) => [member.nickname, ' ', ' ', ' ']);

	doc.setFont('NotoSansLight', 'normal'); // set font
	doc.setFontSize(5);

	const size = doc.internal.pageSize.getWidth() / 3;

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
					styles: {
						maxCellHeight: 4
					},
					// styles: {
					// 	maxCellHeight: 4
					// } as any,
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
