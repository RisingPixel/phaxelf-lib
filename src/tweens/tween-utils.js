/**
 * A static helper class to handle tweens
 */
class TweenUtils {
  /**
   * Tweens a sprite to a certain tint value
   * @param {PIXI.Sprite} subject - The subject you want to tint
   * @param {Number} tint - The destination tint value
   * @param {Number} duration - Duration in seconds
   * @param {(Phaser.Easing|string)} [easing=Phaser.Easing.Default] - The easing function
   * @param {boolean} [autostart=false] - Auto-start the tween immediately
   * @param {Number} [delay=0] - Tween delay
   * @param {Number} [repeat=0] - Number of times should the tween be repeated. (-1 = forever)
   * @param {Number} [yoyo=false] - Yoyo repeat
   */
  static tint(
    subject, tint, duration, easing = Phaser.Easing.Default,
    autostart = false, delay = 0, repeat = 0, yoyo = false,
  ) {
    const colorBlend = { step: 0 };
    const initialTint = subject.tint;
    return subject.game.add.tween(colorBlend)
      .to({ step: 100 }, duration, easing, autostart, delay, repeat, yoyo)
      .onUpdateCallback(() => {
        subject.tint = Phaser.Color.interpolateColor(initialTint, tint, 100, colorBlend.step, 1);
      });
  }
}
export default TweenUtils;
