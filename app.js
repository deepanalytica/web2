
const CONTACT={whatsapp:"56952239136"};

const PROPERTIES=[
{id:1,name:"Departamento 1",location:"San Bernardo",status:"available",leasedUntil:null,availableFrom:null,featured:true},
{id:2,name:"Departamento 2",location:"San Bernardo",status:"unknown",leasedUntil:null,availableFrom:null,featured:false},
{id:3,name:"Departamento 3",location:"San Bernardo",status:"unknown",leasedUntil:null,availableFrom:null,featured:false},
{id:4,name:"Departamento 4",location:"San Bernardo",status:"unknown",leasedUntil:null,availableFrom:null,featured:false}
];

const GALLERY=[
{src:"assets/comedor.webp",label:"Comedor",alt:"Comedor del departamento amoblado"},
{src:"assets/cocina.webp",label:"Cocina integrada",alt:"Cocina integrada del departamento"},
{src:"assets/living.webp",label:"Living",alt:"Living del departamento"},
{src:"assets/lavanderia.webp",label:"Lavandería",alt:"Lavandería del departamento"}
];

const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const formatDate=(value)=>{
if(!value)return"";
const date=new Date(value+"T12:00:00");
return new Intl.DateTimeFormat("es-CL",{day:"numeric",month:"long",year:"numeric"}).format(date)
};

