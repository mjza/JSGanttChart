/// <reference path="cimt.lib.d.ts" />
var chart;
(function (chart) {
    var gantt;
    (function (gantt) {
        var ErrorClassDoesNotHaveThisElement = (function () {
            function ErrorClassDoesNotHaveThisElement() {
                this.value = 40;
                this.message = "The class does not have this property.";
            }
            ;
            ErrorClassDoesNotHaveThisElement.prototype.toString = function () {
                return this.value + this.message;
            };
            ;
            return ErrorClassDoesNotHaveThisElement;
        }());
        gantt.ErrorClassDoesNotHaveThisElement = ErrorClassDoesNotHaveThisElement;
        var Gantt = (function () {
            function Gantt(settings) {
                this.settings = null;
                this.parentElem = null;
                this.ganttContainer = null;
                this.ganttHeader = null;
                this.ganttBody = null;
                this.ganttSchedules = null;
                this.spiliter = null;
                this.ganttTasks = null;
                this.ganttSchedulesContent = null;
                this.settings = settings;
                this.initialize();
                this.makeDivsResizable();
            }
            ;
            Gantt.prototype.initialize = function () {
                this.parentElem = document.getElementById(this.settings.parentDivId);
                this.addClass(this.parentElem, "ganttChart");
                this.getOrSetElem("ganttContainer", this.parentElem);
                this.getOrSetElem("ganttHeader", this.ganttContainer);
                this.getOrSetElem("ganttBody", this.ganttContainer);
                this.getOrSetElem("ganttSchedules", this.ganttBody);
                this.getOrSetElem("ganttSchedulesContent", this.ganttSchedules);
                this.getOrSetElem("spiliter", this.ganttSchedules);
                this.getOrSetElem("ganttTasks", this.ganttBody);
            };
            ;
            Gantt.prototype.getOrSetElem = function (elemName, parent) {
                var elem = this.getElement(elemName);
                //
                if (elem)
                    return elem;
                else {
                    elem = document.createElement('div');
                    this.setElement(elemName, elem);
                    this.addClass(elem, elemName);
                    if (parent)
                        parent.appendChild(elem);
                    return elem;
                }
            };
            ;
            Gantt.prototype.getElement = function (elemName) {
                if (this[elemName] !== undefined)
                    return this[elemName];
                else
                    throw new ErrorClassDoesNotHaveThisElement();
            };
            ;
            Gantt.prototype.setElement = function (elemName, elem) {
                if (this[elemName] !== undefined)
                    this[elemName] = elem;
                else
                    throw new ErrorClassDoesNotHaveThisElement();
            };
            ;
            Gantt.prototype.addClass = function (elem, className) {
                elem.className += " " + className;
            };
            ;
            Gantt.prototype.removeClass = function (elem, className) {
                var classNames = elem.className;
                var regex = new RegExp("\\s" + className + "\\s", "g");
                do {
                    var oldValue = classNames;
                    classNames = classNames.replace(regex, " ");
                    if (oldValue == classNames)
                        break;
                } while (true);
                regex = new RegExp("^" + className + "$", "");
                classNames = classNames.replace(regex, "");
                regex = new RegExp("^" + className + "\\s", "");
                classNames = classNames.replace(regex, "");
                regex = new RegExp("\\s" + className + "$", "");
                classNames = classNames.replace(regex, "");
                elem.className = classNames;
            };
            ;
            Gantt.prototype.makeDivsResizable = function () {
                var _this = this;
                var mouseTracker = function (e) {
                    _this.ganttTasks.style.left = e.pageX + 2 + "px";
                    _this.ganttSchedules.style.width = e.pageX + 2 + "px";
                };
                this.spiliter.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    document.addEventListener("mousemove", mouseTracker);
                });
                document.addEventListener("mouseup", function (e) {
                    document.removeEventListener("mousemove", mouseTracker);
                });
            };
            ;
            return Gantt;
        }());
        gantt.Gantt = Gantt;
    })(gantt = chart.gantt || (chart.gantt = {}));
})(chart || (chart = {}));
//# sourceMappingURL=cimtgantt.js.map