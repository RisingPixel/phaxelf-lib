/**
 * A Phaser Text extension handling text fitting and localization.
 * @extends Phaser.Text
 */

class LocText extends Phaser.Text {
  /**
   * Create a LocText.
   * @constructor
   * @param {Phaser.Game} game - A Phaser Game instance.
   * @param {Number} x - x coordinate.
   * @param {Number} y - y coordinate.
   * @param {string} text - the translation key to be localized.
   * @param {Object} [options={}] - An optional list of options.
   * @param {string} options.width - The width of the text box
   * @param {string} options.height - The height of the text box
   * @param {string} options.container - An object containing the text
   * @param {string} options.fontStyle - The text style, i.e. '30px Arial'
   * @param {string} options.fill - Fill color
   * @param {string} options.align - Text alignment
   * @param {string} options.padX - X padding referred to the container
   * @param {string} options.padY - Y padding referred to the container
   */
  constructor(game, x, y, text, options = {}) {
    const fontStyle = options.fontStyle || '30px Arial';

    super(game, x, y, localization.get(text), {
      font: fontStyle,
      fill: options.fill || '#000',
      align: options.align || 'left',
    });

    this.$parseOptions(options);

    if (options.wordWrap) {
      this.wordWrap = true;
      this.wordWrapWidth = this.$_maxWidth;
    }

    this.anchor.x = (options.aX === undefined || options.aX === null) ? 0.5 : options.aX;
    this.anchor.y = (options.aY === undefined || options.aY === null) ? 0.5 : options.aY;

    this.$_localizationKey = text;
    this.defaultFontSize = parseInt(fontStyle, 10) + ''; // eslint-disable-line prefer-template

    this.refit();

    this.game.add.existing(this);
  }

  $parseOptions(options) {
    const padX = options.padX || 0;
    const padY = options.padY || 0;
    try {
      this.$_maxWidth = options.width || options.container.width - (padX * 2);
      this.$_maxHeight = options.height || options.container.height - (padY * 2);
    } catch (e) {
      throw new Error('Options should contain a width, height or container parameter');
    }
  }

  get localizationKey() {
    return this.$_localizationKey;
  }

  /**
   * Setter for the localization key
   * @param {string} value - The localization key to be translated
   */
  set localizationKey(value) {
    this.$_translationText = value;
    this.text = localization.get(value);
    this.refit();
  }

  get textWidth() {
    return this.$_maxWidth;
  }

  /**
   * Setter for text width
   * @param {string} value - The text box width
   */
  set textWidth(value) {
    this.$_maxWidth = value;
    this.wordWrapWidth = value;
    this.refit();
  }

  get textHeight() {
    return this.$_maxHeight;
  }

  /**
   * Setter for text height
   * @param {string} value - The text box height
   */
  set textHeight(value) {
    this.$_maxHeight = value;
    this.refit();
  }

  /**
   * Refits the text inside the box provided
   */
  refit() {
    localization.fitText(this, this.textWidth, this.textHeight);
  }
}

export default LocText;
