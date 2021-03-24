var XLSX = require('xlsx');
var wb = XLSX.readFile('uploads/Copy of Answer keys.xlsx');
const first_worksheet = wb.Sheets[wb.SheetNames[0]];
const data1 = XLSX.utils.sheet_to_json(first_worksheet, { header: 1, raw: true, defval:null });
//console.log(data);
const second_worksheet = wb.Sheets[wb.SheetNames[1]];
var range = XLSX.utils.decode_range(second_worksheet['!ref']);
range.s.c = 2; // 0 == XLSX.utils.decode_col("A")
range.e.c = 4; // 6 == XLSX.utils.decode_col("G")
range.s.r = 2;

var new_range = XLSX.utils.encode_range(range);
const data2 = XLSX.utils.sheet_to_json(second_worksheet, { header: 1, raw: true, defval:null, range: new_range });
console.log(data2);
