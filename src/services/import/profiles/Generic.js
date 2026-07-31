/**
 * Generic import profile.
 * src\services\import\profiles\Generic.js
 */
export default {

    id: "generic",
    name: "Generic",

    /**
     * Fallback profile.
     *
     * @returns {number}
     */
    supports() {

        return 1;

    },

    mapping: {}

};