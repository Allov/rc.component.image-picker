// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(["text!./images-dialog.html", "knockout", 'configs'], function(template, ko, configs) {
    var ViewModel = function(params, componentInfo) {
        var self = this;
        var undef;

        self.title = params.title;

        var imagesBasePath = (configs.baseUrl || '') + 'bower_components/rc.component.image-picker/src/images/';

        //todo: should we throw instead?
        if (configs.imagePicker && configs.imagePicker.imagesBasePath) {
            imagesBasePath = configs.imagePicker.imagesBasePath;
        }

        self.titleFocused = ko.observable(true);

        self.images = ko.observableArray([{
            name: '1',
            value: imagesBasePath + '1.jpg'
        }, {
            name: '2',
            value: imagesBasePath + '2.jpg'
        }, {
            name: '3',
            value: imagesBasePath + '3.jpg'
        }]);

        self.content = ko.validatedObservable({
            image: ko.observable(undef).extend({
                required: {
                    message: "Image is required. "
                },
                successValidatingMessage: {
                    validatingMessage: "Validating...",
                    validMessage: "Value is valid!"
                }
            }),
            title: ko.observable('').extend({
                required: {
                    message: "Title is required. "
                },
                exampleAsync: {},
                successValidatingMessage: {
                    validatingMessage: "Validating...",
                    validMessage: "Value is valid!"
                }
            })
        }).extend({
            bootstrapValidation: {}
        });

        self.close = function() {
            params.close();
        };

        self.save = function() {
            self.content.isValidAsync().then(function(isValid) {
                if (isValid) {
                    params.close(self.content().image());
                }
            });
        };
    };

    return {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                return new ViewModel(params, componentInfo);
            }
        },
        template: template
    };
});
