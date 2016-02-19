(function () {
    'use strict';

    angular
        .module('app.events')
        .controller('EventsCounterController', Controller);

    /* @ngInject */
    function Controller($interval, $rootScope, $localStorage) {
        var vm = this;
        vm.title = 'Controller';
        vm.events = [];
        vm.interval = false;

        activate();

        function activate() {
            /*vm.storage = $localStorage.$default({
             events: []
             });*/
            vm.storage = {
                events: [
                    {
                        name: 'Welcome time',
                        startDate: '2/19/16 9:30 PM',
                        endDate: '2/20/16 0:00 AM'
                    },
                    {
                        name: 'Sprint 1',
                        startDate: '2/20/16 0:00 AM',
                        endDate: '2/20/16 0:45 AM'
                    },
                    {
                        name: 'Coffee Break',
                        startDate: '2/20/16 0:45 AM',
                        endDate: '2/20/16 1:00 AM'
                    },
                    {
                        name: 'Sprint 2',
                        startDate: '2/20/16 1:00 AM',
                        endDate: '2/20/16 1:45 AM'
                    },
                    {
                        name: 'Coffee Break',
                        startDate: '2/20/16 1:45 AM',
                        endDate: '2/20/16 2:00 AM'
                    },
                    {
                        name: 'Sprint 3',
                        startDate: '2/20/16 2:00 AM',
                        endDate: '2/20/16 2:45 AM'
                    },
                    {
                        name: 'Almoço',
                        startDate: '2/20/16 2:45 AM',
                        endDate: '2/20/16 3:30 AM'
                    },
                    {
                        name: 'Sprint 4',
                        startDate: '2/20/16 3:30 AM',
                        endDate: '2/20/16 4:15 AM'
                    },
                    {
                        name: 'Coffee Break',
                        startDate: '2/20/16 4:15 AM',
                        endDate: '2/20/16 4:30 AM'
                    },
                    {
                        name: 'Sprint 5',
                        startDate: '2/20/16 4:30 AM',
                        endDate: '2/20/16 5:15 AM'
                    },
                    {
                        name: 'Coffee Break',
                        startDate: '2/20/16 5:15 AM',
                        endDate: '2/20/16 5:30 AM'
                    },
                    {
                        name: 'Sprint 6',
                        startDate: '2/20/16 5:30 AM',
                        endDate: '2/20/16 6:15 AM'
                    },
                    {
                        name: 'Coffee Break',
                        startDate: '2/20/16 6:15 AM',
                        endDate: '2/20/16 6:30 AM'
                    },
                    {
                        name: 'Goodbye Meeting',
                        startDate: '2/20/16 6:30 AM',
                        endDate: '2/20/16 7:00 AM'
                    },
                    {
                        name: 'It was a pleasure',
                        startDate: '2/20/16 6:30 AM',
                        endDate: '2/20/16 7:00 AM'
                    }
                ]
            };

            angular.forEach(vm.storage.events, function (event) {
                event.startDate = new Date(event.startDate);
                event.endDate = new Date(event.endDate);
            });

            vm.currentEvent = getNextEvent();
            vm.interval = $interval(updateEvents, 1000);
            console.log(vm.storage);
        }

        function updateEvents() {
            if (!vm.interval) {
                return;
            }

            var now = new Date();

            if (vm.currentEvent.endDate <= now) {
                vm.currentEvent = getNextEvent();
                if (!vm.currentEvent) {
                    $interval.stop(vm.interval);
                    vm.interval = false;
                    vm.currentEvent = {
                        name: 'Good Bye!',
                        remaining: {
                            hours: '00',
                            minutes: '00',
                            seconds: '00'
                        }
                    };
                }
            }

            var t = Date.parse(vm.currentEvent.endDate) - Date.parse(now);
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            //var days = Math.floor( t/(1000*60*60*24) );

            vm.currentEvent.remaining = {
                'hours': ((hours < 10) ? '0' + hours : hours),
                'minutes': ((minutes < 10) ? '0' + minutes : minutes),
                'seconds': ((seconds < 10) ? '0' + seconds : seconds)
            };
        }

        function getNextEvent() {
            var nextEvent = null;
            var now = new Date();
            for (var i = 0; i < vm.storage.events.length; i += 1) {
                if (vm.storage.events[i].startDate <= now && vm.storage.events[i].endDate >= now) {
                    nextEvent = vm.storage.events[i];
                    break;
                }
            }
            if (nextEvent) {
                $rootScope.backColor = getRandomColor();
            } else {
                $rootScope.backColor = '#000';
            }
            return nextEvent;
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i += 1) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
})();
