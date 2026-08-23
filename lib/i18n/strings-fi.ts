/** Finnish overrides - keys omitted fall back to English in runtime merge. */
export const finnishOverrides: Record<string, string> = {
  "nav.home": "Etusivu",
  "nav.background": "Tausta",
  "nav.work": "Työkokemus",
  "nav.contact": "Yhteys",
  "nav.menuOpen": "Avaa valikko",
  "nav.menuClose": "Sulje valikko",
  "nav.primary": "Päävalikko",

  "lang.menu": "Kieli",
  "lang.en": "Englanti",
  "lang.fi": "Suomi",
  "lang.sv": "Ruotsi",
  "lang.fr": "Ranska",
  "lang.da": "Tanska",

  "footer.tagline": "Rakennettu huolella Helsingissä.",
  "footer.location": "Helsinki, Suomi",
  "footer.legalNav": "Juridinen",
  "footer.legalCookies": "Evästekäytäntö",
  "footer.legalPrivacy": "Tietosuoja & GDPR",
  "footer.legalTerms": "Käyttöehdot",
  "footer.cookieSettings": "Evästeasetukset",

  "theme.toggle": "Vaihda tummaa tilaa",

  "a11y.backToTop": "Takaisin ylös",

  "home.ariaOverview": "Yleiskuva",
  "home.downloadCv": "Lataa CV",
  "home.skillsLink": "Taidot-sivulle",
  "home.skillsLinkSuffix": "- ryhmittelyt ja hieman lisäkontekstia.",
  "home.sectionDeliveryTitle": "Mitä osaan tehdä",
  "home.sectionDeliverySubtitle":
    "Tuote-, API-, data- ja alustatyöt, joihin tyypillisesti nojaudun.",
  "home.proficiency.frontend": "Käyttöliittymä",
  "home.proficiency.backend": "Palvelinpuoli",
  "home.proficiency.programming": "Ohjelmointi",
  "home.delivery.mobileTitle": "Mobiilisovellukset",
  "home.delivery.mobileBody":
    "Natiivimaisia Flutter-sovelluksia selkeällä UX:llä, vakaalla offline- ja API-kytkennällä sekä buildilla, jotka pysyvät käytännöllisinä ylläpitää.",
  "home.delivery.webTitle": "Web-sovellukset ja dashboardit",
  "home.delivery.webBody":
    "Web-sovelluksia ja dashboardeja Next.jsillä, autentikoinnilla ja näkymillä, jotka pysyvät luettavina kun data kasvaa.",
  "home.delivery.apiTitle": "API:t ja integraatiot",
  "home.delivery.apiBody":
    "REST- ja palvelurajat, jotka pysyvät selkeinä kuormassa - sopimukset, autentikointi ja integraatiot, joihin muut tiimit voivat luottaa.",
  "home.delivery.devopsTitle": "Pilvi ja DevOps",
  "home.delivery.devopsBody":
    "Docker, CI/CD ja pilvitoimitus, jotta julkaisut pysyvät ennustettavina - paikallisesta buildista VPS:lle tai hallittuun alustaan.",
  "home.delivery.databaseTitle": "Tietokannat ja data",
  "home.delivery.databaseBody":
    "PostgreSQL, MySQL, MongoDB ja Redis, kun tuote tarvitsee kestävää persistenssiä, migraatioita ja välimuistia, jotka pysyvät ylläpidettävinä.",
  "home.delivery.iotTitle": "IoT ja yhdistetyt laitteet",
  "home.delivery.iotBody":
    "Sulautettu ja edge-työ antureilla, MQTT:llä ja yhdyskäytävillä - laitteiston realiteetit luotettaviksi pilvi- tai on-prem-palveluiksi.",
  "home.ctaTitle": "Palkkaamassa tai utelias?",
  "home.ctaBody":
    "Kerro tehtävästäsi, tai jos haluat tietää minusta lisää - ota rohkeasti yhteyttä. Vastaan tyypillisesti yhden arkipäivän kuluessa.",
  "home.ctaButton": "Jätä viesti",
  "home.workTitle": "Katso töitäni",
  "home.workSubtitle":
    "Muutama sivusto ja tuote, joita olen rakentanut - julkisista verkkosivuista API:hin ja yhdistettyihin järjestelmiin.",
  "home.workViewAll": "Kaikki työt",

  "profile.heading": "Pikakatsaus",
  "profile.basedIn": "Sijainti",
  "profile.languages": "Kielet",
  "profile.timezone": "Aikavyöhyke",
  "profile.availability": "Saatavuus",
  "profile.phone": "Puhelin",
  "profile.email": "Sähköposti",
  "profile.revealPhone": "Näytä puhelinnumero",
  "profile.hidePhone": "Piilota puhelinnumero",
  "profile.portraitAlt": "Henkilökuva: {name}",
  "profile.degreeLine": "Tietotekniikka",
  "profile.spokenLanguagesValue": "englanti, suomi, ranska",
  "profile.timezoneValue": "Itä-Euroopan aika (EET)",
  "profile.availabilityPitch": "Kokoaika/sopimus, Etä/hybridi/paikan päällä",

  "social.ariaGroup": "GitHub, LinkedIn ja sähköposti",
  "social.github": "GitHub",
  "social.linkedin": "LinkedIn",
  "social.email": "Sähköposti",
  "social.gitlab": "GitLab",
  "social.facebook": "Facebook",
  "social.instagram": "Instagram",
  "social.twitter": "Twitter",
  "social.medium": "Medium",
  "social.stackoverflow": "Stack Overflow",
  "social.kaggle": "Kaggle",

  "contact.eyebrow": "Hei",
  "contact.title": "Yhteys",
  "contact.intro":
    "Olipa kyse palkkaamisesta, hakemuksen jatkokysymyksistä tai ihan vain tervehdyksestä, saat jättää viestin (ja valinnaisen CV:n tai liitteen). Voit myös sähköpostittaa suoraan osoitteeseen {email}.",

  "form.name": "Nimi",
  "form.email": "Sähköposti",
  "form.message": "Viesti",
  "form.attachment": "Liite (valinnainen)",
  "form.attachmentHelp": "PDF, Word, kuvat tai teksti - enintään {size} Mt.",
  "form.security": "Täytä pikainen turvallisuusvarmistus ennen lähetystä.",
  "form.turnstileError":
    "Turvallisuusvarmistus ei latautunut (koodi {code}). Cloudflare erottaa localhostin ja 127.0.0.1:n: lisää molemmat widgetin sallittuihin osoitteisiin, jos käytät kumpaakin. Kokeile toista selainta, poista laajennukset (mainosesto) käytöstä ja katkaise VPN. Virhekoodi 300* voi tarkoittaa, ettei haaste saanut päättyä tässä ympäristössä.",
  "form.turnstileRetry": "Yritä turvallisuusvarmistusta uudelleen",
  "form.hint": "Luen kaiken tänne tulevan ja vastaan yleensä muutamassa arkipäivässä.",
  "form.send": "Lähetä viesti",
  "form.sending": "Lähetetään…",
  "form.success": "Kiitos - viestisi on matkalla.",

  "email.shell.kindRegards": "Ystävällisin terveisin,",
  "email.shell.secureTitle": "Turvallisuusilmoitus.",
  "email.shell.secureBody":
    "Tämä sähköposti lähetettiin suojattua postikanavaa pitkin todennetusta portfolioyhteydenottolomakkeesta. Emme koskaan pyydä salasanoja, pankkitietoja tai kertakäyttökoodeja sähköpostitse. Jos jokin näyttää epäilyttävältä, älä klikkaa linkkejä vaan ota yhteyttä suoraan osoitteeseen {email}.",
  "email.shell.legalIntro": "Yhteydenottosi käsitellään",
  "email.shell.legalAnd": "ja",
  "email.shell.privacy": "tietosuoja- ja GDPR-ilmoituksemme",
  "email.shell.terms": "käyttöehtojemme",
  "email.shell.legalOutro":
    " mukaisesti. Tietoja käytetään vain viestin lukemiseen ja siihen vastaamiseen.",
  "email.confirm.subject":
    "Vahvistus: olemme vastaanottaneet viestisi · {ownerName}",
  "email.confirm.preheader":
    "Vastaanotimme viestisi - {ownerName} vastaa mahdollisimman pian.",
  "email.confirm.headerTitle": "Viesti vastaanotettu",
  "email.confirm.headerSubtitle": "Virallinen vahvistus yhteydenotostasi",
  "email.confirm.hello": "Hei {firstName},",
  "email.confirm.thankYou":
    "Kiitos yhteydenotosta sivuston {site} kautta. Tämä sähköposti vahvistaa, että viestisi on vastaanotettu onnistuneesti.",
  "email.confirm.attachmentNote":
    " Mahdollinen liitetiedosto vastaanotettiin myös turvallisesti.",
  "email.confirm.nextTitle": "Seuraavat vaiheet",
  "email.confirm.nextBody":
    "Käyn viestisi läpi ja vastaan mahdollisimman pian - yleensä muutamassa arkipäivässä.",
  "email.confirm.yourMessage": "Viestisi",
  "email.confirm.referenceLabel": "Viitenumero:",
  "email.confirm.addAnything":
    "Haluatko lisätä jotain? Vastaa tähän sähköpostiin tai kirjoita osoitteeseen {email}.",
  "email.confirm.footerRef":
    "Vahvistusviite {ref} · Automaattinen kuittaus henkilön {ownerName} yhteydenottolomakkeelta",
  "email.confirm.securityHeader": "- Turvallisuusilmoitus -",
  "email.confirm.forYourRecords":
    "Tiedoksesi tässä kopio lähettämästäsi viestistä:",
  "email.confirm.textThankYou":
    "Kiitos yhteydenotosta henkilölle {ownerName} sivuston {site} kautta. Tämä on automaattinen vahvistus siitä, että viestisi on vastaanotettu onnistuneesti.",
  "email.confirm.textNext":
    "Käyn viestisi läpi ja vastaan mahdollisimman pian - yleensä muutamassa arkipäivässä.",
  "email.confirm.textAddAnything":
    "Jos haluat lisätä jotain, vastaa tähän sähköpostiin tai kirjoita osoitteeseen {email}.",

  "form.required": "pakollinen",
  "form.fileTooLarge": "Liite on liian suuri. Enintään {size} Mt.",
  "form.selectedFile": "Valittu: {name}",
  "form.networkError":
    "Verkkohäiriö - viesti ei välttämättä mennyt läpi. Tarkista yhteys ja yritä hetken päästä uudelleen.",
  "form.genericError": "Jokin meni meillä pieleen - yritä hetken kuluttua uudelleen.",
  "form.errorDetailsPrefix": "Tiedot:",

  "notFound.title": "Sivua ei löydy",
  "notFound.body":
    "Tämä osoite ei vastaa mitään täällä - ehkä se siirtyi tai linkki on väärin.",
  "notFound.home": "Etusivulle",

  "about.eyebrow": "Tausta",
  "about.title": "Työkokemus",
  "about.sectionTitle": "Mitä olen tehnyt",
  "about.sectionSubtitle":
    "Viimeisimmät roolit ensin - mielelläni syvennän keskustelussa.",
  "about.techAria": "Teknologiat: {company}",
  "about.highlightsAria": "Kohokohdat: {company}",
  "about.bio":
    "Pidän siitä, että sumeista vaatimuksista syntyy ohjelmistoa, joka tuntuu tasaiselta - selkeä rakenne kun se auttaa, testit kun ne maksavat itsensä takaisin, ja UX joka on lempeä sekä käyttäjille että seuraavalle, joka avaa repon.",

  "background.eyebrow": "Perusta",
  "background.title": "Taidot ja koulutus",
  "background.intro":
    "Työkalut, joilla toimitan, ja opinnot niiden taustalla - stackit kerroksittain, sitten tutkinnot ja ohjelmat.",
  "background.workHint": "Rooleista ja arjen toimituksesta, katso",
  "background.workLink": "työkokemus",

  "skills.eyebrow": "Työkalut",
  "skills.title": "Taidot ja stackit",
  "skills.intro":
    "Työkaluja ja alustoja oikeissa projekteissa, ryhmiteltynä sen mukaan miten ne näkyvät toimituksessa - ei sertifikaattiseinää.",
  "skills.stacksTitle": "Teknologiastackit",
  "skills.stacksSubtitle": "Kerroksittain - samat listat kuin etusivulla.",
  "skills.emphasisTitle": "Painotus",
  "skills.emphasisSubtitle":
    "Itsearvioidut syvyydet - parasta lukea CV:n tai keskustelun rinnalla.",
  "skills.stackAria": "Teknologiat: {title}",
  "skills.stack.languagesWeb.title": "Ohjelmointikielet",
  "skills.stack.languagesWeb.description":
    "Kielet, joita kirjoitan päivittäin - tuotekoodista skripteihin ja silloin tällöin mikrokontrolleriin.",
  "skills.stack.frontendUi.title": "Frontend-kehykset ja UI-toimitus",
  "skills.stack.frontendUi.description":
    "Merkkaus, tyylit ja komponenttikehykset, joilla rakennan käyttöliittymiä, jotka pysyvät selkeinä niin suunnittelijoille, kehittäjille kuin oikeille käyttäjille.",
  "skills.stack.backendApis.title": "Backend, API:t ja integraatiot",
  "skills.stack.backendApis.description":
    "Palvelut, ORM:t ja integraatiot - tyypitetty REST tai GraphQL, validoidut payloadit, webhookit sekä kolmannet osapuolet kuten HubSpot, kun tuote sitä kaipaa.",
  "skills.stack.datastores.title": "Tietovarastot ja välimuisti",
  "skills.stack.datastores.description":
    "Relaatio- ja dokumenttimallit, migraatiot ja kevyt välimuistitus kun sivulle tarvitaan hieman lisähengitystilaa.",
  "skills.stack.mobileRealtime.title": "Mobiili, IoT ja reaaliaikaiset asiakkaat",
  "skills.stack.mobileRealtime.description":
    "Flutter-sovelluksia reaktiivisella tilalla, kartoilla, push-viestinnällä sekä Firebase- tai Supabase-taustoilla - lähisukulaisia sille embedded- ja smart home -työlle, josta uraani aloitin.",
  "skills.stack.cloudPlatform.title": "Pilvi, kontit ja toimitus",
  "skills.stack.cloudPlatform.description":
    "Paketointi, orkestrointi, IaC ja hostausvalinnat, jotka pitävät deployt tylsinä hyvällä tavalla.",

  "edu.eyebrow": "Oppiminen",
  "edu.title": "Koulutus",
  "edu.intro":
    "Lempeä kierros tutkintoihin ja ohjelmiin, uusin ensin. Arjen työ löytyy",
  "edu.workLink": "Työkokemus",
  "edu.sectionTitle": "Koulut ja ohjelmat",
  "edu.sectionSubtitle": "Opinnot ja kurssit, uusin ensin.",
  "edu.highlightsAria": "Painopisteet: {school}",
  "edu.thesisLabel": "Opinnäytetyö · {year}",
  "edu.thesisLink": "Lue Theseuksessa →",

  "meta.home.title": "Yleiskuva",
  "meta.home.description": "{name} - {role}. {tagline}",
  "meta.background.title": "Tausta",
  "meta.background.description":
    "Taidot, stackit ja koulutus - {name}, {role}. {degree}, {school}.",
  "meta.background.ogDescription": "{tagline}",
  "meta.about.title": "Työkokemus",
  "meta.about.description":
    "Kävely työkokemukseen - pääosin full-stack web, Laravel ja ripaus Flutter-IoT:tä.",
  "meta.about.ogDescription": "{bio}",
  "meta.contact.title": "Yhteys",
  "meta.contact.description": "Yksinkertainen tapa tavoittaa {name} - jätä viesti täältä.",

  "meta.keywords":
    "Awunjia Serge, Serge Awunjia, palkkaa kehittäjä Suomi, etätyö full stack, sopimusohjelmoija, Helsinki ohjelmistokehittäjä, Laravel-työ, Next.js-kehittäjä, Flutter-kehittäjä, TypeScript, avoin työhön kehittäjä, ohjelmistoinsinööri saatavilla, Novia ammattikorkeakoulu, Vaasa, Buean yliopisto, GitHub awunjia, LinkedIn Awunjia Serge, Groweo, Sbotech, portfolio",

  "seo.hiringMetaLine":
    "Kiinnostunut kokoaikaisista, sopimus- ja etäystävällisistä ohjelmistokehitysrooleista.",

  "meta.legal.cookiesTitle": "Evästekäytäntö",
  "meta.legal.cookiesDescription":
    "Miten tämä portfolio käyttää evästeitä ja vastaavia tekniikoita, myös yhteydenottolomakkeella tarvittaessa.",
  "meta.legal.privacyTitle": "Tietosuoja & GDPR",
  "meta.legal.privacyDescription":
    "Henkilötietojen käsittely, GDPR-oikeutesi ja yhteystiedot tai poistopyyntö.",
  "meta.legal.termsTitle": "Käyttöehdot",
  "meta.legal.termsDescription": "Ehdot, jotka koskevat tämän sivuston ja yhteydenottotoiminnon käyttöä.",

  "cookies.bannerTitle": "Evästeet ja yksityisyytesi",
  "cookies.bannerBody":
    "Tarvitsemme välttämättömät evästeet suostumuksen tallentamiseen. Asetusevästeillä muistamme teeman ja kielen. Voit muuttaa valintaasi milloin tahansa.",
  "cookies.acceptAll": "Hyväksy kaikki",
  "cookies.rejectNonEssential": "Hylkää ei-välttämättömät",
  "cookies.managePreferences": "Hallitse asetuksia",
  "cookies.savePreferences": "Tallenna valinnat",
  "cookies.close": "Sulje",
  "cookies.necessaryTitle": "Ehdottoman välttämättömät",
  "cookies.necessaryBody":
    "Tarvitaan sivuston toimintaan ja suostumuksen muistamiseen. Näitä ei voi poistaa käytöstä.",
  "cookies.necessaryStatus": "Aina päällä",
  "cookies.preferencesTitle": "Asetukset",
  "cookies.preferencesBody":
    "Muistaa teeman (vaalea/tumma) ja kielivalinnan, jotta sivu tuntuu tutulta palatessasi.",
  "cookies.statisticsTitle": "Tilastot (valinnainen)",
  "cookies.statisticsBody":
    "Analytiikkaevästeitä ei ole tällä hetkellä käytössä. Jos tilanne muuttuu, tämä kytkin hallitsee niitä.",
  "cookies.legalIntro": "Lue lisää:",
  "cookies.and": "ja",
  "cookies.themeLockedHint":
    "Ota asetusevästeet käyttöön tietosuojapalkista, jotta teemavalinta tallentuu.",
  "footer.openToRemote": "Avoin etätyölle",
  "nav.projects": "Työni",
  "home.role": "Full-stack-ohjelmistoinsinööri",
  "home.tagline":
    "Rakennan ja ylläpidän luotettavia web-sovelluksia, API:ita ja digitaalisia tuotteita TypeScriptillä, Node.js:llä, Reactilla ja PHP/Laravelilla.",
  "home.availability": "Avoin kokoaikaisiin ja sopimusrooleihin Suomessa ja maailmalla - etänä tai hybridinä.",
  "home.availabilityClosed":
    "En ole juuri nyt avoinna uusille rooleille - ota silti yhteyttä tulevia mahdollisuuksia varten.",
  "home.statusAvailable": "Avoinna työlle",
  "home.statusUnavailable": "Ei juuri nyt saatavilla",
  "home.viewWork": "Katso työni",
  "home.expertiseAria": "Ydinosaaminen kategorioittain",
  "home.expertise.backend": "Backend",
  "home.expertise.frontend": "Frontend",
  "home.expertise.data": "Data",
  "home.expertise.cloudDevops": "Pilvi & DevOps",
  "home.expertise.iot": "IoT",
  "home.expertise.ai": "Tekoäly",
  "home.sectionStackTitle": "Ydinosaaminen",
  "home.sectionStackSubtitle":
    "Full-stack web ja API TypeScriptillä, Node.js:llä, Reactilla ja Laravelilla - plus datakerrokset, pilvitoimitus ja IoT-järjestelmät.",
  "home.sectionProficiencyTitle": "Tekninen vahvuus",
  "home.sectionProficiencySubtitle":
    "Missä tuotan eniten arvoa: ylläpidettävien full-stack-järjestelmien, luotettavien API:iden ja käytännöllisten tuoteominaisuuksien toimitus.",
  "proj.eyebrow": "Valikoituja töitä",
  "proj.title": "Sivustoja ja tuotteita, joita olen rakentanut",
  "proj.intro":
    "Lyhyt katsaus live-sivustoihin ja alustoihin, jotka suunnittelin, rakensin tai toimitin alusta loppuun. Suurin osa työstäni on yksityisiä web-sovelluksia ja sisäisiä työkaluja, joihin tarvitaan kirjautuminen, joten niitä ei voi laittaa julkiselle portfoliosivulle - voin näyttää demon tapaamisessa. Täällä on se osa, joka on turvallista jakaa julkisesti.",
  "proj.sectionTitle": "Valitut työt",
  "proj.sectionSubtitle":
    "Live-linkit kun työ on julkinen; muuten selkeä kuvaus stackista ja siitä mitä toimitettiin.",
  "proj.cardCode": "Koodi",
  "proj.cardLive": "Sivustolle",
  "proj.ariaTechnologies": "Teknologiat",
  "proj.items.portfolio.title": "Henkilökohtainen portfolio",
  "proj.items.portfolio.description":
    "Suunniteltu ja rakennettu alusta loppuun itse - UI, sisältö ja tekniikka. Next.js App Router, TypeScript ja React, Tailwind CSS, monikielinen i18n, yhteydenotto-API:t, Docker VPS:llä ja ladattava CV.",
  "proj.items.aecoWebsite.title": "Aeco Limited - haku, varaukset ja sisäiset työkalut",
  "proj.items.aecoWebsite.description":
    "Julkinen markkinointisivusto on yrityksen omaisuutta. Oma panokseni oli haku, varausvirrat ja sisäinen sovellus (ei näytetty täällä), heidän WordPress-stackillaan PHP:llä ja jQueryllä.",
  "proj.items.curnext.title": "CurNext - työmaan tilannekuvatiedustelu",
  "proj.items.curnext.description":
    "Suunniteltu ja rakennettu alusta loppuun itse - CurNextin markkinointisivusto. Next.js App Router, React, shadcn/ui, Prisma/Postgres yhteydenotto- ja tarjouslomakkeille, Cloudflare Turnstile, Docker ja Dokploy-julkaisu curnext.appiin.",
  "proj.items.asatek.title": "AsaTek - ohjelmistoyhtiöiden sivusto",
  "proj.items.asatek.description":
    "Rakennettu alusta loppuun itse - AsaTekin monikielinen markkinointisivusto. Next.js App Router, TypeScript, React, SEO/metadata, Docker ja Dokploy-julkaisu asatek.io:hon.",
  "proj.items.iotAttendance.title": "SBO Tech - sisäinen RFID-läsnäolo",
  "proj.items.iotAttendance.description":
    "Julkinen markkinointisivusto sbotech.fi on yrityksen omaisuutta - en rakentanut sitä. Työni oli sisäinen RFID-läsnäolo- ja käyttäjähallintatuote (vaatii kirjautumisen, ei julkinen): räätälöidyt lukijat, Laravel-API ja admin-dashboard henkilöstön kirjautumisiin.",
  "proj.items.smartHome.title": "Älykotialusta",
  "proj.items.smartHome.description":
    "Yksityisyyttä korostava älykotipino: paikallinen home-server MQTT-yhdyskäytävällä Bluetooth-, Wi-Fi- ja Zigbee-laitteille sekä Flutter-sovellus asennukseen, automaatioihin ja arjen hallintaan.",
  "meta.projects.title": "Työni",
  "meta.projects.description":
    "Valikoituja sivustoja ja tuotteita, joita {name} on rakentanut - portfolio, asiakassivustot, API:t ja IoT-alustat.",
  "seo.hiringMetaLineClosed":
    "Ei juuri nyt avoinna uusille rooleille; yhteydenotto tulevia mahdollisuuksia varten on tervetullut.",
  "home.whyHire.title": "Miksi palkata minut",
  "home.whyHire.subtitle": "Mitä saat yhteistyössä - enemmän kuin stack-lista.",
  "home.whyHire.aria": "Syitä palkata minut",
  "home.whyHire.ownership.title": "Kokonaisvastuu",
  "home.whyHire.ownership.body":
    "Vien ominaisuudet ideasta tuotantoon: suunnitteluvalinnat, toteutus, reviewt, julkaisu ja seuranta, jotta ne pysyvät kunnossa.",
  "home.whyHire.fullstack.title": "Full-stack ilman turhia siirtymiä",
  "home.whyHire.fullstack.body":
    "Viihdyn API:n, UI:n, datan ja toimituksen välillä. Vähemmän odotusta kerrosten välillä tarkoittaa nopeampaa palautetta ja selkeämpää vastuuta.",
  "home.whyHire.shipping.title": "Toimittaa käytännöllisiä tuotteita",
  "home.whyHire.shipping.body":
    "Optimoin ylläpidettävään koodiin, rehellisiin aikatauluihin ja demoihin, jotka kestävät stakeholder-katsauksen - ei kertakäyttöprototyyppeihin.",
  "home.whyHire.communication.title": "Selkeä viestintä",
  "home.whyHire.communication.body":
    "Saat tilannekuvan, jolla voi toimia: riskit ajoissa, vaihtoehdot ymmärrettävästi ja asynkroniset päivitykset, jotka kunnioittavat aikaa eri aikavyöhykkeillä.",
  "home.whyHire.contractTeam.title": "Valmis tiimi sopimustyöhön",
  "home.whyHire.contractTeam.body":
    "Sopimustyössä voin tuoda valmiin tiimin, kun laajuus vaatii lisää käsiä - toimitus pysyy tahdissa ilman, että joudut rekrytoimaan kesken projektin.",
  "home.whyHire.homeOffice.title": "Keskittynyt kotitoimisto",
  "home.whyHire.homeOffice.body":
    "Työskentelen erillisessä toimistotilassa kotona - rauhallinen ja luotettava ympäristö syvään työhön, palavereihin sekä tasaiseen etä- tai hybridiyhteistyöhön.",
};
