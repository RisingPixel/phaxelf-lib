import CoordinatesHelper from '../utils/coordinates-helper';

/**
 * Extensions for Phaser.Sprite class to help with coordinates
 */
class CoordinatesExtension {
  constructor() {
    throw new Error('StaticClassError');
  }

  static init(LU) {
    this.LU = LU;
    this.extendSprite();
    this.extendText();
    this.extendGroup();
  }

  static extendSprite() {
    /**
     * A shortcut for placing a sprite in the center of the screen
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Sprite
     * @function $$centered
     * @instance
     */
    Phaser.Sprite.prototype.$$centered = this.phaserSpriteCentered;
    /**
     * Moves the current object in the coordinates of another, considering groups/scaling
     * @param {Phaser.Sprite|Phaser.Group} destination - a destination object
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Sprite
     * @function $$moveTo
     * @instance
     */
    Phaser.Sprite.prototype.$$moveTo = this.phaserSpriteMoveTo;
    /**
     * Gets the cooordinates of the current object based on one of its ancestors
     * @param {Phaser.Sprite|Phaser.Group} ancestor - an ancestor of this object
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Sprite
     * @function $$pointIn
     * @instance
     */
    Phaser.Sprite.prototype.$$pointIn = this.phaserSpritePointIn;
    /**
     * Checks if the sprites contains a point
     * @param {Phaser.Point} point - the anchor point
     * @memberof Phaser.Sprite
     * @function $$contains
     * @instance
     */
    Phaser.Sprite.prototype.$$contains = this.phaserSpriteContains;
  }

  static extendText() {
    /**
     * A shortcut placing a text in the center of the screen
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Text
     * @function $$centered
     * @instance
     */
    Phaser.Text.prototype.$$centered = this.phaserSpriteCentered;
    /**
     * Moves the current object in the coordinates of another, considering groups/scaling
     * @param {Phaser.Sprite|Phaser.Group} destination - a destination object
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Text
     * @function $$moveTo
     * @instance
     */
    Phaser.Text.prototype.$$moveTo = this.phaserSpriteMoveTo;
    /**
     * A shortcut placing a text in the center of the screen
     * @param {Phaser.Sprite|Phaser.Group} ancestor - an ancestor of this object
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Text
     * @function $$pointIn
     * @instance
     */
    Phaser.Text.prototype.$$pointIn = this.phaserSpritePointIn;
    /**
     * A shortcut placing a text in the center of the screen
     * @param {Phaser.Point} point - the anchor point
     * @memberof Phaser.Text
     * @function $$contains
     * @instance
     */
    Phaser.Text.prototype.$$contains = this.phaserSpriteContains;
  }

  static extendGroup() {
    /**
     * A shortcut placing a text in the center of the screen
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Group
     * @function $$centered
     * @instance
     */
    Phaser.Group.prototype.$$centered = this.phaserSpriteCentered;
    /**
     * Moves the current object in the coordinates of another, considering groups/scaling
     * @param {Phaser.Sprite|Phaser.Group} destination - a destination object
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Group
     * @function $$moveTo
     * @instance
     */
    Phaser.Group.prototype.$$moveTo = this.phaserSpriteMoveTo;
    /**
     * A shortcut placing a text in the center of the screen
     * @param {Phaser.Sprite|Phaser.Group} ancestor - an ancestor of this object
     * @param {Phaser.Point} [anchor=new Phaser.Point(0.5, 0.5)] - the anchor point
     * @memberof Phaser.Group
     * @function $$pointIn
     * @instance
     */
    Phaser.Group.prototype.$$pointIn = this.phaserSpritePointIn;
  }

  static phaserSpriteCentered(anchor = new Phaser.Point(0.5, 0.5)) {
    this.anchor = anchor;
    this.position = new Phaser.Point(
      CoordinatesExtension.LU.BASE_WIDTH / 2,
      CoordinatesExtension.LU.BASE_HEIGHT / 2,
    );
  }

  static phaserSpriteMoveTo(destination, anchor = new Phaser.Point(0.5, 0.5)) {
    this.position = CoordinatesHelper.transformCoordinates(destination, this, anchor);
  }

  static phaserSpritePointIn(ancestor, anchor = new Phaser.Point(0.5, 0.5)) {
    return CoordinatesHelper.pointInAncestor(this, ancestor, anchor);
  }

  static phaserSpriteContains(point) {
    return CoordinatesHelper.contains(point, this);
  }
}

export default CoordinatesExtension;
