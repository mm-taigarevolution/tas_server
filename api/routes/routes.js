'use strict';

module.exports = function(app) {
  var controller = require('../controllers/controller');

  app.route('/users')
    .get(controller.get_all_users)
	.post(controller.create_user);
	
  app.route('/users/:id')
    .get(controller.get_user_by_id)
    .put(controller.update_user_by_id)
    .delete(controller.delete_user_by_id);
}