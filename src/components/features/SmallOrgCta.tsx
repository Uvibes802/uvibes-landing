"use client";

import Link from "next/link";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { useSettings } from "@/hooks/useSettings";
import "@/styles/features/smallOrgCta.css";

// Section qui suit les offres : invite les petites structures / collectifs
// à contacter l'équipe pour une offre sur mesure.
const SOC_TXT: Record<string, {
  eyebrow: React.ReactNode; title: React.ReactNode; text: string; book: string; write: string; contactHref: string;
}> = {
  en: {
    eyebrow: "Need a custom plan?",
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">A non-profit<span className="soc-comma">,</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">a small community<span className="soc-comma">,</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">a tight budget?</span>{" "}
        <span className="soc-title-accent v-serif">Let&apos;s talk.</span>
      </>
    ),
    text: "At Uvibes, we know every organization has its own reality. As a non-profit, our goal is to foster social connection, not to maximize contract size. If our standard plans don't fit your situation, we can build a solution together that matches your needs and your resources.",
    book: "Book a call",
    write: "Write to us",
    contactHref: "/en#contact",
  },
  es: {
    eyebrow: <>¿Necesitas una oferta a medida&nbsp;?</>,
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">¿Una asociación<span className="soc-comma">,</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">un colectivo pequeño<span className="soc-comma">,</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">un presupuesto ajustado&nbsp;?</span>{" "}
        <span className="soc-title-accent v-serif">Hablemos.</span>
      </>
    ),
    text: "En Uvibes sabemos que cada organización tiene su propia realidad. Como asociación sin fines de lucro, nuestro objetivo es ante todo favorecer el vínculo social, no maximizar el tamaño de los contratos. Si nuestros planes estándar no se ajustan a tu situación, podemos construir juntos una solución adaptada a tus necesidades y a tus recursos.",
    book: "Reservar una llamada",
    write: "Escríbenos",
    contactHref: "/es#contact",
  },
  de: {
    eyebrow: <>Brauchen Sie ein individuelles Angebot?</>,
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">Ein Verein<span className="soc-comma">,</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">ein kleines Kollektiv<span className="soc-comma">,</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">ein knappes Budget?</span>{" "}
        <span className="soc-title-accent v-serif">Lass uns reden.</span>
      </>
    ),
    text: "Bei Uvibes wissen wir, dass jede Organisation ihre eigene Realität hat. Als gemeinnütziger Verein ist unser Ziel vor allem, soziale Bindung zu fördern, nicht die Vertragsgröße zu maximieren. Wenn unsere Standardpläne nicht zu Ihrer Situation passen, können wir gemeinsam eine Lösung entwickeln, die zu Ihren Bedürfnissen und Ressourcen passt.",
    book: "Termin vereinbaren",
    write: "Schreiben Sie uns",
    contactHref: "/de#contact",
  },
  it: {
    eyebrow: <>Hai bisogno di un&apos;offerta su misura?</>,
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">Un&apos;associazione<span className="soc-comma">,</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">una piccola comunità<span className="soc-comma">,</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">un budget limitato?</span>{" "}
        <span className="soc-title-accent v-serif">Parliamone.</span>
      </>
    ),
    text: "In Uvibes sappiamo che ogni organizzazione ha la propria realtà. Come associazione senza scopo di lucro, il nostro obiettivo è prima di tutto favorire il legame sociale, non massimizzare la dimensione dei contratti. Se i nostri piani standard non si adattano alla tua situazione, possiamo costruire insieme una soluzione su misura per i tuoi bisogni e le tue risorse.",
    book: "Prenota una chiamata",
    write: "Scrivici",
    contactHref: "/it#contact",
  },
  pt: {
    eyebrow: <>Precisa de uma oferta personalizada?</>,
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">Uma associação<span className="soc-comma">,</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">um pequeno coletivo<span className="soc-comma">,</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">um orçamento ajustado?</span>{" "}
        <span className="soc-title-accent v-serif">Vamos falar.</span>
      </>
    ),
    text: "Na Uvibes, sabemos que cada organização tem a sua própria realidade. Como associação sem fins lucrativos, o nosso objetivo é, antes de tudo, favorecer o vínculo social, não maximizar o tamanho dos contratos. Se os nossos planos padrão não se adequarem à sua situação, podemos construir juntos uma solução adaptada às suas necessidades e aos seus recursos.",
    book: "Marcar uma chamada",
    write: "Escreva-nos",
    contactHref: "/pt#contact",
  },
  ru: {
    eyebrow: <>Нужно индивидуальное предложение?</>,
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">Ассоциация<span className="soc-comma">,</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">небольшой коллектив<span className="soc-comma">,</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">ограниченный бюджет?</span>{" "}
        <span className="soc-title-accent v-serif">Давайте поговорим.</span>
      </>
    ),
    text: "В Uvibes мы знаем, что у каждой организации своя реальность. Как некоммерческая ассоциация, наша цель — прежде всего укреплять социальные связи, а не максимизировать размер контрактов. Если наши стандартные тарифы не подходят для вашей ситуации, мы можем вместе создать решение, соответствующее вашим потребностям и ресурсам.",
    book: "Записаться на звонок",
    write: "Напишите нам",
    contactHref: "/ru#contact",
  },
  zh: {
    eyebrow: "需要定制方案？",
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">协会<span className="soc-comma">、</span></span>
        <br className="soc-br-mob" />
        <span className="soc-nowrap">小型集体<span className="soc-comma">、</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">预算紧张？</span>
        <span className="soc-title-accent v-serif">我们来聊聊。</span>
      </>
    ),
    text: "在 Uvibes，我们知道每个机构都有各自的现实情况。作为一家非营利协会，我们的目标首先是促进社会联系，而不是最大化合同规模。如果我们的标准方案不适合你的情况，我们可以一起构建一个契合你需求和资源的解决方案。",
    book: "预约通话",
    write: "给我们写信",
    contactHref: "/zh#contact",
  },
  ja: {
    eyebrow: "オーダーメイドのプランが必要ですか？",
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">協会<span className="soc-comma">、</span></span>
        <br className="soc-br-mob" />
        <span className="soc-nowrap">小さなコレクティフ<span className="soc-comma">、</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">限られた予算？</span>
        <span className="soc-title-accent v-serif">話しましょう。</span>
      </>
    ),
    text: "Uvibesでは、それぞれの団体に独自の事情があることを理解しています。非営利団体として、私たちの目標はまず社会的つながりを育むことであり、契約規模を最大化することではありません。標準プランが状況に合わない場合は、あなたのニーズとリソースに合った解決策を一緒に作り上げることができます。",
    book: "通話を予約する",
    write: "メールを送る",
    contactHref: "/ja#contact",
  },
  hi: {
    eyebrow: "क्या आपको कस्टम योजना चाहिए?",
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">एक एसोसिएशन<span className="soc-comma">,</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">एक छोटा समूह<span className="soc-comma">,</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">सीमित बजट?</span>{" "}
        <span className="soc-title-accent v-serif">आइए बात करें।</span>
      </>
    ),
    text: "Uvibes में, हम जानते हैं कि हर संगठन की अपनी अलग वास्तविकता होती है। एक गैर-लाभकारी एसोसिएशन के रूप में, हमारा लक्ष्य सबसे पहले सामाजिक जुड़ाव को बढ़ावा देना है, न कि अनुबंधों का आकार बढ़ाना। यदि हमारी सामान्य योजनाएं आपकी स्थिति के अनुकूल नहीं हैं, तो हम मिलकर आपकी ज़रूरतों और संसाधनों के अनुरूप एक समाधान बना सकते हैं।",
    book: "कॉल शेड्यूल करें",
    write: "हमें लिखें",
    contactHref: "/hi#contact",
  },
  ar: {
    eyebrow: <>هل تحتاج إلى عرض مخصص؟</>,
    title: (
      <>
        <span className="soc-line1">
        <span className="soc-nowrap">جمعية<span className="soc-comma">،</span></span>{" "}
        <br className="soc-br-mob" />
        <span className="soc-nowrap">مجموعة صغيرة<span className="soc-comma">،</span></span>
      </span>
      <br className="soc-br-all" />
        <span className="soc-nowrap">ميزانية محدودة؟</span>{" "}
        <span className="soc-title-accent v-serif">لنتحدث.</span>
      </>
    ),
    text: "في Uvibes، نعلم أن كل مؤسسة لها واقعها الخاص. وكجمعية غير ربحية، هدفنا الأول هو تعزيز الرابط الاجتماعي، لا تعظيم حجم العقود. إذا لم تكن خططنا القياسية مناسبة لوضعك، يمكننا معًا بناء حل يتوافق مع حاجاتك وموارك.",
    book: "حجز مكالمة",
    write: "اكتب إلينا",
    contactHref: "/ar#contact",
  },
};

