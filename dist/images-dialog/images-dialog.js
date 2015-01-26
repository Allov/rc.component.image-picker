define(["text!./images-dialog.html", "knockout"], function(template, ko) {
    var ViewModel = function(params, componentInfo) {
        var self = this;

        self.title = params.title;

        self.content = ko.validatedObservable({
            image: ko.observable('').extend({
                required: {
                    message: "L'image est requise. "
                },
                successValidatingMessage: {
                    validatingMessage: "Validation en cours...",
                    validMessage: "La valeur est valide!"
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
