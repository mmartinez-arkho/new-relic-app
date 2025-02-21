// newrelic.js
'use strict';

/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: ['newrelic-test-app'],
  license_key: '95eba05a1bb919963a3210cc9d7c4e2cFFFFNRAL',
  logging: {
    level: 'info'
  }
  // Add other configuration options as needed.
};
