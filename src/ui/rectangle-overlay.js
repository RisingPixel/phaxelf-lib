/**
 * A Geom extension class useful to make tutorial (or another type of) overlay.
 * @extends Phaser.Sprite
 * 
 ** *** **
 ** WIP **
 ** *** **
 */
import Geom from './geom-spr';

class RectangleOverlay extends Geom {
  /**
 * Create a rectangle overlay. Have in mind that only one object can be setted at mask at time
 * @constructor
 * @param {Phaser.Game} game - A Phaser Game instance.
 * @param {Number} x - x coordinate.
 * @param {Number} y - y coordinate.
 * @param {Number} width - Area width.
 * @param {Number} height - Area height.
 * @param {Object} [opt] - An optional list of options.
 * @param {Number} [opt.aX = 0.5] - Anchor in x axis (0.5 by default).
 * @param {Number} [opt.aY = 0.5] - Anchor in y axis (0.5 by default).
 * @param {Number} [opt.alpha = 0.5] - Overlay's alpha  value.
 * @param {*} [opt.parent] - Assign a parent if you setted it in this property.
 */
  constructor(game, x, y, width, height, opt = {}) {
    const path = new Phaser.Rectangle(x, y, width, height);
    const options = {
      aX: opt.aX,
      aY: opt.aY,
      bgColor: 0x000000,
    };
    options.alpha = (opt.alpha === undefined || opt.alpha === null) ? 0.5 : opt.alpha;
    super(game, x, y, 'rectangle', path, options);

    game.add.existing(this);
  }

  /**
   * Make this invisible
   */
  hide() {
    this.visible = false;
  }

  /**
   * Make this visible
   */
  show() {
    this.visible = true;
  }

  /**
   * Add a circle highlight using a mask
   * @param {Number} x - x coordinate of masking circle.
   * @param {Number} y - y coordinate of masking circle.
   * @param {Number} diameter - Diameter of the masking circle.
   */
  addHighlightCircle(x, y, diameter) {
    this.customMask = new Geom(this.game, x, y, 'circle', [0, 0, diameter]);
  }

  /**
   * Add a rectangle highlight using a mask
   * @param {Number} x - x coordinate of masking rectangle.
   * @param {Number} y - y coordinate of masking rectangle.
   * @param {Number} width - Width of masking rectangle.
   * @param {Number} height - Height of masking rectangle.
   */
  addHighlightRect(x, y, width, height) {
    this.customMask = new Geom(this.game, x, y, 'rectangle', [x, y, width, height]);
  }

  /**
   * Add a custom mask to highligh complex areas
   * @param {Number} x - x coordinate of the mask.
   * @param {Number} y - y coordinate of the mask.
   * @param {*} mask - Custom valid object to use as mask (Phaser.Sprite, Phaser.Graphic, etc).
   */
  addHighlightCustom(x, y, mask) {
    this.customMask = mask;
  }

  /**
   * Manual setting for the mask object
   * @param {*} customMask - Custom valid object to use as mask (Phaser.Sprite, Phaser.Graphic, etc).
   */
  set customMask(mask) {
    this.$mask = mask;
    this.addChild(this.$mask);
    this.mask = this.$mask;
  }

  get customMask() {
    return this.$mask;
  }

  /**
   * Remove highlight region
   * @param {Boolean} [destroyMask = true] - To destroy mask after remove highlight or not.
   */
  removeHightlight(destroyMask = true) {
    this.mask = null;
    if (destroyMask) {
      this.$mask.destroy();
    }
  }
}

export default RectangleOverlay;
