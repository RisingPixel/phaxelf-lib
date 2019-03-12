/**
 * An Array extension containing sprites and methods to handle them as a pool.
 * @extends Array
 */
class SpritePool extends Array {
  /**
   * Create a Pool of sprites.
   * @constructor
   * @param {(string|Phaser.Texture|Array)} key - Frame name or texture (or array of it) the sprites will use.
   * ** NOTE: Argument passed can be an array of strings, textures or plain objects with frameName and weight properties,
   * in this case this util will select one of it based in pure random or weighted random, depending wether weight
   * property is set or not.
   * @param {Number} initialAmount - Initial amount of elements on the pool.
   * @param {Function} settingsAction - Function that will be applied to sprite to set its standard values.
   * @param {Phaser.Sprite} sprites - Any number of sprites to include initially
   */
  constructor(key, initialAmount, settingsAction, ...sprites) {
    super(...sprites);

    this.$key = key;
    this.$settingsAction = settingsAction;

    // NOTE: Since with Babel.js we can't extend the built-in classes properly a workaround need to be done...
    this.$createSprite = () => {
      let sprite;
      if (this.$key instanceof Array) {
        let totalWeight = 0;
        let currentWeight = 0;
        let winnerElement = null;

        this.$key.forEach((el) => { totalWeight = el.weight !== undefined ? totalWeight + el.weight : totalWeight + 1; });

        const random = Math.random() * totalWeight;

        this.$key.some((el) => {
          currentWeight = el.weight !== undefined ? currentWeight + el.weight : currentWeight + 1;
          if (currentWeight >= random) {
            winnerElement = el;
            return true;
          }
          return false;
        });

        const frame = winnerElement.frameName ? winnerElement.frameName : winnerElement;

        sprite = imageLoader.sprite(0, 0, frame);
      } else {
        sprite = imageLoader.sprite(0, 0, this.$key);
      }
      sprite.visible = false;
      this.$settingsAction(sprite);
      this.push(sprite);
    };

    for (let i = 0; i < initialAmount; i += 1) {
      this.$createSprite();
    }

    this.getSprite = () => {
      if (this.length < 1) this.$createSprite();
      const sprite = this.pop();
      sprite.visible = true;
      return sprite;
    };

    this.addSprite = (sprite) => {
      sprite.visible = false;
      this.$settingsAction(sprite);
      this.push(sprite);
    };
  }

  /**
   * Internal function to create and add sprites to the pool.
   * It will handle multiple textures in case you pass an Array as first argument when instantate this \`SpritePool\`.
   * This Array can be just an array of strings or textures, but in case you need weighted random, use an object with
   * \`frameName\` and \`weight\` properties.
   */
  // createSprite() {
  //   let sprite;
  //   if (this.$key instanceof Array) {
  //     let totalWeight = 0;
  //     let currentWeight = 0;
  //     let winnerElement = null;

  //     this.$key.forEach((el) => { totalWeight = el.weight !== undefined ? totalWeight + el.weight : totalWeight + 1; });
  //     const random = Math.random() * totalWeight;

  //     this.$key.some((el) => {
  //       currentWeight = el.weight !== undefined ? currentWeight + el.weight : currentWeight + 1;
  //       if (currentWeight >= random) {
  //         winnerElement = el;
  //         return true;
  //       }
  //       return false;
  //     });

  //     const frame = winnerElement.frameName ? winnerElement.frameName : winnerElement;

  //     sprite = imageLoader.sprite(0, 0, frame);
  //   } else {
  //     sprite = imageLoader.sprite(0, 0, this.$key);
  //   }
  //   sprite.visible = false;
  //   this.$settingsAction(sprite);
  //   this.push(sprite);
  // }

  /**
   * Pop out a sprite and returns it.
   * @returns {Phaser.Sprite} - The sprite out of the pool.
   */
  // getSprite() {
  //   if (this.length < 1) this.$createSprite();
  //   const sprite = this.pop();
  //   sprite.visible = true;
  //   return sprite;
  // }

  /**
   * Push a new sprite to the pool.
   * @param {Phaser.Sprite} sprite - The Sprite to push in again.
   */
  // addSprite(sprite) {
  //   sprite.visible = false;
  //   this.$settingsAction(sprite);
  //   this.push(sprite);
  // }
}

export default SpritePool;
