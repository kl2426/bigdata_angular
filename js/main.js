'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 'opCookie', 'httpService', 'globalFn',
        function ($scope, $translate, $localStorage, $window, opCookie, httpService, globalFn) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: '教育云数据平台',
                version: '2.1.1',
                //   nav
                nav: [],
                //   userInfo
                user_info: {}
            }

//          // save settings to local storage
//          if (angular.isDefined($localStorage.settings)) {
//              $scope.app.settings = $localStorage.settings;
//          } else {
//              $localStorage.settings = $scope.app.settings;
//          }
//          $scope.$watch('app.settings', function () {
//              if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
//                  // aside dock and fixed must set the header fixed.
//                  $scope.app.settings.headerFixed = true;
//              }
//              // save to local storage
//              $localStorage.settings = $scope.app.settings;
//          }, true);

            // angular translate
//          $scope.lang = { isopen: false };
//          $scope.langs = { en: 'English', de_DE: 'German', it_IT: 'Italian' };
//          $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
//          $scope.setLang = function (langKey, $event) {
//              // set the current lang
//              $scope.selectLang = $scope.langs[langKey];
//              // You can change the language during runtime
//              $translate.use(langKey);
//              $scope.lang.isopen = !$scope.lang.isopen;
//          };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

            //   取nav
            $scope.getNav = function () {
                httpService.ajaxGet(httpService.API.href + '/json/app-data.json')
                        .then(function (res) {
                        	$scope.app.name = res.app.name;
                        	$scope.app.version = res.app.version;
                        	$scope.app.nav = res.nav;
                        });
            }




            //   取用户信息
            $scope.getUserInfo = function () {
                if (opCookie.getCookie('access_token')) {
                    //
                    httpService.ajaxPost(httpService.API.origin + '/Rest/frmuser/getCurrLoginUser', undefined, 10000, {
                        parentcode: '0'
                    })
                        .then(function (data) {
                            console.log(data)
                            if (data.status == 200) {
                                $scope.app.user_info = data.data;
                                opCookie.setCookie('user_info', escape(JSON.stringify($scope.app.user_info)), 24 * 60 * 60);
                            } else {
                                //$scope.authError = 'Email or Password not right';
                            }
                        });
                }
            }


            //   run
            var run = function () {
                //   取nav菜单
                $scope.getNav();
                //   取用户信息
                $scope.getUserInfo();
            }
            run();



        }]);