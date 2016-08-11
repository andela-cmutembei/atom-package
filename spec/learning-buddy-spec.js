'use babel';

import CollinWordCount from '../lib/learning-buddy';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LearningBuddy', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('learning-buddy');
  });

  describe('when the learning-buddy:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.learning-buddy')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'learning-buddy:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.learning-buddy')).toExist();

        let collinWordCountElement = workspaceElement.querySelector('.learning-buddy');
        expect(collinWordCountElement).toExist();

        let collinWordCountPanel = atom.workspace.panelForItem(collinWordCountElement);
        expect(collinWordCountPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'learning-buddy:toggle');
        expect(collinWordCountPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.learning-buddyt')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'learning-buddy:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let collinWordCountElement = workspaceElement.querySelector('.learning-buddy');
        expect(collinWordCountElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'learning-buddy:toggle');
        expect(collinWordCountElement).not.toBeVisible();
      });
    });
  });
});
