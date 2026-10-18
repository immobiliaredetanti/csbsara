/* =========================================================
   MyCSB v2 – Dati dimostrativi e traduzioni (IT / DE)
   Concept dimostrativo. Nessun dato clinico o sanitario.
   ========================================================= */

/* ----------------------- i18n (UI) ----------------------- */
const I18N = {
  it: {
    lang_name: "Italiano",
    subtitle: "Il Centro Sanitario Bregaglia sempre con te",
    welcome_title: "Benvenuto in MyCSB",
    welcome_msg: "Scopri, prenota e utilizza i servizi del Centro Sanitario Bregaglia in modo semplice e veloce.",
    claim: "Un solo accesso. Tutti i servizi. Sempre con te.",
    claim_sub: "Scopri, prenota e vivi i servizi del Centro Sanitario Bregaglia in modo semplice.",
    // nav
    nav_home: "Home", nav_services: "Servizi", nav_bookings: "Prenotazioni",
    nav_notifications: "Notifiche", nav_profile: "Profilo",
    // generico
    search_ph: "Cosa stai cercando?",
    featured: "In evidenza",
    main_services: "Servizi principali",
    book: "Prenota", order: "Ordina", takeaway: "Ordina Takeaway",
    subscribe: "Iscriviti", request: "Richiedi", pay: "Paga",
    contact: "Contatta", send: "Invia", cancel: "Annulla", confirm: "Conferma",
    close: "Chiudi", next: "Avanti", save: "Salva", view: "Visualizza",
    add_cart: "Aggiungi al carrello", modify: "Modifica", suspend: "Sospendi",
    info: "Informazioni", call: "Chiama", email: "E-mail", directions: "Indicazioni",
    login: "Accedi", logout: "Esci", add_calendar: "Aggiungi al calendario",
    remind: "Ricordamelo", remind_later: "Ricordamelo più tardi", discover: "Scopri",
    participate: "Partecipo", note_opt: "Note (facoltative)", quantity: "Quantità",
    pickup_time: "Orario di ritiro", day: "Giorno", select: "Seleziona",
    request_sent: "Richiesta inviata", request_sent_sub: "La richiesta verrà verificata e confermata dal servizio.",
    // stati
    st_available: "disponibile", st_full: "completo", st_pending: "In attesa di conferma",
    st_confirmed: "Confermato", st_received: "Ricevuto", st_processing: "In lavorazione",
    st_ready: "Pronto", st_cancelled: "Annullato", st_upcoming: "Prossime", st_past: "Passate",
    // conferme
    order_confirmed: "Ordine confermato", order_ready_msg: "Il tuo ordine è pronto per il ritiro.",
    lunch_booked: "Il tuo pranzo è stato prenotato.", pay_success: "Pagamento effettuato con successo",
    places_left: "posti disponibili",
    // carrello
    cart: "Carrello", cart_empty: "Il carrello è vuoto", total: "Totale",
    checkout: "Vai al pagamento", pay_method: "Metodo di pagamento",
    receipts: "Le mie ricevute",
    // sezioni
    s_eat: "Mangiare & ordinare", s_health: "Salute & prevenzione",
    s_physio: "Fisioterapia & movimento", s_spitex: "Spitex",
    s_laundry: "Lavanderia", s_carehome: "Casa anziani",
    s_events: "Eventi & novità", s_specialists: "Specialisti", s_contacts: "Contatti",
    s_cafeteria: "Caffetteria", s_stafflunch: "Pranzo collaboratori",
    s_mealshome: "Pasti a domicilio", s_health_doctor: "Studio medico",
    s_reminders: "I miei promemoria",
    // area personale
    my_bookings: "Le mie prenotazioni", my_orders: "I miei ordini",
    preferences: "Preferenze", privacy: "Privacy", language: "Lingua",
    good_morning: "Buongiorno", today_for_you: "Oggi per te",
    next_appt: "Prossimo appuntamento",
    concept_badge: "Concept dimostrativo",
    concept_text: "Le funzionalità illustrate rappresentano una proposta progettuale. Servizi, modalità operative, integrazioni, prenotazioni e pagamenti saranno definiti e validati con i rispettivi settori in caso di sviluppo del progetto.",
    login_needed: "Per questa funzione è necessario accedere.",
    weekly_menu: "Menù settimanale", week_plan: "Piano settimanale", modify_week: "Modifica settimana",
    gym_calendar: "Calendario palestra", courses: "Corsi",
    order_tracking: "Stato ordine", my_messages: "Messaggi",
  },
  de: {
    lang_name: "Deutsch",
    subtitle: "Das Gesundheitszentrum Bergell immer bei dir",
    welcome_title: "Willkommen bei MyCSB",
    welcome_msg: "Entdecke, buche und nutze die Dienste des Gesundheitszentrums Bergell – einfach und schnell.",
    claim: "Ein Zugang. Alle Dienste. Immer bei dir.",
    claim_sub: "Entdecke, buche und erlebe die Dienste des Gesundheitszentrums Bergell – ganz einfach.",
    nav_home: "Home", nav_services: "Dienste", nav_bookings: "Buchungen",
    nav_notifications: "Mitteilungen", nav_profile: "Profil",
    search_ph: "Wonach suchst du?",
    featured: "Aktuell",
    main_services: "Hauptdienste",
    book: "Buchen", order: "Bestellen", takeaway: "Take-away bestellen",
    subscribe: "Anmelden", request: "Anfragen", pay: "Bezahlen",
    contact: "Kontakt", send: "Senden", cancel: "Abbrechen", confirm: "Bestätigen",
    close: "Schliessen", next: "Weiter", save: "Speichern", view: "Ansehen",
    add_cart: "In den Warenkorb", modify: "Ändern", suspend: "Pausieren",
    info: "Informationen", call: "Anrufen", email: "E-Mail", directions: "Route",
    login: "Anmelden", logout: "Abmelden", add_calendar: "Zum Kalender",
    remind: "Erinnern", remind_later: "Später erinnern", discover: "Entdecken",
    participate: "Ich nehme teil", note_opt: "Anmerkungen (optional)", quantity: "Menge",
    pickup_time: "Abholzeit", day: "Tag", select: "Auswählen",
    request_sent: "Anfrage gesendet", request_sent_sub: "Die Anfrage wird vom Dienst geprüft und bestätigt.",
    st_available: "frei", st_full: "ausgebucht", st_pending: "Wartet auf Bestätigung",
    st_confirmed: "Bestätigt", st_received: "Erhalten", st_processing: "In Bearbeitung",
    st_ready: "Bereit", st_cancelled: "Storniert", st_upcoming: "Nächste", st_past: "Vergangene",
    order_confirmed: "Bestellung bestätigt", order_ready_msg: "Deine Bestellung ist abholbereit.",
    lunch_booked: "Dein Mittagessen wurde gebucht.", pay_success: "Zahlung erfolgreich",
    places_left: "freie Plätze",
    cart: "Warenkorb", cart_empty: "Der Warenkorb ist leer", total: "Total",
    checkout: "Zur Zahlung", pay_method: "Zahlungsmethode",
    receipts: "Meine Belege",
    s_eat: "Essen & bestellen", s_health: "Gesundheit & Vorsorge",
    s_physio: "Physiotherapie & Bewegung", s_spitex: "Spitex",
    s_laundry: "Wäscherei", s_carehome: "Altersheim",
    s_events: "Veranstaltungen", s_specialists: "Fachärzte", s_contacts: "Kontakte",
    s_cafeteria: "Cafeteria", s_stafflunch: "Mitarbeiter-Mittagessen",
    s_mealshome: "Mahlzeiten nach Hause", s_health_doctor: "Arztpraxis",
    s_reminders: "Meine Erinnerungen",
    my_bookings: "Meine Buchungen", my_orders: "Meine Bestellungen",
    preferences: "Einstellungen", privacy: "Datenschutz", language: "Sprache",
    good_morning: "Guten Morgen", today_for_you: "Heute für dich",
    next_appt: "Nächster Termin",
    concept_badge: "Demonstrations-Konzept",
    concept_text: "Die gezeigten Funktionen sind ein Projektvorschlag. Dienste, Abläufe, Integrationen, Buchungen und Zahlungen werden bei einer Umsetzung mit den jeweiligen Bereichen definiert und validiert.",
    login_needed: "Für diese Funktion ist eine Anmeldung nötig.",
    weekly_menu: "Wochenmenü", week_plan: "Wochenplan", modify_week: "Woche ändern",
    gym_calendar: "Fitnessraum-Kalender", courses: "Kurse",
    order_tracking: "Bestellstatus", my_messages: "Nachrichten",
  }
};

