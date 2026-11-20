# 📺 Smart Stream TV

## 1. Présentation du projet

**Smart Stream TV** est une application web qui permet de consulter et regarder des chaînes de télévision de différents pays.

L'utilisateur peut :
- Afficher les chaînes selon leur pays.
- Rechercher une chaîne par son nom ou son numéro.
- Ajouter une nouvelle chaîne.
- Ajouter ou retirer une chaîne des favoris.
- Bloquer et supprimer des chaînes.
- Consulter les informations d'une chaîne : catégorie, programme, horaires et numéro.
- Lire les chaînes vidéo en direct.

## 2. Technologies utilisées

| Technologie | Utilisation dans le projet |
|---|---|
| HTML5 | Structure de la page et formulaires. |
| Tailwind CSS | Mise en forme avec des classes utilitaires. |
| JavaScript ES6+ | Gestion des événements et interactions. |
| Fetch API | Communication avec l'API. |
| MockAPI | Stockage et gestion des chaînes. |
| HLS.js | Lecture des flux vidéo HLS. |
| Font Awesome | Icônes : favoris, suppression, blocage. |
| LocalStorage | Mémorisation du dernier affichage choisi. |

### Questions / Réponses

Exemple :

**Q4. Qu'est-ce que HLS.js ?**

HLS.js est une bibliothèque JavaScript qui permet de lire des flux vidéo au format HLS dans les navigateurs compatibles.

Dans notre projet :
```javascript
hlsElement = new Hls();

hlsElement.loadSource(chaine.streamUrl);
hlsElement.attachMedia(channelStream);
```

- `new Hls()` : crée une instance HLS.
- `loadSource()` : charge le flux vidéo.
- `attachMedia()` : associe le flux à l'élément vidéo HTML.

---

## 3. Organisation des fichiers

Le projet est organisé en plusieurs modules pour séparer les responsabilités.

| Fichier | Responsabilité |
|---|---|
| `app.js` | Initialisation et gestion générale de l'application. |
| `ui.js` | Affichage des chaînes et interactions avec l'interface. |
| `api.js` | Communication avec l'API. |
| `search.js` | Fonctionnalité de recherche. |
| `add.js` | Ajout d'une nouvelle chaîne avec le modal. |

**Pourquoi séparer le code en plusieurs fichiers ?**

## 4. JavaScript : concepts importants

### A. Modules ES6 : import et export

Les modules permettent de partager des fonctions entre plusieurs fichiers.

Dans `api.js` :
```javascript
export {
    getData,
    updateIsFavorite,
    addChannels,
    deleteChaine
};
```

Dans `app.js` :
```javascript
import { getData } from "../services/api.js";
```

**Question : Quelle est la différence entre import et export ?**

- `export` : permet de rendre une fonction accessible depuis un autre fichier.
- `import` : permet de récupérer cette fonction pour l'utiliser.

### B. Async / Await et Fetch API

Dans `api.js` :
```javascript
async function getData() {
    const res = await fetch(dataApi);

    if (!res.ok) {
        throw new Error(`HTTP Error : ${res.status}`);
    }

    const data = await res.json();

    return data;
}
```

Explication :

1. `async` : déclare une fonction asynchrone.
2. `fetch()` : envoie une requête HTTP vers l'API.
3. `await` : attend le résultat d'une opération asynchrone.
4. `res.ok` : vérifie si la réponse HTTP est réussie.
5. `res.json()` : transforme la réponse JSON en objet JavaScript.
6. `return data` : retourne les données récupérées.

**Q1. Pourquoi utiliser async/await ?**

Pour gérer les opérations asynchrones de manière plus lisible et attendre les résultats avant de continuer.

**Q2. Pourquoi utiliser try/catch ?**

Pour gérer les erreurs sans interrompre brutalement l'exécution du programme.

```javascript
try {
    tabchaines = await getData();
}
catch (erreur) {
    console.error("Erreur de chargement :", erreur);
}
```

**Q3. Quelle est la différence entre fetch et res.json() ?**

- `fetch()` récupère la réponse du serveur.
- `res.json()` lit le contenu de cette réponse et le transforme en données JavaScript.

### C. Les méthodes HTTP

Le projet utilise différentes méthodes HTTP pour communiquer avec MockAPI.

| Méthode | Rôle | Exemple |
|---|---|---|
| GET | Récupérer les chaînes | `getData()` |
| POST | Ajouter une chaîne | `addChannels()` |
| PUT | Modifier une chaîne | `updateIsFavorite()` |
| DELETE | Supprimer une chaîne | `deleteChaine()` |

Exemple POST :
```javascript
await fetch(dataApi, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newChannel)
});
```

