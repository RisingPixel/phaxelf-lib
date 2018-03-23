import CoordinatesHelper from '../utils/coordinates-helper';

/**
 * Extensions for Phaser.Sprite class to help with coordinates
 */
class CoordinatesExtension {
  static init(LU) {
    this.LU = LU;

    function PhaserSpriteCentered(anchor = new Phaser.Point(0.5, 0.5)) {
      this.anchor = anchor;
      this.position = new Phaser.Point(LU.BASE_WIDTH / 2, LU.BASE_HEIGHT / 2);
    }
    Phaser.Sprite.prototype.$$centered = PhaserSpriteCentered;

    function PhaserSpriteMoveTo(destination, anchor = new Phaser.Point(0.5, 0.5)) {
      this.position = CoordinatesHelper.transformCoordinates(this, destination, anchor);
    }
    Phaser.Sprite.prototype.$$moveTo = PhaserSpriteMoveTo;

    function PhaserSpritePositionIn(ancestor, anchor = new Phaser.Point(0.5, 0.5)) {
      return CoordinatesHelper.pointInAncestor(this, ancestor, anchor);
    }
    Phaser.Sprite.prototype.$$positionIn = PhaserSpritePositionIn;

    function PhaserSpriteContains(point) {
      CoordinatesHelper.contains(point, this);
    }
    Phaser.Sprite.prototype.$$contains = PhaserSpriteContains;
  }
}

export default CoordinatesExtension;
