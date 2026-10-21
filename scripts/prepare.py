"""Extrae el Excel original sin imputación ni redondeo. Requiere openpyxl."""
import csv,json,hashlib,datetime,pathlib
import openpyxl
root=pathlib.Path(__file__).resolve().parents[1]
source=root/'dpi2020.xlsx'
rows=list(openpyxl.load_workbook(source,read_only=True,data_only=True).active.values)
cols=list(rows[0]); data=[]
for row in rows[1:]:
    values=list(row)
    for i,v in enumerate(values):
        if isinstance(v,datetime.datetime):
            if cols[i]!='year': raise ValueError('Fecha no prevista')
            values[i]=v.year
    data.append(values)
assert len(cols)==129 and len(data)==8200
ci=cols.index('countryname'); yi=cols.index('year')
assert len({(r[ci],r[yi]) for r in data})==len(data)
meta={}
with (root/'dpi2020_dictionary.csv').open(encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        if r.get('column') in cols: meta[r['column']]={'description':r['description'],'type':r['type']}
assert len(meta)==129
out=root/'public/data'; out.mkdir(parents=True,exist_ok=True)
result={'columns':cols,'rows':data,'dictionary':meta,'source':{'file':'dpi2020.xlsx','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'transformations':['year: fecha Excel convertida a año entero; otros valores conservados sin redondeo ni imputación.']}}
(out/'dpi.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
# Comprobación completa de ida y vuelta de la base preparada.
assert json.loads((out/'dpi.json').read_text())['rows']==data
report={'rows':len(data),'columns':len(cols),'entities':len({r[ci] for r in data}),'min_year':min(r[yi] for r in data),'max_year':max(r[yi] for r in data),'sha256':result['source']['sha256'],'roundtrip':'Todas las celdas coinciden tras serializar JSON.'}
(out/'integridad.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False))