/* --------------------- Dati demo --------------------- */
const DATA = {
  user: { name: "Anna Rossi", initials: "AR", staff: true, userId: "CSB-000208" },

  // Card servizi della home (9)
  services: [
    { id:"eat",         icon:"🍽️", key:"s_eat",         sub_it:"Caffetteria, pranzo e pasti a domicilio", sub_de:"Cafeteria, Mittagessen, Lieferung" },
    { id:"health",      icon:"🩺", key:"s_health",      sub_it:"Studio medico e prevenzione", sub_de:"Arztpraxis und Vorsorge" },
    { id:"physio",      icon:"🤸", key:"s_physio",      sub_it:"Trattamenti, palestra e corsi", sub_de:"Therapie, Fitnessraum, Kurse" },
    { id:"spitex",      icon:"🏠", key:"s_spitex",      sub_it:"Assistenza a domicilio", sub_de:"Hauspflege" },
    { id:"laundry",     icon:"🧺", key:"s_laundry",     sub_it:"Anche per clienti esterni", sub_de:"Auch für externe Kunden" },
    { id:"carehome",    icon:"🌳", key:"s_carehome",    sub_it:"Vita, attività ed eventi", sub_de:"Leben, Aktivitäten, Events" },
    { id:"events",      icon:"📅", key:"s_events",      sub_it:"La bacheca del CSB", sub_de:"Die Pinnwand des CSB" },
    { id:"specialists", icon:"🩻", key:"s_specialists", sub_it:"Specialisti e dentista partner", sub_de:"Fachärzte und Zahnarzt" },
    { id:"contacts",    icon:"📞", key:"s_contacts",    sub_it:"Tutti i numeri utili", sub_de:"Alle nützlichen Nummern" },
  ],

  // In evidenza (home)
  featured: [
    { icon:"🍲", tag_it:"Caffetteria", tag_de:"Cafeteria", title_it:"Menù di oggi", title_de:"Tagesmenü", go:["service","cafeteria"] },
    { icon:"🧴", tag_it:"Specialisti", tag_de:"Fachärzte", title_it:"Il dermatologo sarà presente il 15 ottobre", title_de:"Der Hautarzt ist am 15. Oktober da", go:["service","specialists"] },
    { icon:"🤸", tag_it:"Movimento", tag_de:"Bewegung", title_it:"Nuovo corso di ginnastica dolce", title_de:"Neuer Kurs: sanfte Gymnastik", go:["service","physio"] },
    { icon:"🍂", tag_it:"Casa anziani", tag_de:"Altersheim", title_it:"Festa d'autunno alla Casa anziani", title_de:"Herbstfest im Altersheim", go:["service","carehome"] },
    { icon:"🧺", tag_it:"Novità", tag_de:"Neu", title_it:"Scopri il servizio lavanderia", title_de:"Entdecke die Wäscherei", go:["service","laundry"] },
  ],

  // Caffetteria
  cafeMenuDay: {
    items: [
      { it:"Risotto ai funghi", de:"Pilz-Risotto" },
      { it:"Brasato con polenta", de:"Schmorbraten mit Polenta" },
      { it:"Verdure di stagione", de:"Saisongemüse" },
      { it:"Dessert della casa", de:"Hausdessert" },
    ],
    price: 18.00
  },
  cafeWeek: [
    { d_it:"Lunedì", d_de:"Montag", m_it:"Minestrone · Arrosto di vitello · Macedonia", m_de:"Minestrone · Kalbsbraten · Obstsalat" },
    { d_it:"Martedì", d_de:"Dienstag", m_it:"Risotto ai funghi · Brasato con polenta · Dessert", m_de:"Pilz-Risotto · Schmorbraten · Dessert" },
    { d_it:"Mercoledì", d_de:"Mittwoch", m_it:"Pasta al pomodoro · Pollo al forno · Torta", m_de:"Tomatenpasta · Ofenhähnchen · Kuchen" },
    { d_it:"Giovedì", d_de:"Donnerstag", m_it:"Zuppa d'orzo · Polenta e formaggio · Frutta", m_de:"Gerstensuppe · Polenta mit Käse · Obst" },
    { d_it:"Venerdì", d_de:"Freitag", m_it:"Crema di zucca · Filetto di pesce · Gelato", m_de:"Kürbissuppe · Fischfilet · Glace" },
  ],
  cafeTimes: "11:30 – 13:30",

  // Pranzo collaboratori
  staffLunch: [
    { id:"A", name_it:"Menù A – Brasato con polenta", name_de:"Menü A – Schmorbraten mit Polenta" },
    { id:"B", name_it:"Menù B – Filetto di pesce e patate", name_de:"Menü B – Fischfilet mit Kartoffeln" },
    { id:"V", name_it:"Vegetariano – Sformato di verdure", name_de:"Vegetarisch – Gemüseauflauf" },
  ],

  // Pasti a domicilio
  mealsHomePrice: 16.50,
  mealsZones_it: "Promontogno, Bondo, Soglio, Vicosoprano, Stampa, Maloja",
  mealsZones_de: "Promontogno, Bondo, Soglio, Vicosoprano, Stampa, Maloja",

  // Studio medico
  doctors: [
    { name:"Dr. med. Hausarzt", role_it:"Medicina generale", role_de:"Allgemeinmedizin" },
    { name:"Studio medico Promontogno", role_it:"Ambulatorio", role_de:"Ambulatorium" },
    { name:"Studio medico Maloja", role_it:"Ambulatorio", role_de:"Ambulatorium" },
  ],
  visitTypes: [
    { it:"Visita generale", de:"Allgemeine Untersuchung" },
    { it:"Controllo", de:"Kontrolle" },
    { it:"Vaccinazione", de:"Impfung" },
    { it:"Certificato", de:"Attest" },
  ],
  timeSlots: ["08:00","08:30","09:00","10:30","11:00","14:00","15:30","16:00"],

  // Specialisti
  specialists: [
    { icon:"🧴", field_it:"Dermatologia", field_de:"Dermatologie", next:"15.10.2026", partner:false },
    { icon:"❤️", field_it:"Cardiologia", field_de:"Kardiologie", next:"22.10.2026", partner:false },
    { icon:"🫁", field_it:"Pneumologia", field_de:"Pneumologie", next:"05.11.2026", partner:false },
    { icon:"🌸", field_it:"Ginecologia", field_de:"Gynäkologie", next:"29.10.2026", partner:false },
    { icon:"🦷", field_it:"Dentista", field_de:"Zahnarzt", next:"su appuntamento", next_de:"nach Vereinbarung", partner:true },
    { icon:"👁️", field_it:"Oftalmologia", field_de:"Augenheilkunde", next:"12.11.2026", partner:false },
  ],

  // Promemoria salute (volontari)
  reminders: [
    { id:"r1", icon:"🌸", title_it:"Controllo ginecologico", title_de:"Gynäkologische Kontrolle", every_it:"ogni 12 mesi", every_de:"alle 12 Monate", on:true },
    { id:"r2", icon:"🧴", title_it:"Controllo dermatologico", title_de:"Dermatologische Kontrolle", every_it:"ogni 12 mesi", every_de:"alle 12 Monate", on:true },
    { id:"r3", icon:"🦷", title_it:"Igiene dentale", title_de:"Dentalhygiene", every_it:"ogni 6 mesi", every_de:"alle 6 Monate", on:false },
    { id:"r4", icon:"🩸", title_it:"Donazione sangue", title_de:"Blutspende", every_it:"avvisami alle nuove giornate", every_de:"bei neuen Terminen benachrichtigen", on:true },
  ],

  // Fisioterapia – palestra
  gymSlots: [
    { day_it:"Martedì", day_de:"Dienstag", time:"10:00", free:true },
    { day_it:"Martedì", day_de:"Dienstag", time:"11:00", free:false },
    { day_it:"Martedì", day_de:"Dienstag", time:"14:00", free:true },
    { day_it:"Giovedì", day_de:"Donnerstag", time:"09:30", free:true },
    { day_it:"Giovedì", day_de:"Donnerstag", time:"16:00", free:true },
  ],
  physioTreatments: [
    { it:"Fisioterapia individuale", de:"Einzel-Physiotherapie" },
    { it:"Terapia manuale", de:"Manuelle Therapie" },
    { it:"Riabilitazione", de:"Rehabilitation" },
    { it:"Linfodrenaggio", de:"Lymphdrainage" },
  ],
  courses: [
    { icon:"🧘", title_it:"Ginnastica dolce", title_de:"Sanfte Gymnastik", when_it:"Martedì ore 09:30", when_de:"Dienstag 09:30", places:8, price:15.00 },
    { icon:"💪", title_it:"Movimento in età avanzata", title_de:"Bewegung im Alter", when_it:"Giovedì ore 14:00", when_de:"Donnerstag 14:00", places:5, price:15.00 },
    { icon:"🤸", title_it:"Equilibrio e postura", title_de:"Gleichgewicht & Haltung", when_it:"Venerdì ore 10:00", when_de:"Freitag 10:00", places:6, price:18.00 },
  ],

  // Spitex
  spitexServices: [
    { it:"Assistenza domiciliare", de:"Hauspflege" },
    { it:"Cure a domicilio", de:"Pflege zu Hause" },
    { it:"Aiuto domestico e spesa", de:"Haushalt und Einkauf" },
    { it:"Accompagnamento", de:"Begleitung" },
  ],

  // Lavanderia
  laundryServices: [
    { it:"Lavaggio e stiratura biancheria", de:"Waschen und Bügeln", price:"CHF 8.–/kg" },
    { it:"Capi delicati", de:"Feinwäsche", price:"CHF 12.–/kg" },
    { it:"Coperte e piumini", de:"Decken und Duvets", price:"CHF 25.–/Stk" },
    { it:"Stiratura camicie", de:"Hemden bügeln", price:"CHF 4.–/Stk" },
  ],
  laundryOrders: [
    { id:"L-1254", date:"14.10.2026", status:2, amount:32.50 }, // 0 ric, 1 lav, 2 pronto
    { id:"L-1248", date:"02.10.2026", status:2, amount:24.00 },
  ],
  laundryChat: [
    { from:"me", it:"Buongiorno, posso consegnare la biancheria martedì?", de:"Guten Tag, kann ich die Wäsche am Dienstag bringen?", time:"08:40" },
    { from:"them", it:"Buongiorno, certamente. Può consegnarla dalle ore 08:00.", de:"Guten Tag, gerne. Sie können sie ab 08:00 Uhr bringen.", time:"08:52" },
  ],

  // Casa anziani
  careActivities: [
    { d_it:"Lunedì", d_de:"Montag", a_it:"Ginnastica", a_de:"Gymnastik", icon:"🤸" },
    { d_it:"Martedì", d_de:"Dienstag", a_it:"Attività creativa", a_de:"Kreatives", icon:"🎨" },
    { d_it:"Mercoledì", d_de:"Mittwoch", a_it:"Musica", a_de:"Musik", icon:"🎶" },
    { d_it:"Giovedì", d_de:"Donnerstag", a_it:"Passeggiata", a_de:"Spaziergang", icon:"🚶" },
    { d_it:"Venerdì", d_de:"Freitag", a_it:"Tombola", a_de:"Tombola", icon:"🎱" },
  ],
  careEvents: [
    { icon:"🍂", title_it:"Festa d'autunno", title_de:"Herbstfest", date:"17.10.2026", time:"14:30", place:"Centro Sanitario Bregaglia", note_it:"I familiari sono cordialmente invitati.", note_de:"Angehörige sind herzlich eingeladen." },
    { icon:"🎶", title_it:"Pomeriggio musicale", title_de:"Musiknachmittag", date:"31.10.2026", time:"15:30", place:"Sala comune", note_it:"Aperto a familiari e ospiti.", note_de:"Offen für Angehörige und Gäste." },
  ],

  // Eventi & novità (bacheca)
  eventCats: [
    {id:"all", it:"Tutti", de:"Alle"},
    {id:"eventi", it:"Eventi", de:"Events"},
    {id:"salute", it:"Salute", de:"Gesundheit"},
    {id:"carehome", it:"Casa anziani", de:"Altersheim"},
    {id:"physio", it:"Fisioterapia", de:"Physio"},
    {id:"cafe", it:"Caffetteria", de:"Cafeteria"},
    {id:"novita", it:"Novità", de:"Neu"},
    {id:"corsi", it:"Corsi", de:"Kurse"},
    {id:"territorio", it:"Territorio", de:"Region"},
  ],
  events: [
    { cat:"salute", icon:"🩸", title_it:"Giornata donazione sangue", title_de:"Blutspendetag", date:"24.10.2026", time:"17:00–19:00", desc_it:"Un gesto semplice che salva vite.", desc_de:"Eine einfache Geste, die Leben rettet." },
    { cat:"corsi", icon:"🧘", title_it:"Nuovo corso di ginnastica dolce", title_de:"Neuer Kurs: sanfte Gymnastik", date:"28.10.2026", time:"09:30", desc_it:"Esercizi dolci con la fisioterapista.", desc_de:"Sanfte Übungen mit der Physiotherapeutin." },
    { cat:"carehome", icon:"🍂", title_it:"Festa alla Casa anziani", title_de:"Fest im Altersheim", date:"17.10.2026", time:"14:30", desc_it:"Pomeriggio di festa aperto ai familiari.", desc_de:"Festnachmittag für Angehörige." },
    { cat:"salute", icon:"🧴", title_it:"Nuovo specialista presente al CSB", title_de:"Neuer Facharzt am CSB", date:"15.10.2026", time:"", desc_it:"Il dermatologo sarà presente al CSB.", desc_de:"Der Hautarzt ist am CSB anwesend." },
    { cat:"cafe", icon:"🍲", title_it:"Nuovo menù stagionale", title_de:"Neues Saisonmenü", date:"20.10.2026", time:"", desc_it:"Piatti autunnali in caffetteria.", desc_de:"Herbstgerichte in der Cafeteria." },
  ],

  // Notifiche
  notifications: [
    { id:"n1", icon:"🥡", cat:"cafe", title_it:"Il tuo takeaway è pronto.", title_de:"Dein Take-away ist bereit.", time_it:"5 min fa", time_de:"vor 5 Min.", unread:true },
    { id:"n2", icon:"🧺", cat:"laundry", title_it:"La lavanderia ha completato il tuo ordine.", title_de:"Die Wäscherei hat deine Bestellung erledigt.", time_it:"1 ora fa", time_de:"vor 1 Std.", unread:true },
    { id:"n3", icon:"🏋️", cat:"physio", title_it:"Domani hai prenotato la palestra alle 10:00.", title_de:"Morgen hast du den Fitnessraum um 10:00 gebucht.", time_it:"2 ore fa", time_de:"vor 2 Std.", unread:true },
    { id:"n4", icon:"📅", cat:"events", title_it:"Nuovo evento CSB disponibile.", title_de:"Neue CSB-Veranstaltung verfügbar.", time_it:"Ieri", time_de:"Gestern", unread:false },
    { id:"n5", icon:"🧴", cat:"specialists", title_it:"Il dermatologo sarà presente al CSB il 15 ottobre.", title_de:"Der Hautarzt ist am 15. Oktober am CSB.", time_it:"Ieri", time_de:"Gestern", unread:false },
    { id:"n6", icon:"🍲", cat:"meals", title_it:"Il tuo pasto a domicilio di domani è confermato.", title_de:"Deine Mahlzeit für morgen ist bestätigt.", time_it:"2 giorni fa", time_de:"vor 2 Tagen", unread:false },
    { id:"n7", icon:"🔔", cat:"reminders", title_it:"È arrivato il momento del promemoria che avevi impostato.", title_de:"Deine eingestellte Erinnerung ist fällig.", time_it:"2 giorni fa", time_de:"vor 2 Tagen", unread:false },
  ],
  notifPrefs: [
    { id:"p_orders", it:"Ordini e takeaway", de:"Bestellungen & Take-away", on:true },
    { id:"p_book", it:"Prenotazioni", de:"Buchungen", on:true },
    { id:"p_laundry", it:"Lavanderia", de:"Wäscherei", on:true },
    { id:"p_events", it:"Eventi e novità", de:"Veranstaltungen", on:true },
    { id:"p_reminders", it:"Promemoria salute", de:"Gesundheits-Erinnerungen", on:true },
  ],

  // Prenotazioni iniziali (demo)
  bookings: [
    { icon:"🏋️", title_it:"Palestra", title_de:"Fitnessraum", when_it:"Domani · 10:00", when_de:"Morgen · 10:00", status:"confirmed" },
    { icon:"🤸", title_it:"Fisioterapia individuale", title_de:"Einzel-Physiotherapie", when_it:"Mar 20.10 · 11:00", when_de:"Di 20.10 · 11:00", status:"confirmed" },
    { icon:"🩺", title_it:"Richiesta visita medica", title_de:"Arzttermin-Anfrage", when_it:"Preferenza: Gio mattina", when_de:"Wunsch: Do Vormittag", status:"pending" },
    { icon:"🧴", title_it:"Visita dermatologica", title_de:"Hautarzt-Termin", when_it:"15.10.2026 · 14:00", when_de:"15.10.2026 · 14:00", status:"confirmed" },
  ],
  bookingsPast: [
    { icon:"🥡", title_it:"Takeaway caffetteria", title_de:"Take-away Cafeteria", when_it:"10.10.2026", when_de:"10.10.2026" },
    { icon:"🧺", title_it:"Ordine lavanderia L-1248", title_de:"Wäscherei-Auftrag L-1248", when_it:"02.10.2026", when_de:"02.10.2026" },
  ],

  // Ricevute (demo)
  receipts: [
    { date:"10.10.2026", desc_it:"Takeaway caffetteria", desc_de:"Take-away Cafeteria", amount:18.00 },
    { date:"02.10.2026", desc_it:"Lavanderia L-1248", desc_de:"Wäscherei L-1248", amount:24.00 },
  ],

  // Contatti ufficiali CSB
  contacts: [
    { icon:"🌳", label_it:"Centro Sanitario Bregaglia", label_de:"Gesundheitszentrum Bergell", value:"+41 81 838 11 99" },
    { icon:"🩺", label_it:"Studio medico", label_de:"Arztpraxis", value:"+41 81 838 11 45" },
    { icon:"🤸", label_it:"Fisioterapia", label_de:"Physiotherapie", value:"+41 81 838 11 25" },
    { icon:"🏠", label_it:"Spitex", label_de:"Spitex", value:"+41 81 822 18 04" },
    { icon:"🌳", label_it:"Casa anziani", label_de:"Altersheim", value:"+41 81 838 11 90" },
    { icon:"☕", label_it:"Caffetteria", label_de:"Cafeteria", value:"+41 81 838 11 99" },
    { icon:"🧺", label_it:"Lavanderia", label_de:"Wäscherei", value:"+41 81 838 11 99" },
    { icon:"📋", label_it:"Amministrazione", label_de:"Verwaltung", value:"+41 81 838 11 99" },
    { icon:"🩻", label_it:"Specialisti", label_de:"Fachärzte", value:"+41 81 838 11 45" },
  ],
  org: {
    address_it: "Flin 5, 7606 Promontogno (GR)",
    address2_it: "Sede Maloja: Strada Cantonale 370, 7516 Maloja",
    email: "info@csbregaglia.ch", web: "www.csbregaglia.ch",
  },

  payMethods: [
    { id:"twint", label:"TWINT", icon:"📱" },
    { id:"card", label_it:"Carta di credito", label_de:"Kreditkarte", icon:"💳" },
    { id:"invoice", label_it:"Fattura", label_de:"Rechnung", icon:"🧾" },
  ],
};
