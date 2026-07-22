/* =========================================================
   MyCSB – Dati dimostrativi e traduzioni (IT / DE)
   Tutti i dati sono FITTIZI. Nessun dato sanitario reale.
   ========================================================= */

/* ----------------------- i18n ----------------------- */
const I18N = {
  it: {
    lang_name: "Italiano",
    welcome_title: "Benvenuto in MyCSB",
    welcome_sub: "Tutti i servizi del Centro Sanitario Bregaglia in un unico luogo.",
    // nav
    nav_home: "Home", nav_services: "Servizi", nav_bookings: "Prenotazioni",
    nav_notifications: "Notifiche", nav_profile: "Profilo",
    // generic
    back: "Indietro", book: "Prenota", send: "Invia", cancel: "Annulla",
    confirm: "Conferma", close: "Chiudi", next: "Avanti", save: "Salva",
    view: "Visualizza", download: "Scarica", share: "Condividi", call: "Chiama",
    write: "Scrivi", directions: "Indicazioni", all: "Tutti", open: "Apri",
    request_sent: "Richiesta inviata con successo",
    request_sent_sub: "Riceverai una conferma. Il prototipo non conferma appuntamenti reali.",
    note_optional: "Note (facoltative)",
    select: "Seleziona",
    demo_data: "Dati dimostrativi",
    // home
    quick_book_meal: "Prenota pasto",
    quick_book_visit: "Prenota visita",
    quick_messages: "Messaggi",
    quick_reminders: "Promemoria",
    home_services: "I nostri servizi",
    next_appointment: "Prossimo appuntamento",
    // services list
    s_medical: "Studio medico",
    s_physio: "Fisioterapia",
    s_spitex: "Spitex",
    s_home: "Casa anziani",
    s_cafe: "Caffetteria",
    s_meals: "Pasti a domicilio",
    s_laundry: "Lavanderia",
    s_specialists: "Specialisti e dentista",
    s_events: "Eventi e novità",
    s_personal: "Area personale",
    s_contacts: "Contatti e numeri utili",
    s_reminders: "Promemoria sanitari",
    s_messages: "Messaggistica",
    // status
    st_wait: "In attesa", st_confirmed: "Confermata", st_alt: "Modifica proposta",
    st_received: "Ricevuto", st_processing: "In lavorazione", st_ready: "Pronto per il ritiro",
    st_cancelled: "Annullato",
    // profile
    personal_data: "Dati personali",
    pref_language: "Lingua preferita",
    appointments: "Appuntamenti",
    documents: "Documenti",
    invoices: "Fatture",
    notifications: "Notifiche",
    authorized_family: "Familiari autorizzati",
    privacy_settings: "Impostazioni privacy",
    logout: "Esci",
    login_personal: "Accedi all'area personale",
    // final
    final_slogan: "Un solo accesso. Tutti i servizi. Sempre con te.",
  },
  de: {
    lang_name: "Deutsch",
    welcome_title: "Willkommen bei MyCSB",
    welcome_sub: "Alle Dienste des Gesundheitszentrums Bergell an einem Ort.",
    nav_home: "Home", nav_services: "Dienste", nav_bookings: "Termine",
    nav_notifications: "Mitteilungen", nav_profile: "Profil",
    back: "Zurück", book: "Buchen", send: "Senden", cancel: "Abbrechen",
    confirm: "Bestätigen", close: "Schliessen", next: "Weiter", save: "Speichern",
    view: "Ansehen", download: "Herunterladen", share: "Teilen", call: "Anrufen",
    write: "Schreiben", directions: "Route", all: "Alle", open: "Öffnen",
    request_sent: "Anfrage erfolgreich gesendet",
    request_sent_sub: "Sie erhalten eine Bestätigung. Der Prototyp bestätigt keine echten Termine.",
    note_optional: "Anmerkungen (optional)",
    select: "Auswählen",
    demo_data: "Demodaten",
    quick_book_meal: "Mahlzeit buchen",
    quick_book_visit: "Termin buchen",
    quick_messages: "Nachrichten",
    quick_reminders: "Erinnerungen",
    home_services: "Unsere Dienste",
    next_appointment: "Nächster Termin",
    s_medical: "Arztpraxis",
    s_physio: "Physiotherapie",
    s_spitex: "Spitex",
    s_home: "Altersheim",
    s_cafe: "Cafeteria",
    s_meals: "Mahlzeiten nach Hause",
    s_laundry: "Wäscherei",
    s_specialists: "Fachärzte und Zahnarzt",
    s_events: "Veranstaltungen",
    s_personal: "Persönlicher Bereich",
    s_contacts: "Kontakte und Nummern",
    s_reminders: "Gesundheits-Erinnerungen",
    s_messages: "Nachrichten",
    st_wait: "Ausstehend", st_confirmed: "Bestätigt", st_alt: "Änderung vorgeschlagen",
    st_received: "Erhalten", st_processing: "In Bearbeitung", st_ready: "Abholbereit",
    st_cancelled: "Storniert",
    personal_data: "Persönliche Daten",
    pref_language: "Bevorzugte Sprache",
    appointments: "Termine",
    documents: "Dokumente",
    invoices: "Rechnungen",
    notifications: "Mitteilungen",
    authorized_family: "Autorisierte Angehörige",
    privacy_settings: "Datenschutz",
    logout: "Abmelden",
    login_personal: "Zum persönlichen Bereich",
    final_slogan: "Ein Zugang. Alle Dienste. Immer bei Ihnen.",
  }
};

