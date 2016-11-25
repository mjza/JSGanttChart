﻿/// <reference path="cimt.lib.d.ts" />

namespace chart.gantt {
    export interface OpenEndInterval {
        // [from,to)
        from: number; 
        to: number;
    }
    export interface Milestone {
        color: number;
        relativeDate: number;
        text: string;
        date?: Date;        
    }
    export interface ProjectPhase {
        interval: OpenEndInterval;
        text: string;
    }
    export interface ProjectData {
        baseDate: Date;
        precedingScale?: number;
        inferiorScale?: number;
        projectPhases?: ProjectPhase[];
        milstones?: Milestone[];
    }
    export interface GanttSettings {
        parentDivId: string;
        locale?: string;
        projectData: ProjectData;
    }
    interface Error {
        value: number;
        message: string;
    }
    export class ErrorClassDoesNotHaveThisElement implements Error{
        value: number;
        message: string;
        constructor(propertyName: string) {
            this.value = 40;
            this.message = `The class does not have the property '${propertyName}'.`; 
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
        ganttTasksContent: HTMLElement = null;
        ganttSchedulesContent: HTMLElement = null;
        ganttTasksScale: HTMLElement = null;
        ganttTasksArea: HTMLElement = null;
        ganttTasksScaleCells: HTMLElement[] = [];
        ganttTasksScaleDivAtTop: HTMLElement = null;
        //
        constructor(settings: GanttSettings) {
            this.settings = settings;
            if (this.settings.projectData.precedingScale == undefined)
                this.settings.projectData.precedingScale = -54;
            if (this.settings.projectData.inferiorScale == undefined)
                this.settings.projectData.inferiorScale = 3;
            if (this.settings.locale == undefined)
                this.settings.locale = "en-us";
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
            this.getOrSetElem("ganttTasksContent", this.ganttTasks);
            this.getOrSetElem("ganttTasksScale", this.ganttTasksContent);
            this.getOrSetElem("ganttTasksArea", this.ganttTasksContent);
            this.fillScalingRibon();
        };
        getOrSetElem(elemName: string, parent?: HTMLElement) {
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
        getElement(elemName: string) {
            if (this[elemName] !== undefined)
                return this[elemName];
            else
                throw new ErrorClassDoesNotHaveThisElement(elemName);
        };
        setElement(elemName: string, elem: HTMLElement) {
            if (this[elemName] !== undefined)
                this[elemName] = elem;
            else
                throw new ErrorClassDoesNotHaveThisElement(elemName);
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
            var mouseOldPositionX = 0;
            let flag = false;
            let mouseDirection = function (offsetX: number) {
                let direction = 0;
                if (offsetX - mouseOldPositionX > 1)
                    direction = 1; // mouse moved right
                else if (mouseOldPositionX - offsetX > 1)
                    direction = -1; // mouse moved left
                mouseOldPositionX = offsetX;
                return direction;
            };
            let mouseTracker = function(e: MouseEvent) {
                _this.ganttTasks.style.left = `${e.pageX+2}px`;
                _this.ganttSchedules.style.width = `${e.pageX + 2}px`;
                // Refresh the page to solve the unwanted problems in view
                _this.refreshView();
            };
            let moveTasksSlider = function (e: MouseEvent) {
                let direction = mouseDirection(e.offsetX);
                if (e.ctrlKey) {
                    if (direction === 1)
                        _this.ganttTasks.scrollLeft -= 10;
                    else if (direction === -1)
                        _this.ganttTasks.scrollLeft += 10;
                }
            };
            this.spiliter.addEventListener("mousedown", function (e: MouseEvent) {
                e.preventDefault();
                document.addEventListener("mousemove", mouseTracker);
            });            
            this.ganttTasks.addEventListener("mousedown", function (e: MouseEvent) {
                e.preventDefault();
                mouseOldPositionX = e.offsetX;
                document.addEventListener("mousemove", moveTasksSlider);
            });
            document.addEventListener("mouseup", function (e: MouseEvent) {
                document.removeEventListener("mousemove", mouseTracker);
                document.removeEventListener("mousemove", moveTasksSlider);
                
            });
            this.spiliter.style.cursor = "col-resize";
        };
        refreshView() {
            document.body.style.display = "none";
            document.body.offsetHeight;
            document.body.style.display = "";
        };
        fillScalingRibon() {
            // create a div at top of cells
            let elem = document.createElement("div");
            this.addClass(elem, 'ganttTasksScaleDivAtTop');
            this.ganttTasksScale.appendChild(elem);
            this.ganttTasksScaleDivAtTop = elem;
            // creare cells and milstones
            let date = new Date(this.settings.projectData.baseDate.toString());
            let milestones = this.settings.projectData.milstones;
            //TODO Sort mile stones based on their item number
            date.setMonth(date.getMonth() + this.settings.projectData.precedingScale);
            for (var i = this.settings.projectData.precedingScale, j = 0, k=0; i <= this.settings.projectData.inferiorScale; i++, j++) {
                this.createScaleModule(date,j,i);
                date.setMonth(date.getMonth() + 1);
                if (k < milestones.length && (milestones[k].relativeDate == i)) {
                    this.createMilestone(j, milestones[k].relativeDate, milestones[k].text);
                    k++;
                }
            }
            this.createScaleModule(null, j, i);
            this.refreshView();
        };
        createScaleModule(date: Date, itemPosition: number, itemNumber: number) {
            let elem = document.createElement("div");
            elem.setAttribute("data-date", `${date}`);
            elem.setAttribute("data-itemnumber", `${itemNumber}`);
            elem.setAttribute("data-itemposition", `${itemPosition}`);
            this.ganttTasksScaleCells.push(elem);
            this.addClass(elem, 'ganttTasksScaleCell');
            elem.style.left = `${itemPosition * 20}px`;
            if (this.ganttTasksScaleDivAtTop.clientWidth < (itemPosition * 20 + 20))
                this.ganttTasksScaleDivAtTop.style.width = `${itemPosition * 20 + 20}px`;
            if (this.ganttTasksScale.clientWidth < (itemPosition * 20 + 20))
                this.ganttTasksScale.style.width = `${itemPosition * 20 + 20}px`;
            this.ganttTasksScale.appendChild(elem);
            let span = document.createElement("span");
            this.addClass(span, "ganttTasksScaleCellSpan");
            elem.appendChild(span);
        }
        createMilestone(itemPosition: number, itemNumber: number, text: string) {
            let elem = document.createElement("div");
            elem.setAttribute("data-itemnumber", `${itemNumber}`);
            elem.setAttribute("data-itemposition", `${itemPosition}`);
            //this.ganttTasksScaleMilestones.push(elem);
            this.addClass(elem, 'ganttTasksScaleMilestone');
            elem.style.left = `${itemPosition*20+10}px`;
            this.ganttTasksScale.appendChild(elem);
            let num = document.createElement("div");
            this.addClass(num, "ganttTasksScaleMilestoneNum");
            elem.appendChild(num);
            num.innerText = itemNumber.toString();
            let div = document.createElement("div");
            this.addClass(div, "ganttTasksScaleMilestoneDiamond");
            elem.appendChild(div);
            let span = document.createElement("span");
            this.addClass(span, "ganttTasksScaleMilestoneDiamondSpan");
            elem.appendChild(span);
            span.innerText = text;            
        }        
    }
}