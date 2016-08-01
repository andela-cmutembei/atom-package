'use babel';

import LearningBuddyView from './learning-buddy-view';
import { CompositeDisposable } from 'atom';

export default {

  LearningBuddyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.LearningBuddyView = new LearningBuddyView(state.LearningBuddyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.LearningBuddyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'learning-buddy:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.collinWordCountView.destroy();
  },

  serialize() {
    return {
      LearningBuddyViewState: this.LearningBuddyView.serialize()
    };
  },

  toggle() {
    console.log('Stuff Inawork');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
