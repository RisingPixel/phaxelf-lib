export default class LocText extends Phaser.Text {
  constructor(game, x, y, text, options = {}) {
    const fontStyle = options.fontStyle || '30px Arial';
    let width;
    let height;

    try {
      width = options.width || options.container.width;
      height = options.height || options.container.height;
    } catch (e) {
      throw new Error('Options should contain a width, height or container parameter');
    }

    super(game, x, y, localization.get(text), {
      font: fontStyle,
      fill: '#000',
      align: 'left',
      wordWrap: true,
      wordWrapWidth: width,
    });

    this.$_localizationKey = text;
    this.$_maxWidth = width;
    this.$_maxHeight = height;
    this.defaultFontSize = parseInt(fontStyle, 10) + ''; // eslint-disable-line prefer-template

    this.refit();

    this.game.add.existing(this);
  }

  get localizationKey() {
    return this.$_localizationKey;
  }

  set localizationKey(value) {
    this.$_translationText = value;
    this.text = localization.get(value);
    this.refit();
  }

  get textWidth() {
    return this.$_maxWidth;
  }

  set textWidth(value) {
    this.$_maxWidth = value;
    this.wordWrapWidth = value;
    this.refit();
  }

  get textHeight() {
    return this.$_maxHeight;
  }

  set textHeight(value) {
    this.$_maxHeight = value;
    this.refit();
  }

  refit() {
    localization.fitText(this, this.textWidth, this.textHeight);
  }
}
