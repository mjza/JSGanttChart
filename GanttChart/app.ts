/// <reference path="cimtgantt.ts" />

namespace app {
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
                        }],
                    projectPhases: [{
                        interval: {
                            from: -54,
                            to: -39
                        },
                        text: "Produktdefinition",
                        color: 0xF2DCDB,
                        textColor: 0x000000
                    }, {
                            interval: {
                                from: -39,
                                to: -12
                            },
                            text: "Konzept- und Serienentwicklung",
                            color: 0xE6B8B7,
                            textColor: 0x000000
                        }, {
                            interval: {
                                from: -12,
                                to: 0
                            },
                            text: "Serienvorbereitung",
                            color: 0xDA9694,
                            textColor: 0xFFFFFF
                        }]
                },
                locale: "de",
                tasksAreaTooltip: "Press Ctrl key to move right or left"
            });

        })();
    });
}