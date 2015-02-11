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

define(['text!./rc.component.image-picker.html', 'jquery', 'knockout-utilities', 'dialoger', 'knockout', 'configs'],
    function(template, $, knockoutUtilities, dialoger, ko, configs) {
        "use strict";

        var ViewModel = function(params, componentInfo) {
            var self = this;

            var imagesBasePath = '/bower_components/rc.component.image-picker/src/images/';

            //todo: should we throw instead?
            if (configs.imagePicker && configs.imagePicker.imagesBasePath) {
                imagesBasePath = configs.imagePicker.imagesBasePath;
            }

            self.imageUrl = params.image;

            if (!self.imageUrl()) {
                self.imageUrl(imagesBasePath + 'choisir2.png');
            }
        };

        ViewModel.prototype.selectImage = function(model, jQueryEvent) {
            var self = this;

            if (!ko.components.isRegistered('images-dialog')) {
                dialoger.registerDialog('images', {
                    title: 'Select an image',
                    basePath: 'bower_components/rc.component.image-picker/src'
                });
            }

            dialoger.showDialog('images').then(function(imageUrl) {
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
