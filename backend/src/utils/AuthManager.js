/**
 * Global state class for storing and accessing logged-in user details across the application
 */
class GlobalStateClass {
  /**
   * Constructor initializes the global data storage for user details.
   */
  constructor () {
    this.user = {}; // Your global data storage
  }
  /**
   * Sets the user data in the global state.
   * @param {object} userData - Details of the logged-in user
   */
  setData (userData) {
    this.user = userData;
  }
  /**
   * Retrieves the user details from the global state.
   * @return {object} - User details.
   */
  getData () {
    return this.user;
  }
}

const GlobalState = new GlobalStateClass();

export default GlobalState;
