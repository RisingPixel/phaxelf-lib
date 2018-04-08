import CoordinatesExtension from './coordinates';
import TweensExtension from './tweens';

/**
 * Extensions manager to rule them all
 */
class Extensions {
  constructor() {
    throw new Error('StaticClassError');
  }

  /**
   * Initializes all extensions
   * @param {Object} LU - The layout utils class
   */
  static init(LU) {
    TweensExtension.init();
    CoordinatesExtension.init(LU);
  }
}

export default Extensions;
