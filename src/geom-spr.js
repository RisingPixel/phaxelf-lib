/**
 * A Phaser Sprite extension to make primitive shapes as sprites.
 * @extends Phaser.Sprite
 */

class GeomSpr extends Phaser.Sprite {
  /**
 * Create a LocText.
 * @constructor
 * @param {Phaser.Game} game - A Phaser Game instance.
 * @param {Number} x - x coordinate.
 * @param {Number} y - y coordinate.
 * @param {string} type - Type of Shape ('circle', 'rectangle' or 'polygon').
 * @param {array} path - Data to draw shapes. For polygon accepts any polygon construction setup.
 * @param {Object} opt - An optional list of options.
 * @param {Hex} opt.bgColor - Shape's background color.
 * @param {Number} opt.aX - Anchor in x axis (0.5 by default).
 * @param {Number} opt.aX - Anchor in y axis (0.5 by default).
 * @param {*} opt.parent - Assign a parent if you setted it in this property.
 * @param {Object} opt.outLineData - Arguments to build outline border.
 * @param {Number} opt.outLineData.width - Outline width.
 * @param {Hex} opt.outLineData.color - Outline color.
 * @param {Number} opt.outLineData.alpha - Outline alpha.
 */
  constructor(game, x, y, type, path, opt = {}) {
    super(game, x, y);

    this.drawShape(type, path, opt);

    this.game.add.existing(this);
  }

  drawShape(type, path, opt) {
    const bgColor = (opt.bgColor === undefined || opt.bgColor === null) ? 0xFFFFFF : opt.bgColor;

    const graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(bgColor);

    if (opt.outLineData) {
      graphics.lineStyle(opt.outLineData.width, opt.outLineData.color, opt.outLineData.alpha);
    }

    this[type](path, graphics);

    graphics.endFill();

    this.setFrame(graphics.generateTexture());
    graphics.destroy();

    this.anchor.x = (opt.aX === undefined || opt.aX === null) ? 0.5 : opt.aX;
    this.anchor.y = (opt.aY === undefined || opt.aY === null) ? 0.5 : opt.aY;

    if (opt.parent) {
      opt.parent.addChild(this);
    }
  }

  static polygon(path, graphics) {
    const poly = path instanceof Phaser.Polygon ? path : new Phaser.Polygon(path);
    graphics.drawPolygon(poly.points);
  }

  static rectangle(path, graphics) {
    graphics.drawRect(path[0], path[1], path[2], path.height[3]);
  }

  static circle(path, graphics) {
    graphics.drawCircle(path[0], path[1], path[2]);
  }
}

export default GeomSpr;
