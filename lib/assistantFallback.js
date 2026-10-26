/*
  Offline brain for the Wardd assistant: used when the AI route is not
  configured or unreachable. Detects the language, scores intents and answers
  from the same facts the AI uses (data/assistantKnowledge.js).
*/
import { STUDIO, PACKS, SERVICES, TEAM, ARTISTS } from "@/data/assistantKnowledge";
import translations from "@/data/translations.json";

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const DARIJA_AR = ["شحال", "بغيت", "فين", "كيفاش", "واش", "ديال", "عندكم", "نقدر", "دابا", "كاين", "شنو", "اشنو", "شكون", "بزاف", "مزيان"];
const EN = ["the", "what", "how", "where", "price", "prices", "book", "booking", "hello", "hi", "hey", "do you", "can i", "are you", "is it", "studio rent", "much", "when", "open", "who"];
const FR = ["le", "la", "les", "est", "vous", "tu", "quel", "quels", "combien", "ou", "comment", "je", "bonjour", "salut", "prix", "pour"];

export function detectLang(text) {
  if (/[؀-ۿ]/.test(text)) return DARIJA_AR.some((w) => text.includes(w)) ? "darija" : "ar";
  const words = norm(text).split(/[^a-z0-9']+/).filter(Boolean);
  const has = (list) => list.filter((w) => (w.includes(" ") ? norm(text).includes(w) : words.includes(w))).length;
  return has(EN) > has(FR) ? "en" : "fr";
}

const INTENTS = {
  greeting: ["bonjour", "salut", "salam", "hello", "hi", "hey", "coucou", "slm", "سلام", "مرحبا", "السلام"],
  pricing: ["prix", "tarif", "cout", "combien", "pack", "packs", "offre", "budget", "price", "cost", "how much", "chhal", "شحال", "سعر", "ثمن", "باقة", "dh", "dirham"],
  booking: ["reserver", "reservation", "rdv", "rendez", "disponib", "creneau", "book", "booking", "appointment", "available", "حجز", "نحجز", "موعد"],
  location: ["ou etes", "adresse", "situe", "localisation", "kenitra", "where", "address", "location", "map", "itineraire", "fin", "فين", "عنوان", "موقع", "أين"],
  hours: ["horaire", "heure", "ouvert", "ferme", "dimanche", "samedi", "open", "hours", "closed", "وقت", "مفتوح", "ساعة"],
  beats: ["beat", "instru", "instrumental", "prod", "beatmaking", "trap", "afro", "بيت", "انسترو"],
  services: ["service", "enregistr", "mixage", "mix", "mastering", "master ", "voix", "doublage", "composition", "shooting", "clip", "video", "recording", "mixing", "خدمة", "خدمات", "تسجيل", "مكساج"],
  studio: ["studio", "materiel", "equipement", "cabine", "micro", "enceinte", "acoustique", "photos", "equipment", "gear", "booth", "lounge", "الاستوديو"],
  team: ["equipe", "ingenieur", "producteur", "aziz", "imran", "team", "engineer", "producer", "فريق", "مهندس", "منتج"],
  artists: ["artiste", "artistes", "references", "travaille avec", "artist", "worked with", "فنان", "فنانين"],
  rights: ["master", "droits", "contrat", "signer", "label", "rights", "contract", "sign", "حقوق", "عقد"],
  contact: ["contact", "telephone", "numero", "email", "mail", "whatsapp", "appeler", "phone", "call", "تواصل", "هاتف", "رقم"],
};

export function detectIntent(text) {
  const t = " " + norm(text) + " ";
  let best = null;
  let score = 0;
  for (const [intent, keys] of Object.entries(INTENTS)) {
    const s = keys.filter((k) => t.includes(norm(k))).length;
    if (s > score) {
      score = s;
      best = intent;
    }
  }
  return best;
}

const packsFr = PACKS.map((p) => `• **${p.name}** — ${p.price} : ${p.features.join(", ")}`).join("\n");
const packsEn = PACKS.map((p) => `• **${p.name.replace("Pack ", "")}** — ${p.price.replace("sur devis", "custom quote")}`).join("\n");

const ANSWERS = {
  fr: {
    greeting: ["Salut 👋 Dis-moi ce que tu prépares : un son à enregistrer, un mix, un instru ? Je t'oriente vers la bonne formule.", ["packs"]],
    pricing: [`Voici nos packs :\n${packsFr}\nTu as déjà ton instru, ou il t'en faut un ?`, ["packs", "booking"]],
    booking: ["Tu peux réserver directement en ligne en choisissant ton pack et ton créneau. Pour une question sur une date précise, l'équipe te répond vite sur WhatsApp.", ["booking", "whatsapp"]],
    location: [`Le studio est à **${STUDIO.city}**. On est ouverts ${STUDIO.hours}.`, ["map", "whatsapp"]],
    hours: [`On est ouverts ${STUDIO.hours}. Réserve ton créneau avant de passer.`, ["booking"]],
    beats: ["Oui, on crée des instrus originaux : hip-hop, trap, R&B, afro, pop. Exclusifs ou non, taillés pour ta voix. Le pack Pro inclut un instru non exclusif, le Premium un instru exclusif.", ["packs", "whatsapp"]],
    services: [`On fait : ${SERVICES.slice(0, 8).map((s) => s.split(" (")[0]).join(", ")}… Dis-moi ton projet et je te dis quelle formule colle.`, ["packs"]],
    studio: ["Une régie en bois chaud entièrement traitée, des enceintes ADAM Audio, une cabine vocale isolée et un lounge pour souffler entre les prises. Jette un œil aux photos !", ["studio", "booking"]],
    team: [`Tu seras accompagné par ${TEAM.map((t) => `**${t.name}** (${t.role})`).join(" et ")}, avec toute l'équipe Wardd.`, ["booking"]],
    artists: [`Plus de 350 artistes sont passés chez nous depuis 2016, dont ${ARTISTS.slice(0, 5).join(", ")}…`, ["booking"]],
    rights: ["Tes masters restent à toi : on ne revendique aucun droit et tu n'as aucune obligation de signer chez nous. Tu réserves le studio et les services, c'est tout.", ["packs"]],
    contact: [`Téléphone / WhatsApp : **${STUDIO.phone}**\nEmail : **${STUDIO.email}**`, ["whatsapp"]],
    fallback: ["Je n'ai pas l'info exacte pour ça. L'équipe te répond rapidement sur WhatsApp.", ["whatsapp"]],
  },
  en: {
    greeting: ["Hey 👋 What are you working on: a track to record, a mix, a beat? I'll point you to the right package.", ["packs"]],
    pricing: [`Our packages:\n${packsEn}\nAll include recording, mixing and mastering. Do you already have a beat?`, ["packs", "booking"]],
    booking: ["You can book online by picking your package and time slot. For a specific date, the team answers fast on WhatsApp.", ["booking", "whatsapp"]],
    location: [`The studio is in **Kénitra, Morocco**. Open Monday to Saturday, 9am–8pm.`, ["map", "whatsapp"]],
    hours: ["We're open Monday to Saturday, 9am to 8pm, closed on Sundays. Book your slot before coming.", ["booking"]],
    beats: ["Yes, we make original beats: hip-hop, trap, R&B, afro, pop, exclusive or not. The Pro package includes a non-exclusive beat, Premium an exclusive one.", ["packs", "whatsapp"]],
    services: ["Recording, mixing, mastering, beatmaking, production, ghost production, composition, voice dubbing, film music, photo/video shoots and social media. Tell me about your project!", ["packs"]],
    studio: ["A warm wooden control room with full acoustic treatment, ADAM Audio monitors, an isolated vocal booth and a lounge to chill between takes.", ["studio", "booking"]],
    team: [`You'll work with ${TEAM.map((t) => `**${t.name}**`).join(" and ")} (sound engineer and producer) and the Wardd team.`, ["booking"]],
    artists: ["Over 350 artists have recorded with us since 2016, including Medii, Youzar, Icy, Zhor and Lord Mehdi.", ["booking"]],
    rights: ["Your masters stay yours: we claim no rights and you never have to sign with us.", ["packs"]],
    contact: [`Phone / WhatsApp: **${STUDIO.phone}**\nEmail: **${STUDIO.email}**`, ["whatsapp"]],
    fallback: ["I don't have the exact answer for that. The team replies quickly on WhatsApp.", ["whatsapp"]],
  },
};

const AR_EXTRA = {
  darija: {
    pricing: ["الباقات ديالنا:\n• **Étudiant** — 700 درهم\n• **Pro** — 1100 درهم (فيها بيت ماشي حصري + تيونينغ)\n• **Premium** — 1700 درهم (فيها بيت حصري + تيونينغ)\n• **Personnalisé** — حسب الطلب\nكلهم فيهم التسجيل، الميكساج والماسترينغ.", ["packs", "booking"]],
    greeting: ["أهلا 👋 شنو كتوجد؟ تسجيل، ميكساج ولا بيت؟ نعاونك تختار الباقة لي مناسبة ليك.", ["packs"]],
    hours: ["حلين من الاثنين حتى السبت، من 9 الصباح حتى 8 الليل. الحد مسدودين.", ["booking"]],
    studio: ["الاستوديو فيه ريجي معزولة مزيان، سماعات ADAM Audio، كابين ديال الصوت ولاونج باش ترتاح بين التسجيلات.", ["studio", "booking"]],
    rights: ["الماستر ديالك كيبقى ديالك، ماكنطالبو بحتى حق وماشي ضروري توقع معانا.", ["packs"]],
    fallback: ["ماعنديش المعلومة بالضبط. الفريق كيجاوبك بسرعة فالواتساب.", ["whatsapp"]],
  },
  ar: {
    pricing: ["باقاتنا:\n• **Étudiant** — 700 درهم\n• **Pro** — 1100 درهم (إيقاع غير حصري + ضبط صوتي)\n• **Premium** — 1700 درهم (إيقاع حصري + ضبط صوتي)\n• **Personnalisé** — حسب الطلب\nجميعها تشمل التسجيل والمكساج والماسترينغ.", ["packs", "booking"]],
    greeting: ["أهلاً 👋 ما هو مشروعك؟ تسجيل، مكساج أو إيقاع؟ سأساعدك في اختيار الباقة المناسبة.", ["packs"]],
    hours: ["نحن مفتوحون من الإثنين إلى السبت، من 9 صباحاً إلى 8 مساءً، ومغلقون يوم الأحد.", ["booking"]],
    studio: ["غرفة تحكم معالجة صوتياً بالكامل، سماعات ADAM Audio، كابينة تسجيل معزولة وصالة للاستراحة.", ["studio", "booking"]],
    rights: ["الماستر يبقى ملكك: لا نطالب بأي حقوق ولا يلزمك التوقيع معنا.", ["packs"]],
    fallback: ["ليست لدي المعلومة الدقيقة. فريقنا يرد بسرعة عبر واتساب.", ["whatsapp"]],
  },
};
const AR_ACTIONS = { pricing: ["packs", "booking"], booking: ["booking", "whatsapp"], location: ["map"], beats: ["whatsapp"], services: ["packs"], team: ["booking"], artists: ["booking"], contact: ["whatsapp"] };

const clean = (s) =>
  s
    .replace(/Wardd Music/g, "Wardd Studio")
    .replace(/\[([^\]]+)\]\(https:\/\/www\.warddmusic\.com\/booking\)/g, "$1")
    .replace(/\[([^\]]+)\]\(https:\/\/maps\.google\.com\)/g, "$1");

export function fallbackReply(text) {
  const lang = detectLang(text);
  const intent = detectIntent(text) || "fallback";
  if (lang === "fr" || lang === "en") {
    const [content, actions] = ANSWERS[lang][intent] || ANSWERS[lang].fallback;
    return { content, actions };
  }
  const extra = AR_EXTRA[lang][intent];
  if (extra) return { content: extra[0], actions: extra[1] };
  const t = translations[lang]?.[intent];
  if (t) return { content: clean(t), actions: AR_ACTIONS[intent] || [] };
  return { content: AR_EXTRA[lang].fallback[0], actions: AR_EXTRA[lang].fallback[1] };
}
