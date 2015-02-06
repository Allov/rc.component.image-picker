define(["text!./images-dialog.html", "knockout", 'configs'], function(template, ko, configs) {
    var ViewModel = function(params, componentInfo) {
        var self = this;
        var undef;

        self.title = params.title;

        var imagesBasePath = '/bower_components/rc.component.image-picker/src/images/';

            //todo: should we throw instead?
            if(configs.imagePicker && configs.imagePicker.imagesBasePath){
                imagesBasePath = configs.imagePicker.imagesBasePath;
            }

        self.images = ko.observableArray([
                {
                    name: '1',
                    value: imagesBasePath + 'images/1.jpg'
                },
                {
                    name: '2',
                    value: imagesBasePath + 'images/2.jpg'
                },
                {
                    name: '3',
                    value: imagesBasePath + 'images/3.jpg'
                }
            ]);

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