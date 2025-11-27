import { useState } from 'react';

export default function Spreadsheet() {
  const [cells] = useState<string[][]>(
    Array(20).fill(null).map(() => Array(10).fill(''))
  );
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className="h-full overflow-auto bg-white">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="border bg-gray-100 w-12 h-8 text-xs sticky top-0 left-0 z-20"></th>
            {columns.map((col) => (
              <th
                key={col}
                className="border bg-gray-100 w-32 h-8 text-sm font-semibold sticky top-0 z-10"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border bg-gray-100 text-center text-xs font-semibold sticky left-0 z-10">
                {rowIndex + 1}
              </td>
              {row.map((_, colIndex) => (
                <td key={colIndex} className="border p-0">
                  <input
                    type="text"
                    className="w-full h-8 px-2 border-0 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
