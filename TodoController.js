// CONTROLLER : traduit les actions de la vue en opérations sur le modèle.
export class TodoController {
  constructor(model, view) {
    let filtre = 'toutes'; // le contrôleur mémorise le filtre courant
    const rafraichir = () => {
      view.render(model.filtrer(filtre), model.restantes());
      view.showFiltre(filtre);
    };
    view.bindAdd(title => {
      try {
        model.add(title);
        view.showError('');
      } catch (e) {
        view.showError(e.message);
      }
    });
    view.bindToggle(id => model.toggle(id));
    view.bindRemove(id => model.remove(id));
    view.bindFilter(nom => {
      filtre = nom;
      rafraichir();
    });
    model.subscribe(() => rafraichir()); // la vue observe le modèle
  }
}