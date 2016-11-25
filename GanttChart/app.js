/// <reference path="cimtgantt.ts" />
var app;
(function (app) {
    document.addEventListener("DOMContentLoaded", function () {
        (function () {
            var ganttChart = new chart.gantt.Gantt({
                parentDivId: "ganttChart",
                projectData: {
                    baseDate: new Date(),
                    precedingScale: -54,
                    inferiorScale: 3,
                    milstones: [
                        {
                            color: 0xf00,
                            relativeDate: -54,
                            text: null
                        },
                        {
                            color: 0xf00,
                            relativeDate: -48,
                            text: "PM"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -45,
                            text: "PP"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -42,
                            text: "PD"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -39,
                            text: "PF"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -33,
                            text: "KE"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -27,
                            text: "DE"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -23,
                            text: "DF"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -18,
                            text: "BF"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -12,
                            text: "LF"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -8,
                            text: "VFF"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -6,
                            text: "PVS"
                        },
                        {
                            color: 0xf00,
                            relativeDate: -3,
                            text: "OS"
                        },
                        {
                            color: 0xf00,
                            relativeDate: 0,
                            text: "SOP"
                        },
                        {
                            color: 0xf00,
                            relativeDate: 3,
                            text: "ME"
                        }]
                },
                locale: "de"
            });
        })();
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map