const {
    readCapacityConfig,
    updateCapacityConfig
} = require("../utils/capacity.reader");

async function getCapacityConfig() {
    return readCapacityConfig();
}

async function saveCapacityConfig(data) {
    return updateCapacityConfig(data);
}

module.exports = {
    getCapacityConfig,
    updateCapacityConfig: saveCapacityConfig
};