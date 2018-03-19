import Globals from './../kernel/globals';

/* RP Utils
** Some parts are inspired in legendary_heros repo's "ci.js" **
** 2018 Rising Pixel
*/

class RPUtils {
  constructor() {
    throw new Error('AbstractClassError');
  }

  static init(game)
  {
    this.game = game;
  }

  // juakiz

  /* Build text fitted to a parent 
  *
  * args:
  * parent          (sprite, tilesprite, group or graphics)
  * x               (int)
  * y               (int)
  * text            (str)
  * font style      (object: font, fontSize, fill, align) (optional)
  * padding x axis  (int)
  * padding y axis  (int)
  * is wordWrap     (bool) (optional)
  * anchor x axis   (int) (optional, default: 0.5)
  * anchor y axis   (int) (optional, default: 0.5)
  * alpha           (int) (optional)
  * 
  * ret:
  * Phaser.text
  */
  static fittedText(parent, x, y, text, fontStyle, padX, padY, isWordWrap, aX, aY, alpha) {
    fontStyle = fontStyle || { font: 'Arial', fontSize: '35pt', fill: '#ffffff', align: 'center' };

    let label =       this.game.add.text(x, y, text || '');

    label.font =      fontStyle.font;
    label.fontSize =  fontStyle.fontSize;
    label.fill =      fontStyle.fill;
    label.align =     fontStyle.align;

    label._FTWidth =  parent.width  - (padX * 2);
    label._FTHeight = parent.height - (padY * 2);

    if (isWordWrap) {
      label.wordWrap = true;
      label.wordWrapWidth = label._FTWidth;
    }

    localization.fitText(label, label._FTWidth, label._FTHeight);

    label.anchor.x = (aX === undefined || aX === null) ? 0.5 : aX;
    label.anchor.y = (aY === undefined || aY === null) ? 0.5 : aY;
    label.alpha = (alpha === undefined || alpha === null) ? 1 : alpha;

    if ( parent instanceof Phaser.Sprite
      || parent instanceof Phaser.TileSprite
      || parent instanceof Phaser.Group
      || parent instanceof Phaser.Graphics ) {
        parent.addChild(label);
      } else {
        console.warn("RPU: Trying to fit text to invalid parent!");
      }

    return label;
  }

  /* Change text fitted with method above
  *
  * args:
  * label previously fitted (Phaser.text)
  * new text                (str)
  */
  static refitText(label, text) {
    label.text = text;

    localization.fitText(
      label,
      label._FTWidth,
      label._FTWidth);
  }

  /* Make box containing certain text (like whatsapp chatboxes)
  * args:
  * 
  * text          (str)
  * font style    (object: font, fontSize, fill, align)
  * text width    (str **size need to be on pt!**)
  * padding       (object: x, y) (optional, default: { x: 20, y: 20 })
  * bgColor       (hex)
  * anchor x axis (int) (optional, default: 0.5)
  * anchor y axis (int) (optional, default: 0.5)
  * 
  */
  static textBox(text, fontStyle, txtWidth, padding, bgColor, aX, aY) {
    fontStyle = fontStyle || { font: 'Arial', fontSize: '35pt', fill: '#ffffff', align: 'left' };
    padding = padding || { x: 20/* { left: 20, right: 20 } */, y: 20/* { top: 20, bottom: 20 } */ };
    
    let box = this.game.add.group();

    let label = box.labelBox = this.game.add.text(0, 0, localization.get(text));

    label.font =              fontStyle.font;
    label.fontSize =          fontSize.fontSize;
    label.fill =              fontSize.fill;
    label.wordWrap =          true;
    label.wordWrapWidth =     txtWidth - (padding.x * 2);

    aX = (aX === undefined || aX === null) ? 0.5 : aX;
    aY = (aY === undefined || aY === null) ? 0.5 : aY;
    
    let spriteBox = box.spriteBox = RPUtils.rectSpr(
      null,
      0,
      0,
      txtWidth,
      label.height + padding.y * 2,
      bgColor,
      aX,
      aY
    );

    label.anchor.set(0.5);
    label.x = spriteBox.width * (label.anchor.x - spriteBox.anchor.x);
    label.y = spriteBox.height * (label.anchor.y - spriteBox.anchor.y);

    spriteBox.addChild(label);
    box.add(spriteBox);

    return box;
  }

