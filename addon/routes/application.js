import Ember from 'ember';

const {
  Route,
  get,
  set,
  inject: { service }
} = Ember;

export default Route.extend({
  trackLists: service(),

  model() {
    return {};
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('spectrumTitle', get(model, 'spectrumTitle'));
    controller.set('initialTrack', get(model, 'initialTrack'));
    controller.set('currentTracks', get(model, 'currentTracks'));
  },

  afterModel(model, transition) {
     set(model, 'spectrumTitle', this.getSpectrumTitle(transition));
     set(model, 'initialTrack', this.getInitialSpectrumTrack(transition));
     set(model, 'currentTracks', this.getAllSpectrumTracks(transition));
     return model;
  },

  splitTarget(transition) {
    return transition.targetName.split('.')[0];
  },

  getSpectrumTitle(transition) {
    return this.splitTarget(transition).split('-').join(" ");
  },

  getInitialSpectrumTrack(transition) {
    return this.getAllSpectrumTracks(transition)
               .filterBy('isDefault')
               .objectAt(0);
  },

  getAllSpectrumTracks(transition) {
    var trackKind = this.splitTarget(transition).split('-')[0] + "Tracks";
    return this.get('trackLists').get(trackKind);
  }

});
