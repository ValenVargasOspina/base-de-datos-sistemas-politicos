"""Genera geometría de navegación con Natural Earth; no armoniza registros DPI."""
import json,pathlib,math,hashlib,urllib.request,tempfile
root=pathlib.Path(__file__).resolve().parents[1]; source=root.parent/'naturalearth-world.geojson';labels_source=root.parent/'naturalearth-labels.json'
if not source.exists():
 source=pathlib.Path(tempfile.gettempdir())/'dpi-naturalearth-110m.geojson'
 with urllib.request.urlopen('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',timeout=30) as r: source.write_bytes(r.read())
if not labels_source.exists():
 labels_source=pathlib.Path(tempfile.gettempdir())/'dpi-naturalearth-labels.json'
 with urllib.request.urlopen('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson',timeout=30) as r: full=json.load(r)
 labels_source.write_text(json.dumps([dict(id=p['ADM0_A3'],english=p['NAME_EN'],admin=p['ADMIN'],es=p['NAME_ES'],x=p['LABEL_X'],y=p['LABEL_Y']) for p in [f['properties'] for f in full['features']]],ensure_ascii=False))
world=json.loads(source.read_text());labels=json.loads(labels_source.read_text());db=json.loads((root/'public/data/dpi.json').read_text());entities=sorted({r[0]for r in db['rows']})
alias={'Bahamas':'BHS','Bosnia-Herz':'BIH','C. Verde Is.':'CPV','Cent. Af. Rep.':'CAF','Comoro Is.':'COM','Congo':'COG','Congo (DRC)':'COD',"Cote d'Ivoire":'CIV','Czech Rep.':'CZE','Dom. Rep.':'DOM','Eq. Guinea':'GNQ','FRG/Germany':'DEU','Macedonia':'MKD','North Macedonia':'MKD','P. N. Guinea':'PNG','PRC':'CHN','PRK':'PRK','ROK':'KOR','S. Africa':'ZAF','Solomon Is.':'SLB','St. Lucia':'LCA','Swaziland':'SWZ','eSwatini':'SWZ','Timor-Leste':'TLS','Trinidad-Tobago':'TTO','UAE':'ARE','UK':'GBR','USA':'USA'}
historical={'GDR':'República Democrática Alemana: sin geometría histórica en esta capa.','Soviet Union':'Unión Soviética: no se sustituye por Rusia ni por sus estados sucesores.','Yugoslavia':'Yugoslavia: no se sustituye por los países sucesores.','Yemen (AR)':'Yemen del Norte: se conserva separado de Yemen y de Yemen (PDR).','Yemen (PDR)':'Yemen del Sur: se conserva separado de Yemen y de Yemen (AR).','Turk Cyprus':'Entidad diferenciada en la base; se mantiene en la lista sin asignarle una frontera actual.'}
notes={'FRG/Germany':'Ubicación orientativa sobre Alemania actual; no reconstruye las fronteras de la República Federal de Alemania antes de la reunificación.','Macedonia':'Denominación original; comparte ubicación con North Macedonia. Sus registros permanecen separados.','North Macedonia':'Denominación original; comparte ubicación con Macedonia. Sus registros permanecen separados.','Swaziland':'Denominación original; comparte ubicación con eSwatini. Sus registros permanecen separados.','eSwatini':'Denominación original; comparte ubicación con Swaziland. Sus registros permanecen separados.'}
by_name={p[k]:p['id']for p in labels for k in ['english','admin']};by_id={p['id']:p for p in labels};mapping={};unmapped=[]
for e in entities:
 if e in historical:unmapped.append({'entity':e,'reason':historical[e]});continue
 code=alias.get(e,by_name.get(e));assert code in by_id,(e,code);mapping[e]={'id':code,'note':notes.get(e,''),'match':'Correspondencia de nombre para navegación; no implica equivalencia de fronteras históricas.'}
def xy(lon,lat):return [round((lon+180)*2.7,2),round((85-lat)*2.7,2)]
shapes=[];seen=set()
for f in world['features']:
 p=f['properties'];code=p['ADM0_A3']
 if code=='ATA':continue
 geom=f['geometry'];polygons=geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']];paths=[]
 for poly in polygons:
  for ring in poly:
   pts=[xy(*point[:2])for point in ring];paths.append('M'+'L'.join(f'{x},{y}'for x,y in pts)+'Z')
 label=by_id.get(code);x,y=xy(p['LABEL_X'],p['LABEL_Y']);shapes.append({'id':code,'name':p['NAME_ES'] or p['NAME_EN'],'path':''.join(paths),'point':[x,y]});seen.add(code)
# Pequeños estados e islas omitidos a escala 1:110m: puntos de etiqueta Natural Earth 1:50m.
for code in sorted({v['id']for v in mapping.values()}-seen):
 p=by_id[code];shapes.append({'id':code,'name':p['es']or p['english'],'point':xy(p['x'],p['y']),'path':None});seen.add(code)
assert all(m['id']in seen for m in mapping.values());assert len(mapping)+len(unmapped)==183
payload={'viewBox':[0,0,972,405],'shapes':shapes,'mapping':mapping,'unmapped':unmapped,'source':{'name':'Natural Earth','geometry':'ne_110m_admin_0_countries','points':'LABEL_X / LABEL_Y, ne_50m_admin_0_countries','url':'https://www.naturalearthdata.com/','license':'Public domain','geometry_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'note':'Mapa de referencia de fronteras de facto; no reconstruye límites históricos ni expresa una posición sobre disputas territoriales. Los puntos son ubicaciones aproximadas para seleccionar entidades pequeñas.'}}
(root/'public/data/world-map.json').write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':')))
print(json.dumps({'entidades_mapeadas':len(mapping),'entidades_sin_geometria':unmapped,'elementos_cartograficos':len(shapes)},ensure_ascii=False))