  /*
  * Refactor this for the god sake
  */
  static circSpr(parent, x, y, diameter, bgColor, aX, aY, outLineData) {
    bgColor = (bgColor === undefined || bgColor === null) ? 0xFFFFFF : bgColor;

    let graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(bgColor);

    outLineData && graphics.lineStyle(outLineData.width, outLineData.color, outLineData.alpha);

    graphics.drawCircle(x, y, diameter);

    graphics.endFill();

    let sprite = this.game.add.sprite(x, y, graphics.generateTexture());
    graphics.destroy();

    sprite.anchor.x = (aX === undefined || aX === null) ? 0.5 : aX;
    sprite.anchor.y = (aY === undefined || aY === null) ? 0.5 : aY;

    parent && parent.addChild(sprite);

    return sprite;
  }

  /* Make polygon sprites
  * args:
  * 
  * parent        (any) (optional)
  * x             (int)
  * y             (int)
  * path          (can be either, a polygon or its path (see Phaser.Polygon documentation))
  * font style    (object: font, fontSize, fill, align)
  * text width    (str **size need to be on pt!**)
  * bgColor       (hex)
  * anchor x axis (int) (optional, default: 0.5)
  * anchor y axis (int) (optional, default: 0.5)
  * outline data  (object: width, color, alpha) (optional, default: no outline)
  * 
  * ret:
  * Phaser.Sprite
  */
  static polySpr(parent, x, y, path, bgColor, aX, aY, outLineData) {
    bgColor = (bgColor === undefined || bgColor === null) ? 0xFFFFFF : bgColor;

    let graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(bgColor);

    outLineData && graphics.lineStyle(outLineData.width, outLineData.color, outLineData.alpha);

    let poly = path instanceof Phaser.Polygon ? path : new Phaser.Polygon(path);

    graphics.drawPolygon(poly.points);

    graphics.endFill();

    let sprite = this.game.add.sprite(x, y, graphics.generateTexture());
    graphics.destroy();

    sprite.anchor.x = (aX === undefined || aX === null) ? 0.5 : aX;
    sprite.anchor.y = (aY === undefined || aY === null) ? 0.5 : aY;

    parent && parent.addChild(sprite);

    return sprite;
  }

  /* Specific polygon case
  * args: like polygon, but instead "path", 4 int (x, y, width, height)
  * 
  * ret:
  * Phaser.Sprite
  */
  static rectSpr(parent, x, y, width, height, bgColor, aX, aY, outLineData) {
    let path = [0, 0, width, 0, width, height, 0, height, 0, 0];
    return RPUtils.polySpr(parent, x, y, path, bgColor, aX, aY, outLineData);
  }

  // ProGM
  static enableDrag(sprite, clampToCenter = false) {
    sprite.inputEnabled = true;
    sprite.input.enableDrag(clampToCenter);
    if (!clampToCenter) {
      sprite.events.onDragStart.add(DragUtils.onDragStart, sprite);
    }
    sprite.events.onDragUpdate.add(DragUtils.onDragUpdate, sprite);
  }

  static onDragStart(sprite, pointer) {
    sprite._inSpritePos = sprite.game.input.getLocalPosition(sprite, pointer);
    DragUtils.onDragUpdate(sprite, pointer);
  }

  static onDragUpdate(sprite, pointer) {
    let pos = sprite.game.input.getLocalPosition(sprite.parent, pointer);
    if (sprite._inSpritePos) {
      sprite.x = pos.x - sprite._inSpritePos.x;
      sprite.y = pos.y - sprite._inSpritePos.y;
    } else {
      sprite.x = pos.x - sprite.width * (0.5 - sprite.anchor.x);
      sprite.y = pos.y - sprite.height * (0.5 - sprite.anchor.y);
    }
  }
}

export default RPUtils;
