/**
 * A Phaser Sprite extension to make game overlays and simple forms holes.
 * @extends Phaser.Sprite
 */

class OverlaySpr extends Phaser.Sprite {
/**
 * Create a sprite as overlay with an (optional) simple form hole.
 * @constructor
 * @param {Phaser.Game} game - A Phaser Game instance.
 * @param {Number} x - x coordinate of the outer overlay's border.
 * @param {Number} y - y coordinate of the outer overlay's border.
 * @param {Number} width - Width of the outer overlay's border.
 * @param {Number} height - Height of the outer overlay's border.
 * @param {array} path - Path to draw the hole. Hole should be an instance of any:
 * Rectangle.Phaser, Circle.Phaser, Polygon.Phaser or none (if no hole is needed). Cordinates will
 * be specified with absolute values (not relatives to overlay itself).
 * @param {Object} [opt] - An optional list of options.
 * @param {Hex} [opt.bgColor = 0xFFFFFF] - Background color.
 * @param {Number} [opt.alpha = 0.5] - Alpha value.
 * @param {Boolean} [opt.anticlockwise = false] - Drawing order for polygons. When drawing polygons,
 * to do the hole trick nicely, you should specify if you are setting polygon points in
 * anticlockwise order (clockwise is default).
 */
  constructor(game, x, y, width, height, path = false, opt = {}) {
    super(game, x, y);

    this.$width = width;
    this.$height = height;

    this.alpha = (opt.alpha === undefined || opt.alpha === null) ? 0.5 : opt.alpha;
    const bgColor = (opt.bgColor === undefined || opt.bgColor === null) ? 0x000000 : opt.bgColor;

    this.$graphics = game.add.graphics(0, 0);
    this.$graphics.beginFill(bgColor);

    if (path instanceof Phaser.Polygon) this.setHighlightPolygon(path, opt.anticlockwise);
    else if (path instanceof Phaser.Rectangle) this.setHighlightRect(path);
    else if (path instanceof Phaser.Circle) this.setHighlightCircle(path);
    else if (!path) this.$graphics.drawRect(0, 0, this.$width, this.$height);
    else console.warn('Phaxelf-lib: Wrong path format, try instances of Phaser.Rectangle, Phaser.Circle or Phaser.Polygon...');

    this.$graphics.endFill();

    this.loadTexture(this.$graphics.generateTexture());
    this.$graphics.destroy();

    game.add.existing(this);
  }

  setHighlightPolygon(polygon, anticlockwise = false) {
    let points = [
      new Phaser.Point(0, 0),
      new Phaser.Point(0, this.$height),
      new Phaser.Point(this.$width, this.$height),
      new Phaser.Point(this.$width, 0),
      new Phaser.Point(0, 0),
    ];

    if (anticlockwise) points.reverse();

    points = polygon.points.concat(points);
    this.$graphics.drawPolygon(points);
  }

  setHighlightRect(rectangle) {
    const points = [
      Phaser.Point.subtract(rectangle.topLeft, this.position),
      Phaser.Point.subtract(rectangle.bottomLeft, this.position),
      Phaser.Point.subtract(rectangle.bottomRight, this.position),
      Phaser.Point.subtract(rectangle.topRight, this.position),
      Phaser.Point.subtract(rectangle.topLeft, this.position),
      new Phaser.Point(0, 0),
      new Phaser.Point(this.$width, 0),
      new Phaser.Point(this.$width, this.$height),
      new Phaser.Point(0, this.$height),
      new Phaser.Point(0, 0),
    ];

    this.$graphics.drawPolygon(points);
  }

  setHighlightCircle(circle) {
    this.$graphics.arc(circle.x - this.x, circle.y - this.y, circle.radius, Math.PI, Math.PI * 3);
    this.$graphics.lineTo(0, 0);

    this.$graphics.lineTo(0, 0);
    this.$graphics.lineTo(0, this.$height);
    this.$graphics.lineTo(this.$width, this.$height);
    this.$graphics.lineTo(this.$width, 0);
    this.$graphics.lineTo(0, 0);
  }
}

export default OverlaySpr;
