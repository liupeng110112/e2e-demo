import {
  Panel,
  UIDefinition
} from "zle"

export default class Page extends Panel {
  static $definition = UIDefinition.root(".install_pack_wrap")
    .withDescendant(".patchSelectHostsBtn", "patchSelectHostsBtn")

  async openHostModal() {
    await this.$click('patchSelectHostsBtn')
  }
}