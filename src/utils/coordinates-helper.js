/**
 * A static class to handle coordinate transformations between objects
 */
class CoordinatesHelper {
  /**
   * Given a source and destination graphic, it returns the coordinates of `source`
   * related to the `destination` coordinate system
   * @param {(Phaser.Sprite|Phaser.Group)} source - The Sprite or Group to be dragged
   * @param {(Phaser.Sprite|Phaser.Group)} destination - The Sprite or Group to be dragged
   * @returns {Phaser.Point} The computed point
   */
  static transformCoordinates(source, destination, reference = new Phaser.Point(0.5, 0.5)) {
    const sourceTree = this.getTree(source);
    const destinationTree = this.getTree(destination);
    const commonAncestor = this.findCommonAncestor(sourceTree, destinationTree);

    const parentPosition = this.positionInAncestor(source, commonAncestor, reference);
    const toPosition = this.pointInDescendant(parentPosition, commonAncestor, destination);

    return toPosition;
  }

  /**
   * Checks if a point is contained inside a sprite
   * @param {Phaser.Point} point - A Point
   * @param {(Phaser.Sprite|Phaser.Group)} sprite - A Sprite or Group
   * @returns {boolean}
   */
  static contains(point, sprite) {
    return point.x >= (sprite.x - (sprite.anchor.x * sprite.width)) &&
      point.x < (sprite.x + (sprite.anchor.x * sprite.width)) &&
      point.y >= (sprite.y - (sprite.anchor.y * sprite.height)) &&
      point.y <= (sprite.y + (sprite.anchor.y * sprite.height));
  }

  /**
   * Given a sprite and one of its ancestors, it returns the coordinates of the sprite
   * relative to its ancestor coordinate system
   * @param {Phaser.Sprite} sprite - A Sprite
   * @param {(Phaser.Sprite|Phaser.Group)} ancestor - A Sprite's ancestor
   * @param {Phaser.Point} [pivot=new Phaser.Point(0.5, 0.5)] - The pivot
   * @returns {Phaser.Point} The computed point
   */
  static pointInAncestor(sprite, ancestor, pivot = new Phaser.Point(0.5, 0.5)) {
    const coordinates = new Phaser.Point(
      this.getPositionX(sprite, pivot.x, true),
      this.getPositionY(sprite, pivot.y, true),
    );
    let current = sprite;
    while (current.parent !== ancestor) {
      current = current.parent;

      const withScale = current.parent !== ancestor;
      coordinates.x += this.getPositionX(current, pivot.x, withScale);
      coordinates.y += this.getPositionY(current, pivot.y, withScale);
    }
    return coordinates;
  }

  /**
   * Converts a point in an element coordinate system in one of it's descendant coordinates
   * @param {Phaser.Point} point - A Point in `reference` coordinate system
   * @param {(Phaser.Sprite|Phaser.Group)} reference - A reference Sprite or Group
   * @param {(Phaser.Sprite|Phaser.Group)} descendant - A descendant Sprite or Group
   * @returns {Phaser.Point} The computed point
   */
  static pointInDescendant(point, reference, descendant) {
    const coordinates = new Phaser.Point(point.x, point.y);
    let current = descendant;
    while (current.parent !== reference) {
      current = current.parent;

      const withScale = current.parent !== reference;
      if (withScale && current.parent) {
        coordinates.x -= current.x / current.parent.scale.x;
        coordinates.y -= current.y / current.parent.scale.y;
      } else {
        coordinates.x -= current.x;
        coordinates.y -= current.y;
      }
    }
    return coordinates;
  }

  static sizeInAncestor(sprite, ancestor) {
    const size = new Phaser.Point(sprite.width, sprite.height);
    let current = sprite;
    while (current.parent !== ancestor) {
      size.x *= current.parent.scale.x;
      size.y *= current.parent.scale.y;
      current = current.parent;
    }
    return size;
  }

  /**
   * Given an object, it returns the list of its ancestors, from the nearest to the farest
   * @param {(Phaser.Sprite|Phaser.Group)} element - The Sprite or Group
   */
  static getTree(element) {
    const parents = [];
    while (element.parent != null) {
      element = element.parent;
      parents.push(element);
    }
    return parents;
  }

  /**
   * Given an object, it returns the list of its ancestors, from the nearest to the farest
   * @param {(Phaser.Sprite|Phaser.Group)} element - The Sprite or Group
   */
  static findCommonAncestor(tree1, tree2) {
    for (let i = 0; i < tree1.length; i += 1) {
      const el1 = tree1[i];
      for (let j = 0; j < tree2.length; j += 1) {
        const el2 = tree2[j];
        if (el1 === el2) {
          return el1;
        }
      }
    }
    return null;
  }

  static getPositionX(object, referenceX, withScale = false) {
    const x = object.x + ((object.anchor ? referenceX - object.anchor.x : 0) * object.width);
    if (withScale && object.parent) {
      return x * object.parent.scale.x;
    }
    return x;
  }

  static getPositionY(object, referenceY, withScale = false) {
    const y = object.y + ((object.anchor ? referenceY - object.anchor.y : 0) * object.height);
    if (withScale && object.parent) {
      return y * object.parent.scale.y;
    }
    return y;
  }
}

export default CoordinatesHelper;