/* --------------------- Demo data --------------------- */
const DATA = {
  user: {
    name: "Maria Rossi",
    initials: "MR",
    birth: "15.03.1958",
    userId: "CSB-000125",
    email: "maria.rossi@example.ch",
    phone: "+41 79 123 45 67",
    address: "Via Maistra 12, 7605 Stampa",
    language: "it",
    family: [
      { name: "Giuseppe Rossi", rel_it: "Coniuge (assistito)", rel_de: "Ehepartner (betreut)" },
      { name: "Anna Rossi", rel_it: "Figlia – contatto autorizzato", rel_de: "Tochter – autorisiert" }
    ]
  },

  // Servizi con icona, priorità e sottotitolo
  services: [
    { id: "medical",     icon: "🩺", key: "s_medical",     sub_it: "Visite, ricette, certificati", sub_de: "Termine, Rezepte, Atteste" },
    { id: "physio",      icon: "🤸", key: "s_physio",      sub_it: "Trattamenti e palestra", sub_de: "Behandlungen und Fitnessraum" },
    { id: "spitex",      icon: "🏠", key: "s_spitex",      sub_it: "Assistenza domiciliare", sub_de: "Hauspflege" },
    { id: "carehome",    icon: "🌳", key: "s_home",        sub_it: "Casa anziani e area famiglia", sub_de: "Altersheim und Familienbereich" },
    { id: "cafe",        icon: "☕", key: "s_cafe",        sub_it: "Menù e prenotazioni", sub_de: "Menü und Reservierungen" },
    { id: "meals",       icon: "🍲", key: "s_meals",       sub_it: "Pasti consegnati a casa", sub_de: "Essen nach Hause geliefert" },
    { id: "laundry",     icon: "🧺", key: "s_laundry",     sub_it: "Servizio per clienti esterni", sub_de: "Service für externe Kunden" },
    { id: "specialists", icon: "🦷", key: "s_specialists", sub_it: "Dentista e specialisti partner", sub_de: "Zahnarzt und Partner" },
    { id: "events",      icon: "📅", key: "s_events",      sub_it: "Eventi e novità del CSB", sub_de: "Veranstaltungen des CSB" },
    { id: "reminders",   icon: "🔔", key: "s_reminders",   sub_it: "Controlli e scadenze", sub_de: "Kontrollen und Fristen" },
    { id: "messages",    icon: "💬", key: "s_messages",    sub_it: "Messaggistica sicura", sub_de: "Sichere Nachrichten" },
    { id: "contacts",    icon: "📞", key: "s_contacts",    sub_it: "Numeri utili e mappa", sub_de: "Nummern und Karte" },
  ],

  appointments: [
    { id: 1, icon: "🤸", title_it: "Fisioterapia individuale", title_de: "Physiotherapie", date: "18.08.2026", time: "10:30", who: "Giulia", status: "confirmed", cat: "physio" },
    { id: 2, icon: "🦷", title_it: "Visita dermatologica", title_de: "Hautarzt-Termin", date: "02.09.2026", time: "14:00", who: "Dr. Keller", status: "confirmed", cat: "specialists" },
    { id: 3, icon: "🧪", title_it: "Esami di laboratorio", title_de: "Laboruntersuchung", date: "10.09.2026", time: "08:00", who: "Studio medico", status: "confirmed", cat: "medical" },
    { id: 4, icon: "🩺", title_it: "Visita di controllo", title_de: "Kontrolluntersuchung", date: "20.09.2026", time: "09:15", who: "Dr. Bianchi", status: "wait", cat: "medical" },
  ],
  pastAppointments: [
    { id: 10, icon: "🤸", title_it: "Fisioterapia individuale", title_de: "Physiotherapie", date: "03.07.2026", time: "11:00", who: "Giulia" },
    { id: 11, icon: "🩺", title_it: "Visita medica generale", title_de: "Allgemeine Untersuchung", date: "15.06.2026", time: "10:00", who: "Dr. Bianchi" },
  ],

  documents: {
    health: [
      { id: "d1", icon: "🧪", title_it: "Esami di laboratorio", title_de: "Laboruntersuchung", date: "10.07.2026" },
      { id: "d2", icon: "🤸", title_it: "Referto fisioterapia", title_de: "Physiotherapie-Bericht", date: "03.07.2026" },
      { id: "d3", icon: "📄", title_it: "Referto medico", title_de: "Arztbericht", date: "15.06.2026" },
      { id: "d4", icon: "💊", title_it: "Prescrizione", title_de: "Rezept", date: "12.06.2026" },
    ],
    admin: [
      { id: "a1", icon: "🧾", title_it: "Fattura caffetteria – giugno 2026", title_de: "Rechnung Cafeteria – Juni 2026", date: "30.06.2026", amount: "CHF 54.00" },
      { id: "a2", icon: "🧾", title_it: "Fattura fisioterapia – maggio 2026", title_de: "Rechnung Physio – Mai 2026", date: "31.05.2026", amount: "CHF 180.00" },
      { id: "a3", icon: "🧾", title_it: "Ricevuta pasti a domicilio", title_de: "Quittung Mahlzeiten", date: "20.06.2026", amount: "CHF 96.00" },
    ]
  },

  notifications: [
    { id: "n1", icon: "📄", cat: "referti", title_it: "Nuovo referto disponibile", title_de: "Neuer Bericht verfügbar", sub_it: "Esami di laboratorio del 10.07.2026", sub_de: "Laborbericht vom 10.07.2026", time_it: "2 ore fa", time_de: "vor 2 Std.", unread: true },
    { id: "n2", icon: "🍲", cat: "pasti", title_it: "Il pasto di domani è confermato", title_de: "Mahlzeit für morgen bestätigt", sub_it: "Consegna 11:30–12:30", sub_de: "Lieferung 11:30–12:30", time_it: "5 ore fa", time_de: "vor 5 Std.", unread: true },
    { id: "n3", icon: "🧺", cat: "lavanderia", title_it: "Biancheria pronta per il ritiro", title_de: "Wäsche abholbereit", sub_it: "Ordine L-2026-015 · dalle 14:00", sub_de: "Auftrag L-2026-015 · ab 14:00", time_it: "Ieri", time_de: "Gestern", unread: true },
    { id: "n4", icon: "🔔", cat: "referti", title_it: "È trascorso un anno dall'ultima visita ginecologica", title_de: "Ein Jahr seit der letzten gynäkologischen Kontrolle", sub_it: "Consigliato programmare un controllo", sub_de: "Kontrolle empfohlen", time_it: "Ieri", time_de: "Gestern", unread: false },
    { id: "n5", icon: "🏠", cat: "spitex", title_it: "Richiesta Spitex ricevuta", title_de: "Spitex-Anfrage erhalten", sub_it: "Il coordinatore verificherà la disponibilità", sub_de: "Der Koordinator prüft die Verfügbarkeit", time_it: "2 giorni fa", time_de: "vor 2 Tagen", unread: false },
    { id: "n6", icon: "🌳", cat: "casa anziani", title_it: "Nuova comunicazione dal reparto", title_de: "Neue Mitteilung der Abteilung", sub_it: "Diario giornaliero aggiornato", sub_de: "Tagebuch aktualisiert", time_it: "2 giorni fa", time_de: "vor 2 Tagen", unread: false },
    { id: "n7", icon: "📅", cat: "eventi", title_it: "Nuovo evento CSB disponibile", title_de: "Neue CSB-Veranstaltung", sub_it: "Giornata della donazione del sangue", sub_de: "Blutspendetag", time_it: "3 giorni fa", time_de: "vor 3 Tagen", unread: false },
  ],

  doctors: [
    { name: "Dr. med. Bianchi", role_it: "Medico di base", role_de: "Hausarzt" },
    { name: "Dr. med. Moser", role_it: "Medico di base", role_de: "Hausärztin" },
    { name: "Dr. med. Ferrari", role_it: "Medicina interna", role_de: "Innere Medizin" },
  ],
  visitTypes: [
    { it: "Visita generale", de: "Allgemeine Untersuchung" },
    { it: "Visita di controllo", de: "Kontrolle" },
    { it: "Esami del sangue", de: "Blutuntersuchung" },
    { it: "Vaccinazione", de: "Impfung" },
  ],
  timeSlots: ["08:00", "08:30", "09:00", "10:30", "11:00", "14:00", "15:30", "16:00"],

  physioTreatments: [
    { it: "Fisioterapia individuale", de: "Einzel-Physiotherapie" },
    { it: "Ginnastica riabilitativa", de: "Rehabilitationsgymnastik" },
    { it: "Terapia manuale", de: "Manuelle Therapie" },
    { it: "Linfodrenaggio", de: "Lymphdrainage" },
    { it: "Utilizzo palestra", de: "Fitnessraum-Nutzung" },
  ],
  physioExercises: [
    { it: "Mobilizzazione spalla – 2 serie da 10", de: "Schultermobilisation – 2×10" },
    { it: "Rinforzo gambe – 3 serie da 12", de: "Beinkräftigung – 3×12" },
    { it: "Equilibrio su un piede – 3 × 30 sec.", de: "Gleichgewicht – 3 × 30 Sek." },
  ],

  spitexServices: [
    { it: "Igiene personale", de: "Körperpflege" },
    { it: "Supporto ai pasti", de: "Unterstützung Mahlzeiten" },
    { it: "Cura delle ferite", de: "Wundpflege" },
    { it: "Somministrazione farmaci", de: "Medikamente" },
    { it: "Accompagnamento", de: "Begleitung" },
  ],
  spitexPlanned: [
    { icon:"🧼", title_it:"Igiene personale", title_de:"Körperpflege", when_it:"Lun 21.07 · 08:00–10:00", when_de:"Mo 21.07 · 08:00–10:00", who:"Sara", status:"confirmed" },
    { icon:"💊", title_it:"Controllo farmaci", title_de:"Medikamentenkontrolle", when_it:"Mer 23.07 · 09:00", when_de:"Mi 23.07 · 09:00", who:"Sara", status:"confirmed" },
    { icon:"🩹", title_it:"Cura della ferita", title_de:"Wundpflege", when_it:"Ven 25.07 · 15:00", when_de:"Fr 25.07 · 15:00", who:"Marco", status:"wait" },
  ],

  cafeMenuDay: {
    date_it: "Menù del giorno", date_de: "Tagesmenü",
    items: [
      { k_it:"Primo", k_de:"Vorspeise", v_it:"Risotto alle verdure", v_de:"Gemüse-Risotto" },
      { k_it:"Secondo", k_de:"Hauptgang", v_it:"Filetto di pesce con patate", v_de:"Fischfilet mit Kartoffeln" },
      { k_it:"Dessert", k_de:"Dessert", v_it:"Yogurt alla frutta", v_de:"Frucht-Joghurt" },
    ],
    price: "CHF 18.00"
  },
  cafeWeek: [
    { d_it:"Lunedì", d_de:"Montag", m_it:"Minestrone · Arrosto di vitello · Macedonia", m_de:"Minestrone · Kalbsbraten · Obstsalat" },
    { d_it:"Martedì", d_de:"Dienstag", m_it:"Risotto alle verdure · Filetto di pesce · Yogurt", m_de:"Gemüse-Risotto · Fischfilet · Joghurt" },
    { d_it:"Mercoledì", d_de:"Mittwoch", m_it:"Pasta al pomodoro · Pollo al forno · Torta", m_de:"Tomatenpasta · Ofenhähnchen · Kuchen" },
    { d_it:"Giovedì", d_de:"Donnerstag", m_it:"Zuppa d'orzo · Polenta e brasato · Frutta", m_de:"Gerstensuppe · Polenta mit Schmorbraten · Obst" },
    { d_it:"Venerdì", d_de:"Freitag", m_it:"Crema di zucca · Sformato di verdure · Gelato", m_de:"Kürbiscremesuppe · Gemüseauflauf · Glace" },
  ],

  mealsHistory: [
    { date:"24.07.2026", menu_it:"Menù completo", menu_de:"Vollmenü", status:"confirmed" },
    { date:"20.06.2026", menu_it:"Menù leggero", menu_de:"Leichtes Menü", status:"confirmed" },
    { date:"18.06.2026", menu_it:"Menù completo", menu_de:"Vollmenü", status:"confirmed" },
  ],

  laundryServices: [
    { it:"Lavaggio e stiratura biancheria", de:"Waschen und Bügeln Wäsche", price:"CHF 8.–/kg" },
    { it:"Capi delicati", de:"Feinwäsche", price:"CHF 12.–/kg" },
    { it:"Lavaggio coperte e piumini", de:"Decken und Duvets", price:"CHF 25.–/Stk" },
    { it:"Stiratura camicie", de:"Hemden bügeln", price:"CHF 4.–/Stk" },
  ],
  laundryOrder: {
    id: "L-2026-015",
    steps: ["received", "processing", "ready"],
    current: 2, // 0-based -> "ready"
    msg_it: "La sua biancheria è pronta. Può ritirarla a partire dalle ore 14:00.",
    msg_de: "Ihre Wäsche ist bereit. Abholung ab 14:00 Uhr möglich."
  },

  specialists: [
    { icon:"🦷", name_it:"Dentista", name_de:"Zahnarzt", who:"Dr. Keller", days_it:"Lun, Mer, Ven", days_de:"Mo, Mi, Fr", partner:false },
    { icon:"🧴", name_it:"Dermatologo", name_de:"Hautarzt", who:"Dr.ssa Weber", days_it:"Martedì", days_de:"Dienstag", partner:true },
    { icon:"🫁", name_it:"Pneumologo", name_de:"Pneumologe", who:"Dr. Rossi", days_it:"1° giovedì del mese", days_de:"1. Do im Monat", partner:true },
    { icon:"❤️", name_it:"Cardiologo", name_de:"Kardiologe", who:"Dr. Meier", days_it:"Mercoledì", days_de:"Mittwoch", partner:true },
    { icon:"🌸", name_it:"Ginecologo", name_de:"Gynäkologe", who:"Dr.ssa Fontana", days_it:"Giovedì", days_de:"Donnerstag", partner:false },
  ],

  reminders: [
    { id:"r1", icon:"🌸", text_it:"È trascorso un anno dalla sua ultima visita ginecologica.", text_de:"Ein Jahr seit der letzten gynäkologischen Kontrolle.", on:true, action:true },
    { id:"r2", icon:"🧴", text_it:"È consigliato programmare un controllo dermatologico.", text_de:"Eine dermatologische Kontrolle wird empfohlen.", on:true, action:true },
    { id:"r3", icon:"🤸", text_it:"Domani alle ore 10:30 ha una seduta di fisioterapia.", text_de:"Morgen um 10:30 Uhr Physiotherapie.", on:true, action:false },
    { id:"r4", icon:"📄", text_it:"È disponibile un nuovo referto.", text_de:"Ein neuer Bericht ist verfügbar.", on:true, action:false },
    { id:"r5", icon:"💊", text_it:"La sua prescrizione è prossima alla scadenza.", text_de:"Ihr Rezept läuft bald ab.", on:false, action:true },
    { id:"r6", icon:"❤️", text_it:"Il controllo cardiologico è previsto tra sette giorni.", text_de:"Kardiologische Kontrolle in sieben Tagen.", on:true, action:true },
  ],

  events: [
    { icon:"🩸", title_it:"Giornata della donazione del sangue", title_de:"Blutspendetag", date:"24.08.2026", time:"17:00–19:00", place_it:"Centro Sanitario Bregaglia", place_de:"Gesundheitszentrum Bergell", desc_it:"Un gesto semplice che salva vite.", desc_de:"Eine einfache Geste, die Leben rettet." },
    { icon:"💪", title_it:"Corso: movimento in età avanzata", title_de:"Kurs: Bewegung im Alter", date:"05.09.2026", time:"14:00–15:30", place_it:"Palestra fisioterapia", place_de:"Physio-Fitnessraum", desc_it:"Esercizi dolci con la fisioterapista.", desc_de:"Sanfte Übungen mit der Physiotherapeutin." },
    { icon:"🩺", title_it:"Giornata informativa sulla salute", title_de:"Gesundheits-Infotag", date:"20.09.2026", time:"09:00–12:00", place_it:"Sala eventi CSB", place_de:"Veranstaltungssaal CSB", desc_it:"Misurazioni gratuite e consigli.", desc_de:"Kostenlose Messungen und Beratung." },
    { icon:"🎶", title_it:"Pomeriggio musicale in casa anziani", title_de:"Musiknachmittag im Altersheim", date:"28.09.2026", time:"15:30", place_it:"Casa anziani – sala comune", place_de:"Altersheim – Gemeinschaftsraum", desc_it:"Aperto a familiari e ospiti.", desc_de:"Offen für Angehörige und Gäste." },
  ],

  contacts: [
    { icon:"☎️", label_it:"Centralino", label_de:"Zentrale", value:"+41 81 822 00 00", emergency:false },
    { icon:"🚑", label_it:"Emergenze", label_de:"Notfall", value:"144", emergency:true },
    { icon:"🩺", label_it:"Studio medico", label_de:"Arztpraxis", value:"+41 81 822 00 10", emergency:false },
    { icon:"🤸", label_it:"Fisioterapia", label_de:"Physiotherapie", value:"+41 81 822 00 20", emergency:false },
    { icon:"🏠", label_it:"Spitex", label_de:"Spitex", value:"+41 81 822 00 30", emergency:false },
    { icon:"☕", label_it:"Caffetteria", label_de:"Cafeteria", value:"+41 81 822 00 40", emergency:false },
    { icon:"🧺", label_it:"Lavanderia", label_de:"Wäscherei", value:"+41 81 822 00 50", emergency:false },
    { icon:"📋", label_it:"Amministrazione", label_de:"Verwaltung", value:"+41 81 822 00 60", emergency:false },
  ],

  // Casa anziani – diario area famiglia
  careHomeDiary: [
    { icon:"☕", text_it:"Colazione consumata regolarmente.", text_de:"Frühstück regelmässig eingenommen." },
    { icon:"👥", text_it:"Partecipazione all'attività di gruppo.", text_de:"Teilnahme an der Gruppenaktivität." },
    { icon:"🚶", text_it:"Passeggiata accompagnata nel pomeriggio.", text_de:"Begleiteter Spaziergang am Nachmittag." },
    { icon:"🤸", text_it:"Visita fisioterapica effettuata.", text_de:"Physiotherapie durchgeführt." },
    { icon:"✉️", text_it:"Messaggio del reparto disponibile.", text_de:"Mitteilung der Abteilung verfügbar." },
  ],

  // Messaggi predefiniti per la chat
  chatPresets: {
    laundry: [
      { from:"me", it:"Buongiorno, vorrei sapere se la biancheria sarà pronta entro venerdì.", de:"Guten Tag, ist die Wäsche bis Freitag bereit?", time:"09:12" },
      { from:"them", it:"Buongiorno, confermiamo che sarà pronta venerdì dalle ore 14:00.", de:"Guten Tag, wir bestätigen: bereit ab Freitag 14:00 Uhr.", time:"09:20" },
    ],
    default: [
      { from:"them", it:"Buongiorno, come possiamo aiutarla?", de:"Guten Tag, wie können wir helfen?", time:"08:00" },
    ]
  },
};

const CHAT_SERVICES = [
  { id:"medical", icon:"🩺", key:"s_medical" },
  { id:"physio", icon:"🤸", key:"s_physio" },
  { id:"spitex", icon:"🏠", key:"s_spitex" },
  { id:"carehome", icon:"🌳", key:"s_home" },
  { id:"cafe", icon:"☕", key:"s_cafe" },
  { id:"laundry", icon:"🧺", key:"s_laundry" },
  { id:"admin", icon:"📋", key:"s_contacts" },
];
