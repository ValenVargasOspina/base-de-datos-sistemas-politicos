import fs from 'node:fs';
import assert from 'node:assert/strict';
const d=JSON.parse(fs.readFileSync(new URL('../public/data/dpi.json',import.meta.url)));
assert.equal(d.rows.length,8200);assert.equal(d.columns.length,129);assert.equal(new Set(d.rows.map(r=>r[0])).size,183);
const keys=new Set(d.rows.map(r=>JSON.stringify([r[0],r[2]])));assert.equal(keys.size,d.rows.length);
for(const r of d.rows)assert.equal(r.length,129);
assert(d.rows.some(r=>r.some(v=>typeof v==='number'&&!Number.isInteger(v))));
for(const [v,n]of Object.entries({gwno:7954,tensys_strict:7642,termlimit:6912,oppothvt:6871,checks_lax:7408,select:254})){const i=d.columns.indexOf(v);const present=d.rows.filter(r=>r[i]!==null&&r[i]!==''&&!['NA','-999'].includes(String(r[i]).trim().toUpperCase())).length;assert.equal(present,n,v);}
console.log('Integridad y seis controles de cobertura del documento: correctos.');
