import { type SheetData } from 'write-excel-file/browser';

export type XlsxCell = string | number | null;

/**
 * Writes rows into a single-sheet xlsx workbook. The first row is the header,
 * rendered bold and frozen at the top of the sheet.
 *
 * @param rows The rows, header row first
 * @param sheetName The sheet name
 * @returns The xlsx file content
 */
export async function writeXlsxBlob(rows: XlsxCell[][], sheetName: string) {
  const [header = [], ...body] = rows;
  const data: SheetData = [
    header.map((value) => ({ value: value ?? '', fontWeight: 'bold' as const })),
    ...body,
  ];

  // NOTE: Loaded lazily so the xlsx writer is only downloaded when exporting
  const { default: writeXlsxFile } = await import('write-excel-file/browser');
  return writeXlsxFile(data, { sheet: sheetName, stickyRowsCount: 1 }).toBlob();
}
