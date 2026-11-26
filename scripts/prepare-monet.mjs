// Download museum-verified public-domain paintings and make local background assets.
// Run from the repository root: node scripts/prepare-monet.mjs
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises';
import {createRequire} from 'node:module';
const sharp=createRequire(import.meta.url)('sharp');
// Match the live site's baked luminosity treatment, without runtime filters.
const tones={
 'home-glance':'blue','about-vision':'blue','impact-partners':'blue','join-steps':'blue',
 'about-culture':'royal','impact-opening':'royal',
 'programmes-close':'royal','join-opening':'royal','join-first-visit':'royal','partners-audience':'royal',
};
const palettes={blue:{rgb:[4,65,156],opacity:.32},royal:{rgb:[5,53,118],opacity:.22}};
const lum=(r,g,b)=>.3*r+.59*g+.11*b;
function tintPixel(base,light){
 let [r,g,b]=base;const d=light-lum(r,g,b);r+=d;g+=d;b+=d;
 const l=lum(r,g,b),n=Math.min(r,g,b),x=Math.max(r,g,b);
 if(n<0){r=l+(r-l)*l/(l-n);g=l+(g-l)*l/(l-n);b=l+(b-l)*l/(l-n);}
 if(x>1){r=l+(r-l)*(1-l)/(x-l);g=l+(g-l)*(1-l)/(x-l);b=l+(b-l)*(1-l)/(x-l);}
 return [r,g,b];
}
const selections={
  'home-opening':16568,'home-glance':'cma-136510','home-who':64818,'home-events':20545,'home-close':87088,
  'about-opening':16564,'about-vision':81537,'about-mission':14624,'about-pillars':'nga-74796','about-culture':'cma-95272','about-close':16549,
  'programmes-opening':16564,'programmes-calendar':4783,'programmes-close':16584,
  'impact-opening':16584,'impact-record':16564,'impact-events':16584,'impact-partners':97933,'impact-close':4887,
  'join-opening':16564,'join-ways':81545,'join-first-visit':16579,'join-steps':111318,'join-faq':4887,
  'partners-opening':81546,'partners-why':14634,'partners-audience':'cma-130391','partners-tiers':16584,'partners-close':100191,
  'contact-opening':16560,'not-found':16549,'artwork-opening':'nga-74796',
};
const external=JSON.parse(await readFile('app/content/monet-external.json','utf8'));
const query=new URL('https://api.artic.edu/api/v1/artworks/search');
query.searchParams.set('q','Claude Monet');query.searchParams.set('limit','100');
query.searchParams.set('fields','id,title,image_id,is_public_domain,artist_title,artwork_type_title,date_display');
async function get(url){for(let attempt=0;attempt<3;attempt++){try{const r=await fetch(url,{signal:AbortSignal.timeout(45000),headers:{'User-Agent':'Mozilla/5.0','Referer':'https://www.artic.edu/'}});if(!r.ok)throw Error(`${r.status} ${url}`);return r;}catch(e){if(attempt===2)throw e;}}}
const catalogue=await (await get(query)).json();
await mkdir('public/images/monet',{recursive:true});
await mkdir('.taste-skill/monet-sources',{recursive:true});
const manifest={};
const entries=Object.entries(selections);let cursor=0;
async function worker(){while(cursor<entries.length){const [key,id]=entries[cursor++];
 const extra=external.find(w=>w.id===id);
 const work=extra||catalogue.data.find(w=>w.id===id);
 if(!work||(extra?extra.artist!=='Claude Monet':work.artist_title!=='Claude Monet'||!work.is_public_domain||!work.image_id||work.artwork_type_title!=='Painting'))throw Error(`Unverified artwork ${id}`);
 const image=extra?extra.imageSource:`https://www.artic.edu/iiif/2/${work.image_id}/full/1686,/0/default.jpg`;
 const sourcePath=extra?`.taste-skill/monet-sources/${id.startsWith('cma-')?'cleveland-'+id.slice(4):id}.jpg`:`.taste-skill/monet-sources/${id}-1686.jpg`;
 let source;try{source=await readFile(sourcePath);}catch{source=Buffer.from(await (await get(image)).arrayBuffer());await writeFile(sourcePath,source);}
 const dimensions=await sharp(source).metadata();
 for(const width of [640,843,1686]){const path=`public/images/monet/${id}-${width}.webp`;await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality:78,effort:5}).toFile(path);}
 const tone=tones[key];
 for(const tint of new Set([tone,...(['home-who','join-steps'].includes(key)?['royal']:[])].filter(Boolean))){
  const {data,info}=await sharp(source).rotate().removeAlpha().raw().toBuffer({resolveWithObject:true});
  const {rgb,opacity}=palettes[tint],base=rgb.map(v=>v/255),out=Buffer.alloc(data.length);
  for(let i=0;i<data.length;i+=3){const pixel=tintPixel(base,lum(data[i]/255,data[i+1]/255,data[i+2]/255));for(let c=0;c<3;c++)out[i+c]=Math.round((base[c]*(1-opacity)+pixel[c]*opacity)*255);}
  for(const width of [640,843,1686])await sharp(out,{raw:info}).resize({width,withoutEnlargement:true}).webp({quality:78,effort:5}).toFile(`public/images/monet/${id}-${tint}-${width}.webp`);
 }
 manifest[key]={id,title:work.title,date:extra?extra.date:work.date_display,artist:'Claude Monet',museum:extra?extra.museum:'Art Institute of Chicago',source:extra?extra.source:`https://www.artic.edu/artworks/${id}`,imageSource:image,license:extra?extra.license:'CC0 / public domain',licenseUrl:extra?extra.licenseUrl:'https://www.artic.edu/open-access/open-access-images',width:dimensions.width,height:dimensions.height,small:`/images/monet/${id}-640.webp`,medium:`/images/monet/${id}-843.webp`,large:`/images/monet/${id}-1686.webp`};
 if(tone)for(const [size,width] of [['small',640],['medium',843],['large',1686]])manifest[key][size]=`/images/monet/${id}-${tone}-${width}.webp`;
 console.log(`${id}: ${work.title} (${Math.round((await stat(`public/images/monet/${id}-1686.webp`)).size/1024)} KB)`);
}}
// Sequential writes also handle works shared across pages without file races.
const outcomes=await Promise.allSettled([worker()]);
const failed=outcomes.filter(r=>r.status==='rejected');if(failed.length)throw new AggregateError(failed.map(r=>r.reason),'Artwork download failed');
await writeFile('app/content/monet.json',JSON.stringify(Object.fromEntries(entries.map(([key])=>[key,manifest[key]])),null,2)+'\n');
// These two live-site sections use CSS backgrounds rather than the Paint component.
const who=selections['home-who'],vision=selections['about-vision'];
const legacyPictures=width=>`.who > .paint--light .paint__img { background-image: url("/images/monet/${who}-${width}.webp"); }\n.who .who__monet { background-image: url("/images/monet/${who}-royal-${width}.webp"); }\n.vision > .paint--light .paint__img { background-image: url("/images/monet/${vision}-blue-${width}.webp"); }`;
await writeFile('app/styles/31-background-artwork.css',`/* Generated by prepare-monet.mjs: picture sources only; preserve live-site treatments. */\n${legacyPictures(1686)}\n@media (max-width: 760px) {\n${legacyPictures(640)}\n}\n`);
console.log(`Prepared ${entries.length} assignments using ${new Set(Object.values(selections)).size} human-free Monet paintings at three responsive sizes.`);
