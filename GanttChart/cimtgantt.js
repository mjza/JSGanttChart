/// <reference path="cimt.lib.d.ts" />
var chart;
(function (chart) {
    var gantt;
    (function (gantt) {
        var ErrorClassDoesNotHaveThisElement = (function () {
            function ErrorClassDoesNotHaveThisElement(propertyName) {
                this.value = 40;
                this.message = "The class does not have the property '" + propertyName + "'.";
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
            //
            function Gantt(settings) {
                this.settings = null;
                this.parentElem = null;
                this.ganttContainer = null;
                this.ganttHeader = null;
                this.ganttBody = null;
                this.ganttSchedules = null;
                this.spiliter = null;
                this.ganttTasks = null;
                this.ganttTasksContent = null;
                this.ganttSchedulesContent = null;
                this.ganttTasksScale = null;
                this.ganttTasksArea = null;
                this.ganttTasksScaleCells = [];
                this.ganttTasksScaleDivAtTop = null;
                this.settings = settings;
                if (this.settings.projectData.precedingScale == undefined)
                    this.settings.projectData.precedingScale = -54;
                if (this.settings.projectData.inferiorScale == undefined)
                    this.settings.projectData.inferiorScale = 3;
                if (this.settings.locale == undefined)
                    this.settings.locale = "en-us";
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
                this.getOrSetElem("ganttTasksContent", this.ganttTasks);
                this.getOrSetElem("ganttTasksScale", this.ganttTasksContent);
                this.getOrSetElem("ganttTasksArea", this.ganttTasksContent);
                this.fillScalingRibon();
            };
            ;
            Gantt.prototype.getOrSetElem = function (elemName, parent) {
                var elem = this.getElement(elemName);
                //
                if (elem)
                    return elem;
                else {
                    elem = document.createElement("div");
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
                    throw new ErrorClassDoesNotHaveThisElement(elemName);
            };
            ;
            Gantt.prototype.setElement = function (elemName, elem) {
                if (this[elemName] !== undefined)
                    this[elemName] = elem;
                else
                    throw new ErrorClassDoesNotHaveThisElement(elemName);
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
                var mouseOldPositionX = 0;
                var flag = false;
                var mouseDirection = function (offsetX) {
                    var direction = 0;
                    if (offsetX - mouseOldPositionX > 1)
                        direction = 1; // mouse moved right
                    else if (mouseOldPositionX - offsetX > 1)
                        direction = -1; // mouse moved left
                    mouseOldPositionX = offsetX;
                    return direction;
                };
                var mouseTracker = function (e) {
                    _this.ganttTasks.style.left = (e.pageX + 2) + "px";
                    _this.ganttSchedules.style.width = (e.pageX + 2) + "px";
                    // Refresh the page to solve the unwanted problems in view
                    _this.refreshView();
                };
                var moveTasksSlider = function (e) {
                    var direction = mouseDirection(e.offsetX);
                    if (e.ctrlKey) {
                        if (direction === 1)
                            _this.ganttTasks.scrollLeft -= 10;
                        else if (direction === -1)
                            _this.ganttTasks.scrollLeft += 10;
                    }
                };
                this.spiliter.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    document.addEventListener("mousemove", mouseTracker);
                });
                this.ganttTasks.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    mouseOldPositionX = e.offsetX;
                    document.addEventListener("mousemove", moveTasksSlider);
                });
                document.addEventListener("mouseup", function (e) {
                    document.removeEventListener("mousemove", mouseTracker);
                    document.removeEventListener("mousemove", moveTasksSlider);
                });
                this.spiliter.style.cursor = "col-resize";
            };
            ;
            Gantt.prototype.refreshView = function () {
                document.body.style.display = "none";
                document.body.offsetHeight;
                document.body.style.display = "";
            };
            ;
            Gantt.prototype.fillScalingRibon = function () {
                // create a div at top of cells
                var elem = document.createElement("div");
                this.addClass(elem, 'ganttTasksScaleDivAtTop');
                this.ganttTasksScale.appendChild(elem);
                this.ganttTasksScaleDivAtTop = elem;
                // creare cells and milstones
                var date = new Date(this.settings.projectData.baseDate.toString());
                var milestones = this.settings.projectData.milstones;
                //TODO Sort mile stones based on their item number
                date.setMonth(date.getMonth() + this.settings.projectData.precedingScale);
                for (var i = this.settings.projectData.precedingScale, j = 0, k = 0; i <= this.settings.projectData.inferiorScale; i++, j++) {
                    this.createScaleModule(date, j, i);
                    date.setMonth(date.getMonth() + 1);
                    if (k < milestones.length && (milestones[k].relativeDate == i)) {
                        this.createMilestone(j, milestones[k].relativeDate, milestones[k].text);
                        k++;
                    }
                }
                this.createScaleModule(null, j, i);
                this.refreshView();
            };
            ;
            Gantt.prototype.createScaleModule = function (date, itemPosition, itemNumber) {
                var elem = document.createElement("div");
                elem.setAttribute("data-date", "" + date);
                elem.setAttribute("data-itemnumber", "" + itemNumber);
                elem.setAttribute("data-itemposition", "" + itemPosition);
                this.ganttTasksScaleCells.push(elem);
                this.addClass(elem, 'ganttTasksScaleCell');
                elem.style.left = itemPosition * 20 + "px";
                if (this.ganttTasksScaleDivAtTop.clientWidth < (itemPosition * 20 + 20))
                    this.ganttTasksScaleDivAtTop.style.width = (itemPosition * 20 + 20) + "px";
                if (this.ganttTasksScale.clientWidth < (itemPosition * 20 + 20))
                    this.ganttTasksScale.style.width = (itemPosition * 20 + 20) + "px";
                this.ganttTasksScale.appendChild(elem);
                var span = document.createElement("span");
                this.addClass(span, "ganttTasksScaleCellSpan");
                elem.appendChild(span);
            };
            Gantt.prototype.createMilestone = function (itemPosition, itemNumber, text) {
                var elem = document.createElement("div");
                elem.setAttribute("data-itemnumber", "" + itemNumber);
                elem.setAttribute("data-itemposition", "" + itemPosition);
                //this.ganttTasksScaleMilestones.push(elem);
                this.addClass(elem, 'ganttTasksScaleMilestone');
                elem.style.left = (itemPosition * 20 + 10) + "px";
                this.ganttTasksScale.appendChild(elem);
                var num = document.createElement("div");
                this.addClass(num, "ganttTasksScaleMilestoneNum");
                elem.appendChild(num);
                num.innerText = itemNumber.toString();
                var div = document.createElement("div");
                this.addClass(div, "ganttTasksScaleMilestoneDiamond");
                elem.appendChild(div);
                var span = document.createElement("span");
                this.addClass(span, "ganttTasksScaleMilestoneDiamondSpan");
                elem.appendChild(span);
                span.innerText = text;
            };
            return Gantt;
        }());
        gantt.Gantt = Gantt;
    })(gantt = chart.gantt || (chart.gantt = {}));
})(chart || (chart = {}));
//# sourceMappingURL=cimtgantt.js.map