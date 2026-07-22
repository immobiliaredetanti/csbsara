# MyCSB – Prototipo

**Tutti i servizi del Centro Sanitario Bregaglia in un unico luogo.**

Prototipo dimostrativo (web app responsive) realizzato per il concorso interno di
idee innovative. Presenta il Centro Sanitario Bregaglia come un unico punto di
accesso digitale per cittadini, pazienti, familiari e clienti esterni.

> ⚠️ Prototipo dimostrativo. Tutti i dati sono **fittizi**. Nessun collegamento a
> sistemi reali, nessun dato sanitario autentico.

---

## Come aprire il prototipo

Non serve alcuna installazione: è una web app statica (HTML/CSS/JavaScript).

- **Modo più semplice:** apri il file `index.html` con un doppio clic nel browser.
- **Da smartphone / con QR code:** pubblica la cartella su un hosting statico
  (es. GitHub Pages) e genera un QR code che punta all'indirizzo. La schermata
  iniziale del prototipo simula già l'accesso tramite QR code.
- **Server locale (opzionale):**
  ```bash
  python3 -m http.server 8000
  # poi apri http://localhost:8000
  ```

Responsive: ottimizzata per smartphone, utilizzabile anche da desktop (viene
mostrata dentro una cornice tipo telefono).

---

## Struttura del progetto

```
index.html        Contenitore dell'app
css/styles.css    Design system (palette bianco/beige/marrone/crema)
js/data.js        Dati dimostrativi e traduzioni IT / DE
js/app.js         Router, viste e interazioni
```

---

## Caratteristiche

- **Bilingue IT / DE** con pulsante di cambio lingua in ogni schermata.
- **Doppio accesso:** pubblico (servizi, orari, menù, eventi, contatti) e
  personale (documenti, appuntamenti, fatture) con codice dimostrativo **1234**
  e 2FA simulata.
- **Navigazione inferiore** a 5 sezioni: Home, Servizi, Prenotazioni, Notifiche, Profilo.
- **Design** pulito, rassicurante, pensato anche per persone anziane: testi
  leggibili, pulsanti grandi, icone intuitive, pochi passaggi.

### Percorsi cliccabili simulati

Accesso via QR code · Home · Menù caffetteria · Prenotazione pasto a domicilio ·
Prenotazione visita medica · Richiesta fisioterapia · Richiesta Spitex ·
Area famiglia (codice **1234**) · Consultazione referto · Visualizzazione fattura ·
Notifiche · Messaggio alla lavanderia · Specialisti · Promemoria sanitari.

### Servizi inclusi

Studio medico · Fisioterapia · Spitex · Casa anziani (+ Area famiglia) ·
Caffetteria · Pasti a domicilio · Lavanderia · Specialisti e dentista ·
Promemoria sanitari · Area personale · Notifiche · Eventi e novità ·
Contatti e numeri utili · Messaggistica sicura.

### Utente dimostrativo

Maria Rossi · nata il 15.03.1958 · numero utente CSB-000125.
Familiare assistito: Giuseppe Rossi (Casa anziani → Area famiglia).

---

## Sviluppi futuri (non inclusi nel prototipo)

Pagamenti online · integrazione con calendario personale · autenticazione
avanzata · traduzione completa · collegamento reale ai software CSB
(cartella clinica, fatturazione, KomedHealth, firma elettronica).

---

## Codici di prova

| Cosa | Codice |
|------|--------|
| Accesso area personale | `1234` (qualsiasi codice accettato nel prototipo) |
| Accesso area famiglia | `1234` |