export default function SmallOrgCta({ locale = "fr" }: { locale?: string }) {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });
  const t = useSettings();
  const soc = locale !== "fr" ? SOC_TXT[locale] : undefined;

  return (
    <section className={`soc-section${vis ? " soc-vis" : ""}`} ref={ref} id="petites-structures">
      <div className="soc-card">
        <div className="soc-glow" aria-hidden="true" />

        <div className="soc-content">
          <span className="soc-eyebrow v-mono">
            <span className="soc-eyebrow-dot" aria-hidden="true" />
            {soc ? soc.eyebrow : <>Besoin d&apos;une offre surmesure&nbsp;?</>}
          </span>

          <h2 className="soc-title v-prompt">
            {soc ? soc.title : (
              <>
                <span className="soc-line1">
                <span className="soc-nowrap">Une association<span className="soc-comma">,</span></span>{" "}
                <br className="soc-br-mob" />
                <span className="soc-nowrap">un petit collectif<span className="soc-comma">,</span></span>
              </span>
              <br className="soc-br-all" />
                <span className="soc-nowrap">un budget serré&nbsp;?</span>{" "}
                <span className="soc-title-accent v-serif">Parlons-en.</span>
              </>
            )}
          </h2>

          <p className="soc-text">
            {soc
              ? soc.text
              : t("soc-text", "Chez Uvibes, nous savons que chaque structure a ses réalités. En tant qu'association à but non lucratif, notre objectif est avant tout de favoriser le lien social, pas de maximiser la taille des contrats. Si nos formules standard ne correspondent pas à votre situation, nous pouvons construire ensemble une solution adaptée à vos besoins et à vos ressources.")}
          </p>

          <div className="soc-ctas">
            <Link href="/rendez-vous" className="btn-brand soc-cta-primary">
              {soc ? soc.book : t("soc-cta", "Prendre rendez-vous")} →
            </Link>
            <Link href={soc ? soc.contactHref : "/#contact"} className="soc-cta-ghost">
              {soc ? soc.write : "Nous écrire"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
