/*
    TODO: Faire un concreteiamgeselector (celui-ci étant un conceptualImageSelector).. 
    renommer les fichiers et faire les mod. nécessaires
    ou faire comme pour image-dialog et faire en sorte que ce widget retourne un objet du genre 
    {
        conceptualImage: conceptualImage,
        concreteImage: concreteImage,
        imageForLineups: bool //
    }
*/

define(['text!./image-picker.html', 'jquery', 'knockout-utilities', 'framework', 'knockout'],
    function(template, $, knockoutUtilities, framework, ko) {
        "use strict";

        var ViewModel = function(params, componentInfo) {
            var self = this;
            self.imageUrl = params.image;

            if (!self.imageUrl()) {
                self.imageUrl('/bower_components/rc.component.image-picker/dist/images/choisir2.png');
            }
        };

        ViewModel.prototype.selectImage = function(model, jQueryEvent) {
            var self = this;

            framework.showDialog('images').then(function(imageUrl) {
                if (imageUrl) {
                    self.imageUrl(imageUrl);
                }
            });
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
