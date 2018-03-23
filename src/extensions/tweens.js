import TweenHelper from '../tweens/tween-utils';

/**
 * Extensions for Phaser.Sprite class to help with tweens
 */
class TweensExtension {
  static init() {
    function PhaserSpriteTween(
      properties, duration, ease = Phaser.Easing.Default, autostart = false,
      delay = 0, repeat = -1, yoyo = false,
    ) {
      return this.game.add.tween(this)
        .to(properties, duration, ease, autostart, delay, repeat, yoyo);
    }
    Phaser.Sprite.prototype.$$tween = PhaserSpriteTween;

    function PhaserSpriteTintTween(
      tint, duration, ease = Phaser.Easing.Default, autostart = false,
      delay = 0, repeat = -1, yoyo = false,
    ) {
      return TweenHelper.tint(this, tint, duration, ease, autostart, delay, repeat, yoyo)
    }
    Phaser.Sprite.prototype.$$tintTween = PhaserSpriteTintTween;
  }
}

export default TweensExtension;
