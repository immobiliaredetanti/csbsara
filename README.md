# MyCSB – Prototipo (Concept dimostrativo)

**Un solo accesso. Tutti i servizi. Sempre con te.**
*Il Centro Sanitario Bregaglia sempre con te.*

MyCSB è lo **sportello digitale** dei servizi del Centro Sanitario Bregaglia:
una web app semplice e intuitiva con cui cittadini, utenti, familiari,
collaboratori e clienti esterni possono **scoprire, consultare, prenotare e
(dove previsto) acquistare** i servizi del CSB.

> ⚠️ **Concept dimostrativo.** Dati fittizi. Non è una cartella clinica, non
> contiene referti né dati sanitari, e non sostituisce i software o gli
> strumenti di comunicazione interni del CSB. Servizi, integrazioni, prenotazioni
> e pagamenti saranno definiti con i rispettivi settori in caso di sviluppo.

## Come aprire

Web app statica (HTML/CSS/JS), nessuna installazione.
- Doppio clic su `index.html`, oppure
- Online (GitHub Pages): https://immobiliaredetanti.github.io/csbsara/
- Server locale: `python3 -m http.server 8000`

## Struttura

```
index.html        Contenitore (logo, font Lato)
css/styles.css    Design system (palette CSB: bianco/crema/beige/tortora/bordeaux)
js/data.js        Dati demo e traduzioni IT/DE
js/app.js         Router, viste, carrello/pagamenti, ricerca, interazioni
assets/           Logo ufficiale CSB + QR code
```

## Caratteristiche

- **Bilingue IT / DE** con selettore in ogni schermata.
- **Identità visiva** allineata al sito ufficiale csbregaglia.ch (logo albero,
  palette tortora/bordeaux/crema, font umanista).
- **Accesso pubblico** per consultare servizi, menù, specialisti, eventi,
  orari e contatti; **account demo** (Anna Rossi) richiesto solo per prenotare,
  ordinare, pagare, gestire lavanderia, promemoria e le proprie prenotazioni.
- **Home personalizzata** dopo il login ("Buongiorno Anna", "Oggi per te").

### Sezioni

Mangiare & ordinare (Caffetteria · Pranzo collaboratori · Pasti a domicilio) ·
Salute & prevenzione (Studio medico) · Specialisti · I miei promemoria ·
Fisioterapia & movimento (palestra + corsi) · Spitex · Lavanderia (anche per
clienti esterni, con tracking e messaggistica) · Casa anziani · Eventi & novità ·
Notifiche · Prenotazioni · Pagamenti e ricevute · Area personale · Contatti ·
Ricerca.

### Percorsi interattivi simulati

Menù del giorno · ordine takeaway · pranzo collaboratori · pasti a domicilio
(piano settimanale) · richiesta visita medica · presenza specialisti ·
promemoria salute · prenotazione palestra · iscrizione a un corso · richiesta
Spitex · servizio e messaggistica lavanderia · tracking ordine · iscrizione
eventi · partecipazione eventi Casa anziani · notifiche · le mie prenotazioni ·
**pagamento simulato** (carrello → metodo → ricevuta).

### Utente demo

Anna Rossi — accesso con un clic (login dimostrativo).
