import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  library: service(),

  actions: {
    getNewArticles() {
      this.library.getNewArticles();
    }
  }
});
