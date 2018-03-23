import TweenHelper from '../tweens/tween-utils';

class TweensExtension {
  constructor() {
    throw new Error('StaticClassError');
  }

  static init() {
    this.extendSprite();
    this.extendText();
    this.extendGroup();
  }
  /**
   * Phaser Sprite extensions
   * @class
   * @alias Phaser.Sprite
   */
  static extendSprite() {
    /**
     * A shortcut for tween creation in sprites
     * @param {Object} properties - properties to tween
     * @param {Number} duration - tween duration
     * @param {Object} [options={}] - Tween options
     * @param {Object} [options.ease=Phaser.Easing.Default] - Default Ease function
     * @param {Object} [options.autostart=false]
     * @param {Object} [options.delay=0]
     * @param {Object} [options.repeat=0]
     * @param {Object} [options.yoyo=false]
     * @memberof Phaser.Sprite
     * @function $$tween
     * @instance
     */
    Phaser.Sprite.prototype.$$tween = this.phaserTweenShortcut;

    /**
     * A shortcut for tint tween
     * @param {Number} tint - The tint value to tween to
     * @param {Number} duration - tween duration
     * @param {Object} [options={}] - Tween options
     * @param {Object} [options.ease=Phaser.Easing.Default] - Default Ease function
     * @param {Object} [options.autostart=false]
     * @param {Object} [options.delay=0]
     * @param {Object} [options.repeat=0]
     * @param {Object} [options.yoyo=false]
     * @memberof Phaser.Sprite
     * @function $$tintTween
     * @instance
     */
    Phaser.Sprite.prototype.$$tintTween = this.phaserTintTweenShortcut;
  }
  /**
   * Phaser Group extensions
   * @class
   * @alias Phaser.Group
   */
  static extendGroup() {
    /**
     * A shortcut for tween creation in groups
     * @param {Object} properties - properties to tween
     * @param {Number} duration - tween duration
     * @param {Object} [options={}] - Tween options
     * @param {Object} [options.ease=Phaser.Easing.Default] - Default Ease function
     * @param {Object} [options.autostart=false]
     * @param {Object} [options.delay=0]
     * @param {Object} [options.repeat=0]
     * @param {Object} [options.yoyo=false]
     * @memberof Phaser.Group
     * @function $$tween
     * @instance
     */
    Phaser.Group.prototype.$$tween = this.phaserTweenShortcut;
  }
  /**
   * Phaser Sprite extensions
   * @class
   * @alias Phaser.Text
   */
  static extendText() {
    /**
     * A shortcut for tween creation in Text
     * @param {Object} properties - properties to tween
     * @param {Number} duration - tween duration
     * @param {Object} [options={}] - Tween options
     * @param {Object} [options.ease=Phaser.Easing.Default] - Default Ease function
     * @param {Object} [options.autostart=false]
     * @param {Object} [options.delay=0]
     * @param {Object} [options.repeat=0]
     * @param {Object} [options.yoyo=false]
     * @memberof Phaser.Text
     * @function $$tween
     * @instance
     */
    Phaser.Text.prototype.$$tween = this.phaserTweenShortcut;
  }

  static phaserTweenShortcut(properties, duration, options = {}) {
    const {
      ease, autostart, delay, repeat, yoyo,
    } = options;
    return this.game.add.tween(this)
      .to(properties, duration, ease, autostart, delay, repeat, yoyo);
  }
  static phaserTintTweenShortcut(tint, duration, options = {}) {
    const {
      ease, autostart, delay, repeat, yoyo,
    } = options;
    return TweenHelper.tint(this, tint, duration, ease, autostart, delay, repeat, yoyo)
  }
}

export default TweensExtension;
