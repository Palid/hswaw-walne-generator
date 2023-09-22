import type { Member } from '$lib/model/Member';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateMembersList(members: Member[], renderAllMembers = false) {
	const totalPagesExp = '{total_pages_count_string}';

	const voting = members.filter((x) => x.voting);

	const inPerson = voting.reduce((acc, x) => acc + Number(x.inPerson), 0);
	const totalVoting = voting.reduce((acc, x) => acc + Number(x.voting), 0);
	const powerOfAttorney = totalVoting - inPerson;

	const nicknamesToRender = renderAllMembers ? members : voting;
	const tableBody = nicknamesToRender.map((member, index) => [
		index + '.',
		member.nickname,
		member.legalName ?? '',
		''
	]);

	const doc = new jsPDF();
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
		'Lista obecności',
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
		head: [['Lp.', 'Nick', 'Imię Nazwisko', 'Podpis']],
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

	autoTable(doc, {
		pageBreak: 'always',
		startY: 700,
		margin: {
			top: doc.internal.pageSize.getHeight() * 0.85
		},
		body: [
			['osobiście', inPerson],
			['przez pełnomocnictwo', powerOfAttorney],
			['łącznie', inPerson + powerOfAttorney]
		],
		bodyStyles: {
			cellWidth: 50
		},
		didDrawPage() {
			const str = `Page ${doc.getNumberOfPages()} of ${totalPagesExp}`;

			const pageSize = doc.internal.pageSize;
			const pageHeight = pageSize.getHeight();
			doc.setFont('NotoSansRegular', 'normal');
			doc.setFontSize(10);
			doc.text(str, 5, pageHeight - 5);

			const tableY = pageHeight - 70;

			doc.setFont('NotoSansRegular', 'normal'); // set font

			doc.setFontSize(12);
			doc.text('Podsumowanie', 14, tableY + 10, {
				align: 'left'
			});
			doc.setFont('NotoSansLight', 'normal'); // set font

			doc.setFontSize(10);
			doc.text(
				`Członkowie stowarzyszenia uprawnieni do głosowania: ${members.length}`,
				14,
				tableY + 15,
				{
					align: 'left'
				}
			);

			doc.setFontSize(12);
			doc.setFont('NotoSansRegular', 'normal'); // set font

			doc.text(`Członkowie obecni na zebraniu:`, 14, tableY + 22.5, {
				align: 'left'
			});
		}
	});

	doc.setFont('NotoSansRegular', 'normal'); // set font

	doc.setFontSize(12);
	doc.putTotalPages(totalPagesExp);

	doc.save('members-list.pdf');
}