const stateMeta=(property)=>{
if(property.status==="available"){
return{label:"Disponible ahora",className:"status-available",info:"Puedes consultar o agendar una visita.",action:"Agendar visita",href:"#visita"}
}
if(property.status==="occupied"){
const infoParts=[];
if(property.leasedUntil)infoParts.push("Arrendado hasta <strong>"+formatDate(property.leasedUntil)+"</strong>");
if(property.availableFrom)infoParts.push("Disponible desde <strong>"+formatDate(property.availableFrom)+"</strong>");
return{label:"Arrendado",className:"status-occupied",info:infoParts.length?infoParts.join("<br>"):"Próxima fecha por confirmar.",action:"Recibir aviso",href:"#avisos"}
}
if(property.status==="soon"){
return{label:"Disponible pronto",className:"status-soon",info:property.availableFrom?"Disponible desde <strong>"+formatDate(property.availableFrom)+"</strong>":"Fecha por confirmar.",action:"Recibir aviso",href:"#avisos"}
}
return{label:"Consultar disponibilidad",className:"status-unknown",info:"Te confirmamos por WhatsApp.",action:"Consultar",href:"https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent("Hola Luz, quiero consultar la disponibilidad de "+property.name+".")}
};

const renderAvailability=()=>{
const list=$("#availabilityList");
list.innerHTML=PROPERTIES.map((property)=>{
const meta=stateMeta(property);
const external=meta.href.startsWith("http");
return '<article class="availability-row">'+
'<div class="availability-property"><strong>'+property.name+'</strong><span>'+property.location+'</span></div>'+
'<div><span class="status-badge '+meta.className+'">'+meta.label+'</span></div>'+
'<div class="availability-info">'+meta.info+'</div>'+
'<div><a class="availability-action" href="'+meta.href+'" '+(external?'target="_blank" rel="noopener"':'')+'>'+meta.action+
'<svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></div>'+
'</article>'
}).join("")
};

const populatePropertySelects=()=>{
const options=PROPERTIES.map((p)=>'<option value="'+p.name+' · '+p.location+'">'+p.name+' · '+p.location+'</option>').join("");
$("#notifyProperty").innerHTML=options+'<option value="Cualquiera que quede disponible">Cualquiera que quede disponible</option>';
$("#visitProperty").innerHTML=options+'<option value="Quiero conocer otras opciones">Quiero conocer otras opciones</option>'
};

const setFeaturedState=()=>{
const featured=PROPERTIES.find((p)=>p.featured)||PROPERTIES[0];
const meta=stateMeta(featured);
$("#heroStatus").innerHTML="<span></span>"+meta.label;
$("#detailStatus").textContent=meta.label;
$("#detailAvailability").innerHTML=meta.info;
const heroVisit=$("#heroVisit");
if(featured.status==="available"){
heroVisit.href="#visita";
heroVisit.textContent="Agendar visita"
}else{
heroVisit.href="#avisos";
heroVisit.textContent="Quiero que me avisen"
}
};

const setWhatsAppLinks=()=>{
const general="Hola Luz, quiero consultar por un departamento.";
const property="Hola Luz, vi el departamento amoblado en San Bernardo y quiero consultar su disponibilidad.";
$$("[data-whatsapp='general']").forEach((link)=>link.href="https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(general));
$$("[data-whatsapp='property']").forEach((link)=>link.href="https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(property))
};

const setupHeader=()=>{
const header=$("#siteHeader");
const update=()=>header.classList.toggle("is-scrolled",window.scrollY>20);
update();
window.addEventListener("scroll",update,{passive:true})
};

const setupReveal=()=>{
if(reduceMotion){
$$(".reveal").forEach((el)=>el.classList.add("visible"));
return
}
const observer=new IntersectionObserver((entries,io)=>{
entries.forEach((entry)=>{
if(!entry.isIntersecting)return;
entry.target.classList.add("visible");
io.unobserve(entry.target)
})
},{threshold:.12});
$$(".reveal").forEach((el)=>observer.observe(el))
};

const setupCarousel=()=>{
const carousel=$("#heroCarousel");
const slides=$$(".hero-slide",carousel);
const dotsWrap=$("#carouselDots");
const caption=$("#carouselCaption");
let index=0;
let timer=null;
let pointerStart=null;
let paused=false;

dotsWrap.innerHTML=slides.map((_,i)=>'<button class="carousel-dot'+(i===0?' is-active':'')+'" type="button" aria-label="Ver foto '+(i+1)+'" aria-current="'+(i===0?'true':'false')+'" data-index="'+i+'"></button>').join("");
const dots=$$(".carousel-dot",dotsWrap);

const render=(next)=>{
index=(next+slides.length)%slides.length;
slides.forEach((slide,i)=>slide.classList.toggle("is-active",i===index));
dots.forEach((dot,i)=>{
dot.classList.toggle("is-active",i===index);
dot.setAttribute("aria-current",i===index?"true":"false")
});
caption.textContent=slides[index].dataset.label||("Foto "+(index+1));
carousel.classList.remove("is-playing");
void carousel.offsetWidth;
if(!reduceMotion&&!paused)carousel.classList.add("is-playing")
};

const stop=()=>{
clearInterval(timer);
timer=null;
carousel.classList.remove("is-playing")
};

const start=()=>{
stop();
if(reduceMotion||paused)return;
carousel.classList.add("is-playing");
timer=window.setInterval(()=>render(index+1),5500)
};

$(".carousel-prev",carousel).addEventListener("click",()=>{render(index-1);start()});
$(".carousel-next",carousel).addEventListener("click",()=>{render(index+1);start()});
dots.forEach((dot)=>dot.addEventListener("click",()=>{render(Number(dot.dataset.index));start()}));

carousel.addEventListener("mouseenter",()=>{paused=true;stop()});
carousel.addEventListener("mouseleave",()=>{paused=false;start()});
carousel.addEventListener("focusin",()=>{paused=true;stop()});
carousel.addEventListener("focusout",()=>{paused=false;start()});

carousel.addEventListener("keydown",(event)=>{
if(event.key==="ArrowLeft"){event.preventDefault();render(index-1);start()}
if(event.key==="ArrowRight"){event.preventDefault();render(index+1);start()}
});

carousel.addEventListener("pointerdown",(event)=>{
if(event.pointerType==="mouse")return;
pointerStart=event.clientX;
carousel.setPointerCapture&&carousel.setPointerCapture(event.pointerId)
});
carousel.addEventListener("pointerup",(event)=>{
if(pointerStart===null)return;
const delta=event.clientX-pointerStart;
pointerStart=null;
if(Math.abs(delta)<40)return;
render(index+(delta<0?1:-1));
start()
});
carousel.addEventListener("pointercancel",()=>{pointerStart=null});
carousel.addEventListener("lostpointercapture",()=>{pointerStart=null});

render(0);
start()
};

const setupGallery=()=>{
const mainImage=$("#galleryMainImage");
const mainLabel=$("#galleryMainLabel");
$$("[data-gallery-src]").forEach((button)=>{
button.addEventListener("click",()=>{
mainImage.style.opacity=".28";
window.setTimeout(()=>{
mainImage.src=button.dataset.gallerySrc;
mainImage.alt=button.dataset.galleryLabel;
mainLabel.textContent=button.dataset.galleryLabel;
mainImage.style.opacity="1"
},120)
})
})
};

const setupLightbox=()=>{
const lightbox=$("#lightbox");
const image=$("#lightboxImage");
const caption=$("#lightboxCaption");
const close=$(".lightbox-close",lightbox);
const prev=$(".lightbox-prev",lightbox);
const next=$(".lightbox-next",lightbox);
let index=0;
let previousFocus=null;

const render=()=>{
const item=GALLERY[index];
image.src=item.src;
image.alt=item.alt;
caption.textContent=item.label
};

const open=(src)=>{
const found=GALLERY.findIndex((item)=>item.src===src);
index=found>=0?found:0;
previousFocus=document.activeElement;
render();
lightbox.classList.add("is-open");
lightbox.setAttribute("aria-hidden","false");
document.body.style.overflow="hidden";
close.focus()
};

const hide=()=>{
lightbox.classList.remove("is-open");
lightbox.setAttribute("aria-hidden","true");
document.body.style.overflow="";
if(previousFocus&&previousFocus.focus)previousFocus.focus()
};

$$("[data-lightbox]").forEach((button)=>button.addEventListener("click",()=>open(button.dataset.lightbox)));
$("#viewAllPhotos").addEventListener("click",()=>open(GALLERY[0].src));
close.addEventListener("click",hide);
prev.addEventListener("click",()=>{index=(index-1+GALLERY.length)%GALLERY.length;render()});
next.addEventListener("click",()=>{index=(index+1)%GALLERY.length;render()});
lightbox.addEventListener("click",(event)=>{if(event.target===lightbox)hide()});
document.addEventListener("keydown",(event)=>{
if(!lightbox.classList.contains("is-open"))return;
if(event.key==="Escape")hide();
if(event.key==="ArrowLeft"){index=(index-1+GALLERY.length)%GALLERY.length;render()}
if(event.key==="ArrowRight"){index=(index+1)%GALLERY.length;render()}
})
};

const emailLooksValid=(value)=>!value||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const setupNotifyForm=()=>{
const form=$("#notifyForm");
const status=$("#notifyStatus");
form.addEventListener("submit",(event)=>{
event.preventDefault();
const name=$("#notifyName").value.trim();
const email=$("#notifyEmail").value.trim();
const phone=$("#notifyPhone").value.trim();
const property=$("#notifyProperty").value;
const preference=$("#notifyPreference").value;

$("#notifyNameError").textContent="";
$("#notifyEmailError").textContent="";
$("#notifyPhoneError").textContent="";
status.textContent="";

let invalid=false;
if(!name){$("#notifyNameError").textContent="Escribe tu nombre.";invalid=true}
if(!emailLooksValid(email)){$("#notifyEmailError").textContent="Revisa el formato del correo.";invalid=true}
if(!email&&!phone){$("#notifyPhoneError").textContent="Deja un correo o un número para poder avisarte.";invalid=true}

if(invalid){
const firstError=form.querySelector(".field-error:not(:empty)");
if(firstError&&firstError.previousElementSibling)firstError.previousElementSibling.focus();
return
}

const lines=[
"Hola Luz, quiero que me avises cuando haya disponibilidad.",
"",
"Nombre: "+name,
"Unidad: "+property,
"Preferencia: "+preference,
email?"Correo: "+email:"",
phone?"WhatsApp: "+phone:""
].filter(Boolean).join("\n");

status.textContent="Listo. Se abrirá WhatsApp con tu solicitud preparada.";
window.open("https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(lines),"_blank","noopener")
})
};

const setupVisitForm=()=>{
const form=$("#visitForm");
const status=$("#visitStatus");
form.addEventListener("submit",(event)=>{
event.preventDefault();
const name=$("#visitName").value.trim();
const property=$("#visitProperty").value;
const date=$("#visitDate").value||"Por coordinar";
const time=$("#visitTime").value||"Por coordinar";
const message=$("#visitMessage").value.trim()||"Sin comentarios adicionales";

$("#visitNameError").textContent="";
status.textContent="";

if(!name){
$("#visitNameError").textContent="Escribe tu nombre.";
$("#visitName").focus();
return
}

const lines=[
"Hola Luz, quiero solicitar una visita.",
"",
"Nombre: "+name,
"Departamento: "+property,
"Fecha preferida: "+date,
"Horario preferido: "+time,
"Comentario: "+message
].join("\n");

status.textContent="Listo. Se abrirá WhatsApp con tu solicitud preparada.";
window.open("https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(lines),"_blank","noopener")
})
};

const setupFaq=()=>{
$$(".faq-trigger").forEach((trigger)=>{
trigger.addEventListener("click",()=>{
const panel=document.getElementById(trigger.getAttribute("aria-controls"));
const willOpen=trigger.getAttribute("aria-expanded")!=="true";
trigger.setAttribute("aria-expanded",String(willOpen));
panel.classList.toggle("is-open",willOpen)
})
})
};

const init=()=>{
renderAvailability();
populatePropertySelects();
setFeaturedState();
setWhatsAppLinks();
setupHeader();
setupReveal();
setupCarousel();
setupGallery();
setupLightbox();
setupNotifyForm();
setupVisitForm();
setupFaq();
$("#year").textContent=new Date().getFullYear()
};

init();
