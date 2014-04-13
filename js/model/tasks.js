/**
 * @fileOverview Pending tasks
 */

define(function() {

/**
 * Tasks class.
 * @param {Object} store Object store
 * @constructor
 */
function Tasks(store) {
  this.store = store;
  this.tasks = this.store.init('tasks', {});
}

Tasks.prototype.addTask = function(section, task) {
    if (!this.tasks.hasOwnProperty(section)) {
        this.tasks[section] = [];
    }
    this.tasks[section].push(task);
    this.store.save();
}

Tasks.prototype.removeTask = function(section, task) {
    if (!this.tasks.hasOwnProperty(section)) {
        return;
    }
    var idx = this.tasks[section].indexOf(task);
    this.tasks[section].splice(idx, 1);
    this.store.save();
}

/**
 * Get task objects for a section
 * @param {string} section Section name
 * returns a list with the tasks.
 */
Tasks.prototype.getTasks = function(section) {
    if (this.tasks.hasOwnProperty(section)) {
        return this.tasks[section];
    }
    return [];
}

Tasks.prototype.getOpenTasks = function(section) {
    var self = this;
    var nOpen = 0;
    Object.keys(this.tasks).forEach(function(section) {
        nOpen += self.tasks[section].length;
    });
    return nOpen;
}

Tasks.prototype.clear = function() {
    var self = this;
    Object.keys(this.tasks).forEach(function(section) {
        delete self.tasks[section];
    });
    this.store.save();
}

return Tasks;
});