- `method` : indique le type de requête.
- `headers` : indique le format des données envoyées.
- `JSON.stringify()` : transforme un objet JavaScript en chaîne JSON.
- `body` : contient les données envoyées au serveur.

**Question : Quelle est la différence entre POST et PUT ?**

- POST : permet de créer une nouvelle ressource.
- PUT : permet de modifier une ressource existante.

### D. Les événements DOM

Les événements permettent de détecter les actions de l'utilisateur.

Exemple :
```javascript
search.addEventListener("input", function(e) {
    console.log(e.target.value);
});
```

- `addEventListener()` : ajoute un écouteur d'événement.
- `input` : se déclenche lorsque la valeur du champ change.
- `e` : représente l'événement.
- `e.target` : représente l'élément qui a déclenché l'événement.
- `e.target.value` : récupère sa valeur.

**Question : Quelle est la différence entre click et input ?**

- `click` : se déclenche lors d'un clic.
- `input` : se déclenche lorsque le contenu d'un champ change.

### E. Filter et recherche

Dans `search.js` :

```javascript
const filtered = channels.filter(function(chaine) {
    return (
        chaine.name + " " + chaine.channelNumber
    ).toUpperCase().includes(
        e.target.value.toUpperCase()
    );
});

afficherChaines(filtered);
```

Explication :

- `filter()` : crée un nouveau tableau avec les éléments qui respectent une condition.
- `toUpperCase()` : transforme le texte en majuscules pour rendre la recherche insensible à la casse.
- `includes()` : vérifie si le texte recherché existe.
- `afficherChaines()` : affiche les résultats filtrés.

**Question : Pourquoi utiliser filter au lieu de forEach ?**

`filter()` permet de récupérer un nouveau tableau contenant uniquement les éléments qui respectent une condition, tandis que `forEach()` sert principalement à parcourir un tableau.

### F. Event Delegation et closest()

Dans `ui.js` :

```javascript
liste.addEventListener("click", async function(e) {

    const bloc = e.target.closest(".channel");

    if (!bloc) return;

    const coeur = e.target.closest(".favorite");

    if (coeur) {
        // Gestion des favoris
    }
});
```

Explication :

- `liste` : élément parent qui contient les chaînes.
- `e.target` : élément exact sur lequel l'utilisateur clique.
- `closest(".channel")` : remonte dans le DOM pour trouver la carte de la chaîne.
- `if (!bloc) return` : arrête la fonction si le clic ne vient pas d'une carte.

**Question : Qu'est-ce que l'Event Delegation ?**

C'est une technique qui consiste à placer un seul écouteur d'événement sur un élément parent pour gérer les événements de ses enfants.

**Pourquoi l'utiliser ?**

Pour éviter d'ajouter un écouteur sur chaque chaîne individuellement et pouvoir gérer les éléments créés dynamiquement.

### G. Dataset

Dans `app.js` :

```javascript
const code = boutton.dataset.country;

afficherChaines(tabchaines, code);
```

Dans HTML :
```html
<button data-country="MA" class="btn-pays">
    Maroc
</button>
```

Explication :

- `data-country` : attribut personnalisé HTML.
- `dataset.country` : permet de récupérer sa valeur en JavaScript.
- Résultat : `"MA"`.

**Question : Pourquoi utiliser dataset ?**

Pour stocker des informations personnalisées dans les attributs HTML et les récupérer facilement avec JavaScript.

### H. Array.from() et indexOf()

Dans `ui.js` :

```javascript
const index = Array.from(liste.children).indexOf(bloc);

const chaine = chainesPays[index];
```

Explication :

- `liste.children` : récupère les enfants directs de la liste.
- `Array.from()` : transforme cette collection en tableau.
- `indexOf()` : récupère la position de la carte.
- `chainesPays[index]` : récupère la chaîne correspondante.

### I. LocalStorage

Dans `ui.js` :

```javascript
localStorage.setItem("lastWatch", "favorites");
```

Pour récupérer la valeur :

```javascript
let mode = localStorage.getItem("lastWatch") || "all";
```

Explication :

- `setItem()` : enregistre une donnée.
- `getItem()` : récupère une donnée.
- `"lastWatch"` : nom de la clé.
- `"favorites"` : valeur enregistrée.
- `|| "all"` : utilise `"all"` si aucune valeur n'est enregistrée.

**Question : Pourquoi utiliser LocalStorage ?**

Pour conserver certaines informations dans le navigateur même après le rechargement de la page.

Dans notre projet, il permet de mémoriser le dernier mode d'affichage choisi : favoris ou toutes les chaînes.

---

## 5. Manipulation du DOM

