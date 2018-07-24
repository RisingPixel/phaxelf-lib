/**
 * A Phaser Sprite extension to make primitive shapes as sprites.
 * @extends Phaser.Sprite
 */

class GeomSpr extends Phaser.Sprite {
  /**
 * Create geometric sprite shapes using Phaser graphics.
 * @constructor
 * @param {Phaser.Game} game - A Phaser Game instance.
 * @param {Number} x - x coordinate.
 * @param {Number} y - y coordinate.
 * @param {string} type - Type of Shape ('circle', 'rectangle' or 'polygon').
 * @param {array} path - Data to draw shapes. For polygon accepts any polygon construction setup.
 * Path will accept any, an array or the Phaser shapes itself. In case of polygon, it also accept
 * all formats available to construct Phaser.Polygon.
 * @param {Object} [opt] - An optional list of options.
 * @param {Hex} [opt.bgColor = 0xFFFFFF] - Shape's background color.
 * @param {Number} [opt.aX = 0.5] - Anchor in x axis.
 * @param {Number} [opt.aY = 0.5] - Anchor in y axis.
 * @param {Number} [opt.alpha = 1] - Alpha value.
 * @param {Object} [opt.outLineData] - Arguments to build outline border.
 * @param {Number} opt.outLineData.width - Outline width.
 * @param {Hex} opt.outLineData.color - Outline color.
 * @param {Number} opt.outLineData.alpha - Outline alpha.
 * @param {*} [opt.parent] - Assign a parent if you setted it in this property.
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

    if (type === 'rectangle' || type === 'circle' || type === 'polygon') {
      GeomSpr[type](path, graphics);
    } else {
      console.warn("Phaxelf-lib: Wrong shape type, try 'rectangle', 'circle' or 'polygon'...");
    }

    graphics.endFill();

    this.loadTexture(graphics.generateTexture());
    graphics.destroy();

    this.anchor.x = (opt.aX === undefined || opt.aX === null) ? 0.5 : opt.aX;
    this.anchor.y = (opt.aY === undefined || opt.aY === null) ? 0.5 : opt.aY;

    this.alpha = (opt.alpha === undefined || opt.alpha === null) ? 1 : opt.alpha;

    if (opt.parent) {
      opt.parent.addChild(this);
    }
  }

  static polygon(path, graphics) {
    const poly = path instanceof Phaser.Polygon ? path : new Phaser.Polygon(path);
    graphics.drawPolygon(poly.points);
  }

  static rectangle(path, graphics) {
    if (path instanceof Array) {
      graphics.drawRect(path[0], path[1], path[2], path[3]);
    } else if (path instanceof Phaser.Rectangle) {
      graphics.drawRect(path.x, path.y, path.width, path.height);
    } else {
      console.warn('Phaxelf: Trying to build a rectangle with a wrong path format.');
    }
  }

  static circle(path, graphics) {
    if (path instanceof Array) {
      graphics.drawCircle(path[0], path[1], path[2]);
    } else if (path instanceof Phaser.Circle) {
      graphics.drawCircle(path.x, path.y, path.diameter);
    } else {
      console.warn('Phaxelf: Trying to build a circle with a wrong path format.');
    }
  }
}

export default GeomSpr;
