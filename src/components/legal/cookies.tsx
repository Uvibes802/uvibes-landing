import "@/styles/legal/legal.css";

export default function CookiesPolicy() {
  return (
    <main className="legal-page">
      <h1>Politique de collecte et de gestion des cookies</h1>

      <p>
        Cette politique de gestion des cookies vous informe de l’utilisation que
        nous faisons des cookies sur uvibes, ainsi que de vos options pour les
        accepter, les refuser ou les configurer.
      </p>
      <p>
        En utilisant uvibes, vous consentez à l’utilisation des cookies
        conformément à cette politique, à moins que vous ne modifiiez vos
        préférences via les paramètres de cookies ou de votre navigateur.
      </p>

      <section>
        <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil
          (ordinateur, tablette, smartphone) lorsque vous visitez un site web.
          Il permet au site de stocker des informations sur votre navigation,
          comme vos préférences de langue ou des informations de connexion, pour
          améliorer votre expérience.
        </p>
      </section>

      <section>
        <h2>2. Types de cookies utilisés</h2>
        <p>Nous utilisons plusieurs types de cookies pour différentes finalités :</p>
        <div>
          <h3>a. Cookies strictement nécessaires</h3>
          <p>
            Ces cookies sont essentiels au fonctionnement de uvibes et vous
            permettent de naviguer et d’utiliser ses fonctionnalités. Ils ne
            peuvent pas être désactivés dans nos systèmes. Ils sont généralement
            définis en réponse à des actions de votre part, comme la
            configuration de vos préférences de confidentialité, la connexion ou
            le remplissage de formulaires.
          </p>
        </div>
        <div>
          <h3>b. Cookies de performance</h3>
          <p>
            Ces cookies collectent des informations sur la façon dont les
            visiteurs utilisent uvibes, comme les pages plus visitées et les
            éventuels messages d&apos;erreur. Ces données sont anonymisées et
            utilisées uniquement pour améliorer le fonctionnement de la
            plateforme.
          </p>
        </div>
        <div>
          <h3>c. Cookies de fonctionnalité</h3>
          <p>
            Ces cookies permettent d’améliorer la personnalisation de votre
            expérience sur uvibes, comme le fait de se souvenir de vos
            préférences ou de vous offrir des fonctionnalités améliorées.
          </p>
        </div>
      </section>

      <section>
        <h2>3. Pourquoi utilisons-nous des cookies ?</h2>
        <p>Nous utilisons des cookies pour :</p>
        <ul>
          <li>
            Améliorer votre expérience de navigation en mémorisant vos
            préférences et en facilitant l&apos;accès à certaines fonctionnalités.
          </li>
          <li>
            Analyser l’utilisation de uvibes pour comprendre comment les
            visiteurs interagissent avec nos contenus et améliorer notre offre.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Gestion de vos préférences en matière de cookies</h2>
        <p>
          Vous avez le contrôle sur l&apos;utilisation des cookies et pouvez décider
          de les accepter, de les refuser ou de configurer vos préférences.
          Voici comment gérer les cookies :
        </p>

        <div>
          <h3>a. Via les paramètres de la plateforme</h3>
          <p>
            À votre première visite, un bandeau d&apos;information vous propose
            d&apos;accepter ou de refuser l&apos;utilisation des cookies.
          </p>
        </div>
        <div>
          <h3>b. Via les paramètres de votre navigateur</h3>
          <p>
            Vous pouvez également configurer votre navigateur pour refuser
            l&apos;installation des cookies ou supprimer les cookies déjà stockés
            sur votre appareil. La procédure varie en fonction du navigateur :
          </p>
          <ul>
            <li>
              Google Chrome : Paramètres &gt; Confidentialité et sécurité &gt;
              Cookies et autres données du site
            </li>
            <li>
              Mozilla Firefox : Options &gt; Vie privée et sécurité &gt; Cookies et
              données de sites
            </li>
            <li>Safari : Préférences &gt; Confidentialité &gt; Gérer les données des sites</li>
            <li>Microsoft Edge : Paramètres &gt; Cookies et autorisations de site</li>
          </ul>
          <p>
            Notez que si vous bloquez certains cookies, certaines fonctionnalités
            de uvibes pourraient ne plus fonctionner correctement.
          </p>
        </div>
      </section>

      <section>
        <h2>5. Cookies tiers</h2>
        <p>
          Certaines fonctionnalités de uvibes peuvent dépendre de services
          proposés par des tiers. Ces services peuvent déposer des cookies sur
          votre appareil, indépendamment de uvibes.
        </p>
        <p>
          Nous n’avons pas de contrôle direct sur ces cookies tiers, et nous
          vous recommandons de consulter les politiques de confidentialité des
          services concernés pour plus d&apos;informations sur leurs pratiques
          de gestion des cookies.
        </p>
      </section>

      <section>
        <h2>6. Modifications de la politique de gestion des cookies</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique de gestion
          des cookies à tout moment. Toute modification sera publiée sur cette
          page. Nous vous encourageons à consulter cette page régulièrement pour
          rester informé(e) des mises à jour.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          Pour toute question concernant notre politique de gestion des cookies,
          vous pouvez nous contacter à l’adresse suivante :{" "}
          <a href="mailto:contact@uvibes.fr">contact@uvibes.fr</a>
        </p>
      </section>

      <footer>
        <p>
          <em>Mis à jour, 9 janvier 2026</em>
        </p>
      </footer>
    </main>
  );
}