### A. innerHTML et textContent

Dans `ui.js` :

```javascript
liste.innerHTML = html;
```

`innerHTML` permet d'insérer du contenu HTML dans un élément.

Exemple :
```javascript
channelName.textContent = chaine.name;
```

`textContent` permet de modifier uniquement le texte d'un élément.

**Différence :**
- `innerHTML` : interprète les balises HTML.
- `textContent` : insère du texte sans interpréter les balises.

### B. classList

Dans `add.js` :

```javascript
modal.classList.remove("hidden");
modal.classList.add("flex");
```

- `add()` : ajoute une classe CSS.
- `remove()` : supprime une classe CSS.
- `toggle()` : ajoute une classe si elle est absente, ou la supprime si elle est présente.

Exemple du projet :
```javascript
icon.classList.toggle("fa-solid");
icon.classList.toggle("fa-regular");
```

Cela permet de changer l'apparence de l'icône des favoris.

### C. Reset

Dans `add.js` :

```javascript
modal.querySelector("#formModal").reset();
```

`reset()` permet de remettre les champs du formulaire à leurs valeurs initiales.

---

## 6. Gestion des favoris et des chaînes bloquées

Dans `ui.js` :

```javascript
chaine.isFavorite = !chaine.isFavorite;

updateIsFavorite(chaine.id, chaine.isFavorite);
```

Explication :

- `!` : inverse une valeur booléenne.
- Si `isFavorite` est `false`, il devient `true`.
- Si `isFavorite` est `true`, il devient `false`.
- `updateIsFavorite()` envoie la nouvelle valeur à l'API.

Même principe pour les chaînes bloquées :

```javascript
chaine.isBlacklisted = !chaine.isBlacklisted;

updateIsBlacklisted(chaine.id, chaine.isBlacklisted);
```

**Question : Pourquoi utiliser un booléen ?**

Parce qu'un booléen possède deux valeurs possibles : `true` ou `false`. C'est pratique pour représenter l'état d'une chaîne : favorite ou non, bloquée ou non.

---

## 7. Questions générales pour la présentation orale

**Q1. Qu'est-ce qu'une API ?**

Une API est une interface qui permet à différentes applications de communiquer et d'échanger des données.

**Q2. Qu'est-ce que MockAPI ?**

MockAPI est un service qui permet de créer une fausse API REST pour simuler un serveur et gérer des données pendant le développement.

**Q3. Qu'est-ce que JSON ?**

JSON est un format léger utilisé pour échanger et représenter des données.

Exemple :
```javascript
{
    name: "2M",
    countryCode: "MA",
    category: "GENERAL",
    isFavorite: true
}
```

**Q4. Pourquoi utiliser des fonctions ?**

Pour organiser le code, éviter les répétitions et faciliter la réutilisation.

**Q5. Pourquoi utiliser filter() ?**

Pour sélectionner les chaînes qui respectent une condition.

**Q6. Quelle est la différence entre let et const ?**

- `let` : permet de réaffecter une variable.
- `const` : empêche de réaffecter la variable.

Attention : un tableau déclaré avec `const` peut toujours être modifié avec `push()`.

**Q7. Qu'est-ce que le DOM ?**

Le DOM est une représentation de la page HTML sous forme d'arbre d'objets que JavaScript peut manipuler.

**Q8. Pourquoi utiliser await ?**

Pour attendre le résultat d'une opération asynchrone avant de passer à la suite.

---

## 8. Points importants à retenir

| Concept | À retenir |
|---|---|
| `fetch()` | Envoyer une requête HTTP |
| `async/await` | Gérer les opérations asynchrones |
| `try/catch` | Gérer les erreurs |
| `filter()` | Filtrer un tableau |
| `forEach()` | Parcourir un tableau |
| `find()` | Trouver un élément |
| `map()` | Transformer un tableau |
| `dataset` | Récupérer les attributs data-* |
| `closest()` | Trouver l'élément correspondant le plus proche |
| `parentElement` | Accéder au parent |
| `children` | Accéder aux enfants |
| `classList` | Manipuler les classes CSS |
| `localStorage` | Enregistrer des données dans le navigateur |
| `JSON.stringify()` | Objet JS vers JSON |
| `JSON.parse()` | JSON vers objet JS |
| `innerHTML` | Modifier le contenu HTML |
| `textContent` | Modifier le contenu texte |

## 9. Conclusion

Ce projet m'a permis de pratiquer JavaScript, la manipulation du DOM, les modules ES6, les événements, les requêtes HTTP et la communication avec une API.

Il m'a également permis de comprendre comment organiser une application web en plusieurs fichiers et comment gérer des données dynamiques.
