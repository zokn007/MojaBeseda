const foundations=[
{key:'vera',name:'Vera',refs:['Hebrejcem 11','Jakob 1','Rimljanom 4','Habakuk 2,4'],summary:'Zaupanje Bogu, ki se pokaže v poslušnosti in vztrajnosti.'},
{key:'upanje',name:'Upanje',refs:['Rimljanom 8','Psalm 42','Izaija 40','Razodetje 21'],summary:'Trdno pričakovanje Božje zvestobe in obnove.'},
{key:'ljubezen',name:'Ljubezen',refs:['1 Korinčanom 13','1 Janez 4','Janez 13','Rimljanom 5'],summary:'Ljubezen, ki izvira iz Boga in postane vidna v dejanjih.'},
{key:'mir',name:'Mir',refs:['Filipljanom 4','Janez 14','Psalm 23','Izaija 26'],summary:'Božja navzočnost in varnost sredi nemira.'},
{key:'molitev',name:'Molitev',refs:['Matej 6','Luka 11','Psalm 5','Filipljanom 4'],summary:'Iskren pogovor z Bogom, poslušanje in zaupanje.'},
{key:'odpuscanje',name:'Odpuščanje',refs:['Matej 18','Luka 23','Kološanom 3','1 Mojzesova 50'],summary:'Milost, resnica in izročitev sodbe Bogu.'},
{key:'druzina',name:'Družina',refs:['Jozue 24','Psalm 127','Efežanom 5','Efežanom 6'],summary:'Dom kot prostor zvestobe, služenja in duhovne rasti.'},
{key:'modrost',name:'Modrost',refs:['Pregovori 3','Jakob 3','1 Kralji 3','Pridigar 3'],summary:'Življenje, ki se uči gledati z Božje perspektive.'},
{key:'pogum',name:'Pogum',refs:['Jozue 1','Daniel 3','Psalm 27','2 Timoteju 1'],summary:'Pogum, ki ne temelji na sebi, ampak na Božji bližini.'},
{key:'milost',name:'Milost',refs:['Efežanom 2','Luka 15','Rimljanom 3','Titu 3'],summary:'Nezaslužen Božji dar, ki spreminja življenje.'},
{key:'sveti-duh',name:'Sveti Duh',refs:['Janez 14','Apostolska dela 2','Rimljanom 8','Galačanom 5'],summary:'Božja navzočnost, vodstvo, moč in sad v verniku.'},
{key:'jezus',name:'Jezus Kristus',refs:['Janez 1','Filipljanom 2','Kološanom 1','Hebrejcem 1'],summary:'Kristusova oseba, delo in popolna podoba nevidnega Boga.'},
{key:'kriz',name:'Križ',refs:['Izaija 53','Marko 15','1 Korinčanom 1','Galačanom 6'],summary:'Božja moč in ljubezen, razodeti v Kristusovi daritvi.'},
{key:'vstajenje',name:'Vstajenje',refs:['Matej 28','Janez 20','1 Korinčanom 15','1 Peter 1'],summary:'Zmaga nad smrtjo in živo upanje v Kristusu.'},
{key:'preizkusnja',name:'Preizkušnje',refs:['Job 1','Jakob 1','1 Peter 1','Rimljanom 5'],summary:'Vztrajnost in rast vere v težkih obdobjih.'},
{key:'hvaleznost',name:'Hvaležnost',refs:['Psalm 100','Luka 17','Kološanom 3','1 Tesaloničanom 5'],summary:'Srce, ki prepoznava Božje darove in zvestobo.'},
{key:'služenje',name:'Služenje',refs:['Marko 10','Janez 13','Rimljanom 12','1 Peter 4'],summary:'Ljubezen, ki se ponižno podarja drugim.'},
{key:'pravičnost',name:'Pravičnost',refs:['Mihej 6','Matej 5','Rimljanom 3','Jakob 2'],summary:'Božja pravičnost, usmiljenje in pošteno ravnanje.'},
{key:'identiteta',name:'Identiteta v Kristusu',refs:['2 Korinčanom 5','Efežanom 1','Kološanom 3','1 Peter 2'],summary:'Kdo smo zaradi Kristusovega dela in Božjega klica.'},
{key:'obljube',name:'Božje obljube',refs:['1 Mojzesova 12','Jozue 1','Izaija 41','2 Korinčanom 1'],summary:'Bog ostaja zvest svojim besedam skozi vse rodove.'}
];
const angles=[
'za vsak dan','v času sprememb','v družini','na delovnem mestu','v preizkušnji',
'v odnosih','za mlade','za zakonce','za voditelje','za skupino',
'ob začetku dneva','ob koncu dneva','ko iščemo odgovor','ko nas je strah','ko čakamo na Boga'
];
export const topics=[];
let ti=0;
for(const f of foundations){
  for(const angle of angles){
    topics.push({
      id:`tema-${++ti}`,
      name:`${f.name} ${angle}`,
      keywords:[f.key,f.name.toLowerCase(),...angle.toLowerCase().split(/\s+/)],
      chapters:[...f.refs],
      verse:f.refs[0],
      quote:`Preberi ${f.refs[0]} in razmisli, kako Bog govori v tvoje današnje okoliščine.`,
      summary:`${f.summary} Poudarek: ${angle}.`,
      context:`Odlomki ${f.refs.join(', ')} osvetljujejo temo »${f.name}« iz različnih delov Svetega pisma.`,
      links:f.refs.slice(1),
      today:`Poišči en konkreten korak, s katerim lahko temo »${f.name}« živiš ${angle}.`,
      questions:[
        `Kaj mi Bog razodeva o temi »${f.name}«?`,
        `Kaj moram danes sprejeti, opustiti ali spremeniti?`,
        `Kako lahko to sporočilo uporabim ${angle}?`
      ]
    });
  }
}
const pathThemes=[
['Jezus v Stari zavezi',['1 Mojzesova 3,15','1 Mojzesova 22','2 Mojzesova 12','4 Mojzesova 21','Psalm 22','Izaija 7','Izaija 9','Izaija 53','Mihej 5','Zaharija 9']],
['Vera v preizkušnjah',['Job 1','Psalm 13','Daniel 3','Habakuk 3','Jakob 1','Rimljanom 5','1 Peter 1']],
['Božje obljube',['1 Mojzesova 12','2 Mojzesova 6','Jozue 1','Psalm 23','Izaija 40','Jeremija 31','Janez 14','Rimljanom 8','Razodetje 21']],
['Molitev',['1 Samuel 1','Psalm 5','Psalm 51','Daniel 9','Matej 6','Luka 11','Janez 17','Filipljanom 4']],
['Sveti Duh',['Ezekiel 36','Joel 3','Janez 14','Janez 16','Apostolska dela 2','Rimljanom 8','Galačanom 5']],
['Jezusove prilike',['Matej 13','Matej 18','Matej 20','Matej 25','Marko 4','Luka 10','Luka 15','Luka 18']],
['Psalmi za življenje',['Psalm 1','Psalm 8','Psalm 19','Psalm 23','Psalm 27','Psalm 42','Psalm 51','Psalm 91','Psalm 103','Psalm 121']],
['Modrost Pregovorov',['Pregovori 1','Pregovori 3','Pregovori 4','Pregovori 8','Pregovori 10','Pregovori 15','Pregovori 16','Pregovori 18','Pregovori 27','Pregovori 31']],
['Življenje apostola Pavla',['Apostolska dela 9','Apostolska dela 13','Apostolska dela 16','Apostolska dela 20','Apostolska dela 27','Rimljanom 1','Filipljanom 3','2 Timoteju 4']],
['Razodetje in upanje',['Razodetje 1','Razodetje 2','Razodetje 3','Razodetje 4','Razodetje 5','Razodetje 7','Razodetje 19','Razodetje 21','Razodetje 22']],
['Družina po Božjem srcu',['1 Mojzesova 2','Jozue 24','Ruta 1','Psalm 127','Pregovori 22','Efežanom 5','Efežanom 6','Kološanom 3']],
['Odpuščanje in sprava',['1 Mojzesova 33','1 Mojzesova 50','Matej 5','Matej 18','Luka 15','Luka 23','Filemonu 1','Kološanom 3']]
];
const lengths=[7,10,14,21,30];
export const paths=[];
let pi=0;
for(const [title,base] of pathThemes){
  for(let v=1;v<=4;v++){
    for(const len of lengths){
      const days=Array.from({length:len},(_,i)=>base[(i+(v-1))%base.length]);
      paths.push({
        id:`pot-${++pi}`,
        title:`${title} · ${len} dni${v>1?` (${v})`:''}`,
        desc:`Vodena pot z ${len} dnevi branja in premišljevanja.`,
        days
      });
    }
  }
}