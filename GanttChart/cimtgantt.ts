/// <reference path="cimt.lib.d.ts" />

namespace chart.gantt {
    interface GanttSettings {
        parentDivId: string;
    }
    interface Error {
        value: number;
        message: string;
    }
    export class ErrorClassDoesNotHaveThisElement implements Error{
        value: number;
        message: string;
        constructor() {
            this.value = 40;
            this.message = "The class does not have this property."; 
        };
        toString() {
           return this.value + this.message;
        };
    }
    export class Gantt {
        settings: GanttSettings = null;
        parentElem: HTMLElement = null;
        ganttContainer: HTMLElement = null;
        ganttHeader: HTMLElement = null;
        ganttBody: HTMLElement = null;
        ganttSchedules: HTMLElement = null;
        spiliter: HTMLElement = null;
        ganttTasks: HTMLElement = null;
        ganttSchedulesContent: HTMLElement = null;

        constructor(settings: GanttSettings) {
            this.settings = settings;
            this.initialize();
            this.makeDivsResizable();
        };
        initialize() {
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
        getOrSetElem(elemName: string, parent?: HTMLElement) {
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
        getElement(elemName: string) {
            if (this[elemName] !== undefined)
                return this[elemName];
            else
                throw new ErrorClassDoesNotHaveThisElement();
        };
        setElement(elemName: string, elem: HTMLElement) {
            if (this[elemName] !== undefined)
                this[elemName] = elem;
            else
                throw new ErrorClassDoesNotHaveThisElement();
        };
        addClass(elem: HTMLElement, className: string) {
            elem.className += " " + className;
        };
        removeClass(elem: HTMLElement, className: string) {
            let classNames = elem.className;
            let regex = new RegExp("\\s" + className + "\\s", "g");
            do {
                let oldValue = classNames;
                classNames = classNames.replace(regex, " ");
                if (oldValue == classNames)
                    break;
            } while(true);
            regex = new RegExp("^" + className + "$", "");
            classNames = classNames.replace(regex, "");
            regex = new RegExp("^" + className + "\\s", "");
            classNames = classNames.replace(regex, "");       
            regex = new RegExp("\\s" + className + "$", "");
            classNames = classNames.replace(regex, "");
            elem.className = classNames;
        };        
        makeDivsResizable() {
            let _this = this;
            let mouseTracker = function(e: MouseEvent) {
                _this.ganttTasks.style.left = e.pageX + 2 + "px";
                _this.ganttSchedules.style.width = e.pageX + 2 + "px";
            };
            this.spiliter.addEventListener("mousedown", function (e: MouseEvent) {
                e.preventDefault();
                document.addEventListener("mousemove", mouseTracker);
            });
            document.addEventListener("mouseup", function (e: MouseEvent) {
                document.removeEventListener("mousemove", mouseTracker);
            });
        };        
    }
}