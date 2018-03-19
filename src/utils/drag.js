/**
 * A static class to handle drag
 */

class Drag {
  constructor() {
    throw new Error('AbstractClassError');
  }

  /**
   * Enables the drag feature on a Sprite (native) or a group (experimental)
   * @param {(Phaser.Sprite|Phaser.Group)} subject - The Sprite or Group to be dragged
   * @param {boolean} [clampToCenter=false] - Clamp the item to its center while dragging
   */
  static enable(subject, clampToCenter = false) {
    if (subject.inputEnabled !== undefined) {
      this.$enableSprite(subject, clampToCenter);
    } else {
      this.$enableGroup(subject, clampToCenter);
    }
  }

  /**
   * Binds the onDragStart, onDragUpdate and onDragEnd events on Sprites and Groups
   * @param {(Phaser.Sprite|Phaser.Group)} subject - The Sprite or Group
   * @param {string} eventName - The event name, one of onDragStart, onDragUpdate, onDragEnd
   * @param {Function} callback - Callback handler
   * @param {Object} [context] - The callback context
   */
  static bindEvent(subject, eventName, callback, context) {
    subject.events[eventName].add(callback, context);
  }

  static $enableSprite(subject, clampToCenter = false) {
    subject.inputEnabled = true;
    subject.input.enableDrag(clampToCenter);
    if (!clampToCenter) {
      subject.events.onDragStart.add(this.$onDragStart, subject);
    }
    subject.events.onDragUpdate.add(this.$onDragUpdate, subject);
  }

  static $onDragStart(sprite, pointer) {
    sprite.$_inSpritePos = sprite.game.input.getLocalPosition(sprite, pointer);
    this.$onDragUpdate(sprite, pointer);
  }

  static $onDragUpdate(sprite, pointer) {
    const pos = sprite.game.input.getLocalPosition(sprite.parent, pointer);
    if (sprite.$_inSpritePos) {
      sprite.x = pos.x - sprite.$_inSpritePos.x;
      sprite.y = pos.y - sprite.$_inSpritePos.y;
    } else {
      sprite.x = pos.x - (sprite.width * (0.5 - sprite.anchor.x));
      sprite.y = pos.y - (sprite.height * (0.5 - sprite.anchor.y));
    }
  }

  static $enableGroup(subject, clampToCenter = false) {
    const pivotSprite = subject.game.add.sprite(0, 0, null);
    subject.addChild(pivotSprite);
    pivotSprite.sendToBack();
    pivotSprite.width = subject.width;
    pivotSprite.height = subject.height;

    pivotSprite.inputEnabled = true;
    pivotSprite.input.enableDrag(clampToCenter);
    if (!clampToCenter) {
      pivotSprite.events.onDragStart.add(this.$onDragGroupStart, pivotSprite);
    }
    pivotSprite.events.onDragUpdate.add(this.$onDragGroupUpdate, pivotSprite);
  }

  static $onDragGroupStart(sprite, pointer) {
    sprite.$_inSpritePos = sprite.game.input.getLocalPosition(sprite.parent, pointer);
    this.$onDragUpdate(sprite, pointer);
  }

  static $onDragGroupUpdate(sprite, pointer) {
    const pos = sprite.game.input.getLocalPosition(sprite.parent, pointer);
    if (sprite.$_inSpritePos) {
      sprite.parent.x = pos.x - sprite.$_inSpritePos.x;
      sprite.parent.y = pos.y - sprite.$_inSpritePos.y;
    } else {
      sprite.parent.x = pos.x - (sprite.width * (0.5 - sprite.anchor.x));
      sprite.parent.y = pos.y - (sprite.height * (0.5 - sprite.anchor.y));
    }
  }
}

export default Drag;
